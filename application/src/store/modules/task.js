export default {
	namespaced: true,
	state: {
		task: {}
	},
	mutations: {
		increment(state) {
			// `state` указывает на локальное состояние модуля
			state.count++
		}
	},

	getters: {
		doubleCount(state, getters, rootState, rootGetters) {
			console.log(rootGetters);
			return state.count * 2
		}
	},
	actions: {

	}

}