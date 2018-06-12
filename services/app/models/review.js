const db = require("../../config/db");
let model = {};

model.create = async (review) => {
	const query = `
		INSERT INTO review SET 
		taskId = ${review.taskId},
		userId = ${review.userId},
		description = '${review.description}',
		rating1 = ${review.rating1},
		rating2 = ${review.rating2},
		rating3 = ${review.rating3}
	;`;

	try {
		const result = await db.getResult(query);
		return result.insertId;
	} catch (e) {
		throw e;
	}
};

model.getReviews = async ({ userId, type }) => {
	// получить условия
	const getType = () => {
		switch (type) {
			case 'fromCustomer':
				return `userPerformerId = ${userId}`;
				break;
			case 'fromPerformer':
				return `userCustomerId = ${userId}`;
				break;
			default:
				return `userCustomerId = ${userId} OR userPerformerId = ${userId}`;
				break;
		}
	};

	const query = `
		SELECT reviews.* FROM 
		(
			SELECT id FROM tasks 
			WHERE 
			${getType()}
		) AS t
		INNER JOIN 
		reviews 
		ON t.id = reviews.taskId 
		WHERE reviews.userId != ${userId} 
		ORDER BY reviews.created DESC
	;`;

	try {
		const reviews = await db.getResult(query);
		return reviews;
	} catch (e) {
		throw e;
	}
};

model.getCount = async ({ userId, type }) => {
	// получить условия
	const getType = () => {
		switch (type) {
			case 'fromCustomer':
				return `userPerformerId = ${userId}`;
				break;
			case 'fromPerformer':
				return `userCustomerId = ${userId}`;
				break;
			default:
				return `userCustomerId = ${userId} OR userPerformerId = ${userId}`;
				break;
		}
	};

	const query = `
		SELECT COUNT(*) AS count FROM
		(
			SELECT id FROM tasks 
			WHERE 
			${getType()}
		) AS t
		INNER JOIN 
		reviews 
		ON t.id = reviews.taskId 
		WHERE reviews.userId != ${userId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0].count;
	} catch (e) {
		throw e;
	}
};

module.exports = model;