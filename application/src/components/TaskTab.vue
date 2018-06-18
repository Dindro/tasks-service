<script>
import RatingBoxSet from "./elements/RatingBoxSet";
import RatingBox from "./elements/RatingBox";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  props: ["task"],
  data() {
    return {
      tab: "",
      message: "",
      price: "",
      requestSended: false,
      comment: "",

      description: "",
      rating1: 0,
      rating2: 0,
      rating3: 0,
      reviewSended: false
    };
  },

  components: {
    RatingBoxSet,
    RatingBox
  },

  computed: {
    ...mapGetters(["userAuth", "isLogged"]),
    ...mapState("task", ["task", "comments"]),

    // это задание пользователя
    isMyPage() {
      if (this.isLogged === false) {
        return false;
      }

      return this.userAuth.id === this.task.userCustomerId;
    },

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
      console.log(timeStart);

      if (timeStart !== null && timeEnd !== null) {
        title = "Начать и завершить";
      } else if (timeStart !== null && timeEnd === null) {
        title = "Начать с";
      } else if (timeStart === null && timeEnd !== null) {
        title = "Завершить до";
      }
      return title;
    },

    isTime() {
      const timeStart = this.task.doFrom;
      const timeEnd = this.task.doBefore;
      return timeStart === null && timeEnd === null;
    },

    time() {
      let time = "";
      const timeStart = this.task.doFrom;
      const timeEnd = this.task.doBefore;
      const mask = "mmm dd yyyy HH:MM";

      if (timeStart !== null && timeEnd !== null) {
        time = `
          c <em>
            ${new Date(timeStart).format(mask)}</em> до <em>
            ${new Date(timeEnd).format(mask)}
          </em>
        `;
      } else if (timeStart !== null && timeEnd === null) {
        time = new Date(timeStart).format(mask);
      } else if (timeStart === null && timeEnd !== null) {
        time = new Date(timeEnd).format(mask);
      }
      return time;
    },

    requestCount() {
      const count = this.task.requestNotViewCount;
      let title = count;
      if (count > 1) {
        title += " новых";
      } else {
        title += " новая";
      }
      return title;
    },

    status() {
      let status = {
        title: "Открыто",
        class: "open"
      };

      if (this.task.finished !== null) {
        status.title = "Завершен";
        status.class = "close";
      } else if (this.task.started !== null) {
        status.title = "Выполняется";
        status.class = "do";
      }
      return status;
    },

    isViewWriteReview() {
      if(this.task.finished === null || this.isLogged === false) {
        return false;
      }

      if(this.task.userPerformerId === this.userAuth.id && !this.task.userPerformerReview) {
        return true;
      }
      else if(this.task.userCustomerId === this.userAuth.id && !this.task.userCustomerReview) {
        return true;
      }
      else {
        return false;
      }
    }
  },

  methods: {
    ...mapActions("task", [
      "sendRequest",
      "sendComment",
      "getComments",
      "sendReview"
    ]),

    async sendReq() {
      const insertId = await this.sendRequest({
        taskId: this.task.id,
        message: this.message,
        price: this.price
      });
      this.requestSended = true;
    },

    getSymbol(index) {
      const rusSymbolStart = 1040;
      const code = rusSymbolStart + index;
      return String.fromCharCode(code);
    },

    sendComm() {
      if (this.comment === "") {
        return;
      }
      this.sendComment({ message: this.comment });
      this.comment = "";
    },

    async sendRev() {
      await this.sendReview({
        description: this.description,
        rating1: this.rating1,
        rating2: this.rating2,
        rating3: this.rating3
      });
      this.reviewSended = true;
    }
  }
};
</script>

