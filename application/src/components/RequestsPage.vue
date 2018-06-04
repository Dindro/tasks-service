<script>
import { mapActions, mapState } from "vuex";
import RequestsMyTab from "./RequestsMyTab";
import RequestsTaskTab from "./RequestsTaskTab";

export default {
  props: ["tabOption", "tabTop"],
  data() {
    return {
      visibleTasks: false
    };
  },
  computed: {
    ...mapState("request", [
      "selectedItem",
      "selectedTab",
      "tasks",
      "requests",
      "requestsCount",
      "taskRequests",
      "taskRequestsCount"
    ])
  },
  components: {
    RequestsMyTab,
    RequestsTaskTab
  },

  created() {
    // получаем свои задачи (правая навигация)
    this.getTasks();
    this.select({
      tabTop: this.tabTop,
      tabOption: this.tabOption
    });
  },

  // компонет загружен, и ссылка меняется
  beforeRouteUpdate(to, from, next) {
    this.select({
      tabOption: to.query.tabOption,
      tabTop: to.query.tabTop
    });
    next();
  },

  methods: {
    ...mapActions("request", [
      "getTasks",
      "getMyRequests",
      "getRequestsCount",
      "getByTaskId",
      "getRequestsCountByTaskId",
    ]),

    // вызывается каждый раз при изменения таба
    select({ tabTop, tabOption }) {
      // валидация параметров
      if (tabOption === undefined) {
        tabOption = "my";

        if (tabTop === undefined) {
          tabTop = "all";
        }
      } else if (tabOption === "my") {
        if (tabTop === undefined) {
          tabTop = "all";
        }
      } else if (tabOption !== "my") {
        if (tabTop === undefined) {
          tabTop = "loading";
        }
      }

      this.selectItem(tabOption);
      this.selectTab(tabTop);
    },

    // при выборе в правом навигация
    selectItem(index) {
      if (index === "my") {
        // получаем количество моих заявок
        this.getRequestsCount();
      } else {
        this.getRequestsCountByTaskId({ taskId: index });
      }

      this.$store.commit("request/mut", { type: "selectedItem", value: index });
    },

    // при выборе таба
    selectTab(tabName) {
      this.$store.commit("request/mut", {
        type: "selectedTab",
        value: tabName
      });

      if (this.selectedItem === "my") {
        switch (tabName) {
          case "all":
            this.getMyRequests({ type: "all" });
            break;
          case "successful":
            this.getMyRequests({ type: "successful" });
            break;
          case "loading":
            this.getMyRequests({ type: "loading" });
            break;
          case "canceled":
            this.getMyRequests({ type: "canceled" });
            break;
        }
      } else {
        switch (tabName) {
          case "loading":
            this.getByTaskId({ taskId: this.selectedItem, type: "loading" });
            break;
          case "canceled":
            this.getByTaskId({ taskId: this.selectedItem, type: "canceled" });
            break;
        }
      }
    },

    selectCheckBox(value, requestId) {
      this.$store.commit("request/selectCheckBox", { value, requestId });
    }
  }
};
</script>

<template>
	<div class="dinamic">
    <div class="dinamic-content">
      <requests-my-tab v-if="selectedItem === 'my'"></requests-my-tab>
      <requests-task-tab v-else></requests-task-tab>
    </div>

    <div id="options">
      <div 
				class="tab"
				:class="{ close: !visibleTasks }"
			>
        <router-link
          class="tab-item"
          :class="{active: selectedItem === 'my'}"
          :to= "{ name: 'requestsPage', query: { tabOption: 'my' }}"
        >
          Мои заявки
        </router-link>
				<div class="line"></div>
        <div class="tab-item" @click="visibleTasks = !visibleTasks">
          Заявки моих заданий
					<i class="open icon-expand_less" v-if="visibleTasks"></i>
					<i class="open icon-expand_more" v-else></i>
        </div>
				<div class="tasks" v-if="visibleTasks">
          <template v-for="task in tasks">
            <router-link 
              class="tab-item"
              :to="{ name: 'requestsPage', query: { tabOption: task.id }}"
              :class="{ active: selectedItem == task.id }"
              :key="task.id"
            >
              {{task.title}}
            </router-link>
          </template>
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
}

