const verifyToken = require('../../config/verifyToken');

// api
const user = require('../api/user');
const category = require('../api/category');
const task = require('../api/task');
const request = require('../api/request');
const image = require('../api/image');
const message = require('../api/message');
const chat = require('../api/chat');
const review = require('../api/review');
const favorite = require('../api/favorite');

module.exports = ({ app, io }) => {
	// #region ПОЛЬЗОВАТЕЛИ
	app.route('/api/v1/signup')
		.post(user.signup);

	app.route('/api/v1/login')
		.post(user.login);

	app.route('/api/v1/user')
		.get(verifyToken, user.get);

	app.route('/api/v1/logout')
		.get(user.logout);

	app.route('/api/v1/userViews')
		.post(verifyToken, user.updateViews);

	app.route('/api/v1/userStatic')
		.get(verifyToken, user.getStatic);
	// #endregion

	app.route('/api/v1/categories')
		.get(category.getCategories);

	// #region ЗАДАЧИ
	app.route('/api/v1/task')
		.post(verifyToken, task.create)
		.get(task.get);

	app.route('/api/v1/tasks')
		.get(verifyToken, task.getTasks);

	app.route('/api/v1/userTasks')
		.get(verifyToken, task.getByUserId);

	app.route('/api/v1/tasksCount')
		.get(verifyToken, task.getCountByUserId);
	// #endregion

	// #region ЗАЯВКИ
	app.route('/api/v1/requestsByTaskId')
		.get(verifyToken, request.get);

	app.route('/api/v1/request')
		.post(verifyToken, (req, res) => request.create(req, res, io))
		.get(verifyToken, request.getMyRequests)
		.delete(verifyToken, request.delete)

	app.route('/api/v1/requestsCount')
		.get(verifyToken, request.getRequestsCount)

	app.route('/api/v1/requestsCountByTaskId')
		.get(verifyToken, request.getRequestsCountByTaskId)

	app.route('/api/v1/cancelRequest')
		.post(verifyToken, request.cancel)

	app.route('/api/v1/makePerformer')
		.post(verifyToken, (req, res) => request.makePerformer(req, res, io))
	// #endregion

	app.route('/api/v1/upload')
		.post(image.upload);

	// #region СООБЩЕНИЯ
	app.route('/api/v1/message')
		.post(verifyToken, message.create);
	// #endregion

	// #region ЧАТЫ
	app.route('/api/v1/chat')
		.post(verifyToken, chat.create);
	// #endregion

	// #region ОТЗЫВЫ
	app.route('/api/v1/reviews')
		.get(review.getReviews);

	app.route('/api/v1/reviewsStatic')
		.get(review.getReviewsStatic);
	// #endregion

	// #region ИЗБРАННЫЕ
	app.route('/api/v1/favorite')
		.post(verifyToken, favorite.add);

	app.route('/api/v1/favorites')
		.get(verifyToken, favorite.getFavorites);

	app.route('/api/v1/favoritesCount')
		.get(verifyToken, favorite.getFavoritesCount);
	// #endregion
}