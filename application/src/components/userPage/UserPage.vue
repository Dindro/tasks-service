<script>
import RatingBox from "../elements/RatingBox";
import ReviewsList from "./ReviewsList";

import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  props: ["userId"],
  data() {
    return {
      lastYScrollPos: 0,
      upPos: 0,
      downPos: 0,
      rating: 4.5
    };
  },
  components: {
    RatingBox,
    ReviewsList
  },
  computed: {
    ...mapState("user", [
      "user",
      "favorites",
      "favoritesCount",
      "tasksCount",
      "tasks",
      "statics"
    ]),

    ...mapGetters(["isLogged"]),

    rating() {
      let rating = (user.rating1 + user.rating2 + user.rating3) / 3;
      return rating.toFixed(1);
    },

    isMyPage() {
      const { id } = this.$store.getters.userAuth;
      return parseInt(this.userId) === id;
    },

    age() {
      if ("birthday" in this.user) {
        const birthday = new Date(this.user.birthday);
        return new Date().getFullYear() - birthday.getFullYear();
      } else {
        return "-";
      }
    }
  },
  methods: {
    ...mapActions("user", [
      "getUser",
      "updateViews",
      "addToFavotites",
      "getFavorites",
      "getFavoritesCount",
      "getTasksCount",
      "getUserTasks",
      "getUserStatic",
      "getReviewsStatic"
    ]),
    ...mapMutations("user", ["common"]),

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
    }
  },
  created() {
    this.common({ type: "userId", value: this.userId });
    this.getUser(this.userId);
    this.getUserTasks();
    this.updateViews(this.userId);
    this.getFavorites();
    this.getFavoritesCount();
    this.getTasksCount();
    this.getUserStatic();
    this.getReviewsStatic();
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
    window.addEventListener("resize", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
    window.removeEventListener("resize", this.scroll);
  },
  beforeRouteUpdate(to, from, next) {
    this.common({ type: "userId", value: to.params.userId });
    this.getUser(to.params.userId);
    this.getUserTasks();
    this.updateViews(to.params.userId);
    this.getFavorites();
    this.getFavoritesCount();
    this.getTasksCount();
    this.getUserStatic();
    this.getReviewsStatic();
    next();
  }
};
</script>

<template>
  <div class="dinamic">
    <div class="main-user">
      <div id="left-column">
        <div class="user-photo mini-box">
          <div 
            class="photo"
            :style="{
              'background-image': `url(${user.image})`,
              'background-size':'cover'
            }">
          </div>
          <template v-if="isLogged">
            <button class="send-message" v-if="!isMyPage">Отправить сообщение</button>
            <button class="edit-profile" v-else>Редактировать профиль</button>
            <button 
              class="add-favorite" 
              @click="addToFavotites" 
              v-if="!isMyPage && !user.isFavorite">
              Добавить в избранные
            </button>
            <button 
              class="delete-favorite" 
              @click="addToFavotites" 
              v-if="!isMyPage && user.isFavorite">
              Удалить из избранных
            </button>
          </template> 
        </div>
        <div class="mini-box friends" v-if="favoritesCount !== 0">
          <div class="friends-top">
            Избранные
            <span class="friends-count">{{favoritesCount}}</span>
          </div>
          <div class="friends-list">
            <div class="friend" v-for="favorite in favorites" :key="favorite.id">
              <div 
                class="friend-photo"
                :style="{
                  'background-image': `url(${favorite.userAdding.image})`,
                  'background-size':'cover'
                }">
              </div>
              <router-link 
                class="friend-name"
                :to="{name:'userPage', params: {userId: favorite.userAdding.id}}">
                {{favorite.userAdding.name}}
              </router-link>
            </div>
          </div>
        </div>
        <div class="mini-box tasks" v-if="tasksCount !== 0">
         <div class="tasks-top">
            Задачи
            <span class="tasks-count">{{tasksCount}}</span>
          </div>
          <div class="tasks-list">
            <router-link class="task" v-for="task in tasks" :key="task.id" 
              :to="{ name: 'taskPage', params: {taskId: task.id}}" >
              {{task.name}}
            </router-link>
          </div>
        </div>
      </div>
      <div class="right-column">
        <div class="info mini-box">
          <div class="name-status">
            <span class="name">{{user.name}} {{user.surname}}</span>
            <span class="status">
              <!-- <template v-if="user.status">Online</template>
              <template v-else>Offline</template> -->
            </span>
          </div>
          <div class="line after-name-status"></div>
          <div class="profile-info">
            <div class="profile-info-row" v-if="user.birthday">
              <div class="properties">Возраст:</div>
              <div class="description">{{age}}</div>
            </div>
            <div class="profile-info-row" v-if="user.address">
              <div class="properties">Город:</div>
              <div class="description">{{user.address}}</div>
            </div>
            <div class="profile-info-row" v-if="user.about">
              <div class="properties">О себе:</div>
              <div class="description">{{user.about}}</div>
            </div>
            <div class="profile-info-row" v-if="user.works">
              <div class="properties">Виды выполняемых работ:</div>
              <div class="description">
                <div class="work" v-for="(work, key) in user.works" :key="key">
                  {{work.name}}
                </div>
              </div>
            </div>
            <div class="profile-info-row">
              <div class="properties">Средний рейтинг:</div>
              <div class="description">{{rating}}</div>
            </div>
            <div class="profile-info-row rating">
              <div class="properties">Вежливость:</div>
              <div class="description">
                <rating-box class="rating-item" :ratingCount="user.rating1"></rating-box>
              </div>
            </div>
            <div class="profile-info-row rating">
              <div class="properties">Пункутальность:</div>
              <div class="description">
                <rating-box class="rating-item" :ratingCount="user.rating2"></rating-box>
              </div>
            </div>
            <div class="profile-info-row rating">
              <div class="properties">Адекватнось:</div>
              <div class="description">
                <rating-box class="rating-item" :ratingCount="user.rating3"></rating-box>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="totals">
            <div class="total">
              <div class="count">
                {{statics.favoritesCount}}
              </div>
              <div class="description">избранных</div>
            </div>
            <div class="total">
              <div class="count">
                {{statics.reviewsCount}}
              </div>
              <div class="description">отзывов</div>
            </div>
            <div class="total">
              <div class="count">
                {{statics.tasksSuccessCount}}
              </div>
              <div class="description">выполненных заданий</div>
            </div>
            <div class="total">
              <div class="count">
                {{statics.tasksCreateCount}}
              </div>
              <div class="description">созданных заданий</div>
            </div>
            <div class="total">
              <div class="count">
                {{user.views}}
              </div>
              <div class="description">просмотров</div>
            </div>
          </div>
        </div>
        <reviews-list></reviews-list>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