<template>
  <div>
    <div class="task">
      <div class="task-name">{{task.name}}</div>
      <div 
        class="task-map" 
        v-if="'locations' in task && task.locations.length !== 0">
        <gmap-map 
          style="width: 100%; height: 100%" 
          :center="{lat: task.locations[0].lat, lng: task.locations[0].lon}" 
          :zoom="7">
          <gmap-marker 
            :key="location.id" 
            v-for="location in task.locations" 
            :position="{lat: location.lat, lng: location.lon}">
          </gmap-marker>
        </gmap-map>
      </div>
      <div class="task-options">
        <div 
          class="option-row addresses" 
          v-if="'locations' in task && task.locations.length !== 0">
          <div class="option-name">Адрес</div>
          <div class="option-description">
            <div 
              class="address-row" 
              v-for="(location, index) in task.locations" 
              :key="location.id">
              <div class="symbol">{{getSymbol(index)}}</div>
              <div class="address">{{location.name}}</div>
            </div>
          </div>
        </div>
        <div class="option-row time" v-if="isTime===false">
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
        <div class="option-row" v-if="task.description">
          <div class="option-name">Описание</div>
          <div class="option-description">{{task.description}}</div>
        </div>
      </div>
    </div>
    <div class="request" v-if="isMyPage === false && isLogged === true && task.started === null">
      <div class="request-top">Оформление заявки</div>
      <div class="request-form">
        <div class="form-option price">
          <div class="form-option-name">
            Ваша цена
          </div>
          <div class="form-option-el">
            <input type="text" v-model.number="price" :min="task.priceFrom" :max="task.priceBefore" required>
            <span class="suggest">
              от {{task.priceFrom}} ... до {{task.priceBefore}}
            </span>
          </div>
        </div>
        <div class="form-option message">
          <div class="form-option-name">
            Сообщение
            <span class="suggest">(необязательно)</span>
          </div>
          <div class="form-option-el">
            <textarea v-model.trim="message"></textarea>
          </div>
        </div>
        <div class="form-option send-button">
          <div class="form-option-el">
            <button class="request-sended" v-if="requestSended">Заявка успешно отправлена</button>
            <button v-else @click="sendReq()">Отправить заявку</button>
          </div>
        </div>
      </div>
    </div>
    <div 
      class="review" 
      v-if="isViewWriteReview">
      <div class="review-top">Оформление отзыва</div>
      <div class="review-form">
        <div class="form-option review-description">
          <div class="form-option-name">
            Отзыв
          </div>
          <div class="form-option-el">
            <textarea v-model.trim="description" placeholder="Напишите отзыв..."></textarea>
          </div>
        </div>
        <div class="form-option review-description">
          <div class="form-option-name">
            Вежливость
          </div>
          <div class="form-option-el">
            <rating-box-set v-model="rating1"></rating-box-set>
          </div>
        </div>
        <div class="form-option review-description">
          <div class="form-option-name">
            Пунктуальность
          </div>
          <div class="form-option-el">
            <rating-box-set v-model="rating2"></rating-box-set>
          </div>
        </div>
        <div class="form-option review-description">
          <div class="form-option-name">
            Адекватность
          </div>
          <div class="form-option-el">
            <rating-box-set v-model="rating3"></rating-box-set>
          </div>
        </div>
        <div class="form-option send-button">
          <div class="form-option-el">
            <button class="request-sended" v-if="reviewSended">Отзыв успешно отправлен</button>
            <button v-else @click="sendRev()">Отправить отзыв</button>
          </div>
        </div>
      </div>
    </div>
    <div 
      class="review" 
      v-if="task.finished !== null && task.userPerformerReview">
      <div class="review-top">Отзыв от исполнителя</div>
      <div class="review-form">
        <div class="form-option review-description">
          <div class="form-option-name">
            Отзыв
          </div>
          <div class="form-option-el">
            {{task.userPerformerReview.description}}
          </div>
        </div>
        <div class="form-option review-description">
          <div class="form-option-name">
            Вежливость
          </div>
          <div class="form-option-el">
            <rating-box :ratingCount="task.userPerformerReview.rating1"></rating-box>
          </div>
        </div>
        <div class="form-option review-description">
          <div class="form-option-name">
            Пунктуальность
          </div>
          <div class="form-option-el">
            <rating-box :ratingCount="task.userPerformerReview.rating2"></rating-box>
          </div>
        </div>
        <div class="form-option review-description">
          <div class="form-option-name">
            Адекватность
          </div>
          <div class="form-option-el">
            <rating-box :ratingCount="task.userPerformerReview.rating3"></rating-box>
          </div>
        </div>
      </div>
    </div>
    <div 
      class="review" 
      v-if="task.finished !== null && task.userCustomerReview">
      <div class="review-top">Отзыв от заказчика</div>
      <div class="review-form">
        <div class="form-option review-description">
          <div class="form-option-name">
            Отзыв
          </div>
          <div class="form-option-el">
            {{task.userCustomerReview.description}}
          </div>
        </div>
        <div class="form-option review-description">
          <div class="form-option-name">
            Вежливость
          </div>
          <div class="form-option-el">
            <rating-box :ratingCount="task.userCustomerReview.rating1"></rating-box>
          </div>
        </div>
        <div class="form-option review-description">
          <div class="form-option-name">
            Пунктуальность
          </div>
          <div class="form-option-el">
            <rating-box :ratingCount="task.userCustomerReview.rating2"></rating-box>
          </div>
        </div>
        <div class="form-option review-description">
          <div class="form-option-name">
            Адекватность
          </div>
          <div class="form-option-el">
            <rating-box :ratingCount="task.userCustomerReview.rating3"></rating-box>
          </div>
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="comments-top">
        Комментария
      </div>
      <div class="comments-list">
        <div class="error" v-if="comments.length === 0">Нет комментарий</div>
        <div class="comment" v-else v-for="comment of comments" :key="comment.id">
          <div 
            class="user-photo"
            :style="{
              'background-image': `url(${comment.user.image})`,
              'background-size':'cover'
            }">
          </div>
          <div class="comment-content">
            <div class="user-name">
              <router-link 
                :to="{name:'userPage', params: {userId: comment.user.id}}"
                class="user-name">{{comment.user.surname}} {{comment.user.name}}
              </router-link>
              <span class="customer" v-if="comment.user.id === task.userCustomer.id">
                Заказчик
              </span>
            </div>
            <div class="message">
              {{comment.message}}
            </div>
            <div class="date-answer">
              {{new Date(comment.created).format('HH:MM - dd mmmm')}}
            </div>
          </div>
        </div>
      </div>
      <div class="write-comment" v-if="isLogged && task.isComment > 0 && task.finished === null">
        <div 
          class="user-photo"
          :style="{
            'background-image': `url(${userAuth.image})`,
            'background-size':'cover'
          }">
        </div>
        <div class="write-content">
          <textarea id="message" v-model.trim="comment" placeholder="Напишите комментарий..."></textarea>
          <button class="send" @click="sendComm">Отправить</button>
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

  .task {
    @extend %box;
    margin-top: 57px;
    margin-bottom: 15px;

    .task-name {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
      font-size: 15px;
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
          font-weight: 500; // перенос слов
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
            background-color: #e5ebf1;
            padding: 3px 5px;
            border-radius: 3px;
            color: #55677d;
            font-weight: 500;
          }
        }
      }
    }

    .task-request {
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

  .request {
    @extend %box;
    margin-bottom: 15px;

    .request-top {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
      background-color: $clr-tab-background;
    }

    .request-form {
      padding: 15px 20px;

      .form-option {
        padding-bottom: 10px;

        &:last-child {
          padding-bottom: 0;
        }

        .suggest {
          font-weight: 400;
          color: $clr-font-grey;
        }

        .form-option-name {
          font-weight: 500;
          padding-bottom: 5px;
        }

        .form-option-el {
          input[type="text"],
          textarea {
            padding: 7px 14px;
            border: 1px solid $clr-tb-border;
            border-radius: 3px;
            font-family: "Roboto";
            box-sizing: border-box;
          }

          input[type="text"] {
            width: 100px;
          }

          textarea {
            resize: none;
            width: 100%;
          }

          button {
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

            &.request-sended {
              @extend %button-green;
              padding: 8px 16px;
            }
          }
        }

        &.price {
          .form-option-el {
            display: flex;
            align-items: flex-end;

            .suggest {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  .review {
    @extend %box;
    margin-bottom: 15px;

    .review-top {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
      background-color: $clr-tab-background;
    }

    .review-form {
      padding: 15px 20px;

      .form-option {
        padding-bottom: 10px;

        &:last-child {
          padding-bottom: 0;
        }

        .form-option-name {
          font-weight: 500;
          padding-bottom: 5px;
        }

        .form-option-el {
          input[type="text"],
          textarea {
            padding: 7px 14px;
            border: 1px solid $clr-tb-border;
            border-radius: 3px;
            font-family: "Roboto";
            box-sizing: border-box;
          }

          input[type="text"] {
            width: 100px;
          }

          textarea {
            resize: none;
            width: 100%;
          }

          button {
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

            &.request-sended {
              @extend %button-green;
              padding: 8px 16px;
            }
          }
        }
      }
    }
  }

  .comments {
    @extend %box;
    margin-bottom: 15px;

    .comments-top {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
      background-color: $clr-tab-background;
    }

    .comments-list {
      padding: 0 20px;
      padding-top: 10px;
      border-bottom: 1px solid $clr-border;

      .error {
        padding-bottom: 10px;
      }

      .comment {
        padding: 10px 0;
        border-bottom: 1px solid $clr-border;
        display: flex;

        &:last-child {
          border-bottom: none;
        }

        .user-photo {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          background-color: #5181b8;
        }

        .comment-content {
          flex: 1;
          margin-left: 10px;

          .user-name {
            color: $clr-font-black;
            font-weight: 500;

            .customer {
              color: $clr-font-grey;
              font-weight: 400;
              margin-left: 5px;
            }
          }

          .message {
            margin-top: 5px;
          }

          .date-answer {
            margin-top: 5px;
            color: $clr-font-grey;
            font-size: 12px;
          }
        }
      }
    }

    .write-comment {
      padding: 15px 20px;
      display: flex;

      .user-photo {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background-color: #5181b8;
      }

      .write-content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex: 1;
        margin-left: 10px;

        textarea {
          width: 100%;
          height: 50px;
          padding: 7px 14px;
          border: 1px solid $clr-tb-border;
          border-radius: 3px;
          font-family: "Roboto";
          box-sizing: border-box;
          resize: none;
        }

        button {
          @extend %button;

          padding: 7px 15px;
          margin-top: 15px;
        }
      }
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

      .count {
        color: $clr-font-grey;
        margin-left: 5px;
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
        color: $clr-font-grey;

        &.status {
          font-weight: 500;

          &.open {
            color: #4e9447;
          }

          &.do {
            color: #968632;
          }

          &.close {
            color: #90413c;
          }
        }
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