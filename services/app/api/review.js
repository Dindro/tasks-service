const Task = require('../models/task');
const Location = require('../models/location');
const User = require('../models/user');
const Request = require('../models/request');
const Category = require('../models/category');
const Review = require('../models/review');
const SocketApi = require('./socket');

let api = {};

// создаем отзыв
api.create = async (req, res) => {
	const userId = req.userId;

	// проверка на авторизиацию
	if (!userId) {
		return res.status(400).json({ success: false, message: 'Вы не авторизировались' });
	}

	const {
		taskId,
		description,
		rating1,
		rating2,
		rating3,
	} = req.body;

	try {
		const task = await Task.getById({ taskId });

		// если пользователь не заказчик и не исполнитель
		if ((task.userCustomerId === userId || task.userPerformerId === userId) === false) {
			return res.status(400).json({
				success: false,
				message: 'Вы не можете создать отзыв на это задание'
			});
		}

		// если задача не завершена
		if (task.finished === null) {
			return res.status(400).json({
				success: false,
				message: 'Вы не можете создать отзыв на это задание, т.к задача не завершена'
			});
		}

		const reviewInsertId = await Review.create({
			taskId,
			userId,
			description,
			rating1,
			rating2,
			rating3
		});

		// TODO: уведомлять заказчика или исполнителя

		// подготовка данных
		const user = await User.getById({ userId });

		// если заказчик
		if (task.userCustomerId === userId) {
			// уведомляем исполнителя
		}
		// если исполнитель
		else if (task.userPerformerId === userId) {
			// уведомляем заказчика
		}

		res.status(200).json({ success: true, reviewInsertId });
	} catch (e) {
		console.log(e);
	}
};

// получаем отзыв
api.get = async (req, res) => {
	const {
		userId,
		reviewLastId,
		count,
		type
	} = req.query;

	if (!reviewLastId) {

	}

	if (!count) {
		count = 10;
	}

	if (!type) {
		type = 'all';
	}

	try {
		const reviews = await Task.getById({ taskId });

		const reviewInsertId = await Review.create({
			taskId,
			userId,
			description,
			rating1,
			rating2,
			rating3
		});

		// TODO: уведомлять заказчика или исполнителя

		// подготовка данных
		const user = await User.getById({ userId });

		// если заказчик
		if (task.userCustomerId === userId) {
			// уведомляем исполнителя
		}
		// если исполнитель
		else if (task.userPerformerId === userId) {
			// уведомляем заказчика
		}

		res.status(200).json({ success: true, reviewInsertId });
	} catch (e) {
		console.log(e);
	}
};

api.getReviews = async (req, res) => {
	const {
		userId,
		type
	} = req.query;

	try {
		const reviews = await Review.getReviews({ userId, type });

		const reviewsPrms = reviews.map(async (review) => {
			const userPrm = User.getById({ userId: review.userId });
			const taskPrm = Task.getById({ taskId: review.taskId });
			const reviewsCountPrm = Review.getCount({ userId: review.userId });
			review.user = await userPrm;
			review.task = await taskPrm;
			review.user.reviewsCount = await reviewsCountPrm;
		});

		for (const item of reviewsPrms) {
			await item;
		}

		res.status(200).json({ success: true, reviews });
	} catch (e) {
		console.log(e);
	}
};

api.getReviewsStatic = async (req, res) => {
	const {
		userId
	} = req.query;

	try {
		const allPrm = Review.getCount({ userId });
		const fromPerformerPrm = Review.getCount({ userId, type: 'fromPerformer' });
		const fromCustomerPrm = Review.getCount({ userId, type: 'fromCustomer' });

		const all = await allPrm;
		const fromPerformer = await fromPerformerPrm;
		const fromCustomer = await fromCustomerPrm;


		res.status(200).json({
			success: true, reviewsStatic: {
				all,
				fromPerformer,
				fromCustomer
			}
		});
	} catch (e) {
		console.log(e);
	}
};

module.exports = api;