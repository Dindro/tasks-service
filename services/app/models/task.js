const db = require("@config/db");
let model = {};

// Создать
model.Create = async function (id_user, task) {
    var query = "INSERT INTO TASKS (ID_USER, TITLE, DESCRIPTION, TIME, PRICE, PHONE, ADDRESS, TAGS, ID_CATEGORY) VALUES (?,?,?,?,?,?);";
    var array = [id_user, t.id_category, t.title, t.description, t.price, t.phone, t.address, t.latitude, t.longitude, t.tags, t.comment];
    var task = await pool.GetResults(query, array);
    return task.insertId;
};

// Добавить координаты в таблицу tasks_coordinates
model.AddCoordinate = async (idCoordinate, idTask) => {
    let query = `
        INSERT INTO tasks_coordinates SET 
        id_coordinate = ${idCoordinate},
        id_task = ${idTask};
    `;

    try {
        const result = await db.GetResults(query);
        return result.insertId;
    } catch (e) {
        throw e;
    }
};

model.GetTasksByUserId = async function (id_user) {
    var query = "SELECT * FROM TASKS WHERE ID_USER = ?;";
    var array = [id_user];
    var tasks = await pool.GetResults(query, array);
    return tasks;
};

//Удалить
model.deleteTask = function (id_task, callback) {
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
};

//Обновить
model.updateTask = function (id_task, callback) {

};


module.exports = model;