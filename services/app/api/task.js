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
	const { categoryId, title, price } = req.body;

	try {
		const taskId = await Task.create({ userId, categoryId, title, price });
		return res.status(200).json({ success: true, taskId });
	} catch (e) {
		console.log(e);
	}

	/*
	// Добавить координаты в БД
	let coordinatesPromise = coordinates.map(async (coordinate) => {
		const idCoordinate = await Coordinate.Create(coordinate);
		const idCoordinateTask = await Task.AddCoordinate(idCoordinate, taskId);
	});

	// Добавить картинки
	*/
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

api.get = async (req, res) => {
	const { userId, count } = req.query;

	try {
		const tasks = await Task.getByUserId(userId, count);
		res.status(200).json({ tasks });
	} catch (e) {
		console.log(e);
	}
}

module.exports = api;