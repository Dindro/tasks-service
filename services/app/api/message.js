var ModelDialogUser = require("@models/chat/dialog_user");
var ModelDialog = require("@models/chat/dialog");
var ModelMessage = require("@models/chat/message");
var ModelMessageDeleted = require("@models/chat/messagedeleted");
var ModelSocket = require("@models/socket");

let api = {};

api.Get = async (req, res) => {
    if (req.session.authorized == false) {
        res.status(401).json({ success: false, message: "Вы не авторизованы" });
        return;
    }

    const id_sender = req.session.id_user;
    let { id_receiver, startTime, limitMessages } = req.body;
    startTime = startTime || false;
    limitMessages = limitMessages || 30;

    try {
        const commonIdDialog = await ModelDialogUser.GetCommonIdDialog(id_sender, id_receiver);
        const messages = await (async () => {
            if (startTime)
                return await ModelMessage.GetByTime(commonIdDialog, id_sender, startTime, limitMessages);
            else
                return await ModelMessage.Get(commonIdDialog, id_sender, limitMessages);
        })();
        res.status(200).json({ success: true, messages });
    } catch (e) {
        res.status(500).json({ e });
    }
};

api.Post = async (req, res) => {
    if (req.session.authorized == false) {
        res.status(401).json({ success: false, message: "Вы не авторизованы" });
        return;
    }

    const id_sender = req.session.id_user;
    let { id_receiver, text } = req.body;

    try {
        let commonIdDialog = await ModelDialogUser.GetCommonIdDialog(id_user_sender, id_user_receiver);
        if (commonIdDialog == undefined) {
            const insertedIdDialog = await ModelDialog.Create();
            const insertedIdUserSender = ModelDialogUser.Add(insertedIdDialog, id_user_sender);
            const insertedIdUserReceiver = ModelDialogUser.Add(insertedIdDialog, id_user_receiver);
            await Promise.all([insertedIdUserSender, insertedIdUserReceiver]);
            commonIdDialog = insertedIdDialog;
        }
        const insertedIdMessage = await ModelMessage.Create(id_user_sender, id_dialog, msg);
        res.status(200).json({ success: true, insertedIdMessage });
    } catch (e) {
        res.status(500).json({ e });
    }
};

module.exports = api;