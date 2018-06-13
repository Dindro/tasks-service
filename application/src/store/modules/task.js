import HTTP from '../http';

export default {
	namespaced: true,
	state: {
		task: {},
		taskError: false,
		comments: []
	},
	mutations: {
		common(state, { type, value }) {
			state[type] = value;
		}
	},

	getters: {

	},
	actions: {
		async createTask({ commit }, task) {
			let response;
			try {
				response = await HTTP().post('task', task);
			} catch ({ response }) {
				const { data } = response;
				return data;
			}
			const { data } = response;
			return data;
		},

		async getCategories({ commit }) {
			try {
				const { data } = await HTTP().get('categories');
				const { categories } = data;
				return categories;
			} catch (e) {
				console.log(e);
			}
		},

		async getTasks({ commit }, config) {
			try {
				const { data } = await HTTP().get('tasks', {
					params: config
				});
				return data.tasks;
			} catch (e) {
				console.log(e);
			}
		},

		async getTask({ commit }, { taskId }) {
			try {
				const { data } = await HTTP().get('task', {
					params: {
						taskId
					}
				});
				const { task } = data;
				commit('common', { type: 'task', value: task });
			} catch ({ response }) {
				const { data } = response;
				commit('common', { type: 'taskError', value: true });
			}
		},

		async getTasksCount({ commit }, { userId }) {
			try {
				const { data } = await HTTP().get('tasksCount', {
					params: {
						userId
					}
				});
				return data.count;
			} catch (e) {
				console.log(e);
			}
		},

		async sendRequest({ commit }, request) {
			try {
				const { data } = await HTTP().post('request', request);
				const { requestInsertId } = data;
				return requestInsertId;
			} catch (e) {
				console.log(e);
			}
		}
	}
}