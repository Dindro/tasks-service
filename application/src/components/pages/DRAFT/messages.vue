<template>
	<div>
		<div class="head">
			<div class="head-content">Head</div>
		</div>
		<div class="main">
			<div id="nav">
				<div class="nav-content">
					<span>Моя страница</span>
					<span>Моя страница</span>
					<span>Моя страница</span>
					<span>Моя страница</span>
					<span>Моя страница</span>
					<span>Моя страница</span>
				</div>
			</div>
			<div class="dinamic">
				<div class="dinamic-content">
					<div id="messages-top">
						<div class="messages-top-elements"></div>
					</div>
					<div class="messages">
            <div class="message-onetime">
              <div class="photo"></div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
            </div>
            <div class="message-onetime">
              <div class="photo"></div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
            </div>
            <div class="message-onetime">
              <div class="photo"></div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
            </div>
            <div class="message-onetime">
              <div class="photo"></div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
            </div>
            <div class="message-onetime">
              <div class="photo"></div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
              <div class="message">
                <div class="message-text">Тут будет много текста</div>
              </div>
            </div>
          </div>
					<div id="messages-bottom">
						<div class="messages-bottom-elements"></div>
					</div>
				</div>
				<div id="options">
					<div class="options-content">
						<span>Все сообщения df dfdfdfdf dfdfdf dsfdfdfdf</span>
						<span class="active">Непрочитанные</span>
						<span>Важные</span>
						<div class="line"></div>
						<span>Яковлев Андрей</span>
						<span>Потрясилов Дмитрий</span>
						<span>Доставить букет цветов</span>
						<div class="line"></div>
						<span>C задачами  34</span>
						<div id="tasks">
							<span>Все сообщенияrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</span>
							<span>Очень сложное задание по моему</span>
							<span>Важные</span>
							<span>Все сообщения</span>
							<span>Непрочитанные</span>
							<span>Важные</span>
							<span>Все сообщения</span>
							<span>Непрочитанные</span>
							<span>Важные</span>
							<span>Все сообщения</span>
							<span>Непрочитанные</span>
							<span>Важные</span>
							<span>Все сообщения</span>
							<span>Непрочитанные</span>
							<span>Важные</span>
							<span>Все сообщения</span>
							<span>Непрочитанные</span>
							<span>Важные</span>
							<span>Все сообщения</span>
							<span>Непрочитанные</span>
							<span>Важные</span>
							<span>Все сообщения</span>
							<span>Непрочитанные</span>
							<span>Важные</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
function hscrollbar() {
  var elements = ["nav", "options", "messages-top", "messages-bottom"];
  var value = window.pageXOffset;

  for (let i = 0; i < elements.length; i++) {
    document.getElementById(
      elements[i]
    ).style.transform = `translateX(${-value}px)`;
  }
}
window.onscroll = hscrollbar;
window.onresize = hscrollbar;
</script>

<style lang="scss">
$color-background: #f5f5f5;
$color-border: #e3e4e8;
$color-black: #444444;
$color-active: #f0f2f5;

body {
  background-color: $color-background;
}

.head {
  width: 100%;
  background-color: #4a76a8;
  position: fixed;
  top: 0;
  z-index: 1000;

  & .head-content {
    width: 960px;
    height: 42px;
    color: white;
    margin: 0 auto;
    padding: 0 15px;
  }
}

.main {
  width: 960px;
  margin: 0 auto;
  padding: 0 15px;
  // overflow: auto; // Высота такая как у дочерних
  &::after{
    content: " ";
    display: block;
    height: 0;
    clear: both;
  }

  & #nav {
    position: fixed;
    min-height: 100vh;
    width: 149px;
    margin-top: 57px;
    float: left;

    > .nav-content {
      width: 100%;

      > span {
        display: block;
        padding: 8px 0 8px 25px;
        color: $color-black;
        white-space: nowrap; /* Запрещаем перенос строк */
        overflow: hidden; /* Обрезаем все, что не помещается в область */

        &:hover {
          background-color: #e1e5eb;
          border-radius: 2px;
        }
      }
    }
  }

  & .dinamic {
    float: right;
    width: 795px;

    & .dinamic-content {
      width: 550px;
      float: left;
    }

    & #options {
      display: flex;
      flex-direction: column;
      height: 100vh;
      position: fixed;
      width: 230px;
      float: right;
      margin-left: 565px;

      .line {
        border-top: 1px solid $color-border;
        margin: 7px 15px;
      }

      & .options-content {
        max-height: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 57px;
        margin-bottom: 15px;
        overflow: hidden;
        background-color: white;
        padding: 7px 0 0 0;
        border: 1px solid $color-border;
        border-radius: 2px 2px;

        > span {
          flex: 0 0 auto;
          display: block;
          color: $color-black;
          padding: 8px 10px 8px 20px;
          white-space: nowrap;
          /* Запрещаем перенос строк */
          text-overflow: ellipsis;
          /* Добавляем многоточие */
          overflow: hidden;

          &.active {
            background-color: #f0f2f5;
            font-weight: 500;
          }
        }
      }

      #tasks {
        flex: 1 1 auto;
        overflow: auto;
        padding-bottom: 8px;

        &:hover {
          &::-webkit-scrollbar-thumb {
            background-color: #d9dadd;
            border-radius: 10px;
          }
        }

        &::-webkit-scrollbar {
          width: 7px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: $color-border;
          border-radius: 10px;
        }

        span {
          white-space: nowrap; /* Запрещаем перенос строк */
          overflow: hidden; /* Обрезаем все, что не помещается в область */
          text-overflow: ellipsis; /* Добавляем многоточие */
          display: block;
          color: $color-black;
          padding: 8px 10px 8px 40px;
          transition: background-color ease-out 0.1s;

          &:hover {
            background-color: #f0f2f5;
          }
        }
      }
    }
  }
}

