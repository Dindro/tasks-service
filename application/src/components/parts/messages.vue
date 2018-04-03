<template>
	<div class="dinamic-content">
		<div id="messages-top">
			<div class="messages-top-elements"></div>
		</div>
		<div class="messages" v-bind:style="styleMessageBottom">
			<div class="message-onetime">
				<div class="photo"></div>
				<div class="container">
					<div class="message-top">
						<div class="name-time">
							<span class="name">Сергей</span>
							<span class="time">14:45</span>
						</div>
					</div>
					<div class="message">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">
								Обычный текст Обычный текст Обычный текст Обычный текст Обычный текст Обычный текст Обычный текст 
								<div class="insert">
									<div class="insert-top">
										<div class="insert-photo"></div>
										<div class="name-time">
											<span class="name">Мария</span>
											<span class="time">12:33</span>
										</div>
									</div>
									<div class="insert-messages">
										<div class="insert-message">Вложенное сообщение Вложенное сообщение Вложенное сообщение Вложенное сообщение</div>
										<div class="insert-message">Вложенное сообщение Вложенное сообщение Вложенное сообщение Вложенное сообщение</div>
										<div class="insert-message">Вложенное сообщение Вложенное сообщение Вложенное сообщение Вложенное сообщение</div>
										<div class="insert-message">Вложенное сообщение Вложенное сообщение Вложенное сообщение Вложенное сообщение</div>
									</div>
								</div>
							</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message selected">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message selected">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message selected">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message selected">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message selected">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="message-onetime">
				<div class="photo"></div>
				<div class="container">
					<div class="message-top">
						<div class="name-time">
							<span class="name">Сергей</span>
							<span class="time">14:45</span>
						</div>
					</div>
					<div class="message selected unread">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста Тут будет много текста Тут будет много текста Тут будет много текста
								Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message unread">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message unread">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="message-onetime">
				<div class="photo"></div>
				<div class="container">
					<div class="message-top">
						<div class="name-time">
							<span class="name">Сергей</span>
							<span class="time">14:45</span>
						</div>
					</div>
					<div class="message selected">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста Тут будет много текста Тут будет много текста Тут будет много текста
								Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message unread">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message unread">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="message-onetime">
				<div class="photo"></div>
				<div class="container">
					<div class="message-top">
						<div class="name-time">
							<span class="name">Сергей</span>
							<span class="time">14:45</span>
						</div>
					</div>
					<div class="message selected">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста Тут будет много текста Тут будет много текста Тут будет много текста
								Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message selected">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="message-onetime">
				<div class="photo"></div>
				<div class="container">
					<div class="message-top">
						<div class="name-time">
							<span class="name">Сергей</span>
							<span class="time">14:45</span>
						</div>
					</div>
					<div class="message unread">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста Тут будет много текста Тут будет много текста Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message unread">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message unread">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
					<div class="message unread">
						<div class="select"></div>
						<div class="is-read">
							<div class="message-text">Тут будет много текста Тут будет много текста</div>
							<div class="items">
								<span class="response"></span>
								<span class="favorite"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="messages-bottom" ref="messagesBottom">
			<!--iframe - хак, для того чтобы отслеживать изменения реальной высоты (а не у стиля)-->
			<iframe id="iframe-messages-bottom" name="iframeMessagesBottom"></iframe>
			<div class="messages-bottom-elements">
				<div class="attach">
					<div class="attach-messages">
						<div class="attach-messages-content">
							<span class="top">Прикрепленные сообщения</span>
							<span class="bottom">3 сообщения</span>
						</div>
						<div class="close">x</div>
					</div>
					<div class="attach-images">
						<div class="image">
							<div class="close">x</div>
						</div>
						<div class="image">
							<div class="close">x</div>
						</div>
						<div class="image">
							<div class="close">x</div>
						</div>
						<div class="image">
							<div class="close">x</div>
						</div>
					</div>
				</div>
				<textarea name="" id="message-new" placeholder="Введите сообщение..."></textarea>
				<div class="elements-bottom">
					<div class="attach-item">Прикрепить вложения</div>
					<div class="send">Отправить</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data: function() {
    return {
      messagesBottomHeight: 0,
      timeTranslateX: 0,
      fixedElements: ["nav", "options", "messages-top", "messages-bottom"]
    };
  },
  computed: {
    styleMessageBottom: function() {
      return {
        "padding-bottom": this.messagesBottomHeight + "px"
      };
    }
  },
  methods: {
    ChangeMessagesBottomHeight: function(event) {
      const height = event.currentTarget.innerHeight;
      console.log(height);
      if (this.messagesBottomHeight != height)
        this.messagesBottomHeight = height;
    },
    ChangeFixedElements: function(event) {
      const value = window.pageXOffset;
      if (value != this.timeTranslateX) {
        for (let item of this.fixedElements) {
          let element = document.getElementById(item);
          element.style.transform = `translateX(${-value}px)`;
        }
        this.timeTranslateX = value;
      }
    }
  },
  mounted: function() {
    // Вызываем в первый раз чтобы изменил соотношение
    this.ChangeMessagesBottomHeight({
      currentTarget: { innerHeight: iframeMessagesBottom.innerHeight }
    });
    iframeMessagesBottom.addEventListener(
      "resize",
      this.ChangeMessagesBottomHeight
    );

    // Для изменение оси Х фиксированных элементов
    window.addEventListener("scroll", this.ChangeFixedElements);
    window.addEventListener("resize", this.ChangeFixedElements);
  },

  beforeDestroy: function() {
    window.removeEventListener("scroll", this.ChangeFixedElements);
    window.removeEventListener("resize", this.ChangeFixedElements);
  }
};
</script>

