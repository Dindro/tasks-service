<script>
export default {
  props: ["userId"],
  data() {
    return {
      lastYScrollPos: 0,
      upPos: 0,
      downPos: 0,
      user: {}
    };
  },
  computed: {
    /* user() {
      return this.$store.getters.userAuth;
    } */
    isMyPage() {
      const { id } = this.$store.getters.userAuth;
      return this.userId === id;
    }
  },
  methods: {
    scroll(e) {
      // условия - класс элемента не должен фиксироваться
      const boxID = "left-column";
      const boxTop = 57;
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
    },
    async getUser(userId) {
      // получаем с сервера о пользователе
      const user = await this.$store.dispatch("getUser", { userId });
      this.user = user;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
    window.addEventListener("resize", this.scroll);
    
    // получаем авторизированного пользователя
    
    
    this.getUser(this.userId);
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
          <button class="send-message" v-if="!isMyPage">Отправить сообщение</button>
          <button class="edit-profile" v-else>Редактировать профиль</button>
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
            <span class="name">{{user.name}} {{user.surname}}</span>
            <span class="status">
              <template v-if="user.status">Online</template>
              <template v-else>Offline</template>
            </span>
          </div>
          <div class="line after-name-status"></div>
          <div class="profile-info">
            <div class="profile-info-row" v-if="user.birthday">
              <div class="properties">Возраст:</div>
              <div class="description">{{user.birthday}}</div>
            </div>
            <div class="profile-info-row" v-if="user.city">
              <div class="properties">Город:</div>
              <div class="description">{{user.city}}</div>
            </div>
            <div class="profile-info-row" v-if="user.about">
              <div class="properties">О себе:</div>
              <div class="description">{{user.about}}</div>
            </div>
            <div class="profile-info-row" v-if="user.works">
              <div class="properties">Виды выполняемых работ:</div>
              <div class="description">
                <div class="work" v-for="work of user.works">{{work.name}}</div>
              </div>
            </div>
            <div class="profile-info-row">
              <div class="properties">Средний рейтинг:</div>
              <div class="description">{{user.rating}}</div>
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
                  <span class="task-name">Нужен курьер для доставки чего чего то</span>"
                </div>
                <div class="review-text">
                  Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут
                  находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится
                  отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв Тут находится отзыв
                  Тут находится отзыв Тут находится отзыв Тут находится отзыв
                </div>
                <div class="review-rating">
                  <div class="review-rating-item">Вежливость</div>
                  <div class="review-rating-item">Пункутальность</div>
                  <div class="review-rating-item">Адекватнось</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.dinamic {
  float: right;
  width: 795px;
}

.main-user {
  margin-top: 57px;
}

.mini-box {
  border: 1px solid $clr-box-border;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 15px; //padding: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}

.line {
  border-top: 1px solid $clr-border;
}

#left-column {
  float: left; //height: 900px;
  width: 230px; //background: linear-gradient(to top, #ff0000, #00ff00);
  // кроме position ничего добавлять
  &.fixed {
    position: fixed;
  }

  .user-photo {
    padding: 15px;

    .photo {
      height: 200px;
      background-color: dimgrey;
    }

    button {
      width: 100%;
      color: white;
      border: none;
      margin-top: 15px;
      border-radius: 3px;
      padding: 10px;
      cursor: pointer;

      &.send-message {
        background-color: $clr-button;
      }

      &.edit-profile {
        background-color: $clr-button-light;
        color: $clr-font-button-light;
      }
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
  margin-left: 245px; //height: 2000px;
  width: 550px; //background: linear-gradient(to top, #10f0ca, #cf0f5f);
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
          border-bottom: 1px solid #d6d6d6;
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
              padding-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
          }
        }

        .review-task {
          padding: 10px 0;
          color: #acacac;
        }

        .review-text {
          color: #424242;
        }

        .review-rating {
          padding-top: 10px;
          display: flex;
        }
      }
    }
  }
}
</style>