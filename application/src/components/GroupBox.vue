<script>
import index from "vue";
export default {
  props: [],
  data() {
    return {
      selected: "",
      isOpen: false,
      findedOptions: [],
      options: [
        {
          name: "Клара"
        },
        {
          name: "Клараеда"
        },
        {
          name: "Карл"
        },
        {
          name: "Уклары"
        }
      ]
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
      this.isOpen = true;
      const findedWord = this.selected.toLowerCase();
      this.findedOptions = [];

      for (const option of this.options) {
        const pos = option.name.toLowerCase().indexOf(findedWord);
        console.log(pos);
        if (pos >= 0) {
          this.findedOptions.push(option);
        }
      }
    },
    clickOther(event) {
      if (this.isOpen) {
        const divs = event.path;
        const list = this.$refs.list;
        const button = this.$refs.button;

        // клик произошел в этих элементах
        const isClickInElements =
          divs.indexOf(list) === 1 || divs.indexOf(button) === 1;

        if (isClickInElements === false) {
          this.isOpen = false;
        }
      }
    }
  },
  created() {
    this.findedOptions = this.options;
  },
  mounted() {
    window.addEventListener("mousedown", this.clickOther);
  },
  destroyed() {
    window.removeEventListener("mousedown", this.clickOther);
  }
};
</script>

<template>
  <div>
    <div class="select-el">
      <input 
        type="text" 
        class="find" 
        v-model="selected"
        @input="input">
      <button 
        class="open"
        @click="open"
        ref="button">
        <i class="icon-expand_more"></i>
      </button>
    </div>
    <div 
      class="list" 
      :class="{open: isOpen}"
      ref="list">
      <div v-for="(option, key) of findedOptions" @click="select(key)" :key="key">
        {{option.name}}
      </div>
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
