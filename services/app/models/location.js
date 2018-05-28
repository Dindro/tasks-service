const db = require("../../config/db");
let model = {};

model.create = async (location) => {
	const query = `
		INSERT INTO locations SET 
		name = '${location.name}',
		priority = ${location.priority},
		lon = ${location.lon},
		lat = ${location.lat}
	;`;

	try {
		const results = await db.getResult(query);
		return results.insertId;
	} catch (e) {
		throw e;
	}
};

module.exports = model;