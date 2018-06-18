const db = require("../../config/db")
const Image = require('./image');
const Review = require('./review');
let model = {};

model.getByEmail = async ({ email }) => {
	const query = `SELECT * FROM users WHERE email = '${email}';`;
	try {
		const result = await db.getResult(query);
		let user = result[0];
		if (user) {

			// получаем изображения
			const image = await Image.getById({ imageId: user.imageId });
			if (image) {
				user.image = image.path;
			}
		}
		return user;
	} catch (e) {
		throw e;
	}
};

model.getById = async function ({ userId }) {
	const query = `SELECT * FROM users WHERE id = ${userId};`;
	try {
		const result = await db.getResult(query);
		let user = result[0];
		if (user) {

			// получаем изображения
			const image = await Image.getById({ imageId: user.imageId });
			if (image) {
				user.image = image.path;
			}

			user.reviewsCount = await Review.getCount({ userId: user.id });
			user.rating = ((user.rating1 + user.rating2 + user.rating3) / 3).toFixed(1);

			if (user.birthday) {
				user.age = new Date().getFullYear() - new Date(user.birthday).getFullYear();
			}

			delete user.email;
			delete user.hashedPassword;
			delete user.salt;
			delete user.phone;
			delete user.about;
			delete user.right;
		}
		return user;
	} catch (e) {
		throw e;
	}
};

// получить авторизированного пользователя
model.getAuthUserById = async function ({ userId }) {
	const query = `SELECT * FROM users WHERE id = ${userId};`;
	try {
		const result = await db.getResult(query);
		let user = result[0];
		if (user) {
			const image = await Image.getById({ imageId: user.imageId });
			if (image) {
				user.image = image.path;
			}

			delete user.hashedPassword;
			delete user.salt;
		}
		return user;
	} catch (e) {
		throw e;
	}
};

model.getFullById = async function ({ userId }) {
	const query = `SELECT * FROM users WHERE id = ${userId};`;
	try {
		const result = await db.getResult(query);
		let user = result[0];
		if (user) {
			const image = await Image.getById({ imageId: user.imageId });
			if (image) {
				user.image = image.path;
			}
		}
		return user;
	} catch (e) {
		throw e;
	}
};

model.registration = async (user) => {
	const query = `
		INSERT INTO users SET 
		email = '${user.email}',
		hashedPassword = '${user.hashedPassword}',
		salt = '${user.salt}',
		name = '${user.name}',
		surname = '${user.surname}',
		birthday = '${user.birthday}';`;
	try {
		const user = await db.getResult(query);
		return user.insertId;
	} catch (e) {
		throw e;
	}
};

model.updateViews = async ({ userId, views }) => {
	const query = `
		UPDATE users SET 
		views = ${views} 
		WHERE 
		id = ${userId};
	`;
	try {
		const result = await db.getResult(query);
		return result;
	} catch (e) {
		throw e;
	}
};

// подсчитываем рейтинг
model.updateRatings = async ({ userId }) => {
	let rating1 = 0;
	let rating2 = 0;
	let rating3 = 0;
	const reviews = await Review.getReviews({ userId });
	for (const item of reviews) {
		rating1 += item.rating1;
		rating2 += item.rating2;
		rating3 += item.rating3;
	}

	const count = reviews.length;
	if (count !== 0) {
		rating1 = rating1 / count;
		rating2 = rating2 / count;
		rating3 = rating3 / count;
	}

	const query = `
		UPDATE users SET 
		rating1 = ${rating1},
		rating2 = ${rating2},
		rating3 = ${rating3}
		WHERE 
		id = ${userId};
	`;
	try {
		const result = await db.getResult(query);
		return result;
	} catch (e) {
		throw e;
	}
};

module.exports = model;