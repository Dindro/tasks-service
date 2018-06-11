<script>
import GroupBox from "./GroupBox";
import GroupBoxSimple from "./GroupBoxSimple";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      tasks: [],
      myTasksCount: " ",
      searchText: "",
      isSearch: false,

      isWaitScrolling: false,
      selectedTab: "all",

      categories: [
        {
          id: 0,
          name: "Все категории"
        }
      ],
      selectedCategoryId: 0,

      statusItems: [
        { id: 0, name: "Все статусы" },
        { id: 1, name: "Свободные" },
        { id: 2, name: "Выполняются" },
        { id: 3, name: "Закрытые" }
      ],
      selectedStatusId: 0,
      priceFrom: "",
      priceBefore: ""
    };
  },
  watch: {
    priceFrom() {
      this.changeFilter();
    },
    priceBefore() {
      this.changeFilter();
    },
    selectedStatusId() {
      this.changeFilter();
    },
    selectedCategoryId() {
      this.changeFilter();
    }
  },
  computed: {
    config() {
      return {
        filterPriceFrom: this.priceFrom,
        filterPriceBefore: this.priceBefore,
        filterStatusId: this.selectedStatusId,
        filterCategoryId: this.selectedCategoryId
      };
    }
  },

  components: {
    GroupBox,
    GroupBoxSimple
  },
  methods: {
    ...mapActions("task", ["getTasks", "getTasksCount", "getCategories"]),

    async startGetTasks() {
      this.tasks = await this.getTasks({});
    },

    // загрузка при скроллинге
    async checkScroll(e) {
      if (this.isWaitScrolling) {
        return;
      }

      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.isWaitScrolling = true;
        const lastTask = this.tasks[this.tasks.length - 1];
        if (!lastTask) {
          this.isWaitScrolling = false;
          return;
        }

        const tasks = await this.getTasks({
          count: 20,
          lastTaskId: lastTask.id,
          search: this.searchText,
          filterUser: this.selectedTab === "my" ? true : false,
          ...this.config
        });
        this.tasks.push(...tasks);
        this.isWaitScrolling = false;
      }
    },

    async getCount() {
      this.myTasksCount = await this.getTasksCount({});
    },

    async search() {
      if (this.searchText === "") {
        return;
      }

      this.isSearch = true;
      const tasks = await this.getTasks({
        search: this.searchText,
        filterUser: this.selectedTab === "my",
        ...this.config
      });
      this.tasks = tasks;
    },

    async selectTab(type) {
      this.searchText = "";
      this.isSearch = false;

      if (type === "all") {
        this.startGetTasks();
      } else if (type === "my") {
        const tasks = await this.getTasks({
          count: 20,
          filterUser: true
        });
        this.tasks = tasks;
      }

      this.selectedTab = type;
    },

    getRating(user) {
      const rating = (user.rating1 + user.rating2 + user.rating3) / 3;
      return rating.toFixed(1);
    },

    getTime(task) {
      if (task.doFrom !== null && task.doBefore !== null) {
        return `${new Date(task.doFrom).format("dd mmm")} - ${new Date(
          task.doBefore
        ).format("dd mmm")}`;
      } else if (task.doFrom !== null) {
        return `${new Date(task.doFrom).format("dd mmm")} - Без ограничений`;
      } else if (task.doBefore !== null) {
        return `до ${new Date(task.doBefore).format("dd mmm")}`;
      } else {
        return "Без ограничений";
      }
    },

    async getCategory() {
      const categories = await this.getCategories();
      this.categories.push(...categories);
    },

    async changeFilter() {
      const tasks = await this.getTasks({
        search: this.searchText,
        filterUser: this.selectedTab === "my",
        ...this.config
      });
      this.tasks = tasks;
    }
  },
  created() {
    this.startGetTasks();
    this.getCount();
    this.getCategory();
  },
  mounted() {
    window.addEventListener("scroll", this.checkScroll);
    window.addEventListener("resize", this.checkScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.checkScroll);
    window.removeEventListener("resize", this.checkScroll);
  }
};
</script>

