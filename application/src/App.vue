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
@import "./assets/restart.scss";

// подключаем цвета
@import "./assets/colors.scss";

// сброс стилей подсказок адрессов от google place
@import "./assets/googlePlace.scss";

body {
  @import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");

  // подключаем иконочный класс с подключением иконочных шрифтов
  @import "./assets/iconStyle.css";

  background-color: $clr-background;
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  color: $clr-font-black;
}
</style>
