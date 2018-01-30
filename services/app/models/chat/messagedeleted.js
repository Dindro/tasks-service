var config = require("../../libs/config");
var db = require("../../libs/db");

module.exports = {
    Create: async function (id_user, id_dialog) {
        var m = "SELECT * FROM messages WHERE messages.id_dialog = ?";
        var md = "SELECT * FROM messagesdeleted WHERE messagesdeleted.id_user = ?"
        var values = "SELECT m.id id_message, ? id_user FROM (" + m + ") AS m LEFT JOIN (" + md + ") AS md ON m.id = md.id_message WHERE md.id_message IS NULL;";
        var query = "INSERT INTO messagesdeleted "+values+";";
        var array = [id_user, id_dialog, id_user];
        try {
            var result = await db.GetResults(query, array);
            return result;
        } catch (e) {
            throw e;
        }
    },
}