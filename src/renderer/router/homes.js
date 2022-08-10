import store from '@/store'

export default {
  path: '/homes',
  name: 'homes',
  redirect: { name: 'listHome' },
  component: require('@/components/layout/Homes').default,
  children: [{
    path: 'listHome',
    name: 'listHome',
    component: require('@/components/page/homes/listHomes').default
  }, {
    path: 'addHome',
    name: 'addHome',
    component: require('@/components/page/homes/AddHome').default
  }, {
    path: 'editHome/:homeID',
    name: 'editHome',
    props: true,
    component: require('@/components/page/homes/EditHome').default
  }, {
    path: 'addHC/:homeID',
    name: 'addHC',
    component: require('@/components/page/homes/AddHC').default
  }, {
    path: 'configHC/:homeID',
    name: 'configHC',
    redirect: { name: 'configHC-network' },
    component: require('@/components/page/homes/ConfigHC').default,
    beforeEnter: beforeEnterHomeConfig,
    children: [{
      path: 'timezone',
      name: 'configHC-timezone',
      component: require('@/components/page/homes/ConfigHC/Timezone').default
    }, {
      path: 'firmware',
      name: 'configHC-firmware',
      component: require('@/components/page/homes/ConfigHC/Firmware').default
    }, {
      path: 'reboot',
      name: 'configHC-reboot',
      component: require('@/components/page/homes/ConfigHC/Reboot').default
    }, {
      path: 'factoryReset',
      name: 'configHC-factoryReset',
      component: require('@/components/page/homes/ConfigHC/FactoryReset').default
    }, {
      path: 'network',
      name: 'configHC-network',
      component: require('@/components/page/homes/ConfigHC/Network').default
    }]
  }, {
    path: '/profile',
    name: 'profile',
    redirect: { name: 'profile-userInfo' },
    component: require('@/components/page/homes/Profile').default,
    children: [{
      path: 'userInfo',
      name: 'profile-userInfo',
      component: require('@/components/page/homes/Profile/UserInfo').default
    }, {
      path: 'changePassword',
      name: 'profile-changePassword',
      component: require('@/components/page/homes/Profile/ChangePassword').default
    }, {
      path: 'language',
      name: 'profile-language',
      component: require('@/components/page/homes/Profile/Language').default
    }]
  },
  ],
  beforeEnter: beforeEnterHome
}

function beforeEnterHome(to, from, next) {
  let access_token = sessionStorage.getItem('access_token')
  if (access_token)
    next()
  else next({
    name: 'login'
  })
}

function beforeEnterHomeConfig(to, from, next) {
  $commit('ConfigHC/UPDATE_DATA',null)
  next()
}
