import Vuex from "vuex"
import Vue from 'vue'
import Axios from 'axios'

Vue.use(Vuex);
const TaskAPI = `http://${window.location.hostname}:3000`;

const store = new Vuex.Store({
    state: {
        dialogues: []
    },
    getters: {
        dialogues: function (state) {
            return state.dialogues;
        }
    },
    mutations: {
        setDialogues: function (state, dialogues) {
            state.dialogues = dialogues;
        }
    },
    actions: {
        GetDialogues: function (state) {
            Axios.get(`${TaskAPI}/api/v1/dialogues`)
                .then(({ data }) => {
                    console.log(data);

                    state.commit("setDialogues", data.dialogues);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
});

export default store;