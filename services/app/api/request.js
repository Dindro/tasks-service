const Task = require('../models/task');
const Request = require('../models/request');
const User = require('../models/user');
const Socket = require('../models/socket');

let api = {};

api.create = async (req, res, io) => {
	const { userId } = req;
	const { taskId, message, price } = req.body;

	try {
		// проверка на то что сам себе отправляю заявку
		const task = await Task.getById({ taskId });
		if (userId === task.userCustomerId) {
			return res.status(200).json({ success: false, message: 'Нельзя отправлять заявки себе' });
		}

		// проверка заявку можно отправлять только один раз
		const request = await Request.getByTaskAndUserId({ taskId, userId });
		if (!request) {
			return res.status(200).json({ success: false, message: 'Заявку можно отправить только один раз' });
		}

		// создаем заявку
		const requestInsertId = await Request.create({
			userId,
			taskId,
			message,
			price
		});

		res.status(200).send({ requestInsertId });

		// TODO: через сокеты сообщить заказчика
		const { userCustomerId } = task;
		const customerSocketsPrm = Socket.getByUserId({ userId: userCustomerId });
		const requestPrm = Request.getById({ requestId: requestInsertId });
		const userPerformerPrm = User.getById({ userId });

		const customerSockets = await customerSocketsPrm;
		const request = await requestPrm;
		const userPerformer = await userPerformerPrm;

		for (const item of customerSockets) {
			const client = io.sockets.sockets[item.value];
			if (client) {
				client.emit('request', { task, request, userPerformer, type: 'new' });
			}
		}
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
	if (!userId) {
		return res.status(200).json({ success: false, message: 'id пользователя не идентифицирован' });
	}

	// проверка то что это мое задание
	const task = await Task.getById({ taskId });
	if (userId !== task.userCustomerId) {
		return res.status(200).json({ success: false, message: 'Допуск к этому заданию запрещен' });
	}

	try {
		const requests = await Request.getByTaskId({ taskId, type });
		const requestsPrms = requests.map(async (request) => {
			const user = await User.getById({ userId: request.userId });
			request.user = user;
		});

		for (const item of requestsPrms) {
			await item;
		}

		// если да, то нужно обновить isView в БД
		if (isView) {
			Request.updateView({ taskId });
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
	if (!userId) {
		return res.status(200).json({ success: false, message: 'id пользователя не идентифицирован' });
	}

	try {
		// получаем свои заявки
		const requests = await Request.getByUserId({ userId, type });

		// в ожидании получения задачи и заказчика
		const tasksUsersPrms = requests.map(async (request) => {
			const task = await Task.getById({ taskId: request.taskId });
			const userCustomer = await User.getById({ userId: task.userCustomerId });

			request.task = task;
			request.userCustomer = userCustomer;
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
	if (!userId) {
		return res.status(200).json({ success: false, message: 'id пользователя не идентифицирован' });
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
	if (!userId) {
		return res.status(200).json({ success: false, message: 'id пользователя не идентифицирован' });
	}

	// проверка задачи на создателя
	const task = await Task.getById({ taskId });
	if (task.userCustomerId !== userId) {
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
};

// отмена заявки
api.cancel = async (req, res) => {
	const { userId } = req;
	const { requestId } = req.body;

	// проверка сессии
	if (!userId) {
		return res.status(200).json({ success: false, message: 'id пользователя не идентифицирован' });
	}

	try {
		const request = await Request.getById({ requestId });
		const task = await Task.getById({ taskId: request.taskId });

		if (task.userCustomerId !== userId) {
			return res.status(200).json({ success: false, message: 'Доступ к задаче запрещен' });
		}

		await Request.cancel({ requestId });
		res.status(200).json({ success: true, message: 'Заявка отклонена' });
	} catch (e) {
		console.log(e);
	}
};

// назначение исполнителя
api.makePerformer = async (req, res, io) => {
	const { userId } = req;
	const { requestId } = req.body;

	// проверка сессии
	if (!userId) {
		return res.status(200).json({ success: false, message: 'id пользователя не идентифицирован' });
	}

	try {
		const request = await Request.getById({ requestId });
		const task = await Task.getById({ taskId: request.taskId });

		// проверка что это задача пользователя
		if (task.userCustomerId !== userId) {
			return res.status(200).json({ success: false, message: 'Доступ к задаче запрещен' });
		}

		// проверка что уже есть исполнитель
		if (task.userPerformerId !== null) {
			return res.status(200).json({ success: false, message: 'У задачи есть исполнитель' });
		}

		// данные для оповещания
		const userCustomer = await User.getById({ userId });

		// назначаем исполнителя
		await Task.makePerformer({
			userPerformerId: request.userId,
			taskId: task.id
		});

		// оповещаем исполнителя
		const performerSockets = await Socket.getByUserId({ userId: request.userId, type: 'io' });
		for (const item of performerSockets) {
			const client = io.sockets.sockets[item.value];
			if (client) {
				client.emit('request', { task, userCustomer, type: 'success' });
			}
		}

		// отклоняем и оповещаем об отклонении
		const loosersRequests = await Request.getAllWithoutUserId({
			taskId,
			userId: request.userId
		});

		for (const looserRequest of loosersRequests) {
			Request.cancel({ requestId: looserRequest.id });
			looserSockets = await Socket.getByUserId({ userId: looserRequest.userId, type: 'io' });
			for (const item of looserSockets) {
				const client = io.sockets.sockets[item.value];
				if (client) {
					client.emit('request', { task, userCustomer, type: 'cancel' });
				}
			}
		}

		res.status(200).json({ success: true, message: 'Исполнитель назначен' });
	} catch (e) {
		console.log(e);
	}
};

// удаление заявки
api.delete = async (req, res) => {
	const { userId } = req;
	const { requestId } = req.query;

	// проверка сессии
	if (!userId) {
		return res.status(200).json({ success: false, message: 'id пользователя не идентифицирован' });
	}

	try {
		const request = await Request.getById({ requestId });

		// проверка на существование заявки
		if (!request) {
			return res.status(200).json({ success: false, message: 'Заявки не существует' });
		}

		// проверка на то что заявка является моей
		if (request.userId !== userId) {
			return res.status(200).json({ success: false, message: 'Заявка не принадлежит вам' });
		}

		const task = await Task.getById({ taskId: request.taskId });

		// если заявка отклонена или успешна то удалять нельзя
		if (request.isReject == true || (request.isReject == false && task.userPerformerId !== null)) {
			return res.status(200).json({ success: false, message: 'Отмененную или принятую заявку удалить нельзя' });
		}

		await Request.delete({ requestId });

		res.status(200).json({ success: true, message: 'Заявка удалена' });
	} catch (e) {
		console.log(e);
	}
};

module.exports = api;