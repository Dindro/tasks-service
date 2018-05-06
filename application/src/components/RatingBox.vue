<script>
export default {
  props: ["ratingCount"],
  methods: {
    getClass(n) {
      let className = "";
      if (this.ratingCount > n && this.ratingCount >= n + 1) {
        className = "star";
      } else if (this.ratingCount > n && this.ratingCount < n + 1) {
        className = "star_half";
      } else {
        className = "star_border";
      }
      return `icon-${className}`;
    }
  }
};
</script>

<template>
  <div class="stars">
    <i
      v-for="(n, i) in 5" 
      :key="i"
      :class="getClass(i)"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
i {
  font-size: 20px;
  color: #99B0C6;
}
</style>
