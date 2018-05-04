<script>
import GroupBox from "./GroupBox";

export default {
  data() {
    return {
      categories: [],
      selectedCategoryId: "",
      title: "",
      price: "",
      selectedCat: {}
    };
  },
  components: {
    GroupBox
  },
  methods: {
    publish() {
      this.$store.dispatch("createTask", {
        categoryId: this.selectedCategoryId,
        title: this.title,
        price: this.price
      });
    },
    async getCategory() {
      this.categories = await this.$store.dispatch("getCategories");
    }
  },
  created() {
    this.getCategory();
  }
};
</script>

<template>
  <div class="dinamic">
    <div class="dinamic-content">
      <div class="tasks">
        <div class="tasks-tab">
          <span class="tab-name">Добавление задания</span>
        </div>
        <div class="options-list">
          <div class="option category">
            <div class="option-name">Категория</div>
            <div class="option-description">
              <group-box :options="categories" v-model="selectedCategoryId"></group-box>
            </div>
          </div>
          <div class="option title">
            <div class="option-name">Название задачи</div>
            <div class="option-description">
              <input type="text" id='title' v-model="title">
            </div>
          </div>
          <div class="option price">
            <div class="option-name">Цена</div>
            <div class="option-description">
              <input type="text" id='price-from' v-model.number="priceFrom" placeholder="От">
              <span class="tire">—</span>
              <input type="text" id='price-before' v-model.number="priceBefore" placeholder="До">
            </div>
          </div>
          <div class="option description">
            <div class="option-name">Описание</div>
            <div class="option-description">
              <textarea></textarea>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="topublish" @click="publish">Опубликовать задание</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.dinamic {
  float: right;
  width: 795px;
}

.dinamic-content {
  width: 550px;
  float: left;

  .tasks {
    background-color: white;
    margin: 57px 0 15px 0;
    border-radius: 2px;
    border: 1px solid $clr-border;

    .tasks-tab {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
      background-color: $clr-tab-background;
    }

    .options-list {
      padding: 15px 20px;

      .option {
        padding-bottom: 20px;

        &.title {
          input[type="text"] {
            width: 100%;
            box-sizing: border-box;
          }
        }

        &.price {
          input[type="text"] {
            width: 90px;
            box-sizing: border-box;
          }

          .tire {
            padding: 0 5px;
          }
        }

        &.description {
          textarea {
            height: 200px;
          }
        }

        .option-name {
          font-weight: 500;
          padding-bottom: 10px;
        }

        .option-description {
          input[type="text"],
          textarea {
            padding: 5px 10px;
            border: 1px solid $clr-tb-border;
            border-radius: 3px;
            font-family: "Roboto";
          }

          textarea {
            width: 100%;
            box-sizing: border-box;
            resize: none;
          }
        }
      }
    }

    .buttons {
      padding: 15px 20px;

      .topublish {
        cursor: pointer;
        margin: auto;
        background-color: $clr-btn;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 3px;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: $clr-btn-hover;
        }
      }
    }
  }
}
</style>