<script>
export default {
  props: ["taskId"],
  data() {
    return {
      task: {},
      messageText: "",
      price: ""
    };
  },
  computed: {
    taskPrice() {
      let price = "";
      const pFrom = this.task.priceFrom;
      const pBefore = this.task.priceBefore;

      if (pFrom === pBefore) {
        price = `${pFrom}руб`;
      } else {
        price = `от ${pFrom} руб до ${pBefore} руб`;
      }
      return price;
    },

    timeOptionTitle() {
      let title = "";
      const timeStart = this.task.doFrom;
      const timeEnd = this.task.doBefore;

      if (timeStart !== undefined && timeEnd !== undefined) {
        title = "Начать и завершить";
      } else if (timeStart !== undefined && timeEnd === undefined) {
        title = "Начать с";
      } else if (timeStart === undefined && timeEnd !== undefined) {
        title = "Завершить до";
      }
      return title;
    },

    time() {
      let time = "";
      const timeStart = this.task.doFrom;
      const timeEnd = this.task.doBefore;
      const mask = "mmm dd yyyy HH:MM";

      if (timeStart !== undefined && timeEnd !== undefined) {
        time = `
          c <em>
            ${new Date(timeStart).format(mask)}</em> до <em>
            ${new Date(timeEnd).format(mask)}
          </em>
        `;
      } else if (timeStart !== undefined && timeEnd === undefined) {
        time = new Date(timeStart).format(mask);
      } else if (timeStart === undefined && timeEnd !== undefined) {
        time = new Date(timeEnd).format(mask);
      }
      return time;
    }
  },
  created() {
    this.getTask();
  },
  mounted() {},
  methods: {
    async getTask() {
      this.task = await this.$store.dispatch("getTask", {
        taskId: this.taskId
      });
    },

    sendRequest() {
      this.$store.dispatch("sendRequest", {
        taskId: this.taskId,
        messageText: this.messageText,
        price: this.price
      });
    },

    getSymbol(index) {
      const rusSymbolStart = 1040;
      const code = rusSymbolStart + index;
      return String.fromCharCode(code);
    },

    getDate(date) {}
  }
};
</script>

<template>
  <div class="dinamic">
    <div class="dinamic-content">
      <div class="task">
        <div class="task-name">{{task.title}}</div>
        <div class="task-map">
          <gmap-map
            style="width: 100%; height: 100%"
            :center="{lat: task.addresses[0].lat, lng: task.addresses[0].lon}"
            :zoom="7">
            <gmap-marker
              :key="index"
              v-for="(address, index) in task.addresses"
              :position="{lat: address.lat, lng: address.lon}"
            ></gmap-marker>
          </gmap-map>
        </div>
        <div class="task-options">
          <div class="option-row addresses">
            <div class="option-name">Адрес</div>
            <div class="option-description">
              <div 
                class="address-row"
                v-for="(address, index) in task.addresses"
                :key="index">
                <div class="symbol">{{getSymbol(index)}}</div>
                <div class="address">{{address.name}}</div>
              </div>
            </div>
          </div>
          <div class="option-row time">
            <div class="option-name">{{timeOptionTitle}}</div>
            <div class="option-description">
              <span v-html="time"></span>
            </div>
          </div>
          <div class="option-row">
            <div class="option-name">Бюджет</div>
            <div class="option-description">
              {{taskPrice}}
            </div>
          </div>
          <div class="option-row">
            <div class="option-name">Описание</div>
            <div class="option-description">{{task.description}}</div>
          </div>
        </div>
        <div class="task-buttons">
          <div class="user-photo"></div>
          <textarea 
            id="request-text" 
            v-model="messageText" 
            placeholder="Введите короткое сообщение"
          >
          </textarea>
          <input 
            type="text" 
            v-model="price" 
            id="price"
          >
          <button class="request" @click="sendRequest">Подать заявку</button>
        </div>
      </div>
      <div class="comments">
        <div class="comments-top">
          Комментария
        </div>
        <div class="comments-list"></div>
        <div class="write-comment"></div>
      </div>
    </div>

    <div id="options">
      <div class="tab">
        <div class="tab-item active">Задача</div>
        <div class="tab-item">
          Заявки
          <span class="count">6 новых</span>
        </div>
        <div class="tab-item">
          Диалоги с этой задачей
        </div>
      </div>

      <div class="details">
        <div class="details-top">
          Детали
        </div>
        <div class="detail-list">
          <div class="detail">Открыто</div>
          <div class="detail">Открыто</div>
          <div class="detail">Открыто</div>
          <div class="detail">Открыто</div>
          <div class="detail">Открыто</div>
          <div class="detail">Открыто</div>
        </div>
        <div class="detail-buttons">
          <div>
            <span class="go-comments">Перейти к комментариям</span>
          </div>
          <button class="edit-task">Редактировать задачу</button>
          <button class="delete-task">Удалить задачу</button>
        </div>
      </div>

      <div class="customer">
        <div class="customer-top">Заказчик</div>
        <div class="customer-user">
          <div class="user-photo"></div>
          <div class="user-info">
            <div class="user-name">{{task.userCustomer.surname}} {{task.userCustomer.name}}</div>
            <div class="user-age-city">21 лет, Чебоксары</div>
            <div class="ratings">Средний балл: 4.3</div>
            <div class="reviews">Отзывы: 45</div>
          </div>
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

