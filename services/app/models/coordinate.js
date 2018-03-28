const db = require("@config/db");
let model = {};

model.Create = async (latitude, longitube, address, priority, title) => {
	let query = `
		INSERT INTO coordinates SET 
		latitude = ${latitude},
		longitube = ${longitube},
		address = ${address}
		priority = ${priority},
		title = ${title};
	`;
};


module.exports = model;