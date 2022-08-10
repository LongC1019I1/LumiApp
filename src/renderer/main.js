import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang/i18n'
import store from './store'
import Argon from "./plugins/argon-kit";
import alertify from "./plugins/alertify";
import os from "./plugins/osAndProcess";
import { format, parse } from "fecha"
import apiList from './connect/apiList'
require('promise.prototype.finally').shim();
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(Argon);
Vue.config.productionTip = false

window.$router = router
window.timer = format
window.timerReverse = parse
window.$alertify = alertify
window.$os = os
window.$commit = store.commit
window.$getters = store.getters
window.$dispatch = store.dispatch
window.$state = store.state
window.$api = apiList
window.$apiStack = {}
window.$process = []

window.restart = () => {
  $dispatch($api.CameraManager.resetData)
  $dispatch($api.ConfigHC.resetData)
  $dispatch($api.ContentManager.resetData)
  $dispatch($api.Customer.resetData)
  $dispatch($api.HCMusic.resetData)
  $dispatch($api.Home.resetData)
  $dispatch($api.HomeConfig.resetData)
  $dispatch($api.HomeControll.resetData)
  $dispatch($api.IrRemote.resetData)
  $dispatch($api.LocalData.resetData)
  $dispatch($api.Log.resetData)
  $dispatch($api.Notify.resetData)
  $dispatch($api.Socket.disconnect)
}

/* eslint-disable no-new */
window.Vue = new Vue({
  components: { App },
  mode: 'history',
  router,
  i18n,
  store,
  template: '<App/>'
}).$mount('#app')


export default window.Vue
