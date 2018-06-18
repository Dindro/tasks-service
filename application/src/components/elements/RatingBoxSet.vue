<script>
export default {
  props: ["value"],
  data() {
    return {
      stars: this.value,
      hoverStars: this.value,
      isHover: false
    };
  },
  methods: {
    getClass(n) {
      let star = this.isHover ? this.hoverStars : this.stars;

      let className = "";
      if (star >= n + 1) {
        className = "star";
      } else {
        className = "star_border";
      }
      return `icon-${className}`;
    },

    setStar(index) {
      index += 1;
      this.stars = index;
      this.$emit("input", index);
    },

    setHover(index) {
      index += 1;
      this.hoverStars = index;
    },

    mouseLeave(e) {
      this.isHover = false;
    },

    mouseOver(e) {
      this.isHover = true;
    }
  }
};
</script>

<template>
  <div class="stars" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <i
      v-for="(n, i) in 5" 
      :key="i"
      :class="getClass(i)"
      @click="setStar(i)"
      @mouseover="setHover(i)"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: inline-block;
}

i {
  font-size: 20px;
  color: #99b0c6;
  cursor: pointer;
}
</style>
