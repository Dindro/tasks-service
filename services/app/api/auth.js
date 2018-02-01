const crypto = require('crypto'), //Занимается шифрованием
    ModelUser = require('@models/user.js'),
    ModelRight = require('@models/right.js');

let api = {};

api.registration = async (req, res) => {
    const { email, password } = req.body;



    try {
        if (CheckEmailFilter(email) == false) {
            res.status(400).json({ success: false, message: "Неккоректный email" })
            break;
        }

        if (CheckPasswordFilter(password) == false) {
            res.status(400).json({ success: false, message: "Неккоректный пароль" })
            break;
        }

        const user = await ModelUser.GetByEmail(email);
        if (user != undefined) {
            res.status(400).json({ success: false, message: "Пользователь уже существует" })
            break;
        }

        const id_right = await ModelRight.GetIdByName("user");
        const salt = Math.random() + 'salt';
        const hashedpassword = EncryptPassword(password, salt)
        const insertId = await ModelUser.Registration(email, hashedpassword, salt);
        res.status(200).json({ success: true, insertId });
    } catch (e) {
        res.status(500).json(e);
    }
};

api.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await ModelUser.GetByEmail(email);
        if (user != undefined) {
            if (CheckPasswordFilter(password, user.salt, user.hashedpassword)) {
                res.json(user);
            }
            else
                res.status(400).json({ success: false, message: "Не правильный пароль" });
        }
        else
            res.status(400).json({ success: false, message: "Не правильный логин" });
    } catch (e) {

    }
};

module.exports = api;

function CheckEmailFilter(email) {
    const emailFilter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailFilter.test(email)
}

function CheckPasswordFilter(password) {
    const passwordFilter = /^[a-zA-Z0-9,!,%,&,@,#,$,\^,*,?,_,~,+]*$/;
    return (passwordFilter.test(password)) || (password.length < 4)
}

function EncryptPassword(password, salt) {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

//Проверка пароля
function CheckPasswordFilter(password, salt, hashedPassword) {
    return EncryptPassword(password, salt) === hashedPassword;
}