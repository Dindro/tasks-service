const db = require("../../config/db");
let model = {};

model.getById = async ({ imageId }) => {
	const query = `
		SELECT * FROM images WHERE id = ${imageId}
	;`;

	try {
		const result = await db.getResult(query);
		return result[0];
	}
	catch (e) {
		throw e;
	}
};

module.exports = model;