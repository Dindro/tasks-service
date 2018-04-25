<template>
  <div class="blocks">
    <div class="head">
      <div class="head-content">
        Tasks service
        <div class="head-profile">
          <span>Sergey</span>
          <div class="photo">

          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.head {
  width: 100%;
  top: 0;
  background-color: transparent; //$clr-blue;
  position: fixed;
  z-index: 1000;

  .head-content {
    position: relative;
    width: 960px;
    height: 42px;
    color: $clr-font-black;
    margin: 0 auto;
    padding: 0 15px;
    font-size: 20px;
    font-weight: 200;
    padding-top: 20px;
  }

  .head-profile {
    position: absolute;
    right: 35px;
    top: 10px;
    padding: 5px;
    background-color: gainsboro;
    padding-bottom: 0;
    padding-left: 10px;
    border-radius: 30px;

    span {
      position: relative;
      bottom: 11px;
      font-size: 13px;
      font-weight: 500;
      padding-right: 10px;
    }

    .photo {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-color: grey;
      border-radius: 50%;
    }
  }
}
</style>