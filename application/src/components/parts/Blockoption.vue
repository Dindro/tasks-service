<template>
    <div class="block">
        <div class="content">
            <app-list-message v-if="state='messages'" ></app-list-message>
            <app-list-dialog v-else="state='dialogues'" v-bind:dialogues="dialogues"></app-list-dialog>
        </div>
        <div class="menuright">
            <div class="menu">
                <div class="list">
                    <router-link class="active" to="/dialogues">Все сообщения</router-link>
                    <router-link to="/dialogues">Непрочитанные</router-link>
                    <router-link to="/dialogues">Важные сообщения</router-link>
                    <div class="hr" v-if="activeDialogues.length>0"></div>
                    <template v-for="dialog in activeDialogues">
                        <router-link :to="{name: 'Message', params:{id: dialog.interlocutor.id}}">
                            {{dialog.interlocutor.surname}} {{dialog.interlocutor.name}}
                        </router-link>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    import Axios from "axios"

    import sBlockoption from "./sBlockoption.js"

    import ListDialog from '@/components/pages/Dialog/ListDialog'
    import ListMessage from '@/components/pages/Message/ListMessage'
    Vue.component("app-list-dialog", ListDialog);
    Vue.component("app-list-message", ListMessage);

    const TaskAPI = `http://${window.location.hostname}:3000`;
    export default {
        props: ["id"],
        data: function () {
            return {
                dialogues: [],
                activeDialogues: [],
                state: ""
            }
        },
        methods: {

        },
        created: function () {
            console.log(this.id);
            if (this.id == undefined) {
                this.state = "dialogues";
                Axios.get(`${TaskAPI}/api/v1/dialogues`)
                    .then(({ data }) => {
                        store.commit("setDialogues", data.dialogues);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            else {
                this.state = "messages";
            }
        },
    }
</script>

<style scoped>
    .block {
        display: flex;
        align-items: flex-start;
    }

    .content {
        width: 550px;
        border: 1px solid rgb(224, 224, 224);
        border-radius: 3px;
    }

    .menuright {
        width: 245px;
    }

    .menu {
        width: 230px;
        float: right;
        background-color: white;
        border: 1px solid rgb(224, 224, 224);
        border-radius: 3px;
    }

    .list {
        margin: 7px 0;
    }

    .list a {
        display: block;
        color: rgb(42, 88, 133);
        text-decoration: none;
        font-family: "Roboto";
        font-size: 13px;
        padding: 10px 5px 10px 20px;
    }

    .list a:hover {
        background-color: rgb(240, 242, 245);
    }

    .list a.active {
        border-left: 2px solid rgb(81, 129, 184);
        background-color: rgb(240, 242, 245);
        padding-left: 18px;
        color: black;
    }

    .hr {
        margin: 5px 15px;
        height: 1px;
        background-color: rgb(224, 224, 224);
    }
</style>