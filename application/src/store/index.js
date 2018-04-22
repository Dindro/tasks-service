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

	},
	mutations: {

	},
	actions: {
		login({ commit }, { email, password }) {
			axios.post(`${taskAPI}/auth`, {
				email,
				password
			})
				.then((response) => {
					console.log(response);
				})
				.catch((e) => {
					console.log("E", e);
				})
		},
	}
});

export default store;