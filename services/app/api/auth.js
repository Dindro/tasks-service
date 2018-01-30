const crypto = require('crypto'), //Занимается шифрованием
    ModelUser = require('@models/user.js'),
    ModelRight = require('@models/right.js');

let api = {};

api.registration = async (req, res) => {
    const { email, password } = req.body;
    const emailFilter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordFilter = /^[a-zA-Z0-9,!,%,&,@,#,$,\^,*,?,_,~,+]*$/;

    try {
        //Если не удовлетворяют фильтру
        if (!emailFilter.test(email))
            throw new Error('userError');

        //Если не подходит фильтру и меньше 4 символов
        if ((!passwordFilter.test(password)) || (password.length < 4))
            throw new Error('passwordError');

        const user = await ModelUser.GetByEmail(email);
        if (user != undefined) {
            throw new Error('double user');
        }

        const id_right = await ModelRight.GetIdByName("user");
        const salt = Math.random() + 'salt';
        const hashedpassword = encryptPassword(password, salt)
        const insertId = await ModelUser.Registration(email, hashedpassword, salt);
        res.json({insertId});
    } catch (e) {

    }
};

api.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await ModelUser.GetByEmail(email);
        if (user != undefined) {
            if (checkPassword(password, user.salt, user.hashedpassword)) {
                res.json(user);
            }
            else {
                res.status = 301;
                res.json({ error: "Не правильный пароль" });
            }
        }
        else {
            res.status = 301;
            res.json({ error: "Не правильный логин" });
        }
    } catch (e) {

    }
};

module.exports = api;

function encryptPassword(password, salt) {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

//Проверка пароля
function checkPassword(password, salt, hashedPassword) {
    return encryptPassword(password, salt) === hashedPassword;
}