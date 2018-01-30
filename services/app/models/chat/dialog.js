var config = require("../../libs/config");
var db = require("../../libs/db");

module.exports = {
    Create: async function () {
        var query = "INSERT INTO dialogues () VALUES ();";
        var array = [];
        try {
            var result = await db.GetResults(query, array);
            return result.insertId;
        } catch (e) {
            throw e;
        }
    }
}