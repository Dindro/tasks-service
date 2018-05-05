const mysql = require("mysql");
const config = require("./index").db;

module.exports = {
	async getResults(query) {
		try {
			var connection = await getConnection();
			var results = await applyQuery(connection, query, []);
			return results;
		} catch (e) {
			throw e;
		}
	},

	// GetResults: async function(query){
	//     try {
	//         return await this.getResults(query)
	//     } catch (e) {
	//         throw e;
	//     }
	// }
}

var pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

function getConnection() {
	return new Promise(function (resolve, reject) {
		pool.getConnection(function (err, connection) {
			if (err) reject(err);
			else resolve(connection);
		});
	});
}

function applyQuery(connection, query, list) {
	return new Promise(function (resolve, reject) {
		connection.query(
			query,
			list,
			function (err, results, fields) {
				connection.release();
				if (err) reject(err);
				else resolve(results);
			}
		);
	});
}