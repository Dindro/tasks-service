<template>
  <div class="dialog">
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
    dialog: Object
  }
};
</script>

<style>

</style>

