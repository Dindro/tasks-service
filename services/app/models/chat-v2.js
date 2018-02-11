const db = require("@config/db");
let models = {};

models.GetOption = function(id_user, id_chat){
    let query = `
        SELECT * FROM users_chats WHERE id_user = ? AND id_chat = ?;
    `;
}

module.exports = models;