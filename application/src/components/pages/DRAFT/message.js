import Vuex from "vuex"
import Vue from 'vue'
import Axios from 'axios'
import io from 'socket.io-client'

//Vue.use(Vuex);
const TaskAPI = `http://${window.location.hostname}:3000`;

const store = new Vuex.Store({
    state: {
        state: "",
        dialogues: [],
        selectedDialog: "",
        messages: []
    },
    getters: {
        messages: function (state) {
            return state.messages;
        },
        dialogues: function (state) {
            return state.dialogues;
        }
    },
    mutations: {
        set: function (state, { type, items }) {
            state[type] = items;
        },
        setAddMessages(state, messages) {
            state.messages.push(messages);
        }
    },
    actions: {
        GetMessages: function ({ state, dispatch, commit }, { id }) {
            let { messages } = GetMessagesFromApi(id);
            commit("setAddMessages", messages);
        },

        RouteUpdate: async function ({ state, dispatch, commit }, { query }) {
            console.log(query);
            if (query.id == undefined) {
                commit("set", { type: "state", items: "dialogues" });
                commit("set", { type: "selectedDialog", items: query.id });
            }
            else {
                commit("set", { type: "state", items: "messages" });
                let { messages } = await GetMessagesFromApi(query.id);
                console.log(messages);
                commit("set", { type: "messages", items: messages });
                commit("set", { type: "selectedDialog", items: query.id });
            }
        },

        GetSocket: function({ state, dispatch, commit }){
            const socket = io(TaskAPI);
            socket.emit("hello", { message: "Привет"});
            socket.on("message", function(data){
                
            });
        }
    }
});

export default store;

function GetMessagesFromApi(id) {
    return new Promise(function(resolve, reject){
        Axios.get(`${TaskAPI}/api/v1/messages`,
            {
                params: {
                    id_receiver: id,
                }
            })
            .then(({ data }) => {
                resolve(data);
            })
            .catch(e => {
                console.log(e);
            });
    })
}

function GetDialogById(dialogues, id) {
    for (const dialog of dialogues)
        if (dialog.user.id == id)
            return dialog;
}