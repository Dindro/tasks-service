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
	const query = `SELECT * FROM users WHERE id = ${userId};`;
	try {
		const result = await db.getResult(query);
		let user = result[0];
		if (user) {
			delete user.email;
			delete user.hashedPassword;
			delete user.salt;
			delete user.phone;
			delete user.about;
			delete user.right;
		}
		return user;
	} catch (e) {
		throw e;
	}
};

// получить авторизированного пользователя
model.getAuthUserById = async function ({ userId }) {
	const query = `SELECT * FROM users WHERE id = ${userId};`;
	try {
		const result = await db.getResult(query);
		let user = result[0];
		if (user) {
			delete user.hashedPassword;
			delete user.salt;
		}
		return user;
	} catch (e) {
		throw e;
	}
};

model.getFullById = async function ({ userId }) {
	var query = `SELECT * FROM users WHERE id = ${userId};`;
	try {
		var user = await db.getResult(query);
		return user[0];
	} catch (e) {
		throw e;
	}
};

model.registration = async (user) => {
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

model.updateViews = async ({ userId, views }) => {
	const query = `
		UPDATE users SET 
		views = ${views} 
		WHERE 
		id = ${userId};
	`;
	try {
		const result = await db.getResult(query);
		return result;
	} catch (e) {
		throw e;
	}
};

module.exports = model;