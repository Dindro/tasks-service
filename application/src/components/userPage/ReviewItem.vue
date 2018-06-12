<script>
import RatingBox from "../elements/RatingBox";
export default {
  props: ["review"],
  data() {
    return {};
  },
  components: {
    RatingBox
  },
  methods: {
    getRating(user) {
      const rating = (user.rating1 + user.rating2 + user.rating3) / 3;
      return rating.toFixed(1);
    }
  }
};
</script>

<template>
	<div class="review">
		<div class="border">
			<div class="user">
				<div 
          class="user-photo"
          :style="{
            'background-image': `url(${review.user.image})`,
            'background-size':'cover'
          }">

        </div>
				<div class="user-info-time">
					<div class="user-info">
						<div class="name-worker">
							<router-link 
                class="name"
                :to="{name:'userPage', params: {userId: review.userId}}">
                {{review.user.surname}} {{review.user.name}}
              </router-link>
							<span 
                class="worker"
                v-if="review.userId === review.task.userCustomerId">
                Заказчик
              </span>
              <span class="worker" v-else>Исполнитель</span>
						</div>
						<div class="rating">Рейтинг:
							<span class="rating-count">{{getRating(review.user)}}</span>
						</div>
						<div class="review-description">Отзывы:
							<span class="review-count">{{review.user.reviewsCount}}</span>
						</div>
					</div>
					<div class="time">{{new Date(review.created).format('dd mmmm')}}</div>
				</div>
			</div>
			<div class="review-task">
				Отзыв задания "
				<router-link 
          class="task-name"
          :to="{name:'taskPage', params: {taskId: review.taskId}}">
          {{review.task.name}}
        </router-link> "
			</div>
			<div class="review-text">
			  {{review.description}}
			</div>
			<div class="review-rating">
				<div class="review-rating-item">
          Вежливость
          <rating-box :ratingCount="review.rating1"></rating-box>
        </div>
        
				<div class="review-rating-item">
          Пункутальность
          <rating-box :ratingCount="review.rating2"></rating-box>
        </div>
				<div class="review-rating-item">
          Адекватнось
          <rating-box :ratingCount="review.rating3"></rating-box>
        </div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
@import "../../assets/elements.scss";

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
      color: $clr-font-grey;
    }
  }

  .review-text {
    line-height: 1.3;
  }

  .review-rating {
    padding-top: 10px;
    display: flex;

    .review-rating-item {
      margin-right: 15px;
    }
  }
}
</style>