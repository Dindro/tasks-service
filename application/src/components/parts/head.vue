<template>
    <div class="blocks">
        <div class="head">
			<div class="head-content">Tasks service</div>
		</div>
        <router-view></router-view>
    </div>
</template>

<script>
</script>

<style lang="scss">
.head {
  width: 100%;
  background-color: #4a76a8;
  position: fixed;
  top: 0;
  z-index: 1000;

  & .head-content {
    width: 960px;
    height: 42px;
    color: white;
    margin: 0 auto;
    padding: 0 15px;
  }
}
</style>