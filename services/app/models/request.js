const db = require("../../config/db");
let model = {};

model.create = async ({ userId, taskId, message, price }) => {
	const query = `
		INSERT INTO requests SET 
		id_user = ${userId},
		id_task = ${taskId},
		text = '${message}',
		price = ${price}
	;`;

	try {
		const result = await db.getResult(query);
		return result.insertId;
	}
	catch (e) {
		throw e;
	}
};

model.getByTaskId = async (taskId) => {
	const query = `SELECT * FROM requests WHERE id_task = ${taskId};`;

	try {
		const results = await db.getResult(query);
		return results;
	}
	catch (e) {
		throw e;
	}
}

// чтобы человек два раза не отправлял заявку
model.getByTaskAndUserId = async (taskId, userId) => {
	const query = `
		SELECT * FROM requests WHERE 
		id_task = ${taskId} AND 
		id_user = ${userId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	}
	catch (e) {
		throw e;
	}
};

model.getNotViewCount = async (taskId) => {
	const query = `
		SELECT COUNT(*) as count FROM requests WHERE 
		id_task = ${taskId} AND
		isView = false
	;`;

	try {
		const result = await db.getResult(query);
		return result[0].count;
	}
	catch (e) {
		throw e;
	}
};

model.updateView = async (taskId) => {
	const query = `
		UPDATE requests SET 
		isView = true
		WHERE id_task = ${taskId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	}
	catch (e) {
		throw e;
	}
};

module.exports = model;