<template>
  <div class="dinamic">
    <div class="dinamic-content">
      <div class="tasks">
        <div class="tasks-tab">
          <div class="tasks-tab-items">
            <div 
              class="tasks-tab-item" 
              @click="selectTab('all')"
              :class="{active: selectedTab === 'all'}">
              <span class="tab-name">Все задания</span>
            </div>
            <div 
              class="tasks-tab-item" 
              :class="{active: selectedTab === 'my'}" 
              @click="selectTab('my')" v-if="$store.getters.isLogged">
              <span class="tab-name">Мои задания</span>
              <span class="tab-count">{{myTasksCount}}</span>
            </div>
          </div>
          <div class="tasks-tab-buttons">
            <router-link 
              tag = "button"
              :to = "{ name: 'taskAddPage' }"
              class = "task-add">
              Добавить задание
            </router-link>
          </div>
        </div>
        <div class="tasks-options">
          <div class="search">
            <input type="text" id="search" v-model="searchText" placeholder="Поиск по заданиям">
            <button class="tofind" @click="search">
              <i class="icon-search"></i>
            </button>
          </div>
        </div>
        <div class="tasks-list">
          <div v-if="tasks.lenght === 0">Ничего не найдено</div>
          <div class="task" v-for="task in tasks" :key="task.id">
            <div class="task-name-price">
              <router-link 
                class="task-name"
                :to="{name: 'taskPage', params: { taskId: task.id}}">
                {{task.name}}
              </router-link>
              <div class="price">{{task.priceFrom}} - {{task.priceBefore}} руб</div>
            </div>
            <div class="user-task-info">
              <div class="user">
                <div 
                  class="photo"
                  :style="{
                    background: 'url(https://image.flaticon.com/icons/png/128/145/145843.png)',
                    'background-size': 'cover'
                  }"></div>
                <div class="user-info">
                  <router-link 
                    class="user-name" 
                    :to="{name: 'userPage', params: { userId: task.user.id}}"
                  >
                    {{task.user.surname}} {{task.user.name}}
                  </router-link>
                  <div class="rating">
                    Средний рейтинг: {{getRating(task.user)}}
                  </div>
                  <div class="reviews">Отзывы: {{task.user.reviewsCount}}</div>
                </div>
              </div>
              <div class="task-info">
                <div class="time">
                  <i class="icon-schedule"></i>
                  {{getTime(task)}}
                </div>
                <template v-if="task.locations.length !== 0">
                  <div class="address">
                    <i class="icon-room"></i>
                    {{task.locations[0].name}}
                  </div>
                  <div 
                    class="address" 
                    v-if="task.locations.length > 1">
                    <i class="icon-room"></i>
                    {{task.locations[task.locations.length - 1].name}}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="options">
      <div class="map-box">
        <div class="map">
          <yandex-map
            style="width: 100%; height: 100%"
            :coords="[54.82896654088406, 39.831893822753904]"
          >
          </yandex-map>
        </div>
        <button class="map-show">Показать полностью</button>
      </div>

      <div class="find-options">
        <div class="options-top">
          Параметры поиска
        </div>
        <div class="option-list">
          <div class="option category">
            <div class="option-name">Категория</div>
            <group-box 
              :options = 'categories' 
              v-model="selectedCategoryId" 
              listWidth = '198px'
              width="100%"></group-box>
          </div>
          <div class="option status">
            <div class="option-name">Статус</div>
            <group-box-simple
              :options ='statusItems'
              v-model="selectedStatusId"
              width='100%'
              listWidth='198px'></group-box-simple>
          </div>
          <div class="option prices">
            <div class="option-name">Диапазон цен</div>
            <div class="value">
              <input type="text" v-model.lazy.number="priceFrom" placeholder="Мин">
              <span>-</span>
              <input type="text" v-model.lazy.number="priceBefore" placeholder="Макс">
            </div>
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
      display: flex;
      justify-content: space-between;
      padding: 0 12px;
      border-bottom: 1px solid $clr-border;
      background-color: $clr-tab-background;

      .tasks-tab-items {
        display: flex;

        .tasks-tab-item {
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

      .tasks-tab-buttons {
        display: flex;
        padding-right: 8px;

        button.task-add {
          cursor: pointer;
          margin: auto;
          background-color: $clr-btn;
          color: white;
          border: none;
          padding: 7px 14px;
          border-radius: 4px;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: $clr-btn-hover;
          }
        }
      }
    }

    .tasks-options {
      padding: 20px;

      .search {
        display: flex;
        border: 1px solid $clr-tb-border;
        border-radius: 2px;

        #search {
          width: 100%;
          border: none;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
          padding: 10px 15px;
          box-sizing: border-box;
          border-right: 1px solid $clr-tb-border;
          outline: none;
        }

        .tofind {
          background-color: $clr-tb-btn-background;
          border: none;
          width: 50px;
          font-size: 22px;
          color: $clr-tb-btn-font;
          outline: none;
          cursor: pointer;

          i {
            position: relative;
            top: 2px;
          }
        }
      }
    }

    .tasks-list {
      padding: 0 20px 15px 20px;

      .task {
        border-bottom: 1px solid $clr-border;
        padding-bottom: 15px;
        margin-bottom: 15px;

        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .task-name-price {
          display: flex;
          justify-content: space-between;

          .task-name {
            color: $clr-font-blue-link;
            font-size: 15px;
            font-weight: 500;
            word-wrap: break-word;
            padding-right: 10px;
            box-sizing: border-box;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }

          .price {
            padding-top: 1px;
            font-weight: 500;
            white-space: nowrap;
          }
        }

        .user-task-info {
          padding-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .user {
            display: flex;

            .photo {
              height: 50px;
              width: 50px;
              background-color: grey;
              border-radius: 50%;
            }

            .user-info {
              padding-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .user-name {
                font-weight: 500;
                color: $clr-font-black;
                cursor: pointer;
              }

              .rating {
                color: $clr-font-grey;
              }

              .reviews {
                color: $clr-font-grey;
              }
            }
          }

          .task-info {
            flex: 1;
            margin-left: 10px;
            text-align: end;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .time,
            .address {
              i {
                position: relative;
                top: 1px;
              }
            }
          }
        }
      }
    }
  }
}

