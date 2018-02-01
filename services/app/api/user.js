const crypto = require('crypto'), //Занимается шифрованием
    ModelUser = require('@models/user.js'),
    ModelRight = require('@models/right.js');

let api = {};

api.Registration = async (req, res) => {
    const { email, password, surname, name } = req.body;

    try {
        if (CheckEmailFilter(email) == false) {
            res.status(400).json({ success: false, message: "Неккоректный email" });
            return;
        }

        if (CheckPasswordFilter(password) == false) {
            res.status(400).json({ success: false, message: "Неккоректный пароль" });
            return;
        }

        const user = await ModelUser.GetByEmail(email);
        if (user != undefined) {
            res.status(400).json({ success: false, message: "Пользователь уже существует" });
            return;
        }

        const id_right = await ModelRight.GetIdByName("user");
        const salt = Math.random() + 'salt';
        const hashedpassword = EncryptPassword(password, salt)
        const insertId = await ModelUser.Registration(email, hashedpassword, salt, { surname, name, id_right });
        res.status(200).json({ success: true, insertId });
    } catch (e) {
        res.status(500).json({ success: false, message: e });
    }
};

api.Auth = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await ModelUser.GetByEmail(email);
        if (user == undefined) {
            res.status(400).json({ success: false, message: "Не правильный логин" });
            return;
        }

        if (CheckPasswordFilter(password, user.salt, user.hashedpassword) == false) {
            res.status(400).json({ success: false, message: "Не правильный пароль" });
            return;
        }
        else {
            req.session.authorized = true;
            req.session.id_user = user.id;
            res.status(200).json({ user });
        }
    }
    catch (e) {
        res.status(500).json({ success: false, message: e });
    }
};



function CheckEmailFilter(email) {
    let emailFilter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailFilter.test(email)
}

function CheckPasswordFilter(password) {
    const passwordFilter = /^[a-zA-Z0-9,!,%,&,@,#,$,\^,*,?,_,~,+]*$/;
    return (passwordFilter.test(password) && password.length > 8);
}

function EncryptPassword(password, salt) {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

//Проверка пароля
function CheckPassword(password, salt, hashedPassword) {
    return EncryptPassword(password, salt) === hashedPassword;
}

module.exports = api;