import HTTP from './index';

const api = {};

api.get = async (taskId) => {
	try {
		const { data } = await HTTP().get('task', {
			params: {
				taskId,
			}
		});
		return data;
	} catch (e) {

	}
};
