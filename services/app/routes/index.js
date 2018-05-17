const verifyToken = require('../../config/verifyToken');

// api
const user = require('../api/user');
const category = require('../api/category');
const task = require('../api/task');
const request = require('../api/request');

module.exports = (app, passport) => {
	app.route('/api/v1/signup')
		.post(user.signup);

	app.route('/api/v1/login')
		.post(user.login);

	app.route('/api/v1/getUser/:userId')
		.get(verifyToken, user.get);

	app.route('/api/v1/logout')
		.get(user.logout);

	app.route('/api/v1/getCategories')
		.get(category.getCategories);

	app.route('/api/v1/task')
		.post(verifyToken, task.create)
		.get(task.get);

	app.route('/api/v1/tasks')
		.get(task.getAll);

	app.route('/api/v1/userTasks')
		.get(verifyToken, task.getByUserId);

	// #region ЗАЯВКИ

	app.route('/api/v1/requestsByTaskId')
		.get(verifyToken, request.get);

	app.route('/api/v1/request')
		.post(verifyToken, request.create)
		.get(verifyToken, request.getMyRequests);

	app.route('/api/v1/requestsCount')
		.get(verifyToken, request.getRequestsCount)

	app.route('/api/v1/requestsCountByTaskId')
		.get(verifyToken, request.getRequestsCountByTaskId)

	// #endregion
}