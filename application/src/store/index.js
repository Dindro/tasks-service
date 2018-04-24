import Vuex from "vuex"
import Vue from 'vue'
import axios from 'axios'
import io from 'socket.io-client'
import router from '../router'

const taskAPI = `http://${window.location.hostname}:3000/api/v1`;
const HTTP = axios.create({
	baseURL: taskAPI,
	headers: {
		'x-access-token': localStorage.getItem('token')
	}
	//withCredentials: true,
});

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		userAuth: {},
		isLogged: false,
	},
	getters: {
		name(state) {
			return state.userAuth.name;
		},
		userAuth(state) {
			return state.userAuth;
		}
	},
	mutations: {
		userAuth(state, userAuth) {
			state.userAuth = userAuth;
		}
	},
	actions: {
		login({ commit }, { email, password }) {
			HTTP.post(
				'login',
				{
					email,
					password
				})
				.then((response) => {
					const { data } = response;
					console.log(response);

					commit('userAuth', data.user);
					localStorage.setItem('token', data.token);
					router.push(`/id${data.user.id}`);
				})
				.catch((e) => {
					console.log(e);
				})
		},

		signup({ commit }, { email, password, name, surname, birthday }) {
			HTTP.post('signup', {
				email,
				password,
				name,
				surname,
				birthday
			})
				.then((response) => {
					console.log(response);
					if (!data.success) {
						console.log("Ошибка", data.message);
					}
				})
				.catch((e) => {
					console.log(e);
				})
		},

		getUser({ commit }) {
			HTTP.get('getUser')
				.then((response) => {

				})
				.catch((e) => {

				});
		},

		// TEST: тестовая версия jwt
		loginJWT({ commit }) {
			// тут показываем спиннер
			localStorage.setItem("token", "JWT");
		},
		logout({ commit }) {
			localStorage.removeItem("token");
		}
	}
});

export default store;