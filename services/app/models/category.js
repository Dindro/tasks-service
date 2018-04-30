const db = require("@config/db");

let model = {};

model.getParent = async () => {
	const query = `SELECT * FROM categories WHERE parent IS NULL;`;
	try {
		const result = await db.getResults(query, []);
		return result;
	} catch (e) {
		throw e;
	}
};

model.getChildren = async (parentId) => {
	const query = `SELECT * FROM categories WHERE parent = ${parentId};`;
	try {
		const result = await db.getResults(query, []);
		return result;
	} catch (e) {
		throw e;
	}
};

module.exports = model;