<script>
export default {
  props: ["options"],
  data() {
    return {
      selected: "",
      isOpen: false,
      findedOptions: []
    };
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
    select(id) {
      this.selected = id;
      this.isOpen = false;
    },
    input() {
      const options = [];
      for (const parent of this.options) {
        if (parent.name.toLowerCase().constain(this.selected));
      }
    },
    isContain(name) {
      let tempWord = "";
      let findPosition = 0;

      for (const letter of this.selected.toLowerCase()) {
        
      }

      for (const letter of name.toLowerCase()) {
        // поиск похожих слов
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="select-el">
      <input type="text" class="find" v-model="selected">
      <button class="open" @click="open"><i class="icon-expand_more"></i></button>
    </div>
    <div class="list" :class="{open: isOpen}">
      <div v-for="(option, key) of 50" @click="select(key)" :key="key">Что то то</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";
.select-el {
  border-radius: 2px;
  border: 1px solid $clr-tb-border;
  width: 200px;
  display: flex;
}

.find {
  border: none;
  padding: 7px 14px;
  box-sizing: border-box;
  width: 100%;
}

button.open {
  min-width: 20px;
  padding: 0 7px;
  border: none;
  box-sizing: border-box;
  background-color: transparent;
  font-size: 20px;
  color: $clr-font-grey;
}

.list {
  display: none;
  position: absolute;
  background-color: white;
  border: 1px solid $clr-tb-border;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  width: 200px;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 8px 20px 0px rgba(138, 138, 138, 0.529);

  &.open {
    display: block;
  }

  > div {
    padding: 3px 14px;
  }
}
</style>
