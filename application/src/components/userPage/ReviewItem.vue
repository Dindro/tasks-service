<script>
export default {};
</script>

<template>
	<div class="review">
		<div class="border">
			<div class="user">
				<div class="user-photo"></div>
				<div class="user-info-time">
					<div class="user-info">
						<div class="name-worker">
							<span class="name">Якимова Кристина</span>
							<span class="worker">Заказчик</span>
						</div>
						<div class="rating">Рейтинг:
							<span class="rating-count">4.6</span>
						</div>
						<div class="review-description">Отзывы:
							<span class="review-count">4</span>
						</div>
					</div>
					<div class="time">3 апреля</div>
				</div>
			</div>
			<div class="review-task">
				Отзыв задания "
				<span class="task-name">Нужен курьер для доставки чего чего то</span> "
			</div>
			<div class="review-text">
				Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут
				находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв
				Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв
				Тут находится отзыв Тут находится отзыв
			</div>
			<div class="review-rating">
				<div class="review-rating-item">Вежливость</div>
				<div class="review-rating-item">Пункутальность</div>
				<div class="review-rating-item">Адекватнось</div>
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
</style>