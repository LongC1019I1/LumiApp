import store from '@/store'

export default {
  path: '/account',
  name: 'account',
  component: require('@/components/layout/Account').default,
  children: [{
    path: 'login',
    name: 'account-login',
    component: require('@/components/page/account/Login').default,
    beforeEnter: beforeEnterLogin,
  }, {
    path: 'register',
    name: 'account-register',
    component: require('@/components/page/account/Register').default
  }, {
    path: 'forgotPassword',
    name: 'account-forgotPassword',
    component: require('@/components/page/account/ForgotPassword').default
  }, {
    path: 'verifyCode',
    name: 'account-verifyCode',
    component: require('@/components/page/account/VerifyCode').default
  }, {
    path: 'resetPassword',
    name: 'account-resetPassword',
    component: require('@/components/page/account/ResetPassword').default
  }],
}

async function beforeEnterLogin(to, from, next) {
  let rememberMe = localStorage.getItem("rememberMe");
  let refresh_token = localStorage.getItem("refresh_token");

  if (rememberMe == "true") {
    if (refresh_token && refresh_token != 'undefined') {
      let tokenData = await $dispatch("User/refreshToken", {
        refresh_token
      });
      if (tokenData && tokenData.success) {
        sessionStorage.setItem("access_token", tokenData.data.access_token);
        localStorage.setItem("refresh_token", tokenData.data.refresh_token);
        next({ name: "listHome" });
      }
      else {
        sessionStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
  }
  next()
}