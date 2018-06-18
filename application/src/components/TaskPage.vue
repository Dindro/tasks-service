<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

import TaskRequestsTab from "../components/TaskRequestsTab";
import TaskTab from "../components/TaskTab";

export default {
  props: ["taskId", "tab"],
  data() {
    return {
      message: "",
      price: "",
      test: this.$store.getters["task/doubleCount"]
    };
  },

  components: {
    TaskRequestsTab,
    TaskTab
  },

  computed: {
    ...mapState("task", ["task"]),
    ...mapGetters(["isLogged", "userAuth"]),

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
    }
  },

  created() {
    this.common({ type: "taskId", value: this.taskId });
    this.getTask({ taskId: this.taskId });
    this.getComments();
  },

  methods: {
    ...mapActions("task", ["getTask", "getComments", "finishTask"]),
    ...mapMutations("task", ["common"]),

    showTab(tabName) {
      if (this.tab === tabName) {
        return;
      }

      this.$router.push({
        name: "taskPage",
        params: { taskId: this.taskId },
        query: { tab: tabName }
      });
    }
  }
};
</script>

<template>
  <div class="dinamic">
    
    <div class="dinamic-content">
      <task-requests-tab v-if="tab === 'requests'"></task-requests-tab>
      <task-tab v-else-if="tab === 'task' || tab === undefined " :task='task'></task-tab>
    </div>
    <div id="options">
      <div class="tab">
        <div class="tab-item active" @click="showTab('task')">
          Задача
        </div>
        <router-link 
          v-if="isLogged && task.userCustomerId === userAuth.id"
          tag="div"
          :to="{name:'requestsPage', query: { tabOption: task.id }}"
          class="tab-item">
          Заявки
          <span v-if="task.requestNotViewCount !== 0" class="count">
            {{requestCount}}
          </span>
        </router-link>
        <div 
          v-if="isLogged && task.userCustomerId === userAuth.id"
          class="tab-item" @click="showTab('chats')">
          Диалоги с этой задачей
        </div>
      </div>

      <div class="details">
        <div class="details-top">
          Детали
        </div>
        <div class="detail-list">
          <div class="detail status" :class="status.class">{{status.title}}</div>
          <div class="detail category">{{task.categoryName}}</div>
          <div class="detail">Просмотров: {{task.views}}</div>
          <div class="detail">Номер задания: #{{task.id}}</div>
          <div class="detail">Создано: {{new Date(task.created).format("mmm dd yyyy")}}</div>
          <div 
            v-if="task.started"
            class="detail">
            Начало: {{new Date(task.started).format("mmm dd yyyy")}}
          </div>
          <div 
            v-if="task.finished"
            class="detail">
            Завершено: {{new Date(task.finished).format("mmm dd yyyy")}}
          </div>
        </div>
        <div class="detail-buttons">
          <!-- <div>
            <span class="go-comments">Перейти к комментариям</span>
          </div> -->
          <template v-if="isMyPage === true && task.started === null">
            <button class="edit-task">Редактировать задачу</button>
            <button class="delete-task">Удалить задачу</button>
          </template>
          <button 
            v-else-if="task.userPerformerId === userAuth.id && task.finished === null" 
            class="run-task" @click="finishTask">Завершить задачу</button>
        </div>
      </div>

      <div class="customer">
        <div class="customer-top">Заказчик</div>
        <div class="customer-user">
          <div 
            class="user-photo"
            :style="{
              'background-image': `url(${task.userCustomer.image})`,
              'background-size':'cover'
            }">
          </div>
          <div class="user-info">
            <router-link 
              class="user-name"
              :to="{name: 'userPage', params: {userId: task.userCustomer.id}}">
              {{task.userCustomer.surname}} {{task.userCustomer.name}}
            </router-link>
            <div class="user-age-city">Возраст: {{task.userCustomer.age}}</div>
            <div class="ratings">Средний балл: {{task.userCustomer.rating}}</div>
            <div class="reviews">Отзывы: {{task.userCustomer.reviewsCount}}</div>
          </div>
        </div>
      </div>

      <div class="customer" v-if="task.userPerformer">
        <div class="customer-top">Исполнитель</div>
        <div class="customer-user">
          <div 
            class="user-photo"
            :style="{
              'background-image': `url(${task.userPerformer.image})`,
              'background-size':'cover'
            }">
          </div>
          <div class="user-info">
            <router-link 
              class="user-name"
              :to="{name: 'userPage', params: {userId: task.userPerformer.id}}">
              {{task.userPerformer.surname}} {{task.userPerformer.name}}
            </router-link>
            <div class="user-age-city">Возраст: {{task.userPerformer.age}}</div>
            <div class="ratings">Средний балл: {{task.userPerformer.rating}}</div>
            <div class="reviews">Отзывы: {{task.userPerformer.reviewsCount}}</div>
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

  .task {
    margin-top: 57px;
    margin-bottom: 15px;
    border: 1px solid $clr-box-border;
    background-color: white;
    border-radius: 2px;

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
    margin-bottom: 15px;
    border: 1px solid $clr-box-border;
    background-color: white;
    border-radius: 2px;

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

  .comments {
    margin-bottom: 15px;
    border: 1px solid $clr-box-border;
    background-color: white;
    border-radius: 2px;
    height: 200px;

    .comments-top {
      padding: 15px 20px;
      border-bottom: 1px solid $clr-border;
      background-color: $clr-tab-background;
    }
  }
}

#options {
  width: 230px;
  margin: 57px 0 0 565px;

  .tab {
    @extend %box;
    margin-bottom: 15px;
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
    @extend %box;
    margin-bottom: 15px;

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
      padding: 0px 20px 15px 20px;

      span.go-comments {
        display: block;
        text-align: center;
        color: $clr-font-blue;
        font-weight: 500;
      }

      button.edit-task {
        width: 100%;
        border: none;
        margin-top: 5px;
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

      button.run-task {
        @extend %button-green;
        width: 100%;
      }
    }
  }

  .customer {
    @extend %box;

    margin-bottom: 15px;

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