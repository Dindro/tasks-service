const Task = require("../models/task");
const Coordinate = require("../models/coordinate");
const User = require("../models/user");

let api = {};

api.create = async (req, res) => {
	// проверка на авторизиацию
	if (req.userId === undefined) {
		return res.status(400).json({ success: 200, message: "Вы не авторизировались" });
	}

	const userId = req.userId;
	const {
		categoryId,
		title,
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
			title,
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
			const coordinateId = await Coordinate.create(address);
			const idCoordinateTask = await Task.addCoordinate(coordinateId, taskId);
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
			const user = await User.getById(task.id_user_customer);
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
	const { userId, count } = req.query;

	try {
		const tasks = await Task.getByUserId(userId, count);
		res.status(200).json({ tasks });
	} catch (e) {
		console.log(e);
	}
}

api.get = async (req, res) => {
	const { taskId } = req.query;

	try {
		const task = await Task.getById(taskId);

		// получаем заказчика
		const userCustomer = await User.getById(task.id_user_customer);
		task.userCustomer = userCustomer;

		// TODO: получить исполнителя

		res.status(200).json({ task });
	} catch (e) {
		console.log(e);
	}
}

module.exports = api;