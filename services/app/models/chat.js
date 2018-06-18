const db = require('../../config/db');

let model = {};

model.create = async (chat) => {
	const query = `
		INSERT INTO chats SET 
		taskId = ${chat.taskId},
		userCreatorId = ${chat.userCreatorId},
		name = '${chat.name}'
	;`;

	try {
		const result = await db.getResult(query);
		return result.insertId;
	} catch (e) {
		throw e;
	}
};

// TODO
model.getCommonChatId = async ({ }) => {
	const query = `
		SELECT ud1.id_dialog FROM chats_users AS cuLeft 
		INNER JOIN 
		chats_users AS cuRight 
		ON cuLeft.chatId = cuRight.chatId 
		WHERE 
		cuLeft.userId = ? AND cuRight.userId = ?
	;`;

	try {
		const tasks = await db.getResult(query);
		return tasks;
	} catch (e) {
		throw e;
	}
};

// получить чат
model.getByIdAndUserId = async ({ chatId, userId }) => {
	const query = `
		SELECT * FROM chats_users
		WHERE 
		chatId = ${chatId} AND userId = ${userId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	} catch (e) {
		throw e;
	}
};

// получить чат по креатору
model.getByTaskIdAndUserCreatorId = async ({ taskId, userCreatorId }) => {
	const query = `
		SELECT * FROM chats
		WHERE 
		taskId = ${taskId} AND userCreatorId = ${userCreatorId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	} catch (e) {
		throw e;
	}
};

// добавляем в чат пользователя
model.addUser = async ({ userId, chatId }) => {
	const query = `
		INSERT INTO chats_users SET 
		userId = ${userId},
		chatId = ${chatId}
	;`;

	try {
		const chatUser = await db.getResult(query);
		return chatUser.insertId;
	} catch (e) {
		throw e;
	}
};

// получить чаты
model.getChats = async ({ userId }) => {
	const query = `
		SELECT * FROM chats_users WHERE userId = ${userId}
	;`;

	try {
		const chats = await db.getResult(query);
		return chats;
	} catch (e) {
		throw e;
	}
};


// получить чаты
model.getById = async ({ chatId }) => {
	const query = `
		SELECT * FROM chats WHERE id = ${chatId}
	;`;

	try {
		const chat = await db.getResult(query);
		return chat[0];
	} catch (e) {
		throw e;
	}
};

// получить участников чата
model.getUsersByChatId = async ({ chatId }) => {
	const query = `
		SELECT * FROM chats_users 
		WHERE chatId = ${chatId}
	;`;

	try {
		const users = await db.getResult(query);
		return users;
	} catch (e) {
		throw e;
	}
};



