<template>
    <div>
        <button v-on:click="Get">Get</button>
        <button v-on:click="Change">Change</button>
        <app-dialog v-for="dialog in dialogues" :key="dialog.interlocutor.id" :dialog="dialog">
        </app-dialog>
    </div>
</template>

<script>
    import Axios from "axios";
    import Dialog from "./Dialog";
    import Vue from 'vue';

    Vue.component("app-dialog", Dialog);

    const TaskAPI = `http://${window.location.hostname}:3000`;
    export default {
        data: function () {
            return {
                dialogues: []
            };
        },
        methods: {
            Get: function () {
                Axios.get(`${TaskAPI}/api/v1/dialogues`)
                    .then(({ data }) => {
                        this.dialogues = data.dialogues;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            Change: function () {
                var a = this.dialogues.shift(1);
                this.dialogues.push(a);
            }
        }
    };
</script>

<style>
</style>