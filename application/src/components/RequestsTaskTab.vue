<script>
import { mapActions, mapState, mapMutations } from "vuex";
import CheckBox from "./CheckBox";

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
    CheckBox
  },

  created() {},

  methods: {
    ...mapActions("request", [
      "getTasks",
      "getMyRequests",
      "getRequestsCount",
      "getByTaskId",
      "getRequestsCountByTaskId"
    ]),

    ...mapMutations("request", ["selectAllRequests"]),

    selectTab(tabName) {
      this.$router.push({
        name: "requestsPage",
        query: {
          tabOption: this.selectedItem,
          tabTop: tabName
        }
      });
    },

    selectCheckBox(value, requestId) {
      this.$store.commit("request/selectCheckBox", { value, requestId });
    },
  }
};
</script>

<template>
	<div class="requests">
		<div class="requests-tab">
			<div class="requests-tab-items">
        <div 
					class="requests-tab-item" 
					@click="selectTab('loading')"
					:class="{active: selectedTab === 'loading'}"
				>
          <span class="tab-name">В обработке</span>
					<span class="tab-count">{{taskRequestsCount.loading}}</span>
        </div>
				<div 
					class="requests-tab-item" 
					@click="selectTab('canceled')"
					:class="{active: selectedTab === 'canceled'}"
				>
          <span class="tab-name">Отклоненные</span>
          <span class="tab-count">{{taskRequestsCount.canceled}}</span>
        </div>
      </div>
      <div class="tab-options">
        <span class="select-all" @click="selectAllRequests()" >Выделить всех</span>
      </div>
		</div>
		<div class="request-list">
			<div v-if="taskRequests.length === 0">Нет заявок</div>
			<div 
        class="request"
        v-for="request in taskRequests"
        :key="request.id"
      >
        <div class="select">
          <check-box :check="request.selected" @input="(val)=>selectCheckBox(val, request.id)"></check-box>
        </div>
        <div class="user">
          <div class="photo"></div>
          <div class="user-info">
            <div class="name">
              <router-link
                :to="{ name:'userPage', params:{ userId: request.user.id}}"
              >
                {{request.user.surname}} {{request.user.name}}
              </router-link>
            </div>
            <div class="rating">Рейтинг: 3.5</div>
            <div class="reviews">Отзывы: 34</div>
          </div>
        </div>
        <div 
          class="message"
          v-if="request.selected===false"
        >
          {{request.text}}
        </div>
        <div 
          class="buttons"
          v-else
        >
          <button class="todo-executor">Сделать исполнителем</button>
          <button class="cancel">Отклонить заявку</button>
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

    .tab-options {
      display: flex;
      margin: auto 0;

      .select-all {
        font-weight: 500;
        cursor: pointer;
        margin-right: 10px;
        color: $clr-font-darkgrey;
      }
    }
  }

  .request-list {
    padding: 15px 20px 15px 20px;

    .request {
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

      .buttons {
        flex: 1;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        justify-content: space-between;

        button {
          width: 170px;
        }

        .todo-executor {
          @extend %button-green;
          padding: 4px 0;
        }

        .cancel {
          @extend %button-red;
          padding: 4px 0;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
