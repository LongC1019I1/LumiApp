import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/vendor/MaterialDesign/scss/materialdesignicons.scss";
import "@/assets/utm-avo/style.css";
// import "@/assets/icomoon/style.css";
import "@/assets/icomoon2/style.css";
import "@/assets/scss/argon.scss";

import * as VueGoogleMaps from "vue2-google-maps"
import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import VueLazyload from "vue-lazyload";
import vuescroll from 'vue-scroll'
import config from '../connect/config'


process.env.GOOGLE_API_KEY = config.GOOGLE_KEY
export default {
  install(Vue) {
    Vue.use(globalComponents);
    Vue.use(globalDirectives);
    Vue.use(VueLazyload);
    Vue.use(vuescroll)
    Vue.use(VueGoogleMaps, {
      load: {
        key: config.GOOGLE_KEY,
        libraries: 'places',
        region: 'VI',
        language: 'vi',
      }
    })
  }
};
