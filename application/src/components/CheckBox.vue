<script>
export default {
  props: ["check"],
  methods: {
    click() {
      this.$emit("input", !this.check);
    }
  }
};
</script>

<template>
  <i 
    :class="{
      'icon-check_box': check === true,
      'icon-check_box_outline_blank': check === false
    }"
    @click="click">
  </i>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";
i {
  font-size: 20px;
  color: $clr-blue;
  cursor: pointer;
  margin-left: -2px;
}
</style>

