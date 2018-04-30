const db = require("../../config/db");
let model = {};

model.create = async (id_task) => {
	const query = `
		SELECT * FROM table_name WHERE id = ${id_task}
	;`;

	try {
		const result = await db.getResults(query, array);
		return result[0];
	}
	catch (e) {
		throw e;
	}
};

module.exports = model;