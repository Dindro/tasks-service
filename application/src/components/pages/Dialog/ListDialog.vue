<template>
    <div>
        <div class="listdialog">
            <div class="search">
            </div>
            <div class="dialogues">
                <app-dialog v-for="dialog in dialogues" :key="dialog.interlocutor.id" :dialog="dialog">
                </app-dialog>
            </div>
        </div>
    </div>

</template>

<script>
    import Axios from "axios";
    import Dialog from "./Dialog";
    import Vue from "vue";

    Vue.component("app-dialog", Dialog);

    const TaskAPI = `http://${window.location.hostname}:3000`;
    export default {
        props: ["dialogues"],
        data: function () {
            return {

            };
        }
    };
</script>

<style scoped>
    /* .listdialog {
        background-color: white;
        border-radius: 3px;
        border: 1px solid rgb(226, 226, 226);
        width: 550px;
    }

    .search {
        height: 50px;
        background-color: white;
        border-bottom: 1px solid rgb(226, 226, 226);
    } */
</style>