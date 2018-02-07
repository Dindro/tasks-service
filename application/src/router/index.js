import Vue from 'vue'
import Router from 'vue-router'

//Страницы
import Authentication from '@/components/pages/Authentication/Authentication'
import ListDialog from '@/components/pages/Dialog/ListDialog'
import ListMessage from '@/components/pages/Message/ListMessage'
import Upp from '@/components/parts/Upp'
import Workplace from '@/components/parts/Workplace'
import Blockoption from '@/components/parts/Blockoption'
import Message from '@/components/parts/Message'
import registration from '@/components/pages/Registration/Registration'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
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
              name: "Message",
              component: Message
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
