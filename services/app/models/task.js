var config = require("../libs/config");
var async = require('async');
var pool = require("./../libs/db");

module.exports = {
    CreateTaskSync: async function (id_user, t) {
        var query = "INSERT INTO TASKS (ID_USER, TITLE, DESCRIPTION, TIME, PRICE, PHONE, ADDRESS, TAGS, ID_CATEGORY) VALUES (?,?,?,?,?,?);";
        var array = [id_user, t.id_category, t.title, t.description, t.price, t.phone, t.address, t.latitude, t.longitude, t.tags, t.comment];
        var task = await pool.GetResults(query, array);
        return task;
    },

    GetTasksByUserId: async function (id_user) {
        var query = "SELECT * FROM TASKS WHERE ID_USER = ?;";
        var array = [id_user];
        var tasks = await pool.GetResults(query, array);
        return tasks;
    },

    //Создать
    createTask: function (
        id_user,
        t,
        callback) {

        async.waterfall([
            function (callback) {
                pool.getConnection(function (err, connection) {
                    if (err) callback(config.error.connection);
                    connection.query("INSERT INTO TASKS (ID_USER, TITLE, DESCRIPTION, TIME, PRICE, PHONE, ADDRESS, TAGS, ID_CATEGORY) VALUES (?,?,?,?,?,?);",
                        [
                            id_user,
                            t.id_category,
                            t.title,
                            t.description,
                            t.price,
                            t.phone,
                            t.address,
                            t.latitude,
                            t.longitude,
                            t.tags,
                            t.comment
                        ],
                        function (err, results, fields) {
                            connection.release();
                            if (err) callback(config.error.query);
                            callback(null);
                        });
                });
            },
        ], function (err) {

        });
    },

    //Удалить
    deleteTask: function (id_task, callback) {
        async.waterfall([
            function (callback) {
                pool.getConnection(function (err, connection) {
                    if (err) callback(config.error.connection);
                    connection.query("DELETE FROM TASKS WHERE ID_TASK = ?;",
                        [id_task],
                        function (err, results, fields) {
                            connection.release();
                            if (err) callback(config.error.query);
                            callback(null);
                        });
                });
            }
        ], callback);
    },

    //Обновить
    updateTask: function (id_task, callback) {

    }
};