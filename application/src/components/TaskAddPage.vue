<script>
import GroupBox from "./GroupBox";
import GroupBoxSimple from "./GroupBoxSimple";
import AddressBox from "./AddressBox";
import CheckBox from "./CheckBox";

export default {
  data() {
    return {
      categories: [],
      selectedCategoryId: "",
      categoryPlaceholder: "Выберите категорию",

      title: "",
      priceFrom: "",
      priceBefore: "",
      description: "",

      addresses: [
        {
          address: ""
        }
      ],

      dateOption: [
        {
          id: 0,
          name: "Указать период"
        },
        {
          id: 1,
          name: "Указать начало"
        },
        {
          id: 2,
          name: "Указать заверешение"
        },
        {
          id: 3,
          name: "Не указывать"
        }
      ],
      selectedDateId: "",
      dateStart: "",
      dateEnd: "",

      phoneNumber: "",
      isComment: true
    };
  },
  components: {
    GroupBox,
    GroupBoxSimple,
    AddressBox,
    CheckBox
  },
  methods: {
    publish() {
      this.$store.dispatch("createTask", {
        categoryId: this.selectedCategoryId,
        title: this.title,
        description: this.description,
        priceFrom: this.priceFrom,
        priceBefore: this.priceBefore,
        addresses: this.addresses,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        phoneNumber: this.phoneNumber,
        isComment: this.isComment
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
              <group-box 
                :options="categories" 
                v-model="selectedCategoryId"
                :placeholder="categoryPlaceholder"></group-box>
            </div>
          </div>
          <div class="option title">
            <div class="option-name">Название задачи</div>
            <div class="option-description">
              <input type="text" id='title' v-model="title" placeholder="Опишите то, что вам нужно">
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
              <textarea v-model="description"></textarea>
            </div>
          </div>
          <div class="option description">
            <div class="option-name">Адрес</div>
            <div class="option-description">
              <address-box 
                v-model="addresses"
                :addresses="addresses"></address-box>
            </div>
          </div>
          <div class="option date">
            <div class="option-name">Дата и время</div>
            <div class="option-description">
              <group-box-simple :options="dateOption" v-model="selectedDateId"></group-box-simple>
            </div>
          </div>
          <div class="option-add date-period" v-if="selectedDateId!==3">
            <div class="option-add-item" v-if="selectedDateId===0 || selectedDateId===1">
              <div class="option-name">Начать с</div>
              <div class="option-description">
                <input type="datetime-local" v-model="dateStart">
              </div>
            </div>
            <div class="option-add-item" v-if="selectedDateId===0 || selectedDateId===2">
              <div class="option-name">Завершить до</div>
              <div class="option-description">
                <input type="datetime-local" v-model="dateEnd">
              </div>
            </div>
          </div>
          <div class="option phone">
            <div class="option-name">Номер телефона</div>
            <div class="option-description">
              <input type="text" id='phone' v-model.number="phoneNumber">
            </div>
          </div>
          <div class="option settings">
            <div class="option-name">Настройки</div>
            <div class="option-description setting-list">
              <div class="setting-row">
                <div class="setting-el">
                  <check-box :check="isComment" v-model="isComment"></check-box>
                </div>
                <div class="setting-description">
                  Могут ли пользователи комментировать задачу?
                </div>
              </div>
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

      .option,
      .option-add {
        padding-bottom: 20px;

        &:last-child {
          padding-bottom: 0;
        }

        .option-name {
          font-weight: 500;
          padding-bottom: 10px;
        }

        .option-description {
          input[type="text"],
          textarea {
            padding: 7px 14px;
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

        &.settings {
          .setting-row {
            display: flex;
            padding-bottom: 10px;

            &:last-child {
              padding-bottom: 0;
            }

            .setting-el {
              input[type="checkbox"] {
                height: 15px;
                width: 15px;
                border: 1px solid $clr-tb-border;
                border-radius: 3px;
              }
            }

            .setting-description {
              flex: 1;
              padding-top: 2px;
              padding-left: 15px;
              line-height: 1.4;
            }
          }
        }
      }

      .option-add {
        display: flex;

        .option-add-item {
          padding-right: 15px;

          .option-name {
            color: $clr-font-grey;
          }

          .option-description {
            input[type="datetime-local"] {
              padding: 5px 10px;
              border: 1px solid $clr-tb-border;
              border-radius: 3px;
              font-family: "Roboto";
              width: 150px;
              color: $clr-font-black;
            }
          }
        }
      }
    }

    .buttons {
      padding: 15px 20px 20px 20px;

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