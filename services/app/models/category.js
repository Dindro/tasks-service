var config = require("../libs/config");
var pool = require("./../libs/db");

module.exports = {
    GetCategoryById: function (id) {
        return new Promise(async function (resolve, reject) {
            var query = "SELECT * FROM CATEGORIES WHERE ID = ?;";
            var array = [id];
            var category = await pool.GetResults(query, array);
            return category;
        });
    },
};