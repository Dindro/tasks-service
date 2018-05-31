<script>
export default {
  data() {
    return {
      email: "",
      password: "",

      name: "",
      surname: "",
      birthday: "",

      error: ""
    };
  },
  methods: {
    async login() {
      const data = await this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });

      if (data.success === false) {
        this.error = data.message;
      }
    },

    signup() {
      this.$router.push({
        name: "signupPage",
        query: {
          name: this.name,
          surname: this.surname,
          birthday: this.birthday
        }
      });
    }
  }
};
</script>

<template>
  <div class="dinamic">
    <div class="dinamic-content">
      
    </div>
    <div id="options">
      <div class="container login">
        <div class="error" v-if="error !== ''">
          <strong>Ошибка:</strong> {{error}}
        </div>
				<input type="text" name="login" v-model="email" placeholder="Email">
				<input type="password" name="password" v-model="password" placeholder="Пароль">
				<button class="enter" @click="login">Вход</button>
			</div>
			<div class="container signup">
        <div class="top">Впервые в Task Service?</div>
        <div class="fast">Быстрая регистрация</div>
        <form>
          <input type="text" name="name" placeholder="Ваше имя" v-model="name" required>
          <input type="text" name="surname" placeholder="Ваша фамилия" v-model="surname" required>
          <div class="suggest">Дата рождения</div>
          <input type="date" name="birthday" v-model="birthday" required>
          <button class="registration" @click="signup">Продолжить регистрацию</button>
        </form>
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
}

$widthOption: 270px;
$widthDinamicContent: 795 - $widthOption - 15;
$marginLeftOption: 795 - $widthOption;

.dinamic-content {
  width: $widthDinamicContent;
  float: left;
}

#options {
  width: $widthOption;
  margin: 57px 0 0 $marginLeftOption;

  .login {
    margin-top: 57px;
    padding: 10px 20px;

    input[type="password"] {
      margin-top: 10px;
    }

    .enter {
      @extend %button;
      margin-top: 10px;
      padding: 7px 20px;
    }

    .error {
      @extend %request-status-canceled;
      margin-bottom: 10px;
      padding: 7px 10px;
      border-radius: 3px;
    }
  }

  .signup {
    margin-top: 30px;

    .top {
      font-size: 20px;
      text-align: center;
    }

    .fast {
      padding-top: 7px;
      text-align: center;
      color: #6b6b6b;
    }

    input {
      margin-top: 10px;
      font-family: "Roboto";
    }

    input[type="date"] {
      margin-top: 3px;
    }

    .suggest {
      margin-top: 10px;
      font-weight: 500;
      color: $clr-font-grey;
    }

    button.registration {
      @extend %button-dark-green;
      margin-top: 10px;
      width: 100%;
    }
  }

  .container {
    @extend %box;

    padding: 20px;

    input {
      padding: 7px 10px;
      border-radius: 3px;
      border: 1px solid $clr-tb-border;
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>