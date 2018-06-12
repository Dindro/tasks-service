const db = require("../../config/db");
let model = {};

model.create = async ({ taskId }) => {
	const query = `
		SELECT * FROM table_name WHERE id = ${id_task}
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