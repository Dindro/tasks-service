var config = require("../libs/config");
var db = require("./../libs/db");

module.exports = {
    CreateDialog: async function (id_user, profile) {
        var query = "INSERT INTO PROFILES (ID_USER, NAME, ) VALUES (?,?,?,?,?,?);";
        var array = [id_user,];
        var profile = await db.GetResults(query, array);
        return profile.insertId;
    }
};