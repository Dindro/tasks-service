import Vue from 'vue';
import Router from 'vue-router';

// части
import TheNavigation from '../components/TheNavigation';
import TheHeader from '../components/TheHeader';

// страницы
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import UserPage from '../components/UserPage/UserPage';
import TasksPage from '../components/TasksPage';
import TaskPage from '../components/TaskPage';
import TaskAddPage from '../components/TaskAddPage';
import RequestsPage from '../components/RequestsPage';
import ChatNavigation from '../components/chatsPage/ChatNavigation';
import Chats from '../components/chatsPage/Chats';
import ChatMessages from '../components/chatsPage/ChatMessages';


Vue.use(Router);
export default new Router({
	mode: 'history',
	routes: [
		{
			path: '',
			component: TheHeader, // Шапка
			children: [
				{
					// левая навигация
					path: '',
					component: TheNavigation,
					children: [
						{
							path: '/',
							name: 'loginPage',
							component: LoginPage,
						},
						{
							path: '/signup',
							name: 'signupPage',
							component: SignupPage,
							props: (route) => ({
								name: route.query.name,
								surname: route.query.surname,
								birthday: route.query.birthday
							}),
						},
						{
							// навигация по сообщениям
							path: '',
							component: ChatNavigation,
							children: [
								{
									path: '/chats',
									name: 'chats',
									component: Chats
								},
								{
									path: '/chats/id:chatId',
									name: 'chatMessages',
									component: ChatMessages,
									props: true
								},
							]
						},
						{
							// страница задач
							name: 'tasksPage',
							path: '/tasks',
							component: TasksPage,
						},
						{
							name: 'taskPage',
							path: '/tasks/id:taskId',
							component: TaskPage,
							props: (route) => ({ tab: route.query.tab, taskId: route.params.taskId }),
						},
						{
							path: 'tasks/add',
							name: 'taskAddPage',
							component: TaskAddPage
						},
						{
							path: 'requests',
							name: 'requestsPage',
							component: RequestsPage,
							props: (route) => ({ tabOption: route.query.tabOption, tabTop: route.query.tabTop }),
						},
						{
							path: '/id:userId',
							name: 'userPage',
							component: UserPage,
							props: true,
						},
					]
				},
			]
		}
	]
})
