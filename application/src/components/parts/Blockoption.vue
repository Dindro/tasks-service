<template>
    <div class="block">
        <div class="content">
            <app-list-message v-if="state=='messages'"></app-list-message>
            <app-list-dialog v-else-if="state=='dialogues'" v-bind:dialogues="dialogues"></app-list-dialog>
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
    import store from "./sBlockoption.js"

    import ListDialog from '@/components/pages/Dialog/ListDialog'
    import ListMessage from '@/components/pages/Message/ListMessage'

    console.log("ЫЫЫ");

    export default {
        props: ["id"],
        components: {
            "app-list-dialog": ListDialog,
            "app-list-message": ListMessage
        },
        data: function () {
            return {
                activeDialogues: [],
                state: ""
            }
        },
        methods: {

        },
        computed: {
            dialogues: function () {
                return store.getters.dialogues;
            }
        },
        created: function () {
            this.state = "dialogues";
            store.dispatch("GetDialogues");
            /* Axios.get(`${TaskAPI}/api/v1/dialogues`)
                .then(({ data }) => {
                    console.log(sBlockoption);
                    sBlockoption.commit("setDialogues", data.dialogues);
                })
                .catch(e => {
                    console.log(e);
                }); */
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