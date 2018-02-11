var mysql = require("mysql");
var config = require("./index").db;

module.exports = {
    GetResults: async function (query, list) {
        try {
            var connection = await GetConnection();
            var results = await ApplyQuery(connection, query, list);
            return results;
        } catch (e) {
            throw e;
        }
    },

    GetResults: async function(query){
        try {
            return await this.GetResults(query, [])
        } catch (e) {
            throw e;
        }
    }
}

var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

function GetConnection() {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) reject(err);
            else resolve(connection);
        });
    });
}

function ApplyQuery(connection, query, list) {
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