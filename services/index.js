const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);

/*
	аналогично предыдущему, только 'Content-Type' равен 'application/x-www-form-urlencoded'.
	параметр { extended: false } означает обработку параметров тела запроса как строки или массива.
*/
app.use(bodyParser.urlencoded({ extended: false }));

/* 
	парсит тело только тех запросов, для которых 'Content-Type' равен 'application/json'.
	результат парсинга сохраняется в объекте req.body
*/
app.use(bodyParser.json());

// парсит cookie — результат сохраняется в объект req.cookies
app.use(cookieParser());

// доступность с любого домена
app.use(cors());

// роутер
require('./app/routes')(app);

io.on('connection', function (socket) {
	socket.on('hello', function (message) {
		console.log(message);
		socket.emit('hello', 'Привет от сервера');
	});
})

const port = process.env.PORT || 3000;
server.listen(port, function () {
	console.log(`Tasks service running on ${port}`);
});