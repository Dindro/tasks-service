import Request from '../../api/request';
import Task from '../../api/task';
import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		selectedItem: "",
		selectedTab: "",

		tasks: [],
		requests: [],
		requestsCount: {},

		taskRequests: [],
		taskRequestsCount: {},
	},
	mutations: {
		selectCheckBox(state, { value, requestId }) {
			state.taskRequests.find(x => x.id === requestId).selected = value;
		},

		mut(state, { type, value }) {
			state[type] = value;
		},

		selectAllRequests(state, value) {
			for (const item of state.taskRequests) {
				item.selected = value;
			}
		}
	},

	getters: {
		isSelectedRequests(state) {
			const items = state.taskRequests.find(x => x.selected === true);
			if (items === undefined) {
				return false;
			}
			else {
				return true;
			}
		},

		isShowRequestDetails(state) {
			const items = state.taskRequests.filter(x => x.selected === true);

			if (items.length === 1) {
				return true;
			}
			else {
				return false;
			}
		}
	},
	actions: {
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
		},

		async cancelRequest({ commit }, { requestId }) {
			try {
				const data = await Request.cancelRequest({ requestId });
				console.log(data);
			} catch (e) {
				console.log(e);
			}
		},

		async makePerformer({ commit }, { requestId }) {
			try {
				const data = await Request.makePerformer({ requestId });
				console.log(data);
			} catch (e) {
				console.log(e);
			}
		}
	}
}