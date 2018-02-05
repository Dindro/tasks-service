<template>
  <div class="dialog" v-on:click="OpenMessages">
    <div class="content">
      <div class="photo"></div>
      <div class="other">
        <div class="name">
          <span>{{dialog.interlocutor.surname}} {{dialog.interlocutor.name}}</span>
        </div>
        <div class="lastmessage">
          <div class="photosender"></div>
          <div class="message">{{dialog.message.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dialog: Object
    },
    data: function () {
      return {

      };
    },
    methods: {
      OpenMessages: function () {
        this.$router.push("/dialogues?id="+this.dialog.interlocutor.id);
      }
    }
  };
</script>

<style scoped>
  .dialog {
    /* border-bottom: 1px solid rgb(226, 226, 226); */
  }

  .dialog:hover{
    background-color: rgb(246, 253, 255);
    cursor: pointer;
  }

  .content {
    padding: 10px 30px;
    display: flex;
  }

  .photo {
    width: 50px;
    height: 50px;
    background-color: cadetblue;
    border-radius: 50%;
  }

  .other {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }

  .photosender {
    width: 25px;
    height: 25px;
    background-color: black;
    border-radius: 50%;
  }

  .lastmessage {
    display: flex;
    align-items: center;
  }

  .message {
    margin-left: 10px;
  }
</style>