var config = require("../libs/config");
var async = require('async');
var pool = require("./../libs/db");

module.exports = {
    GetCommentsByTaskId: function (id_task) {
        return new Promise(async function (resolve, reject) {
            var query = "SELECT * FROM COMMENTS WHERE ID_TASK = ?;";
            var array = [id_task];
            var comments = await pool.GetResults(query, array);
            return comments;
        });
    },
};