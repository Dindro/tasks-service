const db = require("../../config/db");
let model = {};

model.create = async (task) => {
	const query = `
		INSERT INTO tasks SET 
		id_user_customer = ${task.userId},
		id_category = ${task.categoryId},
		title = '${task.title}',
		priceFrom = ${task.price},
		priceBefore = ${task.price}
	;`;
	try {
		const task = await db.getResults(query, []);
		return task.insertId;
	} catch (e) {
		throw e;
	}
};

// Добавить координаты в таблицу tasks_coordinates
model.AddCoordinate = async (idCoordinate, idTask) => {
	const query = `
		INSERT INTO tasks_coordinates SET 
		id_coordinate = ${idCoordinate},
		id_task = ${idTask}
	;`;

	try {
		const result = await db.GetResults(query);
		return result.insertId;
	} catch (e) {
		throw e;
	}
};

model.getByUserId = async function (userId, count) {
	const query = `SELECT * FROM tasks 
		WHERE id_user_customer = ${userId} 
		ORDER BY created 
		DESC LIMIT ${count}
	;`;

	try {
		const tasks = await db.getResults(query, []);
		return tasks;
	} catch (e) {
		throw e;
	}
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

model.getAll = async () => {
	const query = `SELECT * FROM tasks;`;
	try {
		const results = await db.getResults(query, []);
		return results;
	} catch (e) {
		throw e;
	}
}

module.exports = model;