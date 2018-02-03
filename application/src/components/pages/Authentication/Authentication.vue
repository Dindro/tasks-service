<template>
  <div>
      <button v-on:click="Get">Get</button>
  </div>
</template>

<script>
import Axios from "axios";

const TaskAPI = `http://${window.location.hostname}:3000`;
export default {
  data: function() {
    return {
      info: ""
    };
  },
  methods: {
    Get: function() {
      Axios.get(`${TaskAPI}/api/v1/test`)
        .then(({ data }) => {
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>

</style>

