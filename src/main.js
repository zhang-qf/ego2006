import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import './router/permission'
import jwt from 'jwt-decode'
import './utils/eventbus'
import i18n from './plugins/i18n'

Vue.config.productionTip = false
var token=localStorage.getItem('ego')
// console.log(token);
if(token){
  store.commit('logMod/xiu',{
    name:jwt(token).username,
    token:token
  })
}

if(localStorage.getItem('lang')){
  i18n.locale=localStorage.getItem('lang')
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
