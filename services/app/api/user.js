const crypto = require('crypto'); //Занимается шифрованием
const ModelUser = require('../models/user.js');
const ModelRight = require('@models/right.js');

let api = {};

api.registration = async (req, res) => {
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

		const user = await ModelUser.getByEmail(email);
		if (user !== undefined) {
			res.status(200).json({ success: false, message: "Пользователь уже существует" });
			return;
		}

		const salt = Math.random() + 'salt';
		const hashedpassword = encryptPassword(password, salt)
		const insertId = await ModelUser.registration({
			email,
			hashedpassword,
			salt,
			surname,
			name,
			birthday
		});
		res.status(200).json({ success: true, insertId });
	} catch (e) {
		res.status(500).json({ success: false, message: e });
	}
};

api.auth = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await ModelUser.getByEmail(email);
		if (user === undefined) {
			res.status(200).json({ success: false, message: "Не правильный email" });
			return;
		}

		if (checkPassword(password, user.salt, user.hashedpassword) == false) {
			res.status(200).json({ success: false, message: "Не правильный пароль" });
			return;
		}
		else {
			req.session.authorized = true;
			req.session.id_user = user.id;

			delete user.hashedpassword;
			delete user.salt;
			delete user.id_image;
			delete user.right;

			res.status(200).json({ user });
		}
	}
	catch (e) {
		res.status(500).json({ success: false, message: e });
	}
};

api.get = async (req, res) => {
	const id = req.session.id_user;
	res.send(id);
};

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