const Task = require('../models/task');
const Location = require('../models/location');
const User = require('../models/user');
const Request = require('../models/request');
const Category = require('../models/category');
const Review = require('../models/review');

let api = {};

api.create = async (req, res) => {
	const userId = req.userId;

	// проверка на авторизиацию
	if (!userId) {
		return res.status(400).json({
			success: false,
			message: 'Вы не авторизировались'
		});
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

		res.status(200).json({ taskId });
	} catch (e) {
		console.log(e);
	}
};

// получить задачи по заданным параметрам
api.getTasks = async (req, res) => {

	let {
		count,
		lastTaskId,
		search,
		filterUser,
		userId,
		filterPriceFrom,
		filterPriceBefore,
		filterStatusId,
		filterCategoryId
	} = req.query;

	// валидация мин цены
	if (filterPriceFrom) {
		if (filterPriceFrom === '') {
			filterPriceFrom = undefined;
		}
		else {
			filterPriceFrom = parseInt(filterPriceFrom);
		}
	}

	// валидация макс цены
	if (filterPriceBefore) {
		if (filterPriceBefore === '') {
			filterPriceBefore = undefined;
		}
		else {
			filterPriceBefore = parseInt(filterPriceBefore);
		}
	}

	// валидация цены
	if (filterStatusId) {
		filterStatusId = parseInt(filterStatusId);
		if (filterStatusId === 0) {
			filterStatusId = undefined;
		}
	}

	// валидация категории
	if (filterCategoryId) {
		filterCategoryId = parseInt(filterCategoryId);
		if (filterCategoryId === 0) {
			filterCategoryId = undefined;
		}
	}



	// валидация фильтра
	if (filterUser) {
		filterUser = filterUser == 'false' ? false : true;
	}

	// валидация количества
	if (!count) {
		count = 20;
	}

	// валидация userId
	if (!userId && filterUser === true) {
		userId = req.userId;
	}

	try {
		const tasks = await Task.getTasks({
			count,
			lastTaskId,
			search,
			userId,
			filterPriceFrom,
			filterPriceBefore,
			filterCategoryId,
			filterStatusId
		});

		// получаем пользователя
		// количество отзывов
		// местоположения
		const tasksPrms = tasks.map(async (task) => {
			const userPrm = User.getById({ userId: task.userCustomerId });
			const reviewsCountPrm = Review.getCount({ userId: task.userCustomerId });
			const locationsPrm = Task.getLocations({ taskId: task.id });

			task.user = await userPrm;
			task.user.reviewsCount = await reviewsCountPrm;
			task.locations = await locationsPrm;
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
			return res.status(200).json({ success: false, message: 'userId не определен' });
		}
	}

	try {
		const tasks = await Task.getByUserId({ userId, count });
		res.status(200).json({ tasks });
	} catch (e) {
		console.log(e);
	}
}

// получить конкретную задачу
api.get = async (req, res) => {
	const { taskId } = req.query;

	try {
		const task = await Task.getById({ taskId });

		// получаем заказчика
		const userCustomerPrm = User.getById({ userId: task.userCustomerId });

		// получаем исполнителя
		let userPerformerPrm;
		if (task.userPerformerId !== null) {
			userPerformerPrm = User.getById({ userId: task.userPerformerId });
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
		if (userCustomerPrm) {
			task.userPerformer = await userPerformerPrm;
		}

		res.status(200).json({ task });
	} catch (e) {
		console.log(e);
	}
}

// получить количество заданий
api.getCountByUserId = async (req, res) => {
	let { userId } = req.query;
	if (!userId) {
		userId = req.userId;
		if (!userId) {
			return res.status(400).json({ success: false, message: 'param userId not found' });
		}
	}

	try {
		const count = await Task.getCountByUserId({ userId });
		res.json({ count });
	} catch (e) {
		console.log(e);
	}

}

module.exports = api;