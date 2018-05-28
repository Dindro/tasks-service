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
		userCustomerId = ${task.userId},
		categoryId = ${task.categoryId},
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
		WHERE userCustomerId = ${userId} 
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

model.getById = async ({ taskId }) => {
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

model.makePerformer = async ({ userPerformerId, taskId }) => {
	const query = `
		UPDATE tasks SET 
		userPerformerId = ${userExecutorId},
		started = now()
		WHERE 
		id = ${taskId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	}
	catch (e) {
		throw e;
	}
}

// Добавить координаты в таблицу tasks_locations
model.addLocations = async ({ locationId, taskId }) => {
	const query = `
		INSERT INTO tasks_coordinates SET 
		locationId = ${locationId},
		taskId = ${taskId}
	;`;

	try {
		const result = await db.getResult(query);
		return result.insertId;
	} catch (e) {
		throw e;
	}
};

model.getCoordinates = async ({ taskId }) => {
	const query = `
		SELECT c.* FROM tasks_locations as t_l INNER JOIN locations as l 
		WHERE t_l.locationId = l.id AND 
		t_l.taskId = ${taskId} 
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