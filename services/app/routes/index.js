const user = require('../api/user');
// const message = require('@api/message');
// const dialog = require('@api/dialog');

module.exports = (app) => {
    // app.route('/api/v1/signup')
    //     .post(user.Registration);

    app.route('/api/v1/auth')
        .post(user.auth);

    // app.route('/api/v1/messages')
    //     .get(message.Get);

    // app.route('/api/v1/dialogues')
    //     .get(dialog.Get);

    // app.route('/api/v1/tasks')
    //     .post()
}