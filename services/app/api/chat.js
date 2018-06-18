const Chat = require('../models/chat');
const Task = require('../models/task');
const Request = require('../models/request');
const Message = require('../models/message');
const User = require('../models/user');

let api = {};

api.create = async (req, res) => {
	const userId = req.userId;

	// проверка на авторизиацию
	if (!userId) {
		return res.status(400).json({ success: false, message: 'Вы не авторизировались' });
	}

	const { requests } = req.body;
	let { name, taskId } = req.body;

	// переобразуем в цифру
	taskId = parseInt(taskId);

	try {
		const task = await Task.getById({ taskId });

		// проверка на то что задача есть
		if (!task) {
			return res.status(400).json({ success: false, message: 'Задача не найдена' });
		}

		// проверка на то что задача у пользователя
		if (task.userCustomerId !== userId) {
			return res.status(400).json({ success: false, message: 'Задача не принадлежит данному id' });
		}

		// Если название пусто
		if (!name) {
			name = task.name;
		}

		// получаем чат для проверки
		const chat = await Chat.getByTaskIdAndUserCreatorId({
			taskId,
			userCreatorId: userId
		});

		// проверка на чат такого же типа
		if (chat) {
			return res.status(400).json({ success: false, message: 'Данный чат существует' });
		}

		// получаем заявки что принадлежат этой задачи
		const requestsObj = await getCheckedRequests(requests, taskId);

		// добавляем чат в БД
		const chatId = await Chat.create({
			taskId,
			userCreatorId: userId,
			name
		});

		// добавляем сначала себя в чат 
		Chat.addUser({ userId, chatId });

		// добавляем пользователей в чат и записываем в БД
		for (const request of requestsObj) {
			Chat.addUser({
				userId: request.userId,
				chatId
			});
		}

		res.status(200).json({ chatId });
	} catch (e) {
		console.log(e);
	}
};

// получить чаты
api.getChats = async (req, res) => {
	const userId = req.userId;

	// проверка на авторизиацию
	if (!userId) {
		return res.status(400).json({
			success: false,
			message: 'Вы не авторизировались'
		});
	}

	try {
		let chats = [];
		const myChats = await Chat.getChats({ userId });

		// получим последние сообщения
		// собеседников
		const myChatsPrms = myChats.map(async (chat) => {
			// получаем сам чат
			const realChat = await Chat.getById({ chatId: chat.chatId })

			// получаем последнее сообщение
			const lastMessage = await Message.getLastMessage({ chatId: chat.chatId });

			// получаем собеседников чата
			let users = [];
			const chatUsers = await Chat.getUsersByChatId({ chatId: chat.chatId });
			const chatUsersPrms = chatUsers.map(async (chatUser) => {
				// не получаем себя, а зачем второй раз
				if (chatUser.userId !== userId) {
					// получаем собеседника
					const user = await User.getById({ userId: chatUser.userId });
					users.push(user);
				}
			});

			// ждем собеседников
			for (const item of chatUsersPrms) {
				await item;
			}

			chats.push({
				...realChat,
				lastMessage,
				users
			})
		});

		for (const item of myChatsPrms) {
			await item;
		}

		chats = chats.sort((a, b) => {
			if (a.lastMessage && b.lastMessage === undefined) {
				return -1;
			} else if (b.lastMessage && a.lastMessage === undefined) {
				return 1;
			}
			else {
				return a.lastMessage.created > b.lastMessage.created
			}
		})

		res.status(200).json({ chats });
	} catch (e) {
		console.log(e);
	}
};

// получить проверенные заявки на данную задачу
async function getCheckedRequests(requests, taskId) {
	let requestsObj = [];

	try {
		const requestsPrms = requests.map(async (requestId) => {
			const request = await Request.getById({ requestId });

			// проверяем принадлежит ли данная заявка к задаче
			if (request && request.taskId === taskId) {
				requestsObj.push(request);
			}
		});

		for (const item of requestsPrms) {
			await item;
		}

		return requestsObj;
	} catch (e) {
		throw e;
	}
}

module.exports = api;