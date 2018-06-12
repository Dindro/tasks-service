const db = require("../../config/db");
let model = {};

model.create = async ({ userAddedId, userAddingId }) => {
	const query = `
		INSERT INTO favorites 
		SET 
		userAddedId = ${userAddedId},
		userAddingId = ${userAddingId}
	;`;

	try {
		const result = await db.getResult(query);
		return result.insertId;
	}
	catch (e) {
		throw e;
	}
};

model.getByUsers = async ({ userAddedId, userAddingId }) => {
	const query = `
		SELECT * FROM favorites 
		WHERE 
		userAddedId = ${userAddedId} AND 
		userAddingId = ${userAddingId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	}
	catch (e) {
		throw e;
	}
};

model.getByUserAddedId = async ({ userAddedId, count }) => {
	let limit = '';
	if (count) {
		whereLimit = `LIMIT ${count}`;
	}

	const query = `
		SELECT * FROM favorites 
		WHERE 
		userAddedId = ${userAddedId} 
		ORDER BY created DESC 
		${limit}
	;`;

	try {
		const results = await db.getResult(query);
		return results;
	}
	catch (e) {
		throw e;
	}
};

model.getCount = async ({ userAddedId }) => {
	const query = `
		SELECT COUNT(*) as count FROM favorites 
		WHERE 
		userAddedId = ${userAddedId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0].count;
	}
	catch (e) {
		throw e;
	}
};

module.exports = model;