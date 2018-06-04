var config = require("../../libs/config");
var db = require("../../libs/db");

var ModelDialogUser = require("./dialog_user");
var ModelMessage = require("./message");
var ModelUser = require("../user");
var ModelDialog = require("./dialog");
var ModelMessageDeleted = require("./messagedeleted");
var ModelRequest = require("../request");

async function Send() {
    var msg;

    var id_user_sender;
    var id_user_receiver;

    //Проверка на совместный диалог
    var id_dialog = await ModelDialogUser.GetCommonIdDialog(id_user_sender, id_user_receiver);
    //Если диалога нет
    if (id_dialog.lenght == 0) {
        var insertedIdDialog = await ModelDialog.Create(); //Создаем диалог

        //Добавляем пользователей в диалог
        var insertedIdUserSender = ModelDialogUser.Add(insertedIdDialog, id_user_sender);
        var insertedIdUserReceiver = ModelDialogUser.Add(insertedIdDialog, id_user_receiver);
        await insertedIdUserSender, await insertedIdUserReceiver;
        id_dialog = insertedIdDialog;
    }

    var insertedIdMessage = ModelMessage.Create(msg); //Создаем сообщение
    await insertedIdMessage;

    res.json({ id_message: insertedIdMessage });
}

async function Get() {

    var id_dialog;
    var id_user; //для кого нужен смс

    var messages = ModelMessage.Get(id_dialog, id_user); //Получаем сообщения

    var usersDialog = ModelDialogUser.GetUsersByIdDialog(id_dialog); //Получаем пользователей диалога
    var usersDialogPromises = usersDialog.map(async function (userDialog) {
        userDialog = await ModelUser.GetById(userDialog.id_user); //Получем данные о пользователе
    });

    await Promise.all(usersDialogPromises);
    await messages;

    res.json({ usersDialog: usersDialog, messages: messages });
}

async function GetStart(id_user) {

    var user = ModelUser.GetById(id_user); //Получить данные пользователя
    //Получаем все диалоги с связанный с этим id
    var usersDialogues = await ModelDialogUser.GetDialoguesByIdUser(id_user);
    var arrayDialogues = [];

    var usersDialoguesPromises = usersDialogues.map(async function (userDialog) {

        async function GetInterlocutor(id_dialog) {
            let id_user_interlocutor = await ModelDialogUser.GetUserByIdDialog(id_dialog);
            let userInterlocutor = await ModelUser.GetById(id_user_interlocutor);
            return userInterlocutor;
        }

        var userInterlocutor = GetInterlocutor(userDialog.id_dialog); //Получить собеседника
        var lastMessage = ModelMessage.GetLast(userDialog.id_dialog); //Получить последний смс

        await userInterlocutor; //Собеседник
        await lastMessage; //Последний смс
        return ({ userInterlocutor: userInterlocutor, lastMessage: lastMessage });
    });

    for (userDialogPromise of usersDialoguesPromises) {
        let dialogItem = await userDialogPromise; //Получем собеседника и последний смс
        arrayDialogues.push(dialogItem); //Добавляем в массив
    }

    arrayDialogues.sort(); //Нужно отсортировать по дате
    await user; //Ждем получение данных пользователя
    res.send("index", { arrayDialogues: arrayDialogues, user: user });
}

async function DeleteDialog() {
    var id_dialog;
    var id_user;

    //Получить все не скрытые сообщения
    var messagesViews;

    var messagesViewsPromises = messagesViews.map(async function (messageView){
        await ModelMessageDeleted.Create(id_user, id_dialog); //Скрываем сообщение
    });
    await Promise.all(messagesViewsPromises);
    res.json({ status: "ok" });
}

async function GroupDialogCreate() {
    var id_task;
    var id_user_creator;

    var requests = ModelRequest.GetByIdTask(id_task); //Получем заявки по задаче
    var insertedIdDialog = ModelDialog.Create(id_task, id_user_creator); //Создаем диалог привязанный id_task
    await requests, await insertedIdDialog;

    var requestsPromises = requests.map(async function (request) {
        await ModelDialogUser.Add(insertedIdDialog, request.id_user); //Добавляем пользователя в диалог
    });
    await Promise.all(requestsPromises); //Выполняем обещаие по добавлению всех пользователей в диалог

    res.json({ status: "ok" });
}

//Исполнитель хочет зайти в беседу
async function AddInGroupDialog() {
    //----Error--- нужно добавить проверку
    var id_user;
    var id_dialog;

    var insertedIdUserDialog = ModelDialogUser.Add(id_dialog, id_user); //Добавляем пользователя в диалог
    await insertedIdUserDialog;
    /* var messages = ModelMessage.GetAll(id_dialog); //Получем все сообщения диалога
    await messages;

    var messagesPromises = messages.map(async function (message) {
        await ModelMessageDeleted.Create(message.id, insertedIdUserDialog); //Создаем вид для сообщения
    }); */
    await Promise.all(messagesPromises);
}