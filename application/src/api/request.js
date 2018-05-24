import HTTP from './index';

const api = {};

api.getByTaskId = async ({ taskId, type }) => {
	try {
		console.log(type);
		const { data } = await HTTP().get('requestsByTaskId', {
			params: {
				taskId,
				type
			}
		});
		return data;
	} catch (e) {

	}
};

api.getMyRequests = async ({ type }) => {
	try {
		const { data } = await HTTP().get('request', {
			params: {
				type
			}
		});
		return data;
	} catch (e) {
		throw e;
	}
};

api.getRequestsCount = async () => {
	try {
		const { data } = await HTTP().get('requestsCount');
		return data;
	} catch (e) {
		throw e;
	}
};

api.getRequestsCountByTaskId = async ({ taskId }) => {
	try {
		const { data } = await HTTP().get('requestsCountByTaskId', {
			params: {
				taskId
			}
		});
		return data;
	} catch (e) {
		throw e;
	}
};

api.cancelRequest = async ({ requestId }) => {
	try {
		const { data } = await HTTP().post('cancelRequest', {
			requestId
		});
		return data;
	} catch (e) {
		throw e;
	}
};

api.makePerformer = async ({ requestId }) => {
	try {
		const { data } = await HTTP().post('makePerformer', {
			requestId
		});
		return data;
	} catch (e) {
		throw e;
	}
}

export default api;