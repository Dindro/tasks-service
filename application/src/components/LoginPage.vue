<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      //this.$router.push({path: 'messages'});
    }
  },
  computed: {
    name() {
      return this.$store.getters.name;
    }
  }
};
</script>

<template>
	<div class="main">
		<div class="background"></div>
		<div class="option">
			<div class="container login">
				<input type="text" name="login" v-model="email">
				<input type="password" name="password" v-model="password">
				<button @click="login">{{name}}</button>
        <input type="radio" name="a" id="">
        <input type="radio" name="a" id="">
			</div>
			<div class="container signup"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
input[type="radio"] {

}

.main {
  width: 960px;
  margin: 0 auto;
  padding: 0 15px;
  height: 100vh;
  display: flex;
  //align-items: stretch;

  // // Нужен для того чтобы сделать размер правильным из за float
  // &::after {
  //   content: " ";
  //   display: block;
  //   height: 0;
  //   clear: both;
  // }
}

.option {
  display: inline-block;
  width: 300px;
  background-color: blueviolet;

  .login {
    margin-top: 100px;
  }

  .signup {
    margin-top: 50px;
  }

  .container {
    height: 150px;
    background-color: white;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 3px;
  }
}

.background {
  flex: 1;
  background-color: brown;
}
</style>