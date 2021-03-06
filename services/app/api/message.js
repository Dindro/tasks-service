const Chat = require('../models/chat');
const User = require('../models/user');
const Message = require('../models/message');
const Task = require('../models/task');
const SocketApi = require('./socket');

let api = {};

api.create = async (req, res) => {
	const userId = req.userId;

	// проверка на авторизиацию
	if (!userId) {
		return res.status(400).json({ success: false, message: 'Вы не авторизировались' });
	}

	let { text, chatId } = req.body;

	try {
		const chat = await Chat.getByIdAndUserId({ userId, chatId });

		// проверка принадлежит ли пользователь чату
		if (!chat) {
			return res.status(400).json({ success: false, message: 'Нет доступа к чату' });
		}

		// добавляем сообщение в БД
		const messageId = await Message.create({
			userId,
			chatId,
			text
		});

		// TODO: отправить сообщение по сокету
		const chatUsers = await Chat.getUsersByChatId({ chatId: chat.chatId });
		for (const chatUser of chatUsers) {
			SocketApi.send({
				userId: chatUser.userId,
				socketType: 'io',
				type: 'message',
				data: chatId
			})
		}

		res.status(200).json({ messageId });
	} catch (e) {
		console.log(e);
	}
};

// получить сообщения
api.getMessages = async (req, res) => {
	const userId = req.userId;

	// проверка на авторизиацию
	if (!userId) {
		return res.status(400).json({ success: false, message: 'Вы не авторизировались' });
	}

	let {
		chatId
	} = req.query;

	chatId = parseInt(chatId);

	// TODO: сделать проверку на то что мой чат

	try {
		const chat = await Chat.getById({ chatId });
		let task;
		if (chat.taskId) {
			task = await Task.getById({ taskId: chat.taskId })
		}

		const messages = await Message.getMessages({ chatId });

		let users = [];
		const chatUsers = await Chat.getUsersByChatId({ chatId });
		const chatUsersPrms = chatUsers.map(async (chatUser) => {
			const user = await User.getById({ userId: chatUser.userId });
			users.push(user);
		});

		for (const item of chatUsersPrms) {
			await item;
		}

		res.status(200).json({ users, messages, task });
	} catch (error) {
		console.log(error);
	}
};

/* 
api.Get = async (req, res) => {
	if (req.session.authorized == false) {
		res.status(401).json({ success: false, message: 'Вы не авторизованы' });
		return;
	}

	//const id_sender = req.session.id_user;
	const id_sender = 1;
	let { id_receiver, startTime, limitMessages } = req.query;
	startTime = startTime || false;
	limitMessages = Number(limitMessages) || 30;

	try {
		const commonIdDialog = await ModelDialogUser.GetCommonIdDialog(id_sender, id_receiver);
		const messages = await (async () => {
			if (startTime)
				return await ModelMessage.GetByTime(commonIdDialog, id_sender, startTime, limitMessages);
			else
				return await ModelMessage.Get(commonIdDialog, id_sender, limitMessages);
		})();
		res.status(200).json({ success: true, messages });
	} catch (e) {
		res.status(500).json({ e });
	}
};

api.GetV2 = async function (req, res) {
	const id_user_request = 2;
	let {
		id_user_interlocutor,	// Собеседник
		id_message_start,		// С какого сообщения нужно подсчитать
		timeStart,				// С какого времени нужно подсчитать
		count					// Количество сообщений
	} = req.query;

	try {
		// Получаем общий диалог
		const commonIdChat = await ModelChat.GetCommonIdChat(id_user_request, id_user_interlocutor);
		const messages = await (async () => {
			if (startTime)
				return await ModelMessage.GetByTime(commonIdChat, id_sender, timeStart, count);
			else
				return await ModelMessage.Get(commonIdChat, id_sender, limitMessages);
		})();

		await OperateInside(messages); // Получаем вложенности сообщения

		res.status(200).json({ success: true, messages });
	} catch (e) {
		res.status(500).json({ e });
	}
}

api.GetFromChat = function (req, res) {
	const id_user_request = 2;
	const id_chat = 1;
	const limitMessages;
	const id_message_start;
	try {
		// Получаем данные о пользователе в данном диалоге
		const chatOption = await ModelChat.GetOption(id_user_request, id_chat);
		// Получаем даты входа и выхода из чата
		const views = await ModelChat.GetViews(chatOption.id);
		// Получаем сообщения
		let messages = await ModelMessage.GetFromChat(
			id_user_request,
			id_chat,
			chatOption.viewFrom,
			views,
			limitMessages
		);
	} catch (e) {

	}
} */

module.exports = api;

/* // Вычисления вложенности сообщения
async function OperateInside(messages, isAgainChild = false) {
	let messagesPromises = messages.map(GetInside(message, isAgainChild));

	for (const messagePromise of messagesPromises) {
		await messagePromise;
	}
}

// Получаем вложенности сообщения
async function GetInside(message, isAgainChild = false) {
	let childMessages, images, coordinates, lot;

	//Уровень вложенности 1 сообщение
	if (message.hasChilds == true && isAgainChild == false) {
		childMessages = (async () => {
			let childs = await ModelMessage.GetChildMessages(message.id); // Получаем сообщения
			await OperateInside(childs, true);
		})();
	}
	if (message.hasImages == true) {
		images = ModelMessage.GetImages(message.id);
	}
	if (message.hasCoordinates == true) {
		coordinates = ModelMessage.GetCoordinates(message.id);
	}
	if (message.hasLot == true) {
		lot = ModelMessage.GetLot(message.id);
	}

	//Ждем пока все выполнится
	[
		message.childMessages,
		message.images,
		message.coordinates,
		message.lot
	] = await Promise.all[childMessages, images, coordinates, lot];
} */