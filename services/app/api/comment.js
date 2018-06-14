const Task = require("../models/task");
const Comment = require("../models/comment");

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

	let {
		taskId,
		message
	} = req.body;

	// валидация параметров
	message = message.trim();
	if (!taskId || !message || message === '') {
		return res.status(400).json({
			success: false,
			message: 'Не правильные данные'
		});
	}

	try {
		const task = await Task.getById({ taskId });

		// если задачи нет
		if (!task || task.isComment < 1) {
			return res.status(400).json({
				success: false,
				message: 'Доступ запрещен'
			});
		}

		const commentInsertId = await Comment.create({
			taskId,
			userId,
			message
		});

		res.status(200).json({ success: true, commentInsertId });
	} catch (error) {
		console.log(error);
	}
};

api.getComments = async (req, res) => {

	let {
		taskId,
	} = req.query;

	taskId = parseInt(taskId);

	if (!taskId) {
		return res.status(400).json({
			success: false,
			message: 'Не правильные данные'
		});
	}

	try {
		const task = await Task.getById({ taskId });

		// если задачи нет
		if (!task) {
			return res.status(400).json({
				success: false,
				message: 'Комментария для задачи не найдены'
			});
		}

		const comments = await Comment.getComments({
			taskId,
		});

		res.status(200).json({ success: true, commentInsertId });
	} catch (error) {
		console.log(error);
	}
};

module.exports = api;