import HTTP from '../http';
import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		userId: '',
		statics: {},

		user: {},

		tasks: [],
		tasksCount: 0,

		reviews: [],
		reviewsStatic: {},

		favorites: [],
		favoritesCount: 0
	},
	mutations: {
		common(state, { type, value }) {
			state[type] = value;
		},

		setFavorite(state, { isFavorite }) {
			Vue.set(state.user, 'isFavorite', isFavorite);
		}
	},

	getters: {

	},
	actions: {
		async getUserTasks({ state, commit }) {
			try {
				const { data } = await HTTP().get('tasks', {
					params: {
						userId: state.userId,
						count: 10,
					}
				});
				const { tasks } = data;
				commit('common', { type: 'tasks', value: tasks });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		},

		async getTasksCount({ state, commit }) {
			try {
				const { data } = await HTTP().get('tasksCount', {
					params: {
						userId: state.userId,
					}
				});
				const { count } = data;
				commit('common', { type: 'tasksCount', value: count });
			}
			catch ({ response }) {
				console.log('Ошибка');
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

		async getReviews({ commit, state }, { type }) {
			try {
				const { data } = await HTTP().get('reviews', {
					params: {
						userId: state.userId,
						type
					}
				});
				const { reviews } = data;
				commit('common', { type: 'reviews', value: reviews });
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
		},

		async addToFavotites({ commit, state }) {
			try {
				const { data } = await HTTP().post('favorite', { userId: state.userId });
				const { favoriteInsertId } = data;
				commit('setFavorite', { isFavorite: true });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		},

		async getFavorites({ state, commit }) {
			try {
				const { data } = await HTTP().get('favorites', {
					params: {
						userId: state.userId,
						count: 10
					}
				});
				const { favorites } = data;
				commit('common', { type: 'favorites', value: favorites });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		},

		async getFavoritesCount({ state, commit }) {
			try {
				const { data } = await HTTP().get('favoritesCount', {
					params: {
						userId: state.userId,
					}
				});
				const { count } = data;
				commit('common', { type: 'favoritesCount', value: count });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		},

		async getUserStatic({ state, commit }) {
			try {
				const { data } = await HTTP().get('userStatic', {
					params: {
						userId: state.userId,
					}
				});
				const { statics } = data;
				commit('common', { type: 'statics', value: statics });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		},

		async getReviewsStatic({ state, commit }) {
			try {
				const { data } = await HTTP().get('reviewsStatic', {
					params: {
						userId: state.userId,
					}
				});
				const { reviewsStatic } = data;
				commit('common', { type: 'reviewsStatic', value: reviewsStatic });
			}
			catch ({ response }) {
				console.log('Ошибка');
			}
		},
	}
}