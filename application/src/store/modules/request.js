import Request from '../../api/request';
import Task from '../../api/task';
import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		selectedItem: "",
		selectedTab: "",

		tasks: {},
		requests: {},
		requestsCount: {},

		taskRequests: {},
		taskRequestsCount: {}
	},
	mutations: {
		selectCheckBox(state, { value, requestId }) {
			for (const item of state.taskRequests) {
				if (item.id === requestId) {
					item.selected = value;
				}
			}
		},
		mut(state, { type, value }) {
			state[type] = value;
		},

		selectAllRequests(state) {
			for (const item of state.taskRequests) {
				item.selected = true;
			}
		}
	},

	getters: {

	},
	actions: {
		selectAllRequests({ commit }) {
			commit('selectAllRequests');
		},

		async getTasks({ commit, dispatch, rootState }) {
			try {
				const data = await Task.getByUserId({ userId: rootState.userAuth.id });
				commit('mut', { type: 'tasks', value: data.tasks });
			} catch (e) {

			}
		},

		async getMyRequests({ commit, dispatch }, { type }) {
			try {
				const data = await Request.getMyRequests({ type });
				commit('mut', { type: 'requests', value: data.requests });
			} catch (e) {
				console.log(e);
			}
		},

		async getRequestsCount({ commit }) {
			try {
				const data = await Request.getRequestsCount();
				commit('mut', { type: 'requestsCount', value: data.requestsCount });
			} catch (e) {
				console.log(e);
			}
		},

		async getRequestsCountByTaskId({ commit }, { taskId }) {
			try {
				const data = await Request.getRequestsCountByTaskId({ taskId });
				commit('mut', { type: 'taskRequestsCount', value: data.requestsCount });
			} catch (e) {
				console.log(e);
			}
		},

		async getByTaskId({ commit }, { taskId, type }) {
			try {
				const data = await Request.getByTaskId({ taskId, type });
				const { requests } = data;
				for (const item of requests) {
					item.selected = false;
				}
				commit('mut', { type: 'taskRequests', value: requests });
			} catch (e) {
				console.log(e);
			}
		}
	}
}