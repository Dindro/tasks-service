const api = require('@api/user');

module.exports = (app) => {
    app.route('/api/v1/signup')
        .post(api.registration);

    app.route('/api/v1/auth')
        .post(api.auth);
}