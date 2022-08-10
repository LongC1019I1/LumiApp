import clickOutside from "./click-ouside";

import { dragscroll } from "vue-dragscroll";
/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install(Vue) {
    Vue.directive("click-outside", clickOutside);
    Vue.directive("dragscroll", dragscroll);
  }
};

export default GlobalDirectives;
