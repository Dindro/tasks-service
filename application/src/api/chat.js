import HTTP from './index';

const api = {};

api.create = async (chat) => {
	try {
		const { data } = await HTTP().post('chat', chat);
		return data;
	} catch (e) {
		throw e;
	}
};

export default api;
