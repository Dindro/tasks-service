<script>
import { gmapApi } from "vue2-google-maps";

export default {
  props: ["address"],
  data() {
    return {
      inputAddress: this.address,
      autocomplete: null,
      lat: null,
      lon: null
    };
  },
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
    // при изменении, данные отправляем вверх
    emitChange() {
      this.$emit("input", this.inputAddress);
    },

    // автозаполнение
    registrationAutocomplete() {
      const el = this.$refs.address;
      this.autocomplete = new this.google.maps.places.Autocomplete(el, {
        types: ["geocode"]
      });

      this.autocomplete.addListener("place_changed", this.onPlaceChanged);
    },

    // при выборе места
    onPlaceChanged() {
      let place = this.autocomplete.getPlace();
      let ac = place.address_components;
      this.lat = place.geometry.location.lat();
      this.lon = place.geometry.location.lng();
      let city = ac[0]["short_name"];

      this.inputAddress = this.$refs.address.value;
      this.emitChange();
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

