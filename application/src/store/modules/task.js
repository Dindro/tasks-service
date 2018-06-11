import HTTP from '../http';

export default {
	namespaced: true,
	state: {
		task: {}
	},
	mutations: {
		mut(state, { type, val }) {
			state[type] = val;
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

			}
		},
	}
}