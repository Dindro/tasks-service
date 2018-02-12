const db = require("@config/db");
let models = {};

models.GetFromChat = async function (id_user, id_chat, viewFrom, views, limitMessages) {

    function GetСondition(table) {
        let condition = "";
        for (const view, i of views) {
            condition += `${table} >= ${view.joined} AND ${table} <= ${view.leaved}`;
            if (i != views.length - 1)
                condition += " AND "
        }
        return condition;
    };

    var query = `
        SELECT m.* FROM 
        (
            SELECT m.* FROM 
            (
                SELECT * FROM messages WHERE id_chat = ${id_chat} WHERE messages.created > ${GetFromChat}
            )
            AS m WHERE ${GetСondition("messages.created") /* Получаем условие */}
        ) 
        AS m LEFT JOIN 
        (
            SELECT * FROM messages_deleted WHERE id_user = ${id_user}
        ) 
        AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC LIMIT ${limitMessages};
    `;

    try {
        var messages = await db.GetResults(query);
        return messages;
    } catch (e) {
        throw e;
    }
};

models.GetMessages = async function (id_user, id_chat, limitMessages) {
    let query = `
        SELECT m.* FROM 
        (
            SELECT * FROM messages WHERE id_chat = ?
        ) 
        AS m LEFT JOIN 
        (
            SELECT * FROM messages_deleted WHERE id_user = ?
        ) 
        AS md ON m.id = md.id_message WHERE md.id_message IS NULL ORDER BY m.created DESC LIMIT ?;
    `;
};

models.GetChildMessages = async function (id_message) {
    let query = `
        SELECT m.* FROM 
        (
            SELECT id_child FROM messages_childs WHERE id_message = ?;
        )
        AS c INNER JOIN messages AS m ON c.id_child = m.id ORDER BY m.created DESC;
    `;
}

models.GetImages = async function (id_message) {
    let query = `
        SELECT i.* FROM 
        (
            SELECT id_image FROM messages_images WHERE id_message = ?;
        )
        AS mi INNER JOIN images AS i ON mi.id_image = i.id ORDER BY i.created DESC;
    `;
}

models.GetCoordinates = async function (id_message) {
    let query = `
        SELECT c.* FROM 
        (
            SELECT id_coordinate FROM messages_coordinates WHERE id_message = ?;
        )
        AS mc INNER JOIN coordianates AS c ON mc.id_coordinate = c.id ORDER BY i.created DESC;
    `;
}

models.GetLot = async function (id_message) {
    let query = `
        SELECT * FROM lots WHERE id_message = ?;
    `;
}

module.exports = models;