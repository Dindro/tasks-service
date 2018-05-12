const db = require('../../config/db');

let model = {};

model.getParent = async () => {
	const query = `SELECT * FROM categories WHERE parent IS NULL;`;
	try {
		const result = await db.getResult(query);
		return result;
	} catch (e) {
		throw e;
	}
};

model.getChildren = async (parentId) => {
	const query = `SELECT * FROM categories WHERE parent = ${parentId};`;
	try {
		const result = await db.getResult(query);
		return result;
	} catch (e) {
		throw e;
	}
};

model.getById = async (id) => {
	const query = `SELECT * FROM categories WHERE id = ${id};`;
	try {
		const result = await db.getResult(query);
		return result[0];
	} catch (e) {
		throw e;
	}
}

module.exports = model;