#options {
  width: 230px;
  margin: 57px 0 15px 565px;

  .map-box {
    @extend %box;
    
    padding: 15px;

    .map {
      height: 198px;
      background-color: $clr-font-grey;
    }

    button.map-show {
      background-color: $clr-btn-light;
      border: none;
      padding: 10px 20px;
      border-radius: 2px;
      color: $clr-btn-font-light;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.2s ease;
      margin-top: 15px;

      &:hover {
        background-color: $clr-btn-hover-light;
      }
    }
  }

  .find-options {
    @extend %box;
    
    margin-top: 15px;

    .options-top {
      border-bottom: 1px solid $clr-border;
      padding: 15px;
      background-color: $clr-tab-background;
    }

    .option-list {
      padding: 15px;

      .option {
        border-bottom: 1px solid $clr-border;
        padding-bottom: 15px;
        margin-bottom: 15px;

        &:last-child {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }

        .option-name {
          font-weight: 500;
          color: $clr-font-darkgrey;
          margin-bottom: 10px;
        }

        select {
          width: 100%;
          margin-top: 10px;
        }

        &.category {
          .select > div {
            width: 100%;
          }
        }

        &.prices {
          .value {
            display: flex;

            input {
              flex: 1;
              min-width: 0;
              border-radius: 2px;
              border: 1px solid $clr-tb-border;
              padding: 7px 14px;
            }

            span {
              margin: 0 5px;
              padding-top: 7px;
            }
          }
        }
      }
    }
  }
}
</style>