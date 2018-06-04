const Chat = require('../models/chat');
const Task = require('../models/task');
const Request = require('../models/request');

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