const verifyToken = require('../../config/verifyToken');
const user = require('../api/user');
const category = require('../api/category');
const task = require('../api/task');
const request = require('../api/request');
// const message = require('@api/message');
// const dialog = require('@api/dialog');

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
		.post(verifyToken, task.create);

	app.route('/api/v1/tasks')
		.get(task.getAll);

	app.route('/api/v1/userTasks')
		.get(task.getByUserId);

	app.route('/api/v1/task')
		.get(task.get);

	app.route('/api/v1/request')
		.post(verifyToken, request.create)
}