@import "../../assets/elements.scss";

.dinamic {
  float: right;
  width: 795px;
}

.main-user {
  margin-top: 57px;
}

.mini-box {
  @extend %box;

  margin-bottom: 15px; //padding: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}

.line {
  border-top: 1px solid $clr-border;
}

#left-column {
  // кроме position ничего добавлять
  float: left;
  width: 230px;

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
      transition: background-color 0.2s ease;

      &.send-message {
        background-color: $clr-btn;

        &:hover {
          background-color: $clr-btn-hover;
        }
      }

      &.edit-profile {
        background-color: $clr-btn-light;
        color: $clr-btn-font-light;

        &:hover {
          background-color: $clr-btn-hover-light;
        }
      }

      &.add-favorite {
        margin-top: 10px;
        background-color: $clr-btn-light;
        color: $clr-btn-font-light;

        &:hover {
          background-color: $clr-btn-hover-light;
        }
      }

      &.delete-favorite {
        margin-top: 10px;
        @extend %button-red;
      }
    }
  }

  .friends {
    padding-top: 15px;
    padding-bottom: 5px;

    .friends-top {
      cursor: pointer;
      padding: 0 15px;

      .friends-count {
        color: $clr-font-grey;
        padding-left: 5px;
      }
    }

    .friends-list {
      padding: 20px 11px 0 11px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .friend {
      width: 66px;
      padding-bottom: 10px;
      cursor: pointer;

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
        font-size: 12.5px;
        color: $clr-font-blue-link;

        // запрещаем перенос строк
        white-space: nowrap;

        // обрезаем все, что не помещается в область
        overflow: hidden;

        // добавляем многоточие
        text-overflow: ellipsis;
      }
    }
  }

  .tasks {
    padding: 15px 15px 8px 15px;

    .tasks-top {
      cursor: pointer;

      .tasks-count {
        color: $clr-font-grey;
        padding-left: 5px;
      }
    }

    .tasks-list {
      padding-top: 15px;

      .task {
        display: block;
        padding-bottom: 7px;
        border-bottom: 1px solid $clr-border;
        margin-bottom: 7px;
        color: $clr-font-blue-link;
        cursor: pointer;

        &:last-child {
          padding-bottom: 7px;
          border-bottom: none;
          margin-bottom: 0;
        }
      }
    }
  }
}

.right-column {
  margin-left: 245px;
  width: 550px;
  margin-bottom: 15px;

  .info {
    .name-status {
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name {
        font-size: 20px;
        font-weight: 400;
      }

      .status {
        color: $clr-font-grey;
      }
    }

    .after-name-status {
      margin: 0 20px;
    }

    .profile-info {
      padding: 15px 20px;

      .profile-info-row {
        padding-bottom: 8px;
        font-size: 13px;
        display: flex;

        .properties {
          color: $clr-font-grey;
          width: 165px;
          padding-right: 5px;
          box-sizing: border-box;

          // перенос слов
          word-wrap: break-word;
        }

        .description {
          // перенос слов
          word-wrap: break-word;
          width: 343px;
        }

        &.rating {
          .description {
            position: relative;

            .rating-item {
              display: inline-block;
              position: absolute;
              top: -3px;
            }
          }
        }
      }
    }

    .totals {
      padding: 15px 20px;
      display: flex;
      justify-content: space-around;

      .total {
        cursor: pointer;
        min-width: 100px;

        &:hover {
          .description {
            color: $clr-font-blue-link;
          }
        }

        .count {
          font-size: 21px;
          font-weight: 400;
          text-align: center;
          color: $clr-font-blue-link;
        }

        .description {
          text-align: center;
          color: $clr-font-grey;
          padding-top: 3px;
          transition: color 0.2s ease;
        }
      }
    }
  }

  .rewiews {
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
}
</style>