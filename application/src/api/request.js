import HTTP from './index';

const api = {};

api.getAll = async (taskId) => {
	try {
		const { data } = await HTTP().get('', {
			params: {
				taskId,
			}
		});
		return data;
	} catch (e) {

	}
}

export default api;