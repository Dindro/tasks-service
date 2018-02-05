<template>
    <div>
        <template v-for="message in messages">
            <p>Отправитель: id{{message.id_user}}</p>
            <p>Отправитель: {{message.text}}</p>
            <p>Отправитель: {{message.created}}</p>
            <hr>
        </template>
        </app-dialog>
    </div>
</template>

<script>
    import Axios from "axios";
    import Vue from 'vue';

    const TaskAPI = `http://${window.location.hostname}:3000`;
    export default {
        data: function () {
            return {
                messages: []
            };
        },
        methods: {
            GetMessages: function () {
                Axios.get(`${TaskAPI}/api/v1/messages`, {
                    params: {
                        id_receiver: this.$route.query.id,
                    }
                })
                    .then(({ data }) => {
                        this.messages = data.messages;
                        this.messages.reverse();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        created: function () {
            this.GetMessages();
        },

        watch:{
            "$route": function(val){
                console.log("Выполняем");
                this.GetMessages();
            }
        }
    };
</script>

<style>
</style>