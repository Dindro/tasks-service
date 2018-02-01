const user = require('@api/user');
const message = require('@api/message');

module.exports = (app) => {
    app.route('/api/v1/signup')
        .post(user.Registration);

    app.route('/api/v1/auth')
        .post(user.Auth);

    app.route('/api/v1/messages')
        .get(message.Get);
}