<script>
import { gmapApi } from "vue2-google-maps";

export default {
  props: ["address"],
  computed: {
    google: gmapApi
  },
  watch: {
    // после того как объект не будет null, то регистрируем
    google() {
      this.registrationAutocomplete();
    }
  },
  methods: {
    // автозаполнение
    registrationAutocomplete() {
      const el = this.$refs.address;
      this.autocomplete = new this.google.maps.places.Autocomplete(el, {
        types: ["geocode"]
      });

      // прописываем событие при выборе адреса
      this.autocomplete.addListener("place_changed", this.onPlaceChanged);
    },

    // при выборе места
    onPlaceChanged() {
      let place = this.autocomplete.getPlace();

      if ("geometry" in place === false) return;
      this.address.lat = place.geometry.location.lat();
      this.address.lon = place.geometry.location.lng();

      // с google place реактивность не работает, поэтому так
      this.address.name = this.$refs.address.value;
    }
  },
  mounted() {
    // если объект есть то добавляем автозаполнение
    if (this.google !== null) {
      this.registrationAutocomplete();
    }
  }
};
</script>


<template>
  <input 
    type="text" 
    class="address" 
    placeholder="Введите полный адрес"
    v-model="address.name"
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

