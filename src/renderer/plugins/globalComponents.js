import Badge from "../components/base/element/Badge";
import BaseAlert from "../components/base/element/BaseAlert";
import BaseButton from "../components/base/element/BaseButton";
import BaseCheckbox from "../components/base/element/BaseCheckbox";
import BaseInput from "../components/base/element/BaseInput";
import BasePagination from "../components/base/element/BasePagination";
import BaseProgress from "../components/base/element/BaseProgress";
import BaseRadio from "../components/base/element/BaseRadio";
import BaseSlider from "../components/base/element/BaseSlider";
import BaseSwitch from "../components/base/element/BaseSwitch";
import Card from "../components/base/element/Card";
import Nav from "../components/base/element/BaseNav";
import Icon from "../components/base/element/Icon";
import Modal from "../components/base/element/Modal";
import Dropdown from "../components/base/element/BaseDropdown"
import CloseButton from "../components/base/element/CloseButton"
import Tabs from "../components/base/Tabs/Tabs"
import TabPane from "../components/base/Tabs/TabPane"
import TimerSelect from "../components/base/custom/TimerSelect"

import { VueTelInput } from "vue-tel-input";
import { FadeTransition } from "vue2-transitions";
import { Fragment } from "vue-fragment";

import MaskedInput from "vue-text-mask";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'

import VueContext from 'vue-context';
import 'vue-context/dist/css/vue-context.css';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSlider.name, BaseSlider);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(Card.name, Card);
    Vue.component(Nav.name, Nav);
    Vue.component(Icon.name, Icon);
    Vue.component(Modal.name, Modal);
    Vue.component(Tabs.name, Tabs);
    Vue.component(TabPane.name, TabPane);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(CloseButton.name, CloseButton);
    Vue.component(TimerSelect.name, TimerSelect);
    Vue.component('vue-tel-input', VueTelInput);
    Vue.component('fade-transition', FadeTransition);
    Vue.component('horizontal-scroll', HorizontalScroll);
    Vue.component('vue-context', VueContext);
    Vue.component('v-select', vSelect)
    Vue.component('vue-slider', VueSlider)
    Vue.component('masked-input', MaskedInput)
    Vue.component('fragment', Fragment)
    Vue.component('date-picker', DatePicker)
  }
};
