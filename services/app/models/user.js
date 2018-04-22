const crypto = require('crypto'); //Занимается шифрованием
const db = require("@config/db");
const ModelRight = require("@models/right");
let model = {};

model.getByEmail = async (email) => {
	const query = `SELECT * FROM users WHERE email = '${email}';`;
	try {
		const result = await db.getResults(query, []);
		return result[0];
	} catch (e) {
		throw e;
	}
};

model.getById = async function (id) {
	var query = `SELECT * FROM users WHERE id = ${id};`;
	try {
		var user = await db.getResults(query, []);
		return user[0];
	} catch (e) {
		throw e;
	}
};

model.registration = async function (user) {
	const query = `
		INSERT INTO users SET 
		email = '${user.email}',
		hashedpassword = '${user.hashedpassword}',
		salt = '${user.salt}',
		name = '${user.name}',
		surname = '${user.surname}',
		birthday = '${user.birthday}';`;
	try {
		const userAdded = await db.getResults(query, []);
		return userAdded.insertId;
	} catch (e) {
		throw e;
	}
};

module.exports = model;