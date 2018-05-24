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

model.getById = async ({ requestId }) => {
	const query = `
		SELECT * FROM requests WHERE 
		id = ${requestId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	}
	catch (e) {
		throw e;
	}
}

model.getByTaskId = async ({ taskId, type }) => {
	let query = '';

	switch (type) {
		case 'canceled':
			query = `
				SELECT * FROM requests WHERE 
				id_task = ${taskId} AND 
				isReject = true 
				ORDER BY created ASC
			;`;
			break;

		default:
			query = `
				SELECT * FROM requests WHERE 
				id_task = ${taskId} AND 
				isReject = false 
				ORDER BY created ASC
			;`;
			break;
	}

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

// получить заявки 4 типов
model.getByUserId = async ({ userId, type }) => {
	let query = '';

	switch (type) {
		case 'canceled':
			query = `
				SELECT * FROM requests WHERE 
				id_user = ${userId} AND 
				isReject = true 
				ORDER BY created ASC
			;`;
			break;

		case 'loading':
			query = `
				SELECT * FROM requests WHERE 
				id_user = ${userId} AND 
				isReject = false 
				ORDER BY created ASC
			;`;
			break;

		case 'successful':
			query = `
				SELECT r.* FROM 
				(
					SELECT * FROM requests WHERE 
					id_user = ${userId} AND
					isReject = false
				) AS r
				INNER JOIN tasks 
				ON r.id_task = tasks.id
				WHERE tasks.id_user_executor = ${userId} 
				ORDER BY r.created ASC
			;`
			break;

		default:
			query = `
				SELECT * FROM requests WHERE 
				id_user = ${userId} 
				ORDER BY created ASC
			;`;
			break;
	}

	try {
		const requests = await db.getResult(query);
		return requests;
	}
	catch (e) {
		throw e;
	}
};

model.getRequestsRejectCount = async ({ userId, taskId, isReject }) => {
	let query = '';

	if (taskId === undefined) {
		if (isReject === false) {
			query = `
				SELECT COUNT(*) as count FROM 
				(
					SELECT * FROM requests WHERE 
					id_user = ${userId} AND
					isReject = ${isReject}
				) as r
				INNER JOIN tasks ON r.id_user = tasks.id_user_executor 
				WHERE tasks.id_user_executor IS NULL
			;`;
		} else {
			query = `
				SELECT COUNT(*) as count FROM requests WHERE 
				id_user = ${userId} AND
				isReject = ${isReject}
			;`;
		}
	}
	else {
		query = `
			SELECT COUNT(*) as count FROM requests WHERE 
			id_task = ${taskId} AND
			isReject = ${isReject}
		;`;
	}

	try {
		const result = await db.getResult(query);
		return result[0].count;
	}
	catch (e) {
		throw e;
	}
};

// получить количество успешных заявок
model.getRequestsSuccessfulCount = async ({ userId }) => {
	const query = `
		SELECT COUNT(*) as count FROM 
		(
			SELECT * FROM requests WHERE 
			id_user = ${userId} AND
			isReject = false
		) AS r
		INNER JOIN tasks 
		ON r.id_task = tasks.id 
		WHERE tasks.id_user_executor = ${userId}
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

model.cancel = async ({ requestId }) => {
	const query = `
		UPDATE requests SET 
		isReject = true
		WHERE id = ${requestId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	}
	catch (e) {
		throw e;
	}
}

module.exports = model;