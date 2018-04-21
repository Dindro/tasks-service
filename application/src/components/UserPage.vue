<script>
export default {
  props: [],
  data() {
    return {
      lastYScrollPos: 0,
      upPos: 0,
      downPos: 0
    };
  },
  methods: {
    scroll(e) {
      // условия - класс элемента не должен фиксироваться
      const boxID = "left-column";
      const boxTop = 70;
      const boxBottom = 15;
      const YScrollPos = e.currentTarget.scrollY;

      // через document, потомучто учитывается без скролл бара
      const winHeight = document.documentElement.clientHeight;

      const box = document.getElementById(boxID);
      const boxHeight = box.clientHeight;
      const boxFullHeight = boxHeight + boxTop + boxBottom;
      const boxInvisibleHeight = boxFullHeight - winHeight;

      // условие при первом запуске
      if (this.downPos === 0) {
        this.downPos = boxInvisibleHeight + YScrollPos;
      }

      // высота экрана больше чем высота блока
      const isBoxOnScreen = boxFullHeight < winHeight;

      // позиция скрола поменялась
      const isScrollChange = this.lastYScrollPos !== YScrollPos;
      if (!isBoxOnScreen && isScrollChange) {
        // скролл вниз
        const isToDown = this.lastYScrollPos < YScrollPos;
        if (isToDown) {
          const rodePos = this.upPos + boxInvisibleHeight;
          const isRodeDown = rodePos < YScrollPos;

          if (isRodeDown) {
            // скрол проехал
            box.classList.add("fixed");
            box.style.bottom = `${boxBottom}px`;
            box.style.marginTop = "";

            // при фиксации меняем позиции
            this.upPos = YScrollPos - boxInvisibleHeight;
            this.downPos = YScrollPos;
          } else {
            // скрол не проехал
            if (box.style.marginTop === "") {
              box.style.marginTop = `${this.upPos}px`;
            }
            box.classList.remove("fixed");
          }
        } else {
          // скролл наверх
          const isRodeUp = this.upPos > YScrollPos;

          if (isRodeUp) {
            // скрол проехал
            box.classList.add("fixed");
            box.style.marginTop = "";

            this.upPos = YScrollPos;
            this.downPos = YScrollPos + boxInvisibleHeight;
          } else {
            if (box.style.marginTop === "") {
              const boxMarginTop = this.downPos - boxInvisibleHeight;
              box.style.marginTop = `${boxMarginTop}px`;
            }
            box.style.bottom = "";
            box.classList.remove("fixed");
          }
        }
      } else if (isBoxOnScreen) {
        box.classList.add("fixed");
        box.style.bottom = "";
        box.style.marginTop = "";
      }
      this.lastYScrollPos = YScrollPos;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
    window.addEventListener("resize", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
    window.removeEventListener("resize", this.scroll);
  }
};
</script>

<template>
	<div class="dinamic">
		<div class="main-user">
			<div id="left-column">
        <div class="user-photo mini-box">
          <div class="photo"></div>
          <button class="send-message">Отправить сообщение</button>
        </div>
        <div class="mini-box friends">
          Избранные 43
          <div class="friends-list">
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
          </div>
        </div>
        <div class="mini-box tasks">
          Открытые задачи 4
          <div class="tasks-list">
            <div class="task">Описание задачи описание</div>
          </div>
        </div>
      </div>
			<div class="right-column">
        <div class="info mini-box">
          <div class="name-status">
            <span class="name">Семенов Сергей</span>
            <span class="status">Online</span>
          </div>
          <div class="line after-name-status"></div>
          <div class="profile-info">
            <div class="profile-info-row">
              <div class="properties">Возраст:</div>
              <div class="description">18</div>
            </div>
            <div class="profile-info-row">
              <div class="properties">Город:</div>
              <div class="description">Чебоксары</div>
            </div>
            <div class="profile-info-row">
              <div class="properties">О себе:</div>
              <div class="description">
                Описание описание описание описание Описание описание описание описание 
                Описание описание описание описание Описание описание описание описание
                Описание описание описание описание Описание описание описание описание
                Описание описание описание описание Описание описание описание описание
                Описание описание описание описание Описание описание описание описание
                Описание описание описание описание Описание описание описание описание
                Описание описание описание описание Описание описание описание описание
              </div>
            </div>
            <div class="profile-info-row">
              <div class="properties">Виды выполняемых работ:</div>
              <div class="description">
                <div class="work">Что то то то и его описание</div>
                <div class="work">Что то то то и его описание</div>
                <div class="work">Что то то то и его описание</div>
                <div class="work">Что то то то и его описание</div>
                <div class="work">Что то то то и его описание</div>
                <div class="work">Что то то то и его описание</div>
                <div class="work">Что то то то и его описание</div>
              </div>
            </div>
            <div class="profile-info-row">
              <div class="properties">Средний рейтинг:</div>
              <div class="description">4.6</div>
            </div>
            <div class="profile-info-row">
              <div class="properties">Рейтинг:</div>
              <div class="description">
                <div class="rating">Вежливость</div>
                <div class="rating">Пункутальность</div>
                <div class="rating">Адекватнось</div>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="totals">
            <div class="total">
              <div class="count">
                35
              </div>
              <div class="description">отзывов</div>
            </div>
            <div class="total">
              <div class="count">
                56
              </div>
              <div class="description">выполненных заданий</div>
            </div>
            <div class="total">
              <div class="count">
                4
              </div>
              <div class="description">созданных заданий</div>
            </div>
            <div class="total">
              <div class="count">
                10493
              </div>
              <div class="description">просмотров</div>
            </div>
          </div>
        </div>
        <div class="rewiews mini-box">
          <div class="reviews-tab">
            <div class="reviews-tab-item">
              <span class="tab-name">Все отзывы</span>
              <span class="tab-count">35</span>
            </div>
            <div class="reviews-tab-item active">
              <span class="tab-name">От исполнителей</span>
              <span class="tab-count">35</span>
            </div>
            <div class="reviews-tab-item">
              <span class="tab-name">От заказчиков</span>
              <span class="tab-count">35</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="reviews-list">
              <div class="review" v-for="(n, i) in 10" :key="i">
                <div class="user">
                  <div class="user-photo"></div>
                  <div class="user-info">
                    <div class="name-worker">
                      <span class="name"></span>
                      <span class="worker"></span>
                    </div>
                    <div class="rating">
                      Рейтинг:
                      <span class="rating-count">4.6</span>
                    </div>
                    <div class="review-description">
                      Отзывы:
                      <span class="review-count">4</span>
                    </div>
                  </div>
                  <div class="time"></div>
                </div>
                <div class="review-task">
                  Отзыв задания "
                  <span class="task-name">Нужен курьер для доставки чего чего то</span>"
                </div>
                <div class="review-text">
                  Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв 
                  Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв 
                  Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв 
                  Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв 
                  Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв 
                </div>
                <div class="review-rating">
                  <div class="review-rating-item">Вежливость</div>
                  <div class="review-rating-item">Пункутальность</div>
                  <div class="review-rating-item">Адекватнось</div>
                </div>
                <div class="line"></div>
              </div>
          </div>
        </div>
      </div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$color-border: #e3e4e8;

.dinamic {
  float: right;
  width: 795px;
}
.main-user {
  margin-top: 70px;
  //background-color: rgb(159, 185, 185);
}

.mini-box {
  border: 1px solid rgb(230, 230, 230);
  background-color: white;
  border-radius: 5px;
  margin-bottom: 15px;
  //padding: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}

.line {
  border-top: 1px solid $color-border;
}

#left-column {
  float: left;
  //height: 900px;
  width: 230px;
  //background: linear-gradient(to top, #ff0000, #00ff00);

  // кроме position ничего добавлять
  &.fixed {
    position: fixed;
  }

  .user-photo {
    padding: 15px;

    .photo {
      height: 200px;
      background-color: violet;
    }

    .send-message {
      width: 100%;
      background-color: slateblue;
      border: none;
      margin-top: 15px;
      border-radius: 3px;
      padding: 10px;
    }
  }

  .friends {
    padding: 15px;
    padding-bottom: 5px;

    .friends-list {
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .friend {
      width: 66px;
      padding-bottom: 10px;

      .friend-photo {
        margin: 0 auto;
        height: 50px;
        width: 50px;
        background-color: grey;
        border-radius: 50%;
      }

      .friend-name {
        text-align: center;
        display: block;
        margin: 0 auto;
        margin-top: 5px;
      }
    }
  }
}

.right-column {
  margin-left: 245px;
  //height: 2000px;
  width: 550px;
  //background: linear-gradient(to top, #10f0ca, #cf0f5f);

  .info {
    .name-status {
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name {
        font-size: 22px;
        font-weight: 400;
      }
    }

    .after-name-status {
      margin: 0 20px;
    }

    .profile-info {
      padding: 15px 20px;

      .profile-info-row {
        padding-bottom: 10px;
        font-size: 13px;

        .properties {
          width: 165px;
          float: left;
        }
        .description {
          margin-left: 165px;
        }
      }
    }

    .totals {
      padding: 15px 20px;
      display: flex;
      justify-content: space-around;

      .total {
        max-width: 100px;

        .count {
          font-size: 20px;
          text-align: center;
        }

        .description {
          text-align: center;
        }
      }
    }
  }

  .rewiews {
    .reviews-tab {
      display: flex;
      padding: 0 10px;

      .reviews-tab-item {
        padding: 17px 10px;

        &.active {
          border-bottom: 2px solid #4a76a8;
          padding-bottom: 15px;
        }

        &:hover {
          border-bottom: 2px solid rgba(74, 118, 168, 0.37);
          padding-bottom: 15px;
        }

        .tab-count {
          padding-left: 5px;
        }
      }
    }
  }
}
</style>

