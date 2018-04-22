require("module-alias/register");
const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	cookieParser = require('cookie-parser'),
	cors = require("cors"),
	http = require("http"),
	server = http.Server(app),
	io = require("socket.io")(server);

app.use(bodyParser.urlencoded({ extended: false })); //Аналогично предыдущему, только 'Content-Type' равен 'application/x-www-form-urlencoded'. Параметр { extended: false } означает обработку параметров тела запроса как строки или массива.
app.use(bodyParser.json()); //Парсит тело только тех запросов, для которых 'Content-Type' равен 'application/json'. Результат парсинга сохраняется в объекте req.body
app.use(cookieParser()); //Парсит cookie — результат сохраняется в объект req.cookies
app.use(cors()); //Доступность с любого домена
app.use(require("@config/sessionoption").sessionMiddleware); //Настройки сессии

require('@routes')(app);


io.on("connection", function (socket) {
	socket.on("hello", function (message) {
		console.log(message);
		socket.emit("hello", "Привет от сервера");
	});
})


const port = process.env.PORT || 3000;
server.listen(port, function () {
	console.log(`Tasks service running on ${port}`);
});