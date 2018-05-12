import axios from 'axios';

const taskAPI = `http://${window.location.hostname}:3000/api/v1`;
const HTTP = axios.create({
	baseURL: taskAPI,
	headers: {
		'x-access-token': localStorage.getItem('token'),
	},
});

export default HTTP;