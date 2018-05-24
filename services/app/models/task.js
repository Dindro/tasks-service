const db = require("../../config/db");
let model = {};

model.create = async (task) => {

	if (task.dateStart === "") {
		task.dateStart = null;
	}

	if (task.dateEnd === "") {
		task.dateEnd = null;
	}

	const query = `
		INSERT INTO tasks SET 
		id_user_customer = ${task.userId},
		id_category = ${task.categoryId},
		title = '${task.title}',
		description = '${task.description}',
		priceFrom = ${task.priceFrom},
		priceBefore = ${task.priceBefore},
		doFrom = ${task.dateStart},
		doBefore = ${task.dateEnd},
		phone = '${task.phoneNumber}',
		isComment = ${task.isComment}
	;`;
	try {
		const task = await db.getResult(query);
		return task.insertId;
	} catch (e) {
		throw e;
	}
};

model.getByUserId = async ({ userId, count }) => {
	let param = '';

	// если количество указано
	if (count !== undefined) {
		param = `LIMIT ${count}`;
	}

	const query = `
		SELECT * FROM tasks 
		WHERE id_user_customer = ${userId} 
		ORDER BY created 
		DESC ${param}
	;`;

	try {
		const tasks = await db.getResult(query);
		return tasks;
	} catch (e) {
		throw e;
	}
};

model.getById = async (taskId) => {
	const query = `SELECT * FROM tasks WHERE id = ${taskId};`;
	try {
		const results = await db.getResult(query);
		return results[0];
	} catch (e) {
		throw e;
	}
};

model.getAll = async () => {
	const query = `SELECT * FROM tasks;`;
	try {
		const results = await db.getResult(query);
		return results;
	} catch (e) {
		throw e;
	}
}

model.makePerformer = async ({ userExecutorId, taskId }) => {
	const query = `
		UPDATE tasks SET 
		id_user_executor = ${userExecutorId},
		started = now()
		WHERE id = ${taskId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	}
	catch (e) {
		throw e;
	}
}

// Добавить координаты в таблицу tasks_coordinates
model.addCoordinate = async (coordinateId, taskId) => {
	const query = `
		INSERT INTO tasks_coordinates SET 
		id_coordinate = ${coordinateId},
		id_task = ${taskId}
	;`;

	try {
		const result = await db.getResult(query);
		return result.insertId;
	} catch (e) {
		throw e;
	}
};

model.getCoordinates = async (taskId) => {
	const query = `
		SELECT c.* FROM tasks_coordinates as t_c INNER JOIN coordinates as c 
		WHERE t_c.id_coordinate = c.id AND 
		t_c.id_task = ${taskId} 
		ORDER BY c.priority ASC;
	;`;

	try {
		const results = await db.getResult(query);
		return results;
	} catch (e) {
		throw e;
	}
}

module.exports = model;