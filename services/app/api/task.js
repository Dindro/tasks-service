const Task = require('../models/task');
const Location = require('../models/location');
const User = require('../models/user');
const Request = require('../models/request');
const Category = require('../models/category');

let api = {};

api.create = async (req, res) => {
	const userId = req.userId;

	// проверка на авторизиацию
	if (!userId) {
		return res.status(400).json({ success: false, message: "Вы не авторизировались" });
	}

	const {
		categoryId,
		name,
		description,
		priceFrom,
		priceBefore,
		addresses,
		dateStart,
		dateEnd,
		phoneNumber,
		isComment
	} = req.body;

	try {
		const taskId = await Task.create({
			userId,
			categoryId,
			name,
			description,
			priceFrom,
			priceBefore,
			dateStart,
			dateEnd,
			phoneNumber,
			isComment
		});

		const addressesPrms = addresses.map(async (address, index) => {
			address.priority = index + 1;
			const locationId = await Location.create(address);
			const locationTaskId = await Task.addLocations({ locationId, taskId });
		});

		res.status(200).json({ success: true, taskId });
	} catch (e) {
		console.log(e);
	}
};

api.getAll = async (req, res) => {
	try {
		const tasks = await Task.getAll();

		const tasksPrms = tasks.map(async (task) => {
			const user = await User.getById({ userId: task.userCustomerId });
			task.user = user;
		})

		for (const item of tasksPrms) {
			await item;
		}

		res.status(200).json({ tasks });
	} catch (e) {
		console.log(e);
	}
};

api.getByUserId = async (req, res) => {
	const { count } = req.query;
	let { userId } = req.query;

	if (!userId) {
		userId = req.userId;

		if (!userId) {
			return res.status(200).json({ success: false, message: 'id not found' });
		}
	}

	try {
		const tasks = await Task.getByUserId({ userId, count });
		res.status(200).json({ tasks });
	} catch (e) {
		console.log(e);
	}
}

api.get = async (req, res) => {
	const { taskId } = req.query;

	try {
		const task = await Task.getById({ taskId });

		// получаем заказчика
		const userCustomerPrm = User.getById({ userId: task.userCustomerId });

		// получаем исполнителя
		let userPerformerPrm;
		if (task.userPerformerId !== null) {
			userCustomerPrm = User.getById({ userId: task.userPerformerId });
		}

		// получаем количество новых заявок
		const requestNotViewCountPrm = Request.getNotViewCount({ taskId: task.id });

		// получаем название категории
		const categoryPrm = Category.getById({ categoryId: task.categoryId });


		// ждем ответов
		const category = await categoryPrm;
		task.categoryName = category.name;
		task.requestNotViewCount = await requestNotViewCountPrm;
		task.userCustomer = await userCustomerPrm;
		if (!userCustomerPrm) {
			task.userPerformer = await userPerformerPrm;
		}

		res.status(200).json({ task });
	} catch (e) {
		console.log(e);
	}
}

module.exports = api;