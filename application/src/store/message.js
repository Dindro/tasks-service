import Vuex from "vuex"
import Vue from 'vue'
import Axios from 'axios'

Vue.use(Vuex);
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
            store.commit("setAddMessages", messages);
        },

        RouteUpdate: function ({ state, dispatch, commit }, { query }) {
            if (query.id == undefined) {
                store.commit("set", { type: "state", items: "dialogues" });
                store.commit("set", { type: "selectedDialog", items: query.id });
            }
            else {
                store.commit("set", { type: "state", items: "messages" });
                let { messages } = GetMessagesFromApi(query.id);
                store.commit("set", { type: "messages", items: messages });
                store.commit("set", { type: "selectedDialog", items: query.id });
            }
        }
    }
});

export default store;

function GetMessagesFromApi(id) {
    Axios.get(`${TaskAPI}/api/v1/messages`,
        {
            params: {
                id_receiver: id,
            }
        })
        .then(({ data }) => {
            return data;
        })
        .catch(e => {
            console.log(e);
        });
}

function GetDialogById(dialogues, id) {
    for (const dialog of dialogues)
        if (dialog.user.id == id)
            return dialog;
}