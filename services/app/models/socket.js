var config = require("../libs/config");
var db = require("./../libs/db");
module.exports = {
    Add: async function (id_user, value, type) {
        var query = "INSERT INTO sockets (id_user, type, value) VALUES (?,?,?);";
        var array = [id_user, "io", value];
        var socket = await db.GetResults(query, array);
        return;
    },

    GetByIdUser: async function (id_user) {
        var query = "SELECT * FROM sockets WHERE id_user = ?;";
        var array = [id_user];
        var result = await db.GetResults(query, array);
        return result;
    },

    GetBySocket: async function (socketValue) {
        var query = "SELECT * FROM sockets WHERE value = ?;"
        var array = [socketValue];
        try {
            var result = await db.GetResults(query, array);
            if (result.length != 0)
                return result[0];
            else
                throw new Error("null");
        } catch (e) {
            throw e;
        }
    },

    GetSocketsCount: async function (id_user) {
        var query = "SELECT count(*) count FROM sockets WHERE id_user = ?;"
        var array = [id_user];
        try {
            var result = await db.GetResults(query, array);
            if (result.length != 0)
                return result[0].count;
            else
                throw new Error("null");
            return result;
        } catch (e) {
            throw e;
        }
    },

    GetOnlineByType: async function (id_user, type) {
        //Получаем мои диалоги
        var u_d1 = "SELECT * FROM users_dialogues WHERE id_user = ?";
        //Получаем id людей с кем у меня диалог
        var u = "SELECT u_d2.id_user FROM (" + u_d1 + ") as u_d1 INNER JOIN users_dialogues as u_d2 ON u_d1.id_dialog = u_d2.id_dialog WHERE u_d2.id_user != ?"
        //Узнаем кто онлайн по типу
        var query = "SELECT s.* FROM (" + u + ") as u LEFT JOIN sockets as s ON u.id_user = s.id_user WHERE s.id_user IS NULL AND s.type = ?;"
        var array = [id_user, id_user, type];
        try {
            var result = await db.GetResults(query, array);
            return result;
        } catch (e) {
            throw e;
        }
    },

    Delete: async function (value) {
        var query = "DELETE FROM sockets WHERE value = ?;";
        var array = [value];
        var result = await db.GetResults(query, array);
        return;
    },

    DeleteAll: async function () {
        var query = "DELETE FROM sockets;";
        var array = [];
        var result = await db.GetResults(query, array);
        return;
    }
};