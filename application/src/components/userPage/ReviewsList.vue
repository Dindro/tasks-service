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
    ...mapState("user", ["reviews", "reviewsStatic"])
  },
  components: {
    ReviewItem
  },
  methods: {
    ...mapActions("user", ["getReviews", "getReviewsStatic"]),

    selectTab(type) {
      if (type !== this.selectedTab) {
        this.getReviews({ type });
      }
      this.selectedTab = type;
    }
  },
  created() {
    this.getReviews({ type: this.selectedTab });
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
				<span class="tab-count">{{reviewsStatic.all}}</span>
			</div>
			<div 
        @click="selectTab('fromPerformer')" 
        :class="{active: selectedTab === 'fromPerformer'}"
        class="reviews-tab-item">
				<span class="tab-name">От исполнителей</span>
				<span class="tab-count">{{reviewsStatic.fromPerformer}}</span>
			</div>
			<div 
        @click="selectTab('fromCustomer')" 
        :class="{active: selectedTab === 'fromCustomer'}"
        class="reviews-tab-item">
				<span class="tab-name">От заказчиков</span>
				<span class="tab-count">{{reviewsStatic.fromCustomer}}</span>
			</div>
		</div>

		<div class="reviews-list">
      <div class="not-reviews" v-if="reviews.length === 0">Нет отзывов</div>
      <review-item v-for="review in reviews" :key="review.id" :review ='review'></review-item>
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
    .not-reviews {
      padding: 10px 20px;
    }
  }
}
</style>