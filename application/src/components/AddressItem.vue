<script>
import { gmapApi } from "vue2-google-maps";

export default {
  props: ["address"],
  data() {
    return {
      inputAddress: this.address
    };
  },
  computed: {
    google: gmapApi
  },
  methods: {
    emitChange() {
      this.$emit("input", this.inputAddress);
    }
  },
  mounted() {
    const el = this.$refs.address;
    const autocomplete = new this.google.maps.places.Autocomplete(el, {
      types: ["geocode"]
    });
  }
};
</script>


<template>
  <input 
    type="text" 
    class="address" 
    placeholder="Введите адрес"
    v-model="inputAddress"
    @input="emitChange"
    ref="address">
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";

input.address {
  width: 100%;
  box-sizing: border-box;
  padding: 7px 14px;
  border: 1px solid $clr-tb-border;
  border-radius: 3px;
  font-family: "Roboto";
}
</style>

