var config = require("../../libs/config");
var db = require("../../libs/db");

module.exports = {
    GetLast: async function (id_dialog, id_user) {
        var m = "SELECT * FROM messages WHERE messages.id_dialog = ?";
        var md = "SELECT * FROM messagesdeleted WHERE messagesdeleted.id_user = ?"
        var query = "SELECT m.* FROM (" + m + ") AS m LEFT JOIN (" + md + ") AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC LIMIT 1;";
        var array = [id_dialog, id_user];
        try {
            var messages = await db.GetResults(query, array);
            if (messages.length != 0)
                return messages[0];
            else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    },

    Create: async function (id_user, id_dialog, msg) {
        var query = "INSERT INTO messages (id_user, id_dialog, text) values (?,?,?);";
        var array = [id_user, id_dialog, msg.text];
        try {
            var result = await db.GetResults(query, array);
            return result.insertId;
        } catch (e) {
            throw e;
        }
    },

    Get: async function (id_dialog, id_user, limitMessages) {
        var query = `
            SELECT m.* FROM 
            (
                SELECT * FROM messages WHERE id_dialog = ?
            ) 
            AS m LEFT JOIN 
            (
                SELECT * FROM messagesdeleted WHERE id_user = ?
            ) 
            AS md ON m.id = md.id_message WHERE md.id_message IS NULL  ORDER BY m.created DESC LIMIT ?;
        `;

        var m = "SELECT * FROM messages WHERE id_dialog = ?";
        var md = "SELECT * FROM messagesdeleted WHERE id_user = ?"
        var query = "SELECT m.* FROM (" + m + ") AS m LEFT JOIN (" + md + ") AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC LIMIT 30;";
        var array = [id_dialog, id_user, limitMessages];
        try {
            var messages = await db.GetResults(query, array);
            return messages;
        } catch (e) {
            throw e;
        }
    },

    GetNext: async function (id_dialog, id_user, startTime, limitMessages) {
        var query = `
            SELECT m.* FROM 
            (
                SELECT * FROM messages WHERE id_dialog = ?
            ) 
            AS m LEFT JOIN 
            (
                SELECT * FROM messagesdeleted WHERE id_user = ?
            ) 
            AS md ON m.id = md.id_message WHERE md.id_message IS NULL AND m.created < ? ORDER BY m.created DESC LIMIT ?;
        `;
        
        var m = "SELECT * FROM messages WHERE id_dialog = ?";
        var md = "SELECT * FROM messagesdeleted WHERE id_user = ?"
        var query = "SELECT m.* FROM (" + m + ") AS m LEFT JOIN (" + md + ") AS md ON m.id = md.id_message WHERE md.id_message IS NULL AND m.created < ? ORDER BY m.created DESC LIMIT ?;";
        var array = [id_dialog, id_user, startTime, limitMessages];
        try {
            var messages = await db.GetResults(query, array);
            return messages;
        } catch (e) {
            throw e;
        }
    },

    UpdateIsRead: async function(id_user, id_dialog){
        var query = "UPDATE messages SET isRead = 1 WHERE isRead = 0 AND id_user != ? AND id_dialog = ?;"
        var array = [id_dialog, id_user, time];
        try {
            var result = await db.GetResults(query, array);
            return result;
        } catch (e) {
            throw e;
        }
    },

    GetAll: async function (id_dialog) {
        var query = "SELECT * FROM messages WHERE id_dialog = ?;";
        var array = [id_dialog];
        try {
            var result = await db.GetResults(query, array);
            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
}