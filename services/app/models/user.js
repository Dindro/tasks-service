var crypto = require('crypto'); //Занимается шифрованием
var db = require("@config/db");
var ModelRight = require("@models/right");

GetByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = ${email};`;
    const array = [email];
    try {
        var result = await db.GetResults(query, array);
        return result[0];
    } catch (e) {
        throw e;
    }
};

GetById = async function (id) {
    var query = "SELECT * FROM users WHERE id = ?;";
    var array = [id];
    try {
        var user = await db.GetResults(query, array);
        if (user.length != 0)
            return user[0];
        else
            throw new Error("Пользователь по id " + id + " не найден");
    } catch (e) {
        throw e;
    }
};

Registration = async function (email, hashedpassword, salt, profile) {
    try {
        var query = "INSERT INTO users (email, hashedpassword, salt, surname, name, id_right) VALUES (?,?,?,?,?,?);"
        var array = [email, hashedpassword, salt, profile.surname, profile.name, profile.id_right];
        var addedUser = await db.GetResults(query, array);
        return addedUser.insertId;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    GetByEmail,
    GetById,
    Registration
}