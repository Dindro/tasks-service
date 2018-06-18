<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("chat", ["chats"]),
    ...mapGetters(['userAuth'])
  },

  methods: {
    ...mapActions("chat", ["getChats"]),
    ...mapMutations("chat", ["common"]),

    // перейти на конкретный чат
    openChat(chatId) {
      this.$router.push({
        name: "chatMessages",
        params: {
          chatId
        }
      });
    },

    // получить стиль фото
    getPhotoStyle(chat) {
      if (chat.taskId === null) {
        return {
          "background-image": `url(${chat.users[0].image})`,
          "background-size": "cover"
        };
      } else {
        const url = "http://viteksoft.ru/wp-content/themes/generatepress/img/sch.png";
        return {
          "background-image": `url(${url})`,
          "background-size": "cover"
        };
      }
    },

    // получить стиль отпавленного фото
    getPhotoStyleForLastMessage(chat) {
      if (chat.lastMessage) {
        const userId = chat.lastMessage.userId;
        let users = chat.users;
        users.push(this.userAuth);
        const user = users.find(user => user.id === userId);

        return {
          "background-image": `url(${user.image})`,
          "background-size": "cover"
        };
      }
    }
  },

  created() {
    this.getChats();
  }
};
</script>

<template>
	<div class="dinamic-content">
		<div id="chats-top">
			<div class="chats-top-elements">
        <i class="icon-search"></i>
        <span class="search">Поиск</span>
      </div>
		</div>
		<div class="chats">
			<div 
        class="chat" 
        v-for="chat of chats" 
        :key="chat.id"
        @click="openChat(chat.id)">
				<div 
          class="photo"
          :style="getPhotoStyle(chat)"></div>
				<div class="chat-details">
					<div class="chat-details-top">
						<div class="name-task">
							<span class="name">
                {{
                  chat.taskId === null 
                  ? chat.users[0].surname + ' ' + chat.users[0].name
                  : chat.name
                }}
              </span>
							<span class="task" v-if="chat.taskId !== null">Открыть задачу</span>
						</div>
						<span class="time">
              {{ 
                chat.lastMessage 
                ? new Date(chat.lastMessage.created).format('HH:MM')
                : ''
              }}
            </span>
					</div>
					<div class="chat-details-bottom">
						<div class="read-status">
							<div class="photo-message">
								<div
                  :style="getPhotoStyleForLastMessage(chat)"
                  class="photo-sender">
                </div>
								<span class="message">
                  {{
                    chat.lastMessage 
                    ? chat.lastMessage.text 
                    : 'Нет сообщения'
                  }}
                </span>
							</div>
							<div v-if="chat.count" class="count">4</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="chats-bottom">
			<div class="chats-bottom-elements">
        <i class="icon-settings"></i>
        <span>Настройки</span>
      </div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
@import "../../assets/elements.scss";

$color-background: #f5f5f5;
$color-border: #e3e4e8;
$color-black: #444444;
$color-active: #f0f2f5;

.dinamic-content {
  width: 550px;
  float: left;

  #chats-top {
    height: 50px;
    width: 550px;
    position: fixed;
    background-color: $clr-background; //Нужен, за ним скрывается список диалогов
    border-top: 57px solid $clr-background; //Нужен, за ним скрывается список диалогов

    .chats-top-elements {
      width: 100%;
      height: 100%;
      border: 1px solid $color-border;
      box-sizing: border-box;
      border-radius: 2px 2px 0 0;
      background-color: white;
      display: flex;
      padding: 0 20px;
      align-items: center;

      i {
        font-size: 22px;
        color: $clr-icon-light;
      }

      span {
        color: $clr-icon-light;
        margin-left: 10px;
      }
    }
  }

  .chats {
    background-color: white;
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding-top: 107px;
    padding-bottom: 50px;
    border-left: 1px solid $color-border;
    border-right: 1px solid $color-border;
  }

  #chats-bottom {
    height: 50px;
    width: 550px;
    position: fixed;
    bottom: 0;

    .chats-bottom-elements {
      height: 100%;
      width: 100%;
      border: 1px solid $color-border;
      border-bottom: none;
      box-sizing: border-box;
      background-color: white;
      display: flex;
      align-items: center;
      padding: 0 20px;

      i {
        font-size: 18px;
        color: $clr-blue;
      }

      span {
        color: $clr-blue;
        margin-left: 10px;
      }
    }
  }
}

.chat {
  border-bottom: 1px solid $color-border;
  display: flex;
  padding: 5px 0;
  overflow: hidden;
  width: 100%;
  cursor: pointer;

  .photo {
    margin-left: 20px;
    min-width: 60px; // Чтобы не сжался при flex
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgb(197, 197, 197);
  }

  .chat-details {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    flex: 1;
    width: 0; // Что бы в содержимое работало троеточие
    justify-content: space-around;

    .chat-details-top {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 0 20px 0 10px;

      .name-task {
        display: flex;
        flex: 1;
        min-width: 0;

        .name {
          display: block;
          color: $color-black;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap; // Запрещаем перенос строк
          overflow: hidden; // Обрезаем все, что не помещается в область
          text-overflow: ellipsis; // Добавляем многоточие
        }

        .task {
          white-space: nowrap; // Запрещаем перенос строк
          color: #7a7a7a;
          padding: 0 15px 0 10px;
        }
      }

      .time {
        color: rgb(184, 184, 184);
      }
    }

    .chat-details-bottom {
      padding: 0 17px 0 7px;
      box-sizing: border-box;

      .read-status {
        display: flex;
        justify-content: space-between;
        background-color: rgb(240, 240, 240);
        padding: 3px;
        border-radius: 20px 2px 2px 20px;
        align-items: center;

        .photo-message {
          display: flex;
          align-items: center;
          min-width: 0;

          .photo-sender {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            min-width: 25px;
            background-color: #4e4e4e;
          }

          .message {
            padding-left: 7px;
            padding-right: 10px;
            color: #656565;
            white-space: nowrap; // Запрещаем перенос строк
            overflow: hidden; // Обрезаем все, что не помещается в область
            text-overflow: ellipsis; // Добавляем многоточие
          }
        }

        .count {
          padding: 1px 4px;
          color: white;
          border-radius: 10px;
          background-color: #4a76a8;
        }
      }
    }
  }
}
</style>