const Task = require("../models/task");
const Request = require("../models/request");
const User = require("../models/user");

let api = {};

api.create = async (req, res) => {
	const { userId } = req;
	const { taskId, message, price } = req.body;

	try {
		// проверка на то что сам себе отправляю заявку
		const task = await Task.getById(taskId);
		if (userId === task.id_user_customer) {
			return res.status(200).json({ success: false, message: "Нельзя отправлять заявки себе" });
		}

		// проверка заявку можно отправлять только один раз
		const request = await Request.getByTaskAndUserId(taskId, userId);
		const isRepeat = request === undefined;
		if (isRepeat === false) {
			return res.status(200).json({ success: false, message: "Заявку можно отправить только один раз" });
		}

		// создаем заявку
		const requestInsertId = await Request.create({
			userId,
			taskId,
			message,
			price
		});

		// TODO: через сокеты сообщить заказчика

		res.status(200).send({ requestInsertId });
	} catch (e) {
		console.log(e);
	}
};

api.get = async (req, res) => {
	const { userId } = req;
	const { taskId, isView } = req.body;

	// TODO: если пользователя нет то ошибка

	try {
		const requests = await Request.getByTaskId(taskId);
		const requestsPrms = requests.map(async (request) => {
			const user = await User.getById(request.id_user);
			request.user = user;
		});

		for (const item of requestsPrms) {
			await item;
		}

		// если да, то нужно обновить isView в БД
		if (isView) {
			Request.updateView(taskId);
		}

		res.status(200).json({ requests });
	} catch (error) {
		console.log(e);
	}
};

module.exports = api;