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
	background-color: $color-background;
	margin: 0;
	// font-family: 'Segoe UI';
	font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
	font-size: 13px;
}
</style>
