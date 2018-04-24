var config = require("./index").db;
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

//Сессии
var options = {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
};
var sessionStore = new MySQLStore(options);
var sessionMiddleware = session({
    // key: 'session_cookie_name',
    secret: 'my_secret_cookie', //Для шифровании сессии
    store: sessionStore, //Где хотим хранить сессию
    resave: false,
    saveUninitialized: false
});

module.exports = sessionMiddleware;