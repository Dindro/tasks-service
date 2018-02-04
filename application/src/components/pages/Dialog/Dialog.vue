<template>
  <div class="dialog">
    <router-link v-bind:to="{name: 'Message', params: { id:dialog.interlocutor.id}}">Открыть переписки</router-link>
    <p>ID сообщения {{dialog.message.id}}</p>
    <p>ID диалога {{dialog.message.id_dialog}}</p>
    <p>Имя: {{dialog.interlocutor.name}} {{dialog.interlocutor.surname}}</p>
    <p>Последнее сообщение: {{dialog.message.text}}</p>
    <p>Прочитано {{dialog.message.isRead}}</p>
    <p>Дата {{dialog.message.created}}</p>
    <hr>
  </div>
</template>

<script>
  export default {
    props: {
      dialog: Object,
    },
    data: function () {
      return {
        d: 3
      }
    }
  };
</script>

<style>
</style>