.requests {
  @extend %box;
  margin-top: 57px;
  margin-bottom: 15px;

  .requests-tab {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    border-bottom: 1px solid $clr-border;
    background-color: $clr-tab-background;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    .requests-tab-items {
      display: flex;

      .requests-tab-item {
        padding: 17px 5px;
        margin: 0 3px -1px 3px;
        cursor: pointer;
        color: $clr-font-grey;

        &.active {
          border-bottom: 2px solid $clr-blue;
          padding-bottom: 15px;
          color: $clr-font-black;
        }

        &:hover {
          border-bottom: 2px solid #cad2db;
          padding-bottom: 15px;

          &.active {
            border-bottom: 2px solid $clr-blue;
          }
        }

        .tab-count {
          padding-left: 3px;
          color: $clr-font-grey;
        }
      }
    }
  }

  .request-list {
    padding: 15px 20px 15px 20px;

    .request {
      border-bottom: 1px solid $clr-border;
      padding-bottom: 15px;
      margin-bottom: 15px;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }

      .task-name-status {
        display: flex;
        align-items: flex-start;

        .name {
          margin-top: 1px;
          font-size: 15px;
          font-weight: 500;
          flex: 1;
          color: $clr-font-black;
        }

        .status {
          padding: 2px 5px;
          background-color: #f5e5d3;
          color: #794d1b;
          border-radius: 3px;

          &.loading {
            @extend %request-status-loading;
          }

          &.canceled {
            @extend %request-status-canceled;
          }

          &.successfully {
            @extend %request-status-successfully;
          }
        }
      }

      .request-info {
        padding-top: 10px;

        .user-customer {
          display: flex;

          .customer-photo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: grey;
          }

          .customer-name-messages {
            margin-left: 10px;

            .name-type {
              .name {
                font-weight: 500;
                color: $clr-font-black;
              }

              .type {
                color: $clr-font-grey;
                margin-left: 5px;
                font-weight: 400;
              }
            }
          }
        }

        .user-executor {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;

          .messages {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            flex: 1;
            margin-right: 10px;

            .date-message {
              display: flex;
              align-items: flex-end;

              .date {
                color: $clr-font-grey;
                margin-right: 10px;
                font-size: 11px;
                font-style: italic;
              }
            }

            .message {
              max-width: 70%;
            }

            button {
              @extend %button-red;
              margin-top: 5px;
            }
          }

          .executor-photo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: grey;
          }
        }
      }

      .message {
        background-color: #f5f5f5;
        padding: 8px 12px;
        border-radius: 2px;
        margin-top: 5px;

        strong {
          font-weight: 500;
        }
      }
    }

    .req {
      display: flex;
      align-items: flex-start;
      border-bottom: 1px solid $clr-border;
      padding-bottom: 15px;
      margin-bottom: 15px;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      &:hover {
        .select i {
          color: #5181b8;
        }
      }

      .select {
        margin-top: 13px;

        i {
          color: #9ab7db;
          transition: color 0.2s ease;
        }
      }

      .user {
        display: flex;
        margin-left: 10px;

        .photo {
          height: 50px;
          width: 50px;
          background-color: #7a7a7a;
          border-radius: 50%;
        }

        .user-info {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .name {
            a {
              color: $clr-font-black;
              font-weight: 500;
            }
          }

          .rating,
          .reviews {
            color: $clr-font-grey;
          }
        }
      }

      .message {
        margin-left: 10px;
        flex: 1;
      }
    }
  }
}

#options {
  width: 230px;
  margin-left: 565px;
  position: fixed;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .tab {
    @extend %box;
    margin-top: 57px;
    margin-bottom: 15px;
    padding: 10px 0 0 0;
    color: $clr-font-blue;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    // при закрытии нужно добавить padding
    &.close {
      padding-bottom: 10px;
    }

    .tab-item {
      padding: 8px 20px;
      border-left: 2px solid transparent;
      cursor: pointer;
      position: relative;
      display: block;
      color: $clr-font-blue;
      text-decoration: none;

      &.active {
        background-color: #f0f2f5;
        border-left: 2px solid #5181b8;
        color: $clr-font-black;
        font-weight: 500;
      }

      &:hover {
        background-color: #f0f2f5;
      }

      i.open {
        font-size: 21px;
        position: absolute;
        right: 20px;
        top: 3px;
        color: $clr-font-grey;
      }
    }

    .line {
      @extend %line;
    }
  }

  .tasks {
    flex: 1 1 auto;
    overflow: auto;
    padding-bottom: 8px;

    &::-webkit-scrollbar {
      width: 7px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $clr-border;
      border-radius: 10px;

      &:hover {
        background-color: #d9dadd;
      }
    }

    .tab-item {
      padding-left: 30px;
    }
  }
}
</style>
