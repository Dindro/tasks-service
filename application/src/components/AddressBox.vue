<script>
export default {
  props: ['addresses'],
  data() {
    return {
      rusSymbolStart: 1040,
      rusSymbolCount: 31
    };
  },
  methods: {
    getSymbol(index) {
      const code = this.rusSymbolStart + index;
      return String.fromCharCode(code);
    },

    addAddress() {
      this.addresses.push({ address: "" });
      this.emitChange();
    },

    deleteAddress(index) {
      this.addresses.splice(index, 1);
      this.emitChange();
    },

    emitChange() {
      this.$emit("input", this.addresses);
    }
  }
};
</script>


<template>
  <div class="address-el">
    <div class="address-list">
      <div class="address-item" v-for="(item, i) of addresses" :key="i">
        <div class="symbol">{{ getSymbol(i) }}</div>
        <input 
          type="text" 
          class="address" 
          placeholder="Введите адрес"
          v-model="item.address"
          @input="emitChange">
        <div class="delete" @click="deleteAddress(i)">Удалить</div>
      </div>
    </div>
    <div class="buttons" v-if="addresses.length <= rusSymbolCount">
      <span 
        class="add-address" 
        :class="{ 'not-address': addresses.length === 0 }"
        @click="addAddress">
        <template v-if="addresses.length === 0">Добавить адрес</template>
        <template v-else>Добавить еще один адрес</template>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.address-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  .symbol {
    margin-right: 15px;
    font-weight: 500;
    color: $clr-font-grey;
    min-width: 11px;
  }

  input.address {
    width: 100%;
    box-sizing: border-box;
    padding: 7px 14px;
    border: 1px solid $clr-tb-border;
    border-radius: 3px;
    font-family: "Roboto";
  }

  .delete {
    margin-left: 15px;
    cursor: pointer;
    color: #984e4e;
    font-weight: 500;
  }
}

.buttons {
  .add-address {
    margin-left: 26px;
    cursor: pointer;
    color: $clr-font-blue;
    font-weight: 500;

    &.not-address {
      margin-left: 0;
    }
  }
}
</style>

