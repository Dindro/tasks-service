<script>
import GroupBox from "./GroupBox";
import GroupBoxSimple from "./GroupBoxSimple";
import AddressBox from "./AddressBox";
import CheckBox from "./CheckBox";

import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      categories: [],
      selectedCategoryId: "",
      categoryPlaceholder: "Выберите категорию",

      name: "",
      priceFrom: "",
      priceBefore: "",
      description: "",

      addresses: [
        {
          id: 0,
          name: "",
          lat: null,
          lon: null
        },
        {
          id: 1,
          name: "",
          lat: null,
          lon: null
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
      isComment: true,

      error: "",
      isWait: false
    };
  },
  components: {
    GroupBox,
    GroupBoxSimple,
    AddressBox,
    CheckBox
  },
  
  methods: {
    ...mapActions("task", ["createTask", "getCategories"]),

    async publish() {
      if (this.isWait) {
        return;
      }

      this.error = "";
      this.isWait = true;
      const data = await this.createTask({
        categoryId: this.selectedCategoryId,
        name: this.name,
        description: this.description,
        priceFrom: this.priceFrom,
        priceBefore: this.priceBefore,
        addresses: this.addresses,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        phoneNumber: this.phoneNumber,
        isComment: this.isComment
      });

      if (data.success === false) {
        this.error = data.message;
        this.isWait = false;
      } else {
        const { taskId } = data;
        this.$router.push({ name: "taskPage", params: { taskId } });
      }
    },

    async getCategory() {
      this.categories = await this.getCategories();
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
                width = '250px'
                listWidth = '250px'
                placeholder="Выберите категорию">
              </group-box>
            </div>
          </div>
          <div class="option title">
            <div class="option-name">Название задачи</div>
            <div class="option-description">
              <input type="text" id='title' v-model="name" placeholder="Опишите то, что вам нужно">
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
                :addresses="addresses"></address-box>
            </div>
          </div>
          <div class="option date">
            <div class="option-name">Дата и время</div>
            <div class="option-description">
              <group-box-simple 
                :options="dateOption" 
                v-model="selectedDateId"
                width="200px"
                listWidth="200px" ></group-box-simple>
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
          <button 
            class="topublish"
            :class="{ wait: isWait === true }" 
            @click="publish">
            Опубликовать задание
          </button>
          <div class="error" v-if="error !== ''">
            <strong>Ошибка:</strong> {{error}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";
@import "../assets/elements.scss";

.dinamic {
  float: right;
  width: 795px;
}

.dinamic-content {
  width: 550px;
  float: left;

  .tasks {
    @extend %box;
    
    margin: 57px 0 15px 0;

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
              width: 180px;
              color: $clr-font-black;
            }
          }
        }
      }
    }

    .buttons {
      padding: 15px 20px 20px 20px;
      display: flex;
      align-items: flex-start;

      .topublish {
        cursor: pointer;
        background-color: $clr-btn;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 3px;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: $clr-btn-hover;
        }

        &.wait {
          background-color: #7e7e7e;

          &:hover {
            background-color: #7e7e7e;
          }
        }
      }

      .error {
        @extend %request-status-canceled;
        flex: 1;
        margin-left: 10px;
        border-radius: 3px;
        padding: 8px 10px;
      }
    }
  }
}
</style>