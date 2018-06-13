const db = require("../../config/db");
let model = {};

model.create = async ({ userId, taskId, message, price }) => {
	const query = `
		INSERT INTO requests SET 
		userId = ${userId},
		taskId = ${taskId},
		message = '${message}',
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

model.getAllWithoutUserId = async ({ taskId, userId }) => {
	const query = `
		SELECT * FROM requests WHERE 
		taskId = ${taskId} AND 
		userId != ${userId}
	;`;

	try {
		const results = await db.getResult(query);
		return results;
	}
	catch (e) {
		throw e;
	}
};

model.getByTaskId = async ({ taskId, type }) => {
	let query = '';

	switch (type) {
		case 'canceled':
			query = `
				SELECT * FROM requests WHERE 
				taskId = ${taskId} AND 
				isReject = true 
				ORDER BY created ASC
			;`;
			break;

		default:
			query = `
				SELECT * FROM requests WHERE 
				taskId = ${taskId} AND 
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
model.getByTaskAndUserId = async ({ taskId, userId }) => {
	const query = `
		SELECT * FROM requests WHERE 
		taskId = ${taskId} AND 
		userId = ${userId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	}
	catch (e) {
		throw e;
	}
};

model.getNotViewCount = async ({ taskId }) => {
	const query = `
		SELECT COUNT(*) as count FROM requests WHERE 
		taskId = ${taskId} AND
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
				userId = ${userId} AND 
				isReject = true 
				ORDER BY created DESC
			;`;
			break;

		case 'loading':
			query = `
				SELECT r.* FROM 
				(
					SELECT * FROM requests 
					WHERE 
					userId = ${userId} AND 
					isReject = false
				) AS r
				INNER JOIN tasks 
				ON r.taskId = tasks.id 
				WHERE tasks.userPerformerId IS NULL
				ORDER BY created DESC
			;`;
			break;

		case 'successful':
			query = `
				SELECT r.* FROM 
				(
					SELECT * FROM requests WHERE 
					userId = ${userId} AND
					isReject = false
				) AS r
				INNER JOIN tasks 
				ON r.taskId = tasks.id
				WHERE tasks.userPerformerId = ${userId} 
				ORDER BY r.created DESC
			;`
			break;

		default:
			query = `
				SELECT * FROM requests WHERE 
				userId = ${userId} 
				ORDER BY created DESC
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

	if (!taskId) {
		if (isReject === false) {
			// заявки в обработке
			query = `
				SELECT COUNT(*) as count FROM 
				(
					SELECT * FROM requests WHERE 
					userId = ${userId} AND
					isReject = ${isReject}
				) as r
				INNER JOIN tasks ON r.taskId = tasks.id 
				WHERE tasks.userPerformerId IS NULL
			;`;
		} else {
			query = `
				SELECT COUNT(*) as count FROM requests WHERE 
				userId = ${userId} AND
				isReject = ${isReject}
			;`;
		}
	}
	else {
		query = `
			SELECT COUNT(*) as count FROM requests WHERE 
			taskId = ${taskId} AND
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
			userId = ${userId} AND
			isReject = false
		) AS r
		INNER JOIN tasks 
		ON r.taskId = tasks.id 
		WHERE tasks.userPerformerId = ${userId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0].count;
	}
	catch (e) {
		throw e;
	}
};

model.updateView = async ({ taskId }) => {
	const query = `
		UPDATE requests SET 
		isView = true
		WHERE taskId = ${taskId}
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
};

model.delete = async ({ requestId }) => {
	const query = `
		DELETE FROM requests 
		WHERE id = ${requestId}
	;`;

	try {
		const result = await db.getResult(query);
		return result;
	}
	catch (e) {
		throw e;
	}
};

module.exports = model;