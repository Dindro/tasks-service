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

<style lang="scss">
$color-background: #f5f5f5;

body {
  @import url('https://fonts.googleapis.com/css?family=Roboto:500');

  // Подключаем иконочный класс с подключением иконочных шрифтов
  @import "./assets/fontStyle.css";

  background-color: $color-background;
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 13px;
}
</style>
