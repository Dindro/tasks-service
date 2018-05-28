const db = require("../../config/db");
let model = {};

model.add = async ({ userId, type, clientId }) => {
	const query = `
		INSERT INTO sockets SET 
		userId = ${userId},
		type = '${type}',
		value = '${clientId}'
	;`;
	try {
		const socket = await db.getResult(query);
		return socket.insertId;
	} catch (e) {
		throw e;
	}
};

model.getByUserId = async ({ userId, type }) => {
	const query = `
		SELECT * FROM sockets 
		WHERE 
		userId = ${userId} AND 
		type = '${type}'
	;`;

	try {
		const result = await db.getResult(query);
		return result;
	}
	catch (e) {
		throw e;
	}
};

model.delete = async ({ clientId }) => {
	const query = `
		DELETE FROM sockets 
		WHERE value = '${clientId}'
	;`;

	try {
		const result = await db.getResult(query);
		return result;
	}
	catch (e) {
		throw e;
	}
};


model.deleteAll = async () => {
	const query = `DELETE FROM sockets;`;

	try {
		const result = await db.getResult(query);
		return result;
	}
	catch (e) {
		throw e;
	}
};

module.exports = model;