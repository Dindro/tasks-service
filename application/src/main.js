import Vue from 'vue'
import App from './App'
import YandexMap from 'vue-yandex-maps';
import router from './router'
import store from './store'
// import normilizeCss from 'normalize.css'

// установка сброса стилей
// Vue.use(normilizeCss); 

// установка яндекс карт api
Vue.use(YandexMap);

// отключить предупреждение о работе в режиме разработки
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

store.dispatch('getUserAuth');
