import HTTP from '../http';

export default {
	namespaced: true,
	state: {
		taskId: '',
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
		},

		// отправка комментария
		async sendComment({ commit, dispatch, state }, { message }) {
			let response;
			try {
				response = await HTTP().post('comment', {
					message,
					taskId: state.taskId
				});
			} catch ({ response }) {
				const { data } = response;
				console.log(data);
			}
			const { data } = response;
			dispatch('getComments');
		},

		async getComments({ commit, state }, ) {
			try {
				const { data } = await HTTP().get('comment', {
					params: {
						taskId: state.taskId
					}
				});
				const { comments } = data;
				commit('common', { type: 'comments', value: comments });
			} catch (e) {
				console.log(e);
			}
		},

		async finishTask({ commit, state, dispatch }) {
			let response;
			try {
				response = await HTTP().post('taskFinish', {
					taskId: state.taskId
				});
			} catch ({ response }) {
				console.log(response);
			}
			const { data } = response;
			if (data.success) {
				dispatch('getTask', { taskId: state.taskId });
			}
		},

		// отправка отзыва
		async sendReview({ commit, dispatch, state }, review) {
			let response;
			try {
				response = await HTTP().post('review', {
					...review,
					taskId: state.taskId
				});
			} catch ({ response }) {
				const { data } = response;
				console.log(data);
			}
			const { data } = response;
			const { reviewInsertId } = data;
			return reviewInsertId;
		},
	}
}