import HTTP from './index';

const api = {};

api.get = async ({ userId }) => {
	try {
		const { data } = await HTTP().get('user', {
			params: {
				userId,
			}
		});
		return data;
	} catch (e) {
		throw e;
	}
};

api.login = async (user) => {
	try {
		const { data } = await HTTP().post('login', user);
		return data;
	} catch (e) {
		throw e;
	}
};

api.signup = async (user) => {
	try {
		const { data } = await HTTP().post('signup', user);
		return data;
	} catch (e) {
		throw e;
	}
};

export default api;
