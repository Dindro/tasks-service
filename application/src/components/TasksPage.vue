<script>
export default {};
</script>

<template>
  <div class="dinamic">
    <div class="dinamic-content">
      <div class="tasks">
        <div class="tasks-tab">
          <div class="tasks-tab-items">
            <div class="tasks-tab-item">
              <span class="tab-name">Все задания</span>
            </div>
            <div class="tasks-tab-item active">
              <span class="tab-name">Мои задания</span>
              <span class="tab-count">35</span>
            </div>
          </div>
          <div class="tasks-tab-buttons">
            <button class="task-add">Добавить задание</button>
          </div>
        </div>
        <div class="tasks-options">
          <div class="search">
            <input type="text" id="search" placeholder="Поиск по заданиям">
            <button class="tofind">
              <i class="icon-search"></i>
            </button>
          </div>
        </div>
        <div class="tasks-list">
          <div class="task" v-for="(task, i) in 50" :key="i">
            <div class="task-name-price">
              <div class="task-name">Заменить экран на Xiaomi Redmi Note 4x Заменить экран на Xiaomi Redmi Note 4x</div>
              <div class="price">600 руб</div>
            </div>
            <div class="user-task-info">
              <div class="user">
                <div class="photo"></div>
                <div class="user-info">
                  <div class="user-name">Марков Александр</div>
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
        </div>
      </div>
    </div>
    <div id="options">
      <div class="map-box">
        <div class="map">
          <yandex-map
            style="width: 100%; height: 100%"
            :coords="[54.82896654088406, 39.831893822753904]"
          >
          </yandex-map>
        </div>
        <button class="map-show">Показать полностью</button>
      </div>

      <div class="find-options">
        <div class="options-top">
          Параметры поиска
        </div>
        <div class="option-list">
          <div class="option" v-for="(option, key) in 10" :key="key">
            <div class="option-name">Сортировка</div>
            <select>
              <option>1 Что то то</option>
              <option>2 Что то то</option>
              <option>3 Что то то</option>
              <option>4 Что то то</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";

$color-border: #e3e4e8;
$color-black: #444444;

.dinamic {
  float: right;
  width: 795px;
}

.dinamic-content {
  width: 550px;
  float: left;

  .tasks {
    background-color: white;
    margin: 57px 0 15px 0;
    border-radius: 2px;
    border: 1px solid $clr-border;

    .tasks-tab {
      display: flex;
      justify-content: space-between;
      padding: 0 12px;
      border-bottom: 1px solid $clr-border;
      background-color: $clr-tab-background;

      .tasks-tab-items {
        display: flex;

        .tasks-tab-item {
          padding: 17px 5px;
          margin: 0 3px -1px 3px;
          cursor: pointer;

          &.active {
            border-bottom: 2px solid $clr-blue;
            padding-bottom: 15px;
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

      .tasks-tab-buttons {
        display: flex;
        padding-right: 8px;

        button.task-add {
          cursor: pointer;
          margin: auto;
          background-color: $clr-btn;
          color: white;
          border: none;
          padding: 7px 10px;
          border-radius: 4px;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: $clr-btn-hover;
          }
        }
      }
    }

    .tasks-options {
      padding: 20px;

      .search {
        display: flex;
        border: 1px solid $clr-tb-border;
        border-radius: 2px;

        #search {
          width: 100%;
          border: none;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
          padding: 10px 15px;
          box-sizing: border-box;
          border-right: 1px solid $clr-tb-border;
          outline: none;
        }

        .tofind {
          background-color: $clr-tb-btn-background;
          border: none;
          width: 50px;
          font-size: 22px;
          color: $clr-tb-btn-font;
          outline: none;
          cursor: pointer;

          i {
            position: relative;
            top: 2px;
          }
        }
      }
    }

    .tasks-list {
      padding: 0 20px 15px 20px;

      .task {
        border-bottom: 1px solid $clr-border;
        padding-bottom: 14px;
        margin-bottom: 15px;

        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .task-name-price {
          display: flex;
          justify-content: space-between;

          .task-name {
            color: $clr-font-blue;
            font-size: 15px;
            font-weight: 500;
            word-wrap: break-word;
            padding-right: 10px;
            box-sizing: border-box;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }

          .price {
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
                color: $clr-font-blue;
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
}

#options {
  height: 400px;
  width: 230px;
  margin: 57px 0 15px 565px;

  .map-box {
    border: 1px solid $clr-border;
    border-radius: 2px;
    background-color: white;
    padding: 15px;

    .map {
      height: 198px;
      background-color: $clr-font-grey;
    }

    button.map-show {
      background-color: $clr-btn-light;
      border: none;
      padding: 10px 20px;
      border-radius: 2px;
      color: $clr-btn-font-light;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.2s ease;
      margin-top: 15px;

      &:hover {
        background-color: $clr-btn-hover-light;
      }
    }
  }

  .find-options {
    margin-top: 15px;
    border: 1px solid $clr-border;
    border-radius: 2px;
    background-color: white;

    .options-top {
      border-bottom: 1px solid $clr-border;
      padding: 15px;
      background-color: $clr-tab-background;
    }

    .option-list {
      padding: 15px;

      .option {
        border-bottom: 1px solid $clr-border;
        padding-bottom: 15px;
        margin-bottom: 15px;

        &:last-child {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }

        .option-name {
          font-weight: 500;
          color: $clr-font-darkgrey;
        }

        select {
          width: 100%;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>