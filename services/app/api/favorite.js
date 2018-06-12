const Favorite = require('../models/favorite');
const User = require('../models/user');

let api = {};

api.add = async (req, res) => {
	const userAuthId = req.userId;
	if (!userAuthId) {
		return res.status(400).json({
			success: false,
			message: 'Вы не авторизировались'
		});
	}

	let userAddingId = req.body.userId;

	if (!userAddingId) {
		return res.status(400).json({
			success: false,
			message: 'userId is not defined'
		});
	}

	userAddingId = parseInt(userAddingId);

	// проверка на добавление самого себя
	if (userAddingId === userAuthId) {
		return res.status(400).json({
			success: false,
			message: 'Нельзя добавлять самого себя'
		});
	}

	try {
		const favorite = await Favorite.getByUsers({
			userAddingId,
			userAddedId: userAuthId
		});

		// если в базе он уже в друзьях
		if (favorite) {
			return res.status(400).json({
				success: false,
				message: 'Пользователь уже состоит в ваших избранных'
			});
		}

		const favoriteInsertId = await Favorite.create({
			userAddingId,
			userAddedId: userAuthId
		});

		res.status(200).json({ favoriteInsertId })
	} catch (error) {
		console.log(error);
	}
};

api.getFavorites = async (req, res) => {

	let {
		userId,
		count
	} = req.query;

	try {
		const favorites = await Favorite.getByUserAddedId({
			userAddedId: userId,
			count
		});

		const favoritesPrms = favorites.map(async (favorite) => {
			favorite.userAdding = await User.getById({ userId: favorite.userAddingId });
		});

		for (const item of favoritesPrms) {
			await item;
		}

		res.status(200).json({ favorites })
	} catch (error) {
		console.log(error);
	}
};

api.getFavoritesCount = async (req, res) => {

	let {
		userId,
	} = req.query;

	try {
		const count = await Favorite.getCount({ userAddedId: userId })

		res.status(200).json({ count })
	} catch (error) {
		console.log(error);
	}
};

module.exports = api;