.dinamic-content {
  & #messages-top {
    height: 50px;
    width: 550px;
    position: fixed;
    background-color: $color-background; //Нужен, за ним скрывается список диалогов
    border-top: 15px solid $color-background; //Нужен, за ним скрывается список диалогов
    margin-top: 42px;

    & .messages-top-elements {
      width: 100%;
      height: 100%;
      border: 1px solid $color-border;
      box-sizing: border-box;
      border-radius: 2px 2px 0 0;
      background-color: white;
    }
  }

  & .messages {
    background-color: white;
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding-top: 107px;
    padding-bottom: 50px;
    border-left: 1px solid $color-border;
    border-right: 1px solid $color-border;
  }

  & #messages-bottom {
    height: 50px;
    width: 550px;
    position: fixed;
    bottom: 0;

    & .messages-bottom-elements {
      height: 100%;
      width: 100%;
      border: 1px solid $color-border;
      border-bottom: none;
      box-sizing: border-box;
      background-color: white;
    }
  }
}

.message-onetime {
  padding: 2.5px 5px;
  background-color: #b6b6b6;

  .photo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: green;
    position: sticky;
    top: 117px;
    z-index: 9999;
  }

  .message {
    height: 50px;
    background-color: rgba(255, 0, 0, 0.411);
    border-radius: 10px;

    .message-text {
      padding-left: 50px;
    }
  }
}

// .message {
//   padding: 2.5px 5px;

//   .message-box {
//     display: flex;
//     background-color: #9cb5d1;
//     border-radius: 2px;
//     padding: 5px 0;

//     .select {
//       width: 20px;
//       height: 20px;
//       border-radius: 50%;
//       background-color: #4a76a8;
//       margin-left: 5px;
//       margin-top: 11px;
//     }

//     .photo {
//       width: 40px;
//       height: 40px;
//       border-radius: 50%;
//       background-color: rgb(197, 197, 197);
//       border: 1px solid rgb(165, 165, 165);
//       margin-left: 10px;
//     }

//     .message-content {
//       flex: 1;
//       margin-left: 10px;

//       .message-top {
//         display: flex;
//         justify-content: space-between;

//         .name {
//           font-weight: 500;
//         }

//         .favorite {
//           margin: 0 10px;
//         }
//       }

//       .message-text {
//         padding: 5px 70px 5px 0;
//         line-height: 18px;
//         word-wrap: break-word;
//       }
//     }
//   }

//   & .chat-details {
//     display: flex;
//     box-sizing: border-box;
//     flex-direction: column;
//     flex: 1;
//     width: 0; // Что бы в содержимое работало троеточие
//     justify-content: space-around;

//     & .chat-details-top {
//       box-sizing: border-box;
//       display: flex;
//       justify-content: space-between;
//       padding: 0 20px 0 10px;

//       & .name-task {
//         display: flex;
//         flex: 1;
//         min-width: 0;

//         & .name {
//           display: block;
//           color: $color-black;
//           font-size: 14px;
//           font-weight: 500;
//           white-space: nowrap; /* Запрещаем перенос строк */
//           overflow: hidden; /* Обрезаем все, что не помещается в область */
//           text-overflow: ellipsis; /* Добавляем многоточие */
//         }

//         & .task {
//           white-space: nowrap; /* Запрещаем перенос строк */
//           color: #7a7a7a;
//           padding: 0 15px 0 10px;
//         }
//       }

//       & .time {
//         color: rgb(184, 184, 184);
//       }
//     }

//     & .chat-details-bottom {
//       padding: 0 17px 0 7px;
//       box-sizing: border-box;

//       & .read-status {
//         display: flex;
//         justify-content: space-between;
//         background-color: rgb(240, 240, 240);
//         padding: 3px;
//         border-radius: 20px 2px 2px 20px;
//         align-items: center;

//         & .photo-message {
//           display: flex;
//           align-items: center;
//           min-width: 0;

//           & .photo-sender {
//             width: 25px;
//             height: 25px;
//             border-radius: 50%;
//             min-width: 25px;
//             background-color: #4e4e4e;
//           }

//           & .message {
//             padding-left: 7px;
//             padding-right: 10px;
//             color: #656565;
//             /* max-width: 350px; */
//             white-space: nowrap;
//             /* Запрещаем перенос строк */
//             overflow: hidden;
//             /* Обрезаем все, что не помещается в область */
//             text-overflow: ellipsis;
//             /* Добавляем многоточие */
//           }
//         }

//         & .count {
//           padding: 1px 4px;
//           color: white;
//           border-radius: 10px;
//           background-color: #4a76a8;
//         }
//       }
//     }
//   }
// }
</style>