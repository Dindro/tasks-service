import Vue from 'vue'
import Router from 'vue-router'

//Страницы
import Authentication from '@/components/pages/Authentication/Authentication'
import ListDialog from '@/components/pages/Dialog/ListDialog'
import ListMessage from '@/components/pages/Message/ListMessage'
import Upp from '@/components/parts/Upp'
import Workplace from '@/components/parts/Workplace'
import Blockoption from '@/components/parts/Blockoption'
/* import message from '@/components/parts/Message' */
const message = () => import("@/components/parts/Message");
import registration from '@/components/pages/Registration/Registration'
Vue.use(Router)

//Draft
import full from '@/components/pages/DRAFT/full'
import chats from '@/components/pages/DRAFT/chats'
import messages from '@/components/pages/DRAFT/messages'

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/full",
      component: full
    },
    {
      path: "/chats",
      component: chats
    },
    {
      path: "/messages",
      component: messages
    },
    {
      path: "",
      component: Upp,
      children: [
        {
          path: "/signup",
          name: "registration",
          component: registration
        },
        {
          path: "",
          component: Workplace,
          children: [
            {
              path: "/test",
              name: "message",
              component: message
            },
            {
              path: "/dialogues",
              name: "Blockoption",
              component: Blockoption,
              /* props: (route) => ({ id: route.query.id }, { option: route.query.unread }) */
              /* children: [
                {
                  path: "/dialogues",
                  name: "Dialog",
                  component: ListDialog,
                },
                {
                  path: "/dialogues",
                  name: "Message",
                  component: ListMessage,
                  props: (route) => ({ id: route.query.id }),
                }
              ] */
            }
          ]
        },
        {
          path: "/login",
          name: "Authentication",
          component: Authentication
        },
      ]
    }
  ]
})
