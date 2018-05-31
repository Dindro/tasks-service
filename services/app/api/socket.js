const jwt = require('jsonwebtoken');
const config = require('../../config');
const Socket = require('../models/socket');
let _io;
let api = {};

api.listeners = (io) => {
	_io = io;

	// удаляем все сессии сокетов
	Socket.deleteAll();

	io.use((client, next) => {
		// проверка авторизации
		const token = client.handshake.query['x-access-token'];
		if (!token) {
			return;
		}

		jwt.verify(token, config.jwt.secret, (err, decoded) => {
			if (err) {
				console.log('ошибка jwt токена');
				return;
			}
			else {
				client.userId = decoded.id;
				next();
			}
		});
	});

	io.on('connection', (client) => {
		const userId = client.userId;

		// если авторизован
		if (userId) {
			// добавляем их в бд
			Socket.add({ userId, type: 'io', clientId: client.id });
		}

		client.on('hello', (message) => {
			console.log(message);
			client.emit('hello', 'Привет от сервера');
		});

		client.on('disconnect', async () => {
			Socket.delete({ clientId: client.id });
		});
	})
}

api.send = async ({ userId, socketType, type, data }) => {
	const sockets = await Socket.getByUserId({ userId, type: socketType });
	for (const item of sockets) {
		const client = _io.sockets.sockets[item.value];
		if (client) {
			client.emit(type, data);
		}
	}
}

module.exports = api;