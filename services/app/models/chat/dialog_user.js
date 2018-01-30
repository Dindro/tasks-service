var config = require("../../libs/config");
var db = require("../../libs/db");

module.exports = {

    GetDialoguesByTime: async function (id_user, count, time) {
        var ud2 = "SELECT * FROM users_dialogues WHERE users_dialogues.id_user = ?";
        var d = "SELECT ud1.id_dialog FROM users_dialogues AS ud1 INNER JOIN (" + ud2 + ") AS ud2 ON ud1.id_dialog = ud2.id_dialog WHERE ud1.id_user != ?";
        var m = "SELECT m.* FROM (" + d + ") AS d INNER JOIN messages AS m ON d.id_dialog = m.id_dialog";
        var mlimit = "SELECT DISTINCT m.id_dialog, m.id, m.text, m.created, m.isRead FROM (" + m + ") AS m LEFT JOIN messagesdeleted AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC";
        var query = "SELECT * FROM (" + mlimit + ") AS mlimit WHERE mlimit.created < ? LIMIT ?;";
        var array = [id_user, id_user, time, count];
        try {
            var dialogues = await db.GetResults(query, array);
            return dialogues
        } catch (e) {
            throw e;
        }
    },

    GetDialogues_alpha: async function (id_user, count) {
        var ud2 = "SELECT * FROM users_dialogues WHERE users_dialogues.id_user = ?";
        var d = "SELECT ud1.id_dialog FROM users_dialogues AS ud1 INNER JOIN (" + ud2 + ") AS ud2 ON ud1.id_dialog = ud2.id_dialog WHERE ud1.id_user != ?";
        var m = "SELECT m.* FROM (" + d + ") AS d INNER JOIN messages AS m ON d.id_dialog = m.id_dialog";
        var mlimit = "SELECT DISTINCT m.id_dialog, m.id, m.text, m.created, m.isRead FROM (" + m + ") AS m LEFT JOIN messagesdeleted AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC";
        var query = "SELECT * FROM (" + mlimit + ") AS mlimit LIMIT ?;";
        var array = [id_user, id_user, count];
        try {
            var dialogues = await db.GetResults(query, array);
            return dialogues
        } catch (e) {
            throw e;
        }
    },

    GetDialogues: async function (id_user, count) {
        var ud2 = "SELECT * FROM users_dialogues WHERE users_dialogues.id_user = ?";
        var query = "SELECT ud1.* FROM users_dialogues AS ud1 INNER JOIN (" + ud2 + ") AS ud2 ON ud1.id_dialog = ud2.id_dialog WHERE ud1.id_user != ?";
        var array = [id_user, id_user];
        try {
            var dialogues = await db.GetResults(query, array);
            return dialogues;
        } catch (e) {
            throw e;
        }
    },

    GetUserByIdDialog: async function (id_dialog, id_user) {
        var query = "SELECT id_dialog FROM dialogues_users WHERE id_dialog = ? AND id_user != ?;";
        var array = [id_dialog, id_user];
        try {
            var user = await db.GetResults(query, array);
            if (user.length != 0)
                return user[0].id_user;
            else
                throw new Error("Пользователь в диалоге №" + id_dialog + " не найден");
        } catch (e) {
            throw e;
        }
    },

    GetUsersByIdDialog: async function (id_dialog) {
        var du = "SELECT * FROM dialogues_users WHERE id_dialog = ?";
        var query = "SELECT du.id_dialog, users.* FROM (" + du + ") AS du INNER JOIN users ON du.id_user = users.id;"
        /* var query = "SELECT * FROM dialogues_users WHERE id_dialog = ?;"; */
        var array = [id_dialog];
        try {
            var result = await db.GetResults(query, array);
            return result;
        } catch (e) {
            throw new Error(e);
        }
    },

    GetCommonIdDialog: async function (id_user_sender, id_user_receiver) {
        var query = "SELECT ud1.id_dialog FROM users_dialogues AS ud1 INNER JOIN users_dialogues as ud2 ON ud1.id_dialog = ud2.id_dialog WHERE ud1.id_user = ? AND ud2.id_user = ?";
        var array = [id_user_sender, id_user_receiver];
        try {
            var result = await db.GetResults(query, array);
            if (result.length != 0)
                return result[0].id_dialog;
            else
                return null;
        } catch (e) {
            throw e;
        }
    },

    Add: async function (id_dialog, id_user) {
        var query = "INSERT INTO users_dialogues (id_dialog, id_user) VALUES (?,?);";
        var array = [id_dialog, id_user];
        try {
            var result = await db.GetResults(query, array);
            return;
        } catch (e) {
            throw e;
        }
    }
}