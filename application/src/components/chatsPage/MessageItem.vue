<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

export default {
  props: ["msg"],
  data() {
    return {
      message: this.msg,
      isSelected: false,
    };
  },
  computed: {
    ...mapState("chat", ["chatUsers"]),

    user() {
      const userId = this.message.userId;
      return this.chatUsers.find(user => user.id === userId);
    }
  },
  methods: {
    select() {
      this.isSelected = !this.isSelected;
    }
  }
};
</script>


<template>
  <div class="message-onetime">
		<div 
      :style = "{
        'background-image': `url(${user.image})`,
        'background-size': 'cover'
      }"
      class="photo">
    </div>
		<div class="container">
			<div class="message-top">
				<div class="name-time">
					<router-link :to="{name:'userPage', params: {userId: user.id}}" class="name">{{user.name}}</router-link>
					<span class="time">{{new Date(message.created).format('HH:MM')}}</span>
				</div>
			</div>
			<div 
        class="message"
        :class="{selected: isSelected}"
        @click="select">
				<div class="select icon-select"></div>
				<div class="is-read">
					<div class="message-text">
						{{message.text}} 
						<div class="insert" v-if="message.insert">
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
						<span class="response icon-reply"></span>
						<span class="favorite icon-star"></span>
					</div>
				</div>
			</div>
			<div class="message selected" v-if="message.other">
				<div class="select icon-select"></div>
				<div class="is-read">
					<div class="message-text">Тут будет много текста Тут будет много текста</div>
					<div class="items">
						<span class="response icon-reply"></span>
						<span class="favorite icon-star"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

export default {
  props: ["msg"],
  data() {
    return {
      message: this.msg,
      isSelected: false
    };
  },
  computed: {
    ...mapState("chat", ["chatUsers"]),

    user() {
      const userId = this.message.userId;
      return this.chatUsers.find(user => user.id === userId);
    }
  },
  methods: {
    select() {
      this.isSelected = !this.isSelected;
    }
  }
};
</script>

<style lang="scss" scoped>
$color-background: #f5f5f5;
$color-border: #e3e4e8;
$color-black: #444444;
$color-active: #f0f2f5;

$color-message-selected: #edf0f5;
$color-time: rgba(120, 126, 140, 0.6);

$message-top: 7px;
$message-bottom: 7px;

$select-wh: 18px; // Ширина и высота селекта
$photo-wh: 36px; // Ширина и высота фото

$select-mt: $message-top + ($photo-wh/2) - ($select-wh/2);
$photo-ml: 5 + $select-wh + 10; // margin-left фото

$message-minH: $message-top + $photo-wh + $message-bottom; // Когда только одно сообщение
$message-text-ml: 5 + $photo-wh + 10;
$message-top-left: 5 + 16 + 10 + $photo-wh + 10;

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
          display: inline-block !important;
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
        color: #7293b6;
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
      color: #99b0c6;
      font-size: $select-wh;
      display: none;
      margin: 9px 0 8px 5px; // 9px из за margin-bottom: 3px
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
        right: 5px;
        top: 7px;

        .response,
        .favorite {
          display: none;
          width: 18px;
          height: 18px;
          color: rgb(163, 163, 163);
          font-size: 18px;
        }

        .favorite {
          font-size: 16px;
          position: relative;
          top: -1px;
        }
      }
    }
  }
}
</style>