var ModelDialogUser = require("@models/chat/dialog_user");
var ModelDialog = require("@models/chat/dialog");
var ModelMessage = require("@models/chat/message");
var ModelMessageDeleted = require("@models/chat/messagedeleted");
var ModelSocket = require("@models/socket");

module.exports = {
    Get: async (req, res) => {
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
    }
}