import Vue from 'vue';
import App from './App';
import YandexMap from 'vue-yandex-maps';
import router from './router';
import store from './store';
import * as VueGoogleMaps from 'vue2-google-maps';

// подключаем собсвтенный форматировщик даты
import "./libs/dateFormater";

// import normilizeCss from 'normalize.css'

// установка сброса стилей
// Vue.use(normilizeCss); 

// установка google map
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCFN33oqD_m6-imVCS1gKLorYDLXNwY0zY',
    libraries: 'places', // если нужно автозаполнение (а нам нужно)
  },
})

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

// получаем авторизированного пользователя
store.dispatch('getUserAuth');
