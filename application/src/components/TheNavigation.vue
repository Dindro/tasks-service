<script>
export default {
  data() {
    return {
      email: "",
      password: ""
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
    <div id="nav">
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

.main {
  width: 960px;
  margin: 0 auto;
  padding: 0 15px; // Нужен для того чтобы сделать размер правильным из за float
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
    margin-top: 57px;
    float: left;

    .nav-content {
      width: 100%;

      .nav-router {
        div {
          cursor: pointer;
          position: relative;
          padding: 8px 0 8px 35px;
          margin-left: -7px;
          color: $clr-font-blue;
          white-space: nowrap;
          /* Запрещаем перенос строк */
          overflow: hidden;
          /* Обрезаем все, что не помещается в область */
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