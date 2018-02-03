import Vue from 'vue'
import Router from 'vue-router'

//Страницы
import Authentication from '@/components/pages/Authentication/Authentication'
import ListDialog from '@/components/pages/Dialog/ListDialog'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Authentication",
      component: Authentication
    },
    {
      path: "/dialogues",
      name: "Dialog",
      component: ListDialog
    }
  ]
})
