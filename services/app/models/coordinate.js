const db = require("../../config/db");
let model = {};

model.create = async (coordinate) => {
	const query = `
		INSERT INTO coordinates SET 
		name = '${coordinate.name}',
		priority = ${coordinate.priority},
		lon = ${coordinate.lon},
		lat = ${coordinate.lat}
	;`;

	try {
		const results = await db.getResult(query);
		return results.insertId;
	} catch (e) {
		throw e;
	}
};


module.exports = model;