<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      email: "",
      password: "",
      socket: {},

      isShowNotifyBox: false,
      notifyViewId: 0,
      notifyType: "",
      notifyRequest: {}
    };
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
    getUserAuthId() {
      return this.$store.getters.userAuth.id;
    }
  },
  created() {
    // подключение сокетов
    const socket = io("http://localhost:3000", {
      query: {
        "x-access-token": localStorage.getItem("token")
      }
    });

    this.socket = socket;
    socket.on("connect", () => {
      console.log("Коннект");
    });

    socket.on("message", obj => {});
    socket.on("request", obj => {
      console.log("REQUEST SOCKET");
      this.notifyRequest = obj;
      this.notifyType = "request";
      this.isShowNotifyBox = true;

      this.notifyViewId += 1;
      const id = this.notifyViewId;

      setTimeout(() => {
        if (this.notifyViewId === id) {
          this.isShowNotifyBox = false;
        }
      }, 5000);
    });
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    },

    signup() {
      this.$router.push({ path: "signup" });
    },

    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<template>
  <div class="main">
    <div v-show="isShowNotifyBox === true" class="notify">
      <div class="request" v-if="notifyType === 'request'">
        <div class="user-photo">
        </div>
        <div class="description">
          <router-link 
            class="user-name"
            :to="{name:'userPage', params:{userId: notifyRequest.userCustomer.id}}"
          >
            {{notifyRequest.userCustomer.name}} {{notifyRequest.userCustomer.surname}}
          </router-link> 
          <template v-if="notifyRequest.type === 'success'">принял</template>
          <template v-else-if="notifyRequest.type === 'cancel'">отклонил</template> 
          заявку по задаче 
          <router-link 
            class="task-name"
            :to="{name:'taskPage', params:{taskId: notifyRequest.task.id}}"
          >
            "{{notifyRequest.task.title}}"
          </router-link> 
        </div>
        
      </div>
    </div>
    <div id="nav">
      <div class="logo">
        <div class="logo-text">Tasks service</div>
      </div>
      <div class="nav-content">
        <div class="nav-router" v-if="isLogged">
          <router-link tag="div" :to="{name: 'userPage', params: { userId: getUserAuthId}}">
            <i class="icon-home"></i>
            Моя страница
          </router-link>
          <router-link tag="div" to="/tasks">
            <i class="icon-content_paste"></i>
            Задачи
          </router-link>
          <router-link tag="div" to="/requests">
            <i class="icon-content_paste"></i>
            Заявки
          </router-link>
          <router-link tag="div" to="/messages">
            <i class="icon-markunread"></i>
            Сообщения
          </router-link>
          <router-link tag="div" to="/chats">Чат</router-link>
          <router-link tag="div" to="/signup">
            <i class="icon-check_circle"></i>
            Регистрация
          </router-link>
          <router-link tag="div" to="/">Авторизация</router-link>
          <div @click="logout">
            <i class="icon-exit_to_app"></i>
            Выйти
          </div>
        </div>
        <div class="auth" v-else>
          <input type="text" name="email" id="email" placeholder="Email" v-model="email">
          <input type="password" name="password" id="password" placeholder="Пароль" v-model="password">
          <button class="login" @click="login">Войти</button>
          <button class="signup" @click="signup">Регистрация</button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "../assets/colors.scss";
@import "../assets/elements.scss";

.notify {
  @extend %box;

  position: fixed;
  z-index: 1000;
  bottom: 15px;
  left: 15px;
  height: 70px;
  width: 290px;
  background-color: rgb(82, 82, 82);
  border-radius: 3px;
  padding: 10px;
  box-sizing: border-box;
  color: white;

  .request {
    display: flex;
    align-items: center;
    height: 100%;

    .user-photo {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: brown;
    }

    .description {
      flex: 1;
      margin-left: 10px;

      .user-name,
      .task-name {
        color: #c9d9e8;
        font-weight: 500;
      }
    }
  }
}

.main {
  width: 960px;
  margin: 0 auto;
  padding: 0 15px;

  // Нужен для того чтобы сделать размер правильным из за float
  &::after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
  }

  #nav {
    position: fixed;
    min-height: 100vh;
    width: 149px;
    float: left;

    .logo {
      height: 57px;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 200;
    }

    .nav-content {
      width: 100%;

      .nav-router {
        div {
          cursor: pointer;
          position: relative;
          padding: 8px 0 8px 35px;
          margin-left: -7px;
          color: $clr-font-blue;

          // Запрещаем перенос строк
          white-space: nowrap;

          // Обрезаем все, что не помещается в область
          overflow: hidden;

          &:hover {
            background-color: $clr-btn-light;
            border-radius: 2px;
          }

          i {
            position: absolute;
            top: 5px;
            left: 7px;
            font-size: 19px;
            color: $clr-icon-light;
          }
        }
      }

      .auth {
        input {
          border: 1px solid #e1e5eb;
          border-radius: 3px;
          padding: 7px 10px;
          box-sizing: border-box;
          width: 100%;
        }

        #password {
          margin-top: 5px;
        }

        button {
          width: 100%;
          border: none;
          margin-top: 5px;
          padding: 7px 10px;
          border-radius: 3px;
          background-color: $clr-btn;
          transition: all 0.5s ease;
          color: white;
          cursor: pointer;

          &:hover {
            background-color: $clr-btn-hover;
          }
        }

        .login {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>