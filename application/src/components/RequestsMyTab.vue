<script>
import { mapActions, mapState } from "vuex";

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

  methods: {
    ...mapActions("request", [
      "getTasks",
      "getMyRequests",
      "getRequestsCount",
      "getByTaskId",
      "getRequestsCountByTaskId"
    ]),

    selectTab(tabName) {
      this.$router.push({
        name: "requestsPage",
        query: {
          tabOption: "my",
          tabTop: tabName
        }
      });
    }
  }
};
</script>

<template>
	<div class="requests">
		<div class="requests-tab">
			<div class="requests-tab-items" v-if="selectedItem === 'my'">
				<div class="requests-tab-item" @click="selectTab('all')" :class="{active: selectedTab === 'all'}">
					<span class="tab-name">Все заявки</span>
				</div>
				<div class="requests-tab-item" @click="selectTab('loading')" :class="{active: selectedTab === 'loading'}">
					<span class="tab-name">В обработке</span>
					<span class="tab-count">{{requestsCount.loading}}</span>
				</div>
				<div class="requests-tab-item" @click="selectTab('successful')" :class="{active: selectedTab === 'successful'}">
					<span class="tab-name">Успешные</span>
					<span class="tab-count">{{requestsCount.successful}}</span>
				</div>
				<div class="requests-tab-item" @click="selectTab('canceled')" :class="{active: selectedTab === 'canceled'}">
					<span class="tab-name">Отклоненные</span>
					<span class="tab-count">{{requestsCount.canceled}}</span>
				</div>
			</div>
		</div>
		<div class="request-list">
			<div v-if="requests.length === 0">Нет заявок</div>
			<div class="request" v-for="request in requests" :key="request.id">
				<div class="task-name-status">
					<router-link class="name" :to="{ name: 'taskPage', params: { taskId: request.task.id }}">
						{{request.task.title}}
					</router-link>
					<div v-if="request.isReject === 0" class="status loading">Обработка</div>
					<div v-else-if="request.isReject === 1" class="status canceled">Отклонено</div>
					<div v-else-if="request.task.id_user_executor !== null" class="status canceled">Успешно</div>
				</div>
				<div class="request-info">
					<div class="user-customer">
						<div class="customer-photo"></div>
						<div class="customer-name-messages">
							<div class="name-type">
								<router-link class="name" :to="{name: 'userPage', params: { userId: request.userCustomer.id }}">
									{{request.userCustomer.surname}} {{request.userCustomer.name}}
								</router-link>
								<span class="type">Заказчик</span>
							</div>
							<div class="message">
								<strong>Бюджет</strong> от {{request.task.priceFrom}}руб до {{request.task.priceBefore}}руб
							</div>
						</div>
					</div>
					<div class="user-executor">
						<div class="messages">
							<div class="date-message">
								<span class="date">{{new Date(request.created).format('dd mmm yyyy')}}г</span>
								<div class="message">
									<strong>Цена</strong> {{request.price}}руб
								</div>
							</div>
							<div class="message">
								{{request.text}}
							</div>
							<button class="request-cancel">Отменить заявку</button>
						</div>
						<div class="executor-photo"></div>
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
  }
}
</style>