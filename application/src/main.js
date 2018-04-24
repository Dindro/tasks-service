import Vue from 'vue'
import App from './App'
import router from './router'
import normilizeCss from 'normalize.css'
import store from './store'

// установка сброса стилей
Vue.use(normilizeCss); 

// отключить предупреждение о работе в режиме разработки
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
