export default {
  path: '/home/:homeID',
  name: 'home',
  redirect: { name: 'home-controll' },
  component: require('@/components/layout/Home').default,
  children: [
    {
      path: 'control',
      name: 'home-controll',
      component: require('@/components/page/home/Control').default
    },
    {
      path: 'roomFloor',
      name: 'home-roomFloor',
      component: require('@/components/page/home/RoomFloor').default
    },
    {
      path: 'group',
      name: 'home-group',
      component: require('@/components/page/home/Group').default
    },
    {
      path: 'rule',
      name: 'home-rule',
      component: require('@/components/page/home/Rule').default
    },
    {
      path: 'scene',
      name: 'home-scene',
      component: require('@/components/page/home/Scene').default
    },
    {
      path: 'schedule',
      name: 'home-schedule',
      component: require('@/components/page/home/Schedule').default
    },
    {
      path: 'permision',
      name: 'home-permision',
      component: require('@/components/page/home/Permision').default
    }, {
      path: 'secure',
      name: 'home-secure',
      component: require('@/components/page/home/Secure').default
    },
    {
      path: 'configDevice',
      name: 'home-configDevice',
      component: require('@/components/page/home/DevicesConfig').default
    },
    {
      path: 'homeInfo',
      name: 'home-homeInfo',
      component: require('@/components/page/home/HomeInfo').default
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
