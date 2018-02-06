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
    import store from "@/components/parts/sBlockoption.js"

    export default {
        computed:{
            messages: function(){
                return store.getters.messages;
            }
        },
    };
</script>

<style>
</style>