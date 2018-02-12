var ModelDialogUser = require("@models/chat/dialog_user");
var ModelChat = require("@models/chat/dialog");
var ModelMessage = require("@models/chat/message");
var ModelMessageDeleted = require("@models/chat/messagedeleted");
var ModelSocket = require("@models/socket");

let api = {};

api.Get = async (req, res) => {
	/* if (req.session.authorized == false) {
		res.status(401).json({ success: false, message: "Вы не авторизованы" });
		return;
	} */

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

api.Post = async (req, res) => {
	if (req.session.authorized == false) {
		res.status(401).json({ success: false, message: "Вы не авторизованы" });
		return;
	}

	const id_sender = req.session.id_user;
	let { id_receiver, text } = req.body;

	try {
		let commonIdDialog = await ModelDialogUser.GetCommonIdDialog(id_user_sender, id_user_receiver);
		if (commonIdDialog == undefined) {
			const insertedIdDialog = await ModelDialog.Create();
			const insertedIdUserSender = ModelDialogUser.Add(insertedIdDialog, id_user_sender);
			const insertedIdUserReceiver = ModelDialogUser.Add(insertedIdDialog, id_user_receiver);
			await Promise.all([insertedIdUserSender, insertedIdUserReceiver]);
			commonIdDialog = insertedIdDialog;
		}
		const insertedIdMessage = await ModelMessage.Create(id_user_sender, id_dialog, msg);
		res.status(200).json({ success: true, insertedIdMessage });
	} catch (e) {
		res.status(500).json({ e });
	}
};

api.GetV2 = function (req, res) {
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
		const messages = await(async () => {
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
}

module.exports = api;

// Вычисления вложенности сообщения
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
}