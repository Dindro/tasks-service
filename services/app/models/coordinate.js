const db = require("../../config/db");
let model = {};

model.create = async (coordinate) => {
	const query = `
		INSERT INTO coordinates SET 
		address = '${coordinate.address}',
		priority = ${coordinate.priority}
	;`;

	try {
		const results = await db.getResults(query);
		return results.insertId;
	} catch (e) {
		throw e;
	}
};


module.exports = model;