const db = require("../../config/db");
let model = {};

model.getByEmail = async ({ email }) => {
	const query = `SELECT * FROM users WHERE email = '${email}';`;
	try {
		const result = await db.getResult(query);
		return result[0];
	} catch (e) {
		throw e;
	}
};

model.getById = async function ({ userId }) {
	var query = `SELECT * FROM users WHERE id = ${userId};`;
	try {
		var user = await db.getResult(query);
		return user[0];
	} catch (e) {
		throw e;
	}
};

model.registration = async function (user) {
	const query = `
		INSERT INTO users SET 
		email = '${user.email}',
		hashedPassword = '${user.hashedPassword}',
		salt = '${user.salt}',
		name = '${user.name}',
		surname = '${user.surname}',
		birthday = '${user.birthday}';`;
	try {
		const user = await db.getResult(query);
		return user.insertId;
	} catch (e) {
		throw e;
	}
};

module.exports = model;