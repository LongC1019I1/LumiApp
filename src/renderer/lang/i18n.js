import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vnMessage from './VN.json'
import enMessage from './EN.json'

Vue.use(VueI18n)

const messages = {
  VN: vnMessage,
  GB: enMessage,
}

const i18n = new VueI18n({
  locale: localStorage.getItem('lang')||'VN', // set locale
  messages,
  fallbackLocale: 'VN',
})

export default i18n