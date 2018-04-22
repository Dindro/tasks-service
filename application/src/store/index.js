import Vuex from "vuex"
import Vue from 'vue'
import axios from 'axios'
import io from 'socket.io-client'

Vue.use(Vuex);
const taskAPI = `http://${window.location.hostname}:3000/api/v1`;

const store = new Vuex.Store({
	state: {
		userAuth: {}
	},
	getters: {
		name(state) {
			return state.userAuth.name;
		}
	},
	mutations: {
		userAuth(state, userAuth) {
			state.userAuth = userAuth;
		}
	},
	actions: {
		login({ commit }, { email, password }) {
			axios.post(`${taskAPI}/login`, {
				email,
				password
			})
				.then((response) => {
					const { data } = response;
					console.log(data);
					commit('userAuth', data.user);
				})
				.catch((e) => {
					console.log(e);
				})
		},

		signup({ commit }, { email, password, name, surname, birthday }) {
			axios.post(`${taskAPI}/signup`, {
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
		}
	}
});

export default store;