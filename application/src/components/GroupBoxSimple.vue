<script>
export default {
  props: ["options", "value", 'width', 'listWidth'],
  data() {
    return {
      selected: "",
      selectedOption: {},
      isOpen: false
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    select(option) {
      if (!option) {
        return;
      }

      this.selected = option.name;
      this.selectedOption = option;
      this.isOpen = false;
      this.$emit("input", this.selectedOption.id);
    },

    clickOther(event) {
      if (this.isOpen) {
        const divs = event.path;
        const select = this.$refs.select;

        // клик произошел в районе этого элемента
        const isClickOnEl = divs.indexOf(select) >= 0;

        if (isClickOnEl === false) {
          this.isOpen = false;
        }
      }
    }
  },
  mounted() {
    if (this.value) {
      this.select(this.options.find(x => x.id === this.value));
    } else {
      this.select(this.options[0]);
    }
    window.addEventListener("mousedown", this.clickOther);
  },
  destroyed() {
    window.removeEventListener("mousedown", this.clickOther);
  }
};
</script>

<template>
  <div ref="select" class="select">
    <div 
      class="select-el"
      :class="{open: isOpen}"
      @click="isOpen = !isOpen"
      :style="{width: width}"
    >
      <input 
        type="text" 
        class="find" 
        v-model="selected"
        ref="input"
        disabled
      >
      <button 
        class="open"
        ref="button">
        <i class="icon-expand_more"></i>
      </button>
    </div>
    <div 
      class="list" 
      :class="{open: isOpen}"
      :style="{width: listWidth}"
      ref="list">
      <div 
        class="item"
        v-for="(option, key) of options" 
        @click="select(option)" 
        :key="key"
        :class="{
          selected: option === selectedOption
        }"
        >
        <span v-html="option.name"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.select {
  display: inline-block;
}

.select-el {
  border-radius: 2px;
  border: 1px solid $clr-tb-border;
  display: flex;
  box-sizing: border-box;
  cursor: pointer;

  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.find {
  border: none;
  padding: 7px 14px;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background-color: transparent;
  }
}

button.open {
  min-width: 20px;
  padding: 0 7px;
  border: none;
  box-sizing: border-box;
  background-color: transparent;
  font-size: 20px;
  color: $clr-font-grey;
  cursor: pointer;
}

.list {
  display: none;
  position: absolute;
  background-color: white;
  border: 1px solid $clr-tb-border;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-sizing: border-box;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 3px 11px 0px rgba(132, 132, 132, 0.19);

  &.open {
    display: block;
  }

  .item {
    padding: 7px 14px;
    cursor: pointer;

    &:hover,
    &.selected {
      background-color: #e7edf2;
    }

    &.first {
      font-weight: 700;
    }

    &.second {
      padding-left: 30px;
    }

    em {
      font-weight: 700;
      font-style: normal;
      background-color: #e7edf2;
    }
  }

  .not-find {
    padding: 7px 14px;
    background-color: #eee;
  }
}
</style>
