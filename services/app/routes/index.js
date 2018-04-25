const verifyToken = require('../../config/verifyToken');
const user = require('../api/user');
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
}