<style lang="scss">
$color-background: #f5f5f5;
$color-border: #e3e4e8;
$color-black: #444444;
$color-active: #f0f2f5;

$color-message-selected: #edf0f5;
$color-time: rgba(120, 126, 140, 0.6);

.dinamic-content {
  width: 550px;
  float: left;

  #messages-top {
    height: 50px;
    width: 550px;
    position: fixed;
    background-color: $color-background; //Нужен, за ним скрывается список диалогов
    border-top: 15px solid $color-background; //Нужен, за ним скрывается список диалогов
    margin-top: 42px;
    z-index: 100;

    .messages-top-elements {
      width: 100%;
      height: 100%;
      border: 1px solid $color-border;
      box-sizing: border-box;
      border-radius: 2px 2px 0 0;
      background-color: white;
    }
  }

  .messages {
    background-color: white;
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding-top: 107px;
    padding-bottom: 140px;
    border-left: 1px solid $color-border;
    border-right: 1px solid $color-border;
  }

  #messages-bottom {
    width: 550px;
    position: fixed;
    bottom: 0;
    z-index: 100;
    background-color: #fafbfc;
    border-bottom: 15px solid #f5f5f5;

    #iframe-messages-bottom {
      height: calc(100% + 15px);
      width: 100%;
      position: absolute;
      border: 0;
      z-index: -1;
    }

    .messages-bottom-elements {
      width: 100%;
      border: 1px solid $color-border;
      border-radius: 0 0 2px 2px;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-direction: column;

      .attach {
        .attach-messages {
          border-left: 2px solid #bccde0;
          position: relative;
          margin-bottom: 10px;

          .attach-messages-content {
            padding-left: 10px;

            .top {
              font-weight: 500;
              padding-bottom: 3px;
            }

            .bottom {
              padding-top: 3px;
            }
          }

          .close {
            position: absolute;
            right: 0;
            top: 0;
          }

          span {
            display: block;
          }
        }

        .attach-images {
          display: flex;
          margin-bottom: 10px;

          .image {
            width: 100px;
            height: 50px;
            border-radius: 3px;
            background-color: #f0f2f5;
            margin: 0 2.5px;
            position: relative;
            display: flex;

            &:first-child {
              margin-left: 0;
            }

            &:last-child {
              margin-right: 0;
            }

            .close {
              margin: auto; // По середине блока
            }
          }
        }
      }

      #message-new {
        width: 100%;
        height: 63px;
        outline: none;
        resize: none;
        overflow: auto;
        box-sizing: border-box; // Иначе ширина выше
        padding: 5px 10px 5px 10px;
        line-height: 17px;
        border-radius: 2px;
        border-color: #d3d9de;
      }

      .elements-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;

        .send {
          background-color: #4a76a8;
          padding: 8px 14px;
          color: white;
          border-radius: 2px;
        }
      }
    }
  }
}

