<script>
export default {
  props: ["options", "placeholder"],
  data() {
    return {
      selected: "",
      selectedOption: {},

      isOpen: false,
      findedOptions: [],
      isFinded: false
    };
  },
  computed: {
    realOption() {
      if (this.isFinded === false) {
        return this.options;
      } else {
        return this.findedOptions;
      }
    }
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    select(option) {
      this.selected = option.name;

      if (this.isFinded === true) {
        const item = this.options.find(x => x.id === option.id);
        this.selectedOption = item;
        this.selected = item.name;
      } else {
        this.selectedOption = option;
        this.selected = option.name;
      }
      this.isOpen = false;
      this.isFinded = false;
      this.$emit("input", this.selectedOption.id);
    },
    input() {
      this.isFinded = true;
      this.isOpen = true;
      const findedWord = this.selected.toLowerCase().trim();
      this.findedOptions = [];

      for (const option of this.options) {
        const pos = option.name.toLowerCase().indexOf(findedWord);
        if (pos >= 0) {
          const name = option.name;
          let array = [];
          array[0] = name.substring(0, pos);
          array[1] = name.substring(pos, pos + findedWord.length);
          array[2] = name.substring(pos + findedWord.length, name.length);

          // установка em
          array[0] = array[0] + "<em>";
          array[2] = "</em>" + array[2];

          // клонируем объект
          const findedOption = Object.assign({}, option);

          // соединяем обрезки слов
          const findedName = array.join("");
          findedOption.name = findedName;
          this.findedOptions.push(findedOption);
        }
      }
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
      :class="{open: isOpen}">
      <input 
        type="text" 
        class="find" 
        v-model="selected"
        @input="input"
        @click="isOpen = true"
        ref="input"
        :placeholder="placeholder">
      <button 
        class="open"
        @click="isOpen = !isOpen"
        ref="button">
        <i class="icon-expand_more"></i>
      </button>
    </div>
    <div 
      class="list" 
      :class="{open: isOpen}"
      ref="list">
      <div v-if="realOption.length === 0" class="not-find">
        Ничего не найдено
      </div>
      <div 
        v-else
        class="item"
        v-for="(option, key) of realOption" 
        @click="select(option)" 
        :key="key"
        :class="{
          first: option.parent ? false : true ,
          second: option.parent ? true : false,
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
  width: 250px;
  display: flex;

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
  width: 250px;
  border-top: none;
  max-height: 250px;
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

    /deep/ em {
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
