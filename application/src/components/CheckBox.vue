<script>
export default {
  props: ["check"],
  data() {
    return {
      isCheck: this.check
    };
  },
  methods: {
    click() {
      this.isCheck = !this.isCheck;
      this.$emit("input", this.isCheck);
    }
  }
};
</script>


<template>
  <i 
    :class="{
      'icon-check_box': isCheck === true,
      'icon-check_box_outline_blank': isCheck === false
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

