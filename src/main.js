import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import store from './store';

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://metaqtv.duelmania.net/'

const router = new VueRouter({
  routes: [
    {
      path: '/servers',
      component: require('./views/ActiveServers.vue')
    },
    {
      path: '/twitch',
      component: require('./views/Twitch.vue')
    },
    {
      path: '/settings',
      component: require('./views/Settings.vue')
    },
    {
      path: '/about',
      component: require('./views/About.vue')
    },
  ]
});

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
});

window.onload = () => {
  if(process.env.NODE_ENV !== 'development')
    chrome.runtime.sendMessage({open: true});
}
