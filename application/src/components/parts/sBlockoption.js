import Vuex from "vuex"
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        dialogues: []
    },
    mutations:{
        setDialogues: function(state, dialogues){
            state.dialogues = dialogues;
        }
    },
    actions:{

    }
});

export default {
    store
}