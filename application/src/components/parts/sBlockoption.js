import Vuex from "vuex"
import Vue from 'vue'
import Axios from 'axios'

Vue.use(Vuex);
const TaskAPI = `http://${window.location.hostname}:3000`;

const store = new Vuex.Store({
    state: {
        state: "dialogues",
        dialogues: [],
        messages: [],
        activeDialogues: [],
        activeDialog: {}
    },
    getters: {
        dialogues: function (state) {
            return state.dialogues;
        },
        state: function (state) {
            return state.state;
        },
        messages: function (state) {
            return state.messages;
        },
    },
    mutations: {
        setDialogues: function (state, dialogues) {
            state.dialogues = dialogues;
        },
        setMessages: function (state, messages) {
            state.messages = messages;
        },
        set: function (state, { type, items }) {
            state[type] = items;
        }
    },
    actions: {
        GetDialogues: function (state) {
            Axios.get(`${TaskAPI}/api/v1/dialogues`)
                .then(({ data }) => {
                    state.commit("set", { type: "dialogues", items: data.dialogues });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        GetMessages: function (state, id) {
            Axios.get(`${TaskAPI}/api/v1/messages`,
                {
                    params: {
                        id_receiver: id,
                    }
                })
                .then(({ data }) => {
                    state.commit("set", { type: "messages", items: data.messages });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        RouteUpdate: function ({ state, dispatch, commit }, { query }) {
            console.log(query);
            if (query.id == undefined) {
                store.commit("set", { type: "state", items: "dialogues" });
                dispatch("GetDialogues");
            }
            else {
                store.commit("set", { type: "state", items: "messages" });
                dispatch("GetMessages", query.id);
            }
        }
    }
});

export default store;