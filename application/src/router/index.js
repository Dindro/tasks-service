import Vue from 'vue';
import Router from 'vue-router';

// части
import TheNavigation from '@/components/TheNavigation';
import TheHeader from '@/components/TheHeader';

// страницы
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import UserPage from '../components/UserPage';
import TasksPage from '../components/TasksPage';
import TaskPage from '../components/TaskPage';
import TaskAddPage from '../components/TaskAddPage';
import RequestsPage from '../components/RequestsPage';


// Страницы
//import Authentication from '@/components/pages/Authentication/Authentication'
import ListDialog from '@/components/pages/Dialog/ListDialog'
//import ListMessage from '@/components/pages/Message/ListMessage'


// Parts

import messagesNavigation from '@/components/parts/messagesNavigation'
import chats from '@/components/parts/chats'
import messages from '@/components/parts/messages'

import Workplace from '@/components/parts/Workplace'
//import Blockoption from '@/components/parts/Blockoption'
/* import message from '@/components/parts/Message' */
//const message = () => import('@/components/parts/Message');
import registration from '@/components/pages/Registration/Registration'

//Draft
import full from '@/components/pages/DRAFT/full'
import chatsStatic from '@/components/pages/DRAFT/chats'
import messagesStatic from '@/components/pages/DRAFT/messages'

Vue.use(Router);
export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/chatsstatic',
			component: chatsStatic
		},
		{
			path: '/messagesstatic',
			component: messagesStatic
		},
		{
			path: '',
			component: TheHeader, // Шапка
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
				},
				{
					// левая навигация
					path: '',
					component: TheNavigation,
					children: [
						{
							// навигация по сообщениям
							path: '',
							component: messagesNavigation,
							children: [
								{
									path: '/chats',
									name: 'chats',
									component: chats
								},
								{
									path: '/messages',
									name: 'messages',
									component: messages
								},
							]
						},
						{
							// страница задач
							name: 'tasks',
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
						// {
						//   path: '/test',
						//   name: 'message',
						//   component: message
						// },
						// {
						//   path: '/dialogues',
						//   name: 'Blockoption',
						//   component: Blockoption,
						//   /* props: (route) => ({ id: route.query.id }, { option: route.query.unread }) */
						//   /* children: [
						//     {
						//       path: '/dialogues',
						//       name: 'Dialog',
						//       component: ListDialog,
						//     },
						//     {
						//       path: '/dialogues',
						//       name: 'Message',
						//       component: ListMessage,
						//       props: (route) => ({ id: route.query.id }),
						//     }
						//   ] */
						// }
					]
				},
				// {
				//   path: '/login',
				//   name: 'Authentication',
				//   component: Authentication
				// },
			]
		}
	]
})
