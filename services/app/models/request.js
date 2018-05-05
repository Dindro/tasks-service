const db = require("../../config/db");
let model = {};

model.create = async ({ userId, taskId, messageText, price }) => {
	const query = `
		INSERT INTO requests SET 
		id_user = ${userId},
		id_task = ${taskId},
		text = '${messageText}',
		price = ${price}
	;`;

	try {
		const result = await db.getResults(query);
		return result.insertId;
	}
	catch (e) {
		throw e;
	}
}

module.exports = model;