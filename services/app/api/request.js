const Task = require("../models/task");
const Request = require("../models/request");

let api = {};

api.create = async (req, res) => {
	const { userId } = req;
	const { taskId, messageText, price } = req.body;

	try {
		const requestInsertId = await Request.create({
			userId,
			taskId,
			messageText,
			price
		});
		res.status(200).send({ requestInsertId });
	} catch (e) {
		console.log(e);
	}

};

module.exports = api;