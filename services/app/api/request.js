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
	const {
		taskId,
		type,
		isView
	} = req.query;

	// проверка сессии
	if (userId === undefined) {
		return res.status(200).json({ success: false, message: 'id пользователя не идентифицирован' });
	}

	// проверка то что это мое задание
	const task = await Task.getById(taskId);
	if (userId !== task.id_user_customer) {
		return res.status(200).json({ success: false, message: 'Допуск к этому заданию запрещен' });
	}

	try {
		const requests = await Request.getByTaskId({ taskId, type });
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
	} catch (e) {
		console.log(e);
	}
};

// получить мною поданные заявки
api.getMyRequests = async (req, res) => {
	const { userId } = req;
	const { type } = req.query;

	// проверка сессии
	if (userId === undefined) {
		return res.status(200).json({ success: false, message: "id пользователя не идентифицирован" });
	}

	try {
		// получаем свои заявки
		const requests = await Request.getByUserId({ userId, type });

		// в ожидании получения задачи и заказчика
		const tasksUsersPrms = requests.map(async (request) => {
			const task = await Task.getById(request.id_task);
			const user = await User.getById(task.id_user_customer);

			request.task = task;
			request.userCustomer = user;
		});

		// ожидаем задачи и заказчика
		for (const item of tasksUsersPrms) {
			await item;
		}

		res.status(200).json({ requests });
	} catch (e) {
		console.log(e);
	}
}

// получить данные о моих заявках
api.getRequestsCount = async (req, res) => {
	const { userId } = req;

	// проверка сессии
	if (userId === undefined) {
		return res.status(200).json({ success: false, message: "id пользователя не идентифицирован" });
	}

	try {
		const canceledCountPrm = Request.getRequestsRejectCount({ userId, isReject: true });
		const loadingCountPrm = Request.getRequestsRejectCount({ userId, isReject: false });
		const successfulCountPrm = Request.getRequestsSuccessfulCount({ userId });

		const requestsCount = {
			canceled: await canceledCountPrm,
			loading: await loadingCountPrm,
			successful: await successfulCountPrm
		}

		res.status(200).json({ requestsCount });
	} catch (e) {
		console.log(e);
	}
}

// получить завки конкретного задания
api.getRequestsCountByTaskId = async (req, res) => {
	const { userId } = req;
	const { taskId } = req.query;

	// проверка сессии
	if (userId === undefined) {
		return res.status(200).json({ success: false, message: "id пользователя не идентифицирован" });
	}

	// проверка задачи на создателя
	const task = await Task.getById(taskId);
	if (task.id_user_customer !== userId) {
		return res.status(200).json({ success: false, message: 'Допуск к этому заданию запрещен' });
	}

	try {
		const canceledCountPrm = Request.getRequestsRejectCount({ taskId, isReject: true });
		const loadingCountPrm = Request.getRequestsRejectCount({ taskId, isReject: false });

		const requestsCount = {
			canceled: await canceledCountPrm,
			loading: await loadingCountPrm,
		}

		res.status(200).json({ requestsCount });
	} catch (e) {
		console.log(e);
	}
}

module.exports = api;