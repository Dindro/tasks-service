<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html, body{
  height: 100%;
}
body {
  margin: 0;
  font-family: "Roboto";
  font-size: 13px;
  display: flex;
}

#app{
  flex: 1;
  display: flex;
}
</style>