/* .time /deep/ em {
  font-style: normal;
  background-color: #f3f3f3;
  padding: 3px 5px;
  border-radius: 3px;
} */

.dinamic-content {
  width: 550px;
  float: left;

  .task {
    margin-top: 57px;
    margin-bottom: 15px;
    border: 1px solid $clr-box-border;
    background-color: white;
    border-radius: 2px;

    .task-name {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
      font-size: 16px;
    }

    .task-map {
      height: 200px;
    }

    .task-options {
      padding: 15px 20px;

      .option-row {
        padding-bottom: 10px;
        font-size: 13px;
        display: flex;
        line-height: 1.3;

        .option-name {
          color: $clr-font-black;
          width: 100px;
          padding-right: 5px;
          box-sizing: border-box;
          font-weight: 500;

          // перенос слов
          word-wrap: break-word;
        }
        .option-description {
          // перенос слов
          word-wrap: break-word;
          width: 408px;
        }

        &.addresses {
          .address-row {
            display: flex;
            padding-bottom: 5px;

            &:last-child {
              padding-bottom: 0;
            }

            .symbol {
              width: 20px;
              color: $clr-font-grey;
              font-weight: 500;
            }

            .address {
              flex: 1;
            }
          }
        }

        &.time {
          /deep/ em {
            font-style: normal;
            background-color: #f3f3f3;
            padding: 3px 5px;
            border-radius: 3px;
          }
        }
      }
    }

    .task-buttons {
      padding: 15px 20px;
      display: flex;

      .user-photo {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: #7b4545;
      }

      textarea#request-text {
        font-style: "Roboto";
        resize: none;
        flex: 1;
        margin: 0 15px;
      }

      #price {
        margin-right: 15px;
        width: 50px;
        height: 15px;
      }

      .request {
        cursor: pointer;
        background-color: $clr-btn;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: $clr-btn-hover;
        }
      }
    }
  }

  .comments {
    margin-bottom: 15px;
    border: 1px solid $clr-box-border;
    background-color: white;
    border-radius: 2px;
    height: 200px;

    .comments-top {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
    }
  }
}

#options {
  width: 230px;
  margin: 57px 0 0 565px;

  .tab {
    margin-bottom: 15px;
    border: 1px solid $clr-box-border;
    background-color: white;
    border-radius: 2px;
    padding: 10px 0;
    color: $clr-font-blue;

    .tab-item {
      padding: 8px 20px;
      border-left: 2px solid transparent;
      cursor: pointer;

      &.active {
        background-color: #f0f2f5;
        border-left: 2px solid #5181b8;
        color: $clr-font-black;
        font-weight: 500;
      }

      &:hover {
        background-color: #f0f2f5;
      }
    }
  }

  .details {
    margin-bottom: 15px;
    border: 1px solid $clr-box-border;
    background-color: white;
    border-radius: 2px;

    .details-top {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
      background-color: $clr-tab-background;
    }

    .detail-list {
      padding: 15px 20px 5px 20px;

      .detail {
        padding-bottom: 7px;
      }
    }

    .detail-buttons {
      padding: 15px 20px;

      span.go-comments {
        display: block;
        text-align: center;
        color: $clr-font-blue;
        font-weight: 500;
      }

      button.edit-task {
        width: 100%;
        border: none;
        margin-top: 15px;
        border-radius: 3px;
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        background-color: $clr-btn-light;
        color: $clr-btn-font-light;

        &:hover {
          background-color: $clr-btn-hover-light;
        }
      }

      button.delete-task {
        width: 100%;
        border: none;
        margin-top: 5px;
        border-radius: 3px;
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        background-color: #eccfcf;
        color: #7b4545;

        &:hover {
          background-color: #ebc2c2;
        }
      }
    }
  }

  .customer {
    margin-bottom: 15px;
    border: 1px solid $clr-box-border;
    background-color: white;
    border-radius: 2px;

    .customer-top {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
      background-color: $clr-tab-background;
    }

    .customer-user {
      padding: 15px 20px;
      display: flex;

      .user-photo {
        height: 50px;
        width: 50px;
        background-color: #5181b8;
        border-radius: 50%;
      }

      .user-info {
        margin-left: 10px;

        .user-name {
          color: $clr-font-blue;
          font-weight: 500;
        }
      }
    }
  }
}
</style>