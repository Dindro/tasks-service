import Request from '../../api/request';
import Task from '../../api/task';

export default {
	namespaced: true,
	state: {
		tasks: {}
	},
	mutations: {
		mut(state, { type, val }) {
			state[type] = val;
		}
	},

	getters: {

	},
	actions: {
		async getTasks({ commit, dispatch, rootState }) {
			try {
				const data = await Task.getByUserId({ userId: rootState.userAuth.id });
				commit('mut', { type: 'tasks', val: data.tasks });
			} catch (e) {

			}
		},
	}
}