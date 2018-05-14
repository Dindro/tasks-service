import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import io from 'socket.io-client';
import router from '../router';

// модули
import task from './modules/task';
import request from './modules/request';

const taskAPI = `http://${window.location.hostname}:3000/api/v1`;
const HTTP = axios.create({
	baseURL: taskAPI,
	headers: {
		'x-access-token': localStorage.getItem('token'),
	}
});

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true,
	modules: {
		task,
		request
	},
	state: {
		userAuth: {},
		isLogged: !!localStorage.getItem("token"),
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

		async getUser({ commit, state, dispatch }, { userId }) {
			try {
				/*
					делаем запрос
					приходит ответ
					берем данные
				*/
				const { data } = await HTTP.get(`getUser/${userId}`);
				console.log(data);
				// если токен потух или его вообще нет
				if (data.success === false) {
					dispatch('logout');
					return undefined;
				}

				return data.user;
			}
			catch (e) {
				console.log(e);
			}
		},

		async getUserAuth({ commit, dispatch }) {
			const userAuth = await dispatch('getUser', { userId: 0 });
			commit('userAuth', userAuth);
		},

		logout({ commit }) {
			localStorage.removeItem("token");
			commit('isLogged', false);
			commit('userAuth', {});
		},

		async getCategories({ commit }) {
			try {
				const { data } = await HTTP.get('getCategories');
				console.log(data);
				const { categories } = data;
				return categories;
			} catch (e) {

			}
		},

		async createTask({ commit }, task) {
			try {
				const { data } = await HTTP.post('task', task);
				console.log("taskId", data.taskId);
			} catch (e) {

			}
		},

		async getTasks({ commit }) {
			try {
				const { data } = await HTTP.get('tasks');
				return data.tasks;
			} catch (e) {

			}
		},

		async getUserTasks({ commit }, { userId, count }) {
			try {
				const { data } = await HTTP.get('userTasks', {
					params: {
						userId,
						count
					}
				});
				return data.tasks;
			} catch (e) {

			}
		},

		async getTask({ commit }, { taskId }) {
			try {
				const { data } = await HTTP.get('task', {
					params: {
						taskId,
					}
				});
				return data.task;
			} catch (e) {

			}
		},

		async sendRequest({ commit }, request) {
			try {
				const { data } = await HTTP.post('request', request);
				console.log("Store заявки", data);
			} catch (e) {

			}
		}
	}
});

export default store;