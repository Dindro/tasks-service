import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import io from 'socket.io-client';
import router from '../router';

// модули
import task from './modules/task';
import request from './modules/request';

// api
import User from '../api/user';
import { stat } from 'fs';

const taskAPI = `http://${window.location.hostname}:3000/api/v1`;
const HTTP = axios.create({
	baseURL: taskAPI,
	headers: {
		'x-access-token': localStorage.getItem('token'),
	}
});

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		task,
		request
	},
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
		},
		isLogged(state) {
			if ('id' in state.userAuth) {
				return true;
			}
			else {
				return false;
			}
		}
	},
	mutations: {
		userAuth(state, userAuth) {
			state.userAuth = userAuth;
		},

		isLogged(state, isLogged) {
			state.isLogged = isLogged;
		},

		mut(state, { type, value }) {
			state[type] = value;
		}
	},
	actions: {
		//получить авторизированного пользователя (себя)
		async getUserAuth({ commit, dispatch }) {
			try {
				const data = await User.get({});
				const userAuth = data.user;
				commit('userAuth', userAuth);

				if (userAuth) {
					commit('mut', { type: 'isLogged', value: true });
				}
			} catch (e) {
				console.log(e);
			}
		},

		// авторизация
		async login({ commit }, { email, password }) {
			try {
				const data = await User.login({ email, password });
				const { user, token } = data;

				if (user) {
					commit('mut', { type: 'userAuth', value: user });
					commit('mut', { type: 'isLogged', value: true });
					localStorage.setItem('token', token);
					router.push({ name: 'userPage', params: { userId: user.id } });
				}

				return data;
			} catch ({ response }) {
				const { status, data } = response;
				if (status === 400) {
					return data;
				}
			}
		},

		// регистрация
		async signup({ commit, dispatch }, user) {
			try {
				const data = await User.signup(user);
				const { token, userInsertId } = data;
				localStorage.setItem('token', token);
				dispatch('getUserAuth');
				router.push({ name: 'userPage', params: { userId: userInsertId } });
				return data;
			} catch ({ response }) {
				const { data, status } = response;
				if (status === 400) {
					return data;
				}
			}
		},

		// выход
		logout({ commit }) {
			localStorage.removeItem("token");
			commit('isLogged', false);
			commit('userAuth', {});
		},

		// получаем пользователя
		async getUser({ commit, state, dispatch }, { userId }) {
			try {
				const { user } = await User.get({ userId });
				return user;
			}
			catch ({ response }) {
				console.log(response);
			}
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