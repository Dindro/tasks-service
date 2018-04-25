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
});

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		userAuth: {},
		isLogged: !!localStorage.getItem("token"),
		userVisit: {}
	},
	getters: {
		name(state) {
			return state.userAuth.name;
		},
		userAuth(state) {
			return state.userAuth;
		},
		isLogged(state) {
			return state.isLogged;
		}
	},
	mutations: {
		userAuth(state, userAuth) {
			state.userAuth = userAuth;
		},
		isLogged(state, isLogged) {
			state.isLogged = isLogged;
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
					commit('isLogged', true);
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

		async getUser({ commit, state }, { userId }) {
			try {
				/*
					делаем запрос
					приходит ответ
					берем данные
				*/
				const { data } = await HTTP.get(`getUser/${userId}`);
				return data.user;
			}
			catch (e) {
				console.log(e);
			}
		},

		logout({ commit }) {
			localStorage.removeItem("token");
			commit('isLogged', false);
			commit('userAuth', {});
		}
	}
});

export default store;