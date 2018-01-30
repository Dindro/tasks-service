var crypto = require('crypto'); //Занимается шифрованием
var config = require("../libs/config");
var db = require("./../libs/db");
var ModelRight = require("./right");

async function IsExist(array) { return array.length != 0 }

module.exports = {
    GetByEmail: async (email) => {
        const query = `SELECT * FROM users WHERE email = ?;`;
        const array = [email];
        try {
            var result = await db.GetResults(query, array);
            if (IsExist(result))
                return result[0];
            else
                return undefined;
        } catch (e) {
            throw e;
        }
    },

    GetById: async function (id) {
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
    },

    Authorize: async function (email, password) {
        var query = "SELECT * FROM users WHERE email = ?;";
        var array = [email];
        try {
            var user = await db.GetResults(query, array);
            if (user.length != 0) {
                if (checkPassword(password, user[0].salt, user[0].hashedpassword) == true)
                    return user[0];
                else
                    throw new Error("Не правильный пароль");
            }
            else
                throw new Error("Не правильный логин");
        } catch (e) {
            throw e;
        }
    },

    Registration: async function (email, password, profile) {
        try {
            //Фильтры
            var userFilter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var passFilter = /^[a-zA-Z0-9,!,%,&,@,#,$,\^,*,?,_,~,+]*$/;

            //Если не удовлетворяют фильтру
            if (!userFilter.test(email))
                throw new Error('userError');

            //Если не подходит фильтру и меньше 4 символов
            if ((!passFilter.test(password)) || (password.length < 4))
                throw new Error('passwordError');

            var query = "SELECT * FROM users WHERE email = ?;"
            var array = [email];
            var user = await db.GetResults(query, array);

            if (user.length != 0)
                throw new Error("doubleuser");

            var id_right = await ModelRight.GetIdByName("user");

            var salt = Math.random() + 'salt';
            var query = "INSERT INTO users (email, hashedpassword, salt, surname, name, id_right) VALUES (?,?,?,?,?,?);"
            var array = [email, encryptPassword(password, salt), salt, profile.surname, profile.name, id_right];
            var addedUser = await db.GetResults(query, array);

            return addedUser.insertId;
        } catch (e) {
            throw new Error(e);
        }
    }
}

function encryptPassword(password, salt) {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

//Проверка пароля
function checkPassword(password, salt, hashedPassword) {
    return encryptPassword(password, salt) === hashedPassword;
}