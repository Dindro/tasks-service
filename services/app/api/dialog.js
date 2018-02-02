const ModelDialogUser = require("@models/chat/dialog_user"),
    ModelUser = require("@models/user"),
    ModelMessage = require("@models/chat/message");

let api = {};

api.Get = async (req, res) => {
    if (req.session.authorized == false) {
        res.status(401).json({ success: false, message: "Вы не авторизованы" });
        return;
    }

    const { id_user } = req.session;
    let { startTime, limitDialogues } = req.query;
    startTime = startTime || false;
    limitDialogues = Number(limitDialogues) || 15;

    try {
        let dialogues = [];
        let user = ModelUser.GetById(id_user);

        const lastMessages = await (async () => {
            if (startTime)
                return await ModelDialogUser.GetDialoguesByTime(id_user, limitDialogues, startTime);
            else
                return await ModelDialogUser.GetDialogues(id_user, limitDialogues);
        })();

        let promises = lastMessages.map(async (message) => {
            let interlocutor = await ModelUser.GetById(message.id_user_interlocutor);
            delete message.id_user_interlocutor;
            return ({ message, interlocutor });
        });

        for (promise of promises) {
            dialogues.push(await promise);
        }

        dialogues.sort(CompareTime);
        user = await user;

        res.status(200).json({ success: true, dialogues, user });
    } catch (e) {
        res.status(500).json({ e });
    }
};

api.Post = async (req, res) => {
    if (req.session.authorized == false) {
        res.status(401).json({ success: false, message: "Вы не авторизованы" });
        return;
    }
};

module.exports = api;

function CompareTime(dialogA, dialogB) {
    return dialogB.message.created - dialogA.message.created;
}