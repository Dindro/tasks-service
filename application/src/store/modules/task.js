import Task from '../../api/task';

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
	}

}