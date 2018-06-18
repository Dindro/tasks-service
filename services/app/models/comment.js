const db = require('../../config/db');

let model = {};

model.create = async (comment) => {
	const query = `
			INSERT INTO comments SET 
			userId = ${comment.userId},
			taskId = ${comment.taskId},
			message = '${comment.message}'
		;`;
	try {
		const result = await db.getResult(query);
		return result.insertId;
	} catch (e) {
		throw e;
	}
};

model.getComments = async ({ taskId }) => {
	const query = `
			SELECT * FROM comments 
			WHERE 
			taskId = ${taskId}
			ORDER BY created ASC
		;`;
	try {
		const result = await db.getResult(query);
		return result;
	} catch (e) {
		throw e;
	}
};

module.exports = model;