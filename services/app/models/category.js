const db = require('../../config/db');

let model = {};

model.getParent = async () => {
	const query = `SELECT * FROM categories WHERE parentId IS NULL;`;
	try {
		const result = await db.getResult(query);
		return result;
	} catch (e) {
		throw e;
	}
};

model.getChildren = async ({ parentId }) => {
	const query = `SELECT * FROM categories WHERE parentId = ${parentId};`;
	try {
		const result = await db.getResult(query);
		return result;
	} catch (e) {
		throw e;
	}
};

model.getById = async ({ categoryId }) => {
	const query = `SELECT * FROM categories WHERE id = ${categoryId};`;
	try {
		const result = await db.getResult(query);
		return result[0];
	} catch (e) {
		throw e;
	}
}

module.exports = model;