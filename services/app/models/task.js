const db = require("../../config/db");
let model = {};

model.create = async (task) => {
	const query = `
		INSERT INTO tasks SET 
		id_user_customer = ${task.userId},
		id_category = ${task.categoryId},
		title = '${task.title}',
		description = '${task.description}',
		priceFrom = ${task.priceFrom},
		priceBefore = ${task.priceBefore},
		doFrom = '${task.dateStart}',
		doBefore = '${task.dateEnd}',
		phone = '${task.phoneNumber}',
		isComment = ${task.isComment}
	;`;
	try {
		const task = await db.getResults(query);
		return task.insertId;
	} catch (e) {
		throw e;
	}
};

model.getByUserId = async (userId, count) => {
	const query = `SELECT * FROM tasks 
		WHERE id_user_customer = ${userId} 
		ORDER BY created 
		DESC LIMIT ${count}
	;`;

	try {
		const tasks = await db.getResults(query);
		return tasks;
	} catch (e) {
		throw e;
	}
};

model.getById = async (taskId) => {
	const query = `SELECT * FROM tasks WHERE id = ${taskId};`;
	try {
		const results = await db.getResults(query);
		return results[0];
	} catch (e) {
		throw e;
	}
};

model.getAll = async () => {
	const query = `SELECT * FROM tasks;`;
	try {
		const results = await db.getResults(query);
		return results;
	} catch (e) {
		throw e;
	}
}

//Удалить
model.deleteTask = function (id_task, callback) {

};

//Обновить
model.updateTask = function (id_task, callback) {

};

// Добавить координаты в таблицу tasks_coordinates
model.addCoordinate = async (coordinateId, taskId) => {
	const query = `
		INSERT INTO tasks_coordinates SET 
		id_coordinate = ${coordinateId},
		id_task = ${taskId}
	;`;

	try {
		const result = await db.getResults(query);
		return result.insertId;
	} catch (e) {
		throw e;
	}
};

module.exports = model;