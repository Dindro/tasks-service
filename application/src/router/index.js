import Vue from 'vue'
import Router from 'vue-router'

// Страницы
import Authentication from '@/components/pages/Authentication/Authentication'
import ListDialog from '@/components/pages/Dialog/ListDialog'
import ListMessage from '@/components/pages/Message/ListMessage'
import LoginPage from '../components/LoginPage'

// Parts
import head from '@/components/parts/head'
import navigation from '@/components/parts/navigation'
import messagesNavigation from '@/components/parts/messagesNavigation'
import chats from '@/components/parts/chats'
import messages from '@/components/parts/messages'

import Workplace from '@/components/parts/Workplace'
import Blockoption from '@/components/parts/Blockoption'
/* import message from '@/components/parts/Message' */
//const message = () => import("@/components/parts/Message");
import registration from '@/components/pages/Registration/Registration'
Vue.use(Router)

//Draft
import full from '@/components/pages/DRAFT/full'
import chatsStatic from '@/components/pages/DRAFT/chats'
import messagesStatic from '@/components/pages/DRAFT/messages'

export default new Router({
	mode: "history",
	routes: [
		// {
		//   path: "/full",
		//   component: full
		// },
		{
			path: "/chatsstatic",
			component: chatsStatic
		},
		{
			path: "/messagesstatic",
			component: messagesStatic
		},
		{
			path: "",
			component: head, // Шапка
			children: [
				{
					path: "/",
					name: "login",
					component: LoginPage
				},
				{
					path: "",
					component: navigation, // Левая навигация
					children: [
						{
							path: "",
							component: messagesNavigation, // Навигация по сообщениям
							children: [
								{
									path: "/chats",
									name: "chats",
									component: chats
								},
								{
									path: "/messages",
									name: "messages",
									component: messages
								},
							]
						},
						// {
						//   path: "/test",
						//   name: "message",
						//   component: message
						// },
						// {
						//   path: "/dialogues",
						//   name: "Blockoption",
						//   component: Blockoption,
						//   /* props: (route) => ({ id: route.query.id }, { option: route.query.unread }) */
						//   /* children: [
						//     {
						//       path: "/dialogues",
						//       name: "Dialog",
						//       component: ListDialog,
						//     },
						//     {
						//       path: "/dialogues",
						//       name: "Message",
						//       component: ListMessage,
						//       props: (route) => ({ id: route.query.id }),
						//     }
						//   ] */
						// }
					]
				},
				// {
				//   path: "/login",
				//   name: "Authentication",
				//   component: Authentication
				// },
			]
		}
	]
})
