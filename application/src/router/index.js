import Vue from 'vue'
import Router from 'vue-router'

//Страницы
import Authentication from '@/components/pages/Authentication/Authentication'
import ListDialog from '@/components/pages/Dialog/ListDialog'
import ListMessage from '@/components/pages/Message/ListMessage'
import Upp from '@/components/parts/Upp'
import Workplace from '@/components/parts/Workplace'
import Blockoption from '@/components/parts/Blockoption'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "",
      component: Upp,
      children: [
        {
          path: "",
          component: Workplace,
          children: [
            /* {
              path: "/dialogues",
              name: "Dialog",
              component: ListDialog
            },  *//* {
              path: "/dialogues/:id",
              name: "Message",
              component: ListMessage
            }, */
            {
              path: "/dialogues",
              name: "Blockoption",
              component: Blockoption,
              props: (route) => ({ id: route.query.id }, { option: route.query.unread }),
              children: [
                {
                  path: "/dialogues",
                  name: "Dialog",
                  component: ListDialog,
                },
                {
                  path: "/dialogues/:id",
                  name: "Message",
                  component: ListMessage,
                }
              ]
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
