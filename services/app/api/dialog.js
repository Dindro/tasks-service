var ModelDialogUser = require("@models/chat/dialog_user");
var ModelUser = require("@models/user");
var ModelMessage = require("@models/chat/message");

Get: async (req, res) => {
    if (req.session.authorized == false) {
        res.status(401).json({ success: false, message: "Вы не авторизованы" });
        return;
    }

    const { id_user } = req.session;
    let { startTime, limitDialogues = 15 } = req.body;
    startTime = startTime || false;

    try {
        let dialogues = [];
        let user = ModelUser.GetById(id_user);

        const dialoguesAndMessage = await (async () => {
            if (startTime)
                return await ModelDialogUser.GetDialoguesByTime(id_user, limitDialogues, startTime);
            else
                return await ModelDialogUser.GetDialogues(id_user, limitDialogues);
        })();

        let promises = dialoguesAndMessage.map(async (dialog) => {
            let interlocutor = await ModelUser.GetById(dialog.id_user);
            return ({ dialog, interlocutor });
        });

        for (promise of promises) {
            dialogues.push(await promise);
        }

        dialogues.sort(CompareTime);
        user = await user;

        res.status(200).json({ dialogues, user });
    } catch (e) {
        res.status(500).json({ e });
    }
}

module.exports = {
    Get
}

function CompareTime(dialogA, dialogB) {
    return dialogB.created - dialogA.created;
}