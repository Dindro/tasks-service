// занимается шифрованием
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const User = require('../models/user.js');
const Favorite = require('../models/favorite');
const Review = require('../models/review');
const Task = require('../models/task');

let api = {};

api.signup = async (req, res) => {
	const { email, password, surname, name, birthday } = req.body;

	if (checkEmailFilter(email) === false) {
		return res.status(400).json({ success: false, message: "Некорректный email" });
	}

	if (checkPasswordFilter(password) === false) {
		return res.status(400).json({ success: false, message: "Некорректный пароль" });
	}

	const user = await User.getByEmail({ email });
	if (user) {
		return res.status(400).json({ success: false, message: "Пользователь с таким email существует" });
	}

	const salt = Math.random() + 'salt';
	const hashedPassword = encryptPassword(password, salt);

	try {
		const userInsertId = await User.registration({
			email,
			hashedPassword,
			salt,
			surname,
			name,
			birthday
		});

		const token = jwt.sign(
			{ id: userInsertId },
			config.jwt.secret,
			{ expiresIn: config.jwt.expires }
		);

		res.status(200).json({ success: true, userInsertId, token });
	} catch (e) {
		console.log(e);
	}
};

api.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.getByEmail({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Пользователя не существует" });
		}

		if (checkPassword(password, user.salt, user.hashedPassword) == false) {
			return res.status(400).json({ success: false, message: "Не корректный пароль" });
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

// получаем пользователя
api.get = async (req, res) => {
	let { userId } = req.query;
	const userAuthId = req.userId;

	// если userId пустой
	if (!userId) {
		// проверим токен
		if (!userAuthId) {
			return res.status(400).json({ success: false, message: "userId не определен" });
		}
		userId = userAuthId;
	}

	userId = parseInt(userId);

	try {
		let user;

		// если пользователь хочет получить себя
		if (userId === userAuthId) {
			// то возвращаем полную информацию
			user = await User.getAuthUserById({ userId });
		}
		else {
			user = await User.getById({ userId });
			
			// узнать пользователя в избранном или нет
			if (user && userAuthId) {
				const favorite = await Favorite.getByUsers({
					userAddedId: userAuthId,
					userAddingId: userId
				});

				user.isFavorite = favorite !== undefined;
			}
		}

		if (!user) {
			return res.json(404).json({ success: false, message: "Пользователя не существует" });
		}

		res.json({ success: true, user });

	} catch (e) {
		console.log(e);
	}
};

// получаем статистику пользователя
api.getStatic = async (req, res) => {
	let { userId } = req.query;

	try {
		const favoritesCountPrm = Favorite.getCount({ userAddedId: userId });
		const reviewsCountPrm = Review.getCount({ userId });
		const tasksSuccessCountPrm = Task.getCountByUserId({ userId, type: 'success' });
		const tasksCreateCountPrm = Task.getCountByUserId({ userId, type: 'create' });

		const favoritesCount = await favoritesCountPrm;
		const reviewsCount = await reviewsCountPrm;
		const tasksSuccessCount = await tasksSuccessCountPrm;
		const tasksCreateCount = await tasksCreateCountPrm;

		res.json({
			success: true, statics: {
				favoritesCount,
				reviewsCount,
				tasksSuccessCount,
				tasksCreateCount
			}
		});
	} catch (e) {
		console.log(e);
	}
};


api.logout = async (req, res) => {
	res.status(200).send({ success: false, token: null });
};

// обновление просмотров
api.updateViews = async (req, res) => {
	let { userId } = req.body;
	const authUserId = req.userId;

	try {
		if (!userId) {
			return res.status(400).json({ success: false, message: 'userId is not defined' })
		}

		userId = parseInt(userId);

		if (userId === authUserId) {
			return res.status(200);
		}

		const user = await User.getById({ userId });
		if (!user) {
			return res.status(400).json({ success: false, message: 'user is not defined' })
		}

		let views = parseInt(user.views);
		views += 1;
		await User.updateViews({ userId, views });

		res.status(200).json({ success: true });
	}
	catch (e) {
		console.log(e);
	}
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