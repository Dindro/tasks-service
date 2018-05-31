<script>
export default {
  props: {
    name: {
      default: ""
    },
    surname: {
      default: ""
    },
    birthday: {
      default: Date.now()
    }
  },

  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      userName: this.name,
      userSurname: this.surname,
      userBirthday: this.birthday,
      error: ""
    };
  },
  methods: {
    async signup() {
      const data = await this.$store.dispatch("signup", {
        email: this.email,
        password: this.password,
        name: this.userName,
        surname: this.userSurname,
        birthday: this.userBirthday
      });

      if (data.success === false) {
        this.error = data.message;
      }
    }
  }
};
</script>

<template>
  <div class="dinamic">
    <div class="signup-form">
      <div class="top">Регистрация пользователя</div>
      <div class="form">
        <div class="error" v-if="error !== ''">
          <strong>Ошибка:</strong> {{error}}
        </div>
        <input type="text" name="email" v-model="email" placeholder="Email">
			  <input type="password" name="password" v-model="password" placeholder="Пароль">
        <input type="password" name="password" v-model="passwordRepeat" placeholder="Повторите пароль">
        <input type="text" name="name" v-model="userName" placeholder="Ваше имя">
        <input type="text" name="surname" v-model="userSurname" placeholder="Ваша фамилия">
        <div class="suggest">Дата рождения</div>
        <input type="date" name="surname" v-model="userBirthday">
			  <button @click="signup">Регистрация</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";
@import "../assets/elements.scss";

.dinamic {
  float: right;
  width: 795px;

  .signup-form {
    @extend %box;
    width: 400px;
    padding: 30px 100px;
    margin: 57px auto 0 auto;

    .top {
      text-align: center;
      font-size: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .form {
      width: 220px;
      margin: 0 auto;

      .error {
        @extend %request-status-canceled;
        padding: 7px 10px;
        border-radius: 3px;
      }

      input {
        margin-top: 10px;
        padding: 7px 10px;
        border-radius: 3px;
        border: 1px solid $clr-tb-border;
        width: 100%;
        box-sizing: border-box;
        font-family: 'Roboto';
      }

      input[type="date"] {
        margin-top: 3px;
      }

      .suggest {
        margin-top: 10px;
        font-weight: 500;
        color: $clr-font-grey;
      }

      button {
        @extend %button-dark-green;
        margin-top: 10px;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>