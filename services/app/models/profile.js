var config = require("../libs/config");
var async = require('async');
var db = require("./../libs/db");

module.exports = {
    createProfile: function (
        id_user,
        name,
        surname,
        photo,
        city,
        email,
        callback) {
        async.waterfall([
            function (callback) {
                db.getConnection(function (err, connection) {
                    if (err) callback(config.error.connection);
                    connection.query("INSERT INTO PROFILES (ID_USER, NAME, ) VALUES (?,?,?,?,?,?);",
                        [],
                        function (err, results, fields) {
                            connection.release();
                            if (err) callback(config.error.query);
                            callback(null);
                        });
                });
            },
            function () {

            }

        ], function (err) {

        });
    },

    createProfileSync: async function (id_user, profile) {
        var query = "INSERT INTO PROFILES (ID_USER, NAME, ) VALUES (?,?,?,?,?,?);";
        var array = [id_user,];
        var profile = await db.GetResults(query, array);
        return profile.insertId;
    }
};