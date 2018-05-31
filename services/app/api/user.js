// занимается шифрованием
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config');


const User = require('../models/user.js');

let api = {};

api.signup = async (req, res) => {
	const { email, password, surname, name, birthday } = req.body;

	try {
		if (checkEmailFilter(email) === false) {
			res.status(200).json({ success: false, message: "Неккоректный email" });
			return;
		}

		if (checkPasswordFilter(password) === false) {
			res.status(200).json({ success: false, message: "Неккоректный пароль" });
			return;
		}

		const user = await User.getByEmail({ email });
		if (user !== undefined) {
			res.status(200).json({ success: false, message: "Пользователь уже существует" });
			return;
		}

		const salt = Math.random() + 'salt';
		const hashedPassword = encryptPassword(password, salt)
		const insertId = await User.registration({
			email,
			hashedPassword,
			salt,
			surname,
			name,
			birthday
		});

		const token = jwt.sign(
			{ id: insertId },
			config.jwt.secret,
			{ expiresIn: config.jwt.expires }
		)

		res.status(200).json({ success: true, insertId, token });
	} catch (e) {
		res.status(500).json({ success: false, message: e });
	}
};

api.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.getByEmail({ email });
		if (!user) {
			res.status(200).json({ success: false, message: "Не правильный email" });
			return;
		}

		if (checkPassword(password, user.salt, user.hashedPassword) == false) {
			res.status(200).json({ success: false, message: "Не правильный пароль" });
			return;
		}

		// получаем токен
		const token = jwt.sign(
			{ id: user.id },
			config.jwt.secret,
			{ expiresIn: config.jwt.expires }
		);

		delete user.hashedPassword;
		delete user.salt;
		delete user.imageId;

		res.status(200).json({ user, token });
	}
	catch (e) {
		res.status(500).json({ success: false, message: e });
	}
};

api.get = async (req, res) => {
	let userId = parseInt(req.params.userId);

	// 0 - значит нужно получить аккаунт по токену
	if (userId === 0) {
		if (req.userId === undefined) {
			return res.json({ success: false });
		}
		else {
			userId = req.userId;
		}
	}
	const user = await User.getById({ userId });

	res.json({ success: true, user });
};

api.logout = async (req, res) => {
	res.status(200).send({ success: false, token: null });
}

module.exports = api;

function checkEmailFilter(email) {
	let emailFilter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailFilter.test(email)
}

function checkPasswordFilter(password) {
	const passwordFilter = /^[a-zA-Z0-9,!,%,&,@,#,$,\^,*,?,_,~,+]*$/;
	return (passwordFilter.test(password) && password.length > 8);
}

function encryptPassword(password, salt) {
	return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

//Проверка пароля
function checkPassword(password, salt, hashedPassword) {
	return encryptPassword(password, salt) === hashedPassword;
}