import HTTP from '../http';

export default {
	namespaced: true,
	state: {
		chats: [],

		chatId: '',
		messages: [],
		chatUsers: []
	},
	mutations: {
		common(state, { type, value }) {
			state[type] = value;
		},
	},

	getters: {
		chats(state) {
			return state.chats;
		}
	},

	actions: {
		// получить чаты
		async getChats({ commit }) {
			const { data } = await HTTP().get('chat');
			const { chats } = data;
			commit('common', { type: 'chats', value: chats });
		},

		// получить сообщения
		async getMessages({ commit, state }) {
			const { data } = await HTTP().get('message', {
				params: {
					chatId: state.chatId
				}
			});
			const { messages, users } = data;
			commit('common', { type: 'messages', value: messages });
			commit('common', { type: 'chatUsers', value: users });
		},

		async sendMessage({ commit, state }, { message }) {
			const { data } = await HTTP().post('message', { text: message, chatId: state.chatId });
		}
	}
}