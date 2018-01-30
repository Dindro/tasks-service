var config = require("../libs/config");
var async = require('async');
var pool = require("./../libs/db");

module.exports = {
    Create: async function (id_task, id_user_want) {
        var query = "INSERT INTO RESERVES (ID_TASK, ID_USER_WANT) VALUES (?,?);";
        var array = [id_task, id_user_want];
        var reserve = await pool.GetResults(query, array);
        return reserve;
    },

    GetByIdTask: async function (id_task) {
        var query = "SELECT * FROM request WHERE id_task = ?;";
        var array = [id_task];
        try {
            var request = await pool.GetResults(query, array);
            return request;
        } catch (e) {
            throw new Error(e);
        }
    }
};