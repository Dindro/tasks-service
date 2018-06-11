<script>
import ReviewItem from "./ReviewItem";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      selectedTab: "all"
    };
  },
  computed: {
    ...mapState("user", ["reviews"])
  },
  components: {
    ReviewItem
  },
  methods: {
    ...mapActions("user", ["getReviews"]),

    selectTab(type) {
      if (type !== this.selectedTab) {
        this.getReviews(type);
      }
      this.selectedTab = type;
    }
  },
  created() {
    this.getReviews(this.selectedTab);
  }
};
</script>

<template>
	<div class="rewiews">
		<div class="reviews-tab">
			<div 
        @click="selectTab('all')" 
        :class="{active: selectedTab === 'all'}"
        class="reviews-tab-item">
				<span class="tab-name">Все отзывы</span>
				<span class="tab-count">35</span>
			</div>
			<div 
        @click="selectTab('fromPerformers')" 
        :class="{active: selectedTab === 'fromPerformers'}"
        class="reviews-tab-item">
				<span class="tab-name">От исполнителей</span>
				<span class="tab-count">35</span>
			</div>
			<div 
        @click="selectTab('fromExecutors')" 
        :class="{active: selectedTab === 'fromExecutors'}"
        class="reviews-tab-item">
				<span class="tab-name">От заказчиков</span>
				<span class="tab-count">35</span>
			</div>
		</div>

		<div class="reviews-list">
      <review-item v-for="(review, key) in 10" :key="key"></review-item>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
@import "../../assets/elements.scss";

.rewiews {
  @extend %box;

  .reviews-tab {
    display: flex;
    padding: 0 12px;
    border-bottom: 1px solid $clr-border;

    .reviews-tab-item {
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

  .reviews-list {
    .review {
      padding: 15px 20px 0 20px;

      &:last-child {
        .border {
          border: none;
          padding-bottom: 15px;
        }
      }

      .border {
        padding-bottom: 14px;
        border-bottom: 1px solid $clr-border;
      }

      .user {
        display: flex;

        .user-photo {
          height: 50px;
          width: 50px;
          background-color: grey;
          border-radius: 50%;
        }

        .user-info-time {
          flex: 1;
          display: flex;
          justify-content: space-between;

          .user-info {
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name-worker {
              .name {
                color: $clr-font-blue-link;
                font-weight: 500;
                cursor: pointer;
              }

              .worker {
                color: $clr-font-grey;
                padding-left: 5px;
              }
            }

            .rating {
              color: $clr-font-grey;
            }

            .review-description {
              color: $clr-font-grey;
            }
          }
        }

        .time {
          color: $clr-font-grey;
        }
      }

      .review-task {
        padding: 15px 0 10px 0;
        color: $clr-font-grey;

        .task-name {
          cursor: pointer;
        }
      }

      .review-text {
        line-height: 1.3;
      }

      .review-rating {
        padding-top: 10px;
        display: flex;
      }
    }
  }
}
</style>