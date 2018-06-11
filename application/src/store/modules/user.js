import HTTP from '../http';

export default {
	namespaced: true,
	state: {
		userId: '',

		user: {},

		reviews: []
	},
	mutations: {
		common(state, { type, value }) {
			state[type] = value;
		}
	},

	getters: {
		// doubleCount(state, getters, rootState, rootGetters) {
		// 	console.log(rootGetters);
		// 	return state.count * 2
		// }
	},
	actions: {
		async getTask({ commit }, { taskId }) {
			try {
				const data = await Task.get(taskId);
				commit('mut', { type: 'task', val: data.task });
			} catch (e) {

			}
		},

		async getUser({ commit }, userId) {
			try {
				const { data } = await HTTP().get('user', { params: { userId } });
				const { user } = data;
				commit('common', { type: 'user', value: user });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		},

		async getReviewsCount({ commit }, userId) {
			try {
				const { data } = await HTTP().get('user', { params: { userId } });
				const { user } = data;
				commit('common', { type: 'user', value: user });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		},

		async getReviews({ commit }, type) {
			try {
				const { data } = await HTTP().get('reviewsByUserId', { params: { userId, type } });
				const { reviews } = data;
				commit('common', { type, value: user });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		},

		updateViews({ commit }, userId) {
			try {
				HTTP().post('userViews', { userId });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		}
	}

}