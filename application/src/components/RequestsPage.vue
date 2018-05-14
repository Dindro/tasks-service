<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["tabOption", "tabTop"],
  data() {
    return {
      visibleTasks: false,
      selectedItem: "",
      selectedTab: ""
    };
  },
  computed: {
    ...mapState("request", ["tasks"])
  },
  created() {
    this.getTasks();

    let tabOption = this.tabOption;
    let tabTop = this.tabTop;

    if (tabOption === undefined) {
      tabOption = "my";
    }

    if (tabTop === undefined) {
      tabTop = "all";
    }

    this.selectItem(tabOption);
    this.selectTab(tabTop);
  },
  methods: {
    ...mapActions("request", ["getTasks"]),
    selectItem(index) {
      this.selectedItem = index;
      if (index === "my") {
        this.selectTab("all");
      } else {
        this.selectTab("loading");
      }
    },

    // при выборе таба
    selectTab(tabName) {
      this.selectedTab = tabName;
      switch (tabName) {
        case "all":
          break;
        case "successful":
          break;
        case "loading":
          break;
        case "canceled":
          break;
      }
    }
  }
};
</script>

<template>
	<div class="dinamic">
    <div class="dinamic-content">
      <div class="requests">
				<div class="requests-tab">
					<div class="requests-tab-items" v-if="selectedItem === 'my'">
            <div 
							class="requests-tab-item" 
							@click="selectTab('all')"
							:class="{active: selectedTab === 'all'}"
						>
              <span class="tab-name">Все заявки</span>
            </div>
            <div 
							class="requests-tab-item" 
							@click="selectTab('successful')"
							:class="{active: selectedTab === 'successful'}"
						>
              <span class="tab-name">Успешные</span>
              <span class="tab-count">2</span>
            </div>
						<div 
							class="requests-tab-item" 
							@click="selectTab('loading')"
							:class="{active: selectedTab === 'loading'}"
						>
              <span class="tab-name">В обработке</span>
              <span class="tab-count">4</span>
            </div>
						<div 
							class="requests-tab-item" 
							@click="selectTab('canceled')"
							:class="{active: selectedTab === 'canceled'}"
						>
              <span class="tab-name">Отклоненные</span>
              <span class="tab-count">12</span>
            </div>
          </div>
					
					<!-- при выборе задачи -->
					<div class="requests-tab-items" v-else>
            <div 
							class="requests-tab-item" 
							@click="selectTab('loading')"
							:class="{active: selectedTab === 'loading'}"
						>
              <span class="tab-name">В обработке</span>
							<span class="tab-count">3</span>
            </div>
						<div 
							class="requests-tab-item" 
							@click="selectTab('canceled')"
							:class="{active: selectedTab === 'canceled'}"
						>
              <span class="tab-name">Отклоненные</span>
              <span class="tab-count">43</span>
            </div>
          </div>
				</div>
				<div class="request-list">
					<template>
						<div class="task" v-for="(task, i) in tasks" :key="i">
							<div class="task-name-price">
								<router-link 
									tag="div"
									class="task-name"
									:to="{name: 'taskPage', params: { taskId: task.id}}"
								>
									{{task.title}}
									<span class="request-status">Отклонен</span>
								</router-link>
								<div class="price">{{task.priceFrom}} руб</div>
							</div>
							<div class="user-task-info">
								<div class="user">
									<div class="photo"></div>
									<div class="user-info">
										<div class="user-name">Семенов Сергей</div>
										<div class="rating">Средний рейтинг: 4.6</div>
										<div class="reviews">Отзывы: 35</div>
									</div>
								</div>
								<div class="task-info">
									<div class="time">до 28 июня</div>
									<div class="address">улица Тукташа 5, Чебоксары</div>
								</div>
							</div>
						</div>
					</template>
				</div>
			</div>
    </div>

    <div id="options">
      <div 
				class="tab"
				:class="{ close: !visibleTasks }"
			>
        <div 
					class="tab-item"
					@click="selectItem('my')"
					:class="{active: selectedItem === 'my'}"
				>
          Мои заявки
        </div>
				<div class="line"></div>
        <div class="tab-item" @click="visibleTasks = !visibleTasks">
          Заявки моих заданий
					<i class="open icon-expand_less" v-if="visibleTasks"></i>
					<i class="open icon-expand_more" v-else></i>
        </div>
				<div class="tasks" v-if="visibleTasks">
					<div 
						class="tab-item"
						v-for="task in tasks"
						@click="selectItem(task.id)"
						:class="{ active: task.id === selectedItem }"
						:key="task.id">
						{{ task.title }}
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

          .request-status {
            padding: 2px 5px;
            background-color: #eccfcf;
						color:#7b4545;
						font-weight: 400;
						font-size: 13px;
						border-radius: 3px;
						margin-left: 5px;
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
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
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
