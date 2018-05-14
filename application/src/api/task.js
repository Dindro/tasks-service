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

api.getByUserId = async ({ userId }) => {
	try {
		const { data } = await HTTP().get('userTasks', {
			query: {
				userId,
			}
		});
		return data;
	} catch (e) {

	}
}

export default api;