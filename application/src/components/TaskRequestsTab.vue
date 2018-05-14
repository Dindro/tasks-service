<script>
export default {
  props: ["tab"]
};
</script>

<template>
	<div>
		<div class="requests"></div>
	</div>
</template>

<style lang="scss" scoped>
@import "../assets/elements.scss";

.requests {
  @extend %box;
  height: 300px;
  margin-top: 57px;
}
</style>