$message-top: 7px;
$message-bottom: 7px;

$select-wh: 16px; // Ширина и высота селекта
$photo-wh: 36px; // Ширина и высота фото

$select-mt: $message-top + ($photo-wh/2) - ($select-wh/2);
$photo-ml: 5 + $select-wh + 10; // margin-left фото

$message-minH: $message-top + $photo-wh + $message-bottom; // Когда только одно сообщение
$message-text-ml: 5 + $photo-wh + 10;
$message-top-left: 5 + $select-wh + 10 + $photo-wh + 10;

$container-mt: -($photo-wh + $message-top + $message-bottom); // margin-top контейнера

.message-onetime {
  padding: 2.5px 5px;

  .photo {
    width: $photo-wh;
    height: $photo-wh;
    border-radius: 50%;
    background-color: rgb(88, 88, 88);
    position: sticky;
    top: 117px;
    z-index: 50;
    margin: 7px 0 7px $photo-ml;
  }

  .container {
    margin-top: $container-mt;
    position: relative;

    .message-top {
      position: absolute;
      left: $message-top-left;
      top: 7px;
      z-index: 1;

      & + .message {
        min-height: $message-minH;

        .message-text {
          padding-top: 23px;
          padding-bottom: 7px;
          padding-left: $message-text-ml;
        }

        .select {
          margin: $select-mt 0 0 5px;
        }
      }

      .name {
        color: $color-black;
        font-weight: 500;
      }

      .time {
        color: hsla(220, 8%, 51%, 0.6);
      }
    }
  }

  .message {
    display: flex;
    margin-top: 3px;

    &:last-child {
      padding-bottom: 3px;
    }

    // При наведении
    &:hover {
      cursor: pointer;

      .select {
        display: block;
      }

      .items {
        .response,
        .favorite {

        }
      }
    }

    // Выбран
    &.selected {
      background-color: $color-message-selected;
      border-radius: 3px 3px 0 0;

      // Последний селект во всем контейнере
      &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }

      & + .message.selected {
        border-radius: 0;

        &:before {
          display: block;
          margin-top: -3px;
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: $color-message-selected;
        }
      }

      & + .message:not(.selected):before {
        display: block;
        margin-top: -3px;
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        border-radius: 0 0 3px 3px;
        background: $color-message-selected;
      }

      .select {
        display: block;
      }
    }

    // Непрочитанные сообщения
    &.unread {
      .is-read {
        background-color: $color-message-selected;
        border-radius: 3px 3px 0 0;
        position: relative;
      }

      & + .unread .is-read {
        border-radius: 0;

        &:before {
          display: block;
          margin-top: -3px;
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: $color-message-selected;
        }
      }

      & + .unread:last-child .is-read {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        padding-bottom: 3px;
      }
    }

    .select {
      position: absolute;
      width: $select-wh;
      height: $select-wh;
      border-radius: 50%;
      background-color: #7293b6;
      display: none;
      margin: 10px 0 7px 5px; // 10px из за margin-bottom: 3px
      min-width: $select-wh;
    }

    .is-read {
      display: flex;
      margin: 0 25px 0 26px;
      flex: 1;
      position: relative;

      .message-text {
        color: black;
        flex: 1;
        line-height: 18px;
        padding-top: 7px;
        padding-right: 50px;
        padding-bottom: 7px;
        padding-left: $message-text-ml;

        .insert {
          border-left: 2px solid #dee6ee;
          padding-left: 5px;
          margin-top: 7px;

          .insert-top {
            display: flex;

            .insert-photo {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              background-color: rgb(196, 196, 196);
            }

            .name-time {
              padding-left: 5px;

              span.name {
                font-weight: 500;
                color: $color-black;
                display: block;
              }

              span.time {
                color: $color-time;
              }
            }
          }

          .insert-messages {
            .insert-message {
              padding: 3px 0;
            }
          }
        }
      }

      .items {
        position: absolute;
        right: 0;

        .response,
        .favorite {
          display: inline-block;
          width: 15px;
          height: 15px;
          background-color: transparent;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>