const f = {
	GetDialoguesByTime: async function (id_user, dialoguesLimit, startTime) {
		var query = `
			SELECT * FROM 
			(
				SELECT m.* FROM
				(
					SELECT m.*, d.id_user AS id_user_interlocutor FROM 
					(
						SELECT ud1.id_dialog, ud1.id_user FROM users_dialogues AS ud1 INNER JOIN 
						(
							SELECT * FROM users_dialogues WHERE users_dialogues.id_user = ?
						)
						AS ud2 ON ud1.id_dialog = ud2.id_dialog WHERE ud1.id_user != ?
					)
					AS d INNER JOIN messages AS m ON d.id_dialog = m.id_dialog
				)
				AS m LEFT JOIN messagesdeleted AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC
			) 
			AS mlimit WHERE mlimit.created < ? GROUP BY mlimit.id_dialog LIMIT ?;
		`;


		/* var ud2 = "SELECT * FROM users_dialogues WHERE users_dialogues.id_user = ?";
		var d = "SELECT ud1.id_dialog FROM users_dialogues AS ud1 INNER JOIN (" + ud2 + ") AS ud2 ON ud1.id_dialog = ud2.id_dialog WHERE ud1.id_user != ?";
		var m = "SELECT m.* FROM (" + d + ") AS d INNER JOIN messages AS m ON d.id_dialog = m.id_dialog";
		var mlimit = "SELECT DISTINCT m.id_dialog, m.id, m.text, m.created, m.isRead FROM (" + m + ") AS m LEFT JOIN messagesdeleted AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC";
		var query = "SELECT * FROM (" + mlimit + ") AS mlimit WHERE mlimit.created < ? LIMIT ?;"; */
		var array = [id_user, id_user, startTime, dialoguesLimit];
		try {
			var dialogues = await db.GetResults(query, array);
			return dialogues
		} catch (e) {
			throw e;
		}
	},

	GetDialogues: async function (id_user, dialoguesLimit) {
		var query = `
			SELECT * FROM 
			(
				SELECT m.* FROM 
				(
					SELECT m.*, d.id_user AS id_user_interlocutor FROM 
					(
						SELECT ud1.id_dialog, ud1.id_user FROM users_dialogues AS ud1 INNER JOIN 
						(
							SELECT * FROM users_dialogues WHERE users_dialogues.id_user = ?
						) 
						AS ud2 ON ud1.id_dialog = ud2.id_dialog WHERE ud1.id_user != ?
					) 
					AS d INNER JOIN messages AS m ON d.id_dialog = m.id_dialog
				)
				AS m LEFT JOIN messagesdeleted AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC
			)
			AS mlimit GROUP BY mlimit.id_dialog LIMIT ?;
		`;

		/*  var ud2 = "SELECT * FROM users_dialogues WHERE users_dialogues.id_user = ?";
		 var d = "SELECT ud1.id_dialog FROM users_dialogues AS ud1 INNER JOIN (" + ud2 + ") AS ud2 ON ud1.id_dialog = ud2.id_dialog WHERE ud1.id_user != ?";
		 var m = "SELECT m.* FROM (" + d + ") AS d INNER JOIN messages AS m ON d.id_dialog = m.id_dialog";
		 var mlimit = "SELECT DISTINCT m.id_dialog, m.id, m.text, m.created, m.isRead FROM (" + m + ") AS m LEFT JOIN messagesdeleted AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC";
		 var query = "SELECT * FROM (" + mlimit + ") AS mlimit LIMIT ?;"; */
		var array = [id_user, id_user, dialoguesLimit];
		try {
			var dialogues = await db.GetResults(query, array);
			return dialogues
		} catch (e) {
			throw e;
		}
	},

	/* GetDialogues: async function (id_user, count) {
		var ud2 = "SELECT * FROM users_dialogues WHERE users_dialogues.id_user = ?";
		var query = "SELECT ud1.* FROM users_dialogues AS ud1 INNER JOIN (" + ud2 + ") AS ud2 ON ud1.id_dialog = ud2.id_dialog WHERE ud1.id_user != ?";
		var array = [id_user, id_user];
		try {
			var dialogues = await db.GetResults(query, array);
			return dialogues;
		} catch (e) {
			throw e;
		}
	}, */

	GetUserByIdDialog: async function (id_dialog, id_user) {
		var query = "SELECT id_dialog FROM dialogues_users WHERE id_dialog = ? AND id_user != ?;";
		var array = [id_dialog, id_user];
		try {
			var user = await db.GetResults(query, array);
			if (user.length != 0)
				return user[0].id_user;
			else
				throw new Error("Пользователь в диалоге №" + id_dialog + " не найден");
		} catch (e) {
			throw e;
		}
	},

	GetUsersByIdDialog: async function (id_dialog) {
		var query = `
			SELECT du.id_dialog, users.* FROM
			(
				SELECT * FROM dialogues_users WHERE id_dialog = ?
			)
			AS du INNER JOIN users ON du.id_user = users.id;`;

		var du = "SELECT * FROM dialogues_users WHERE id_dialog = ?";
		var query = "SELECT du.id_dialog, users.* FROM (" + du + ") AS du INNER JOIN users ON du.id_user = users.id;"
		/* var query = "SELECT * FROM dialogues_users WHERE id_dialog = ?;"; */
		var array = [id_dialog];
		try {
			var result = await db.GetResults(query, array);
			return result;
		} catch (e) {
			throw new Error(e);
		}
	},

	Add: async function (id_dialog, id_user) {
		var query = "INSERT INTO users_dialogues (id_dialog, id_user) VALUES (?,?);";
		var array = [id_dialog, id_user];
		try {
			var result = await db.GetResults(query, array);
			return;
		} catch (e) {
			throw e;
		}
	}
}

module.exports = model;