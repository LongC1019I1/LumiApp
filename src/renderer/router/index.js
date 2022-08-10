import Vue from 'vue'
import Router from 'vue-router'
import accountRoute from './account'
import homeRoute from './home'
import homesRoute from './homes'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: { name: 'account-login' }
  }, accountRoute, homeRoute, homesRoute, {
    path: '*',
    name: 'error',
    component: require('@/components/layout/Error').default,
  }]
})
