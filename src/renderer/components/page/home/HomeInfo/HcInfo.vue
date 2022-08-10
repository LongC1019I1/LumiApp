<template>
  <card id="hcMasterInfo">
    <horizontal-scroll ref="scrollHeader" slot="header" v-dragscroll class="overflow-hidden">
      <span
        class="c-p"
        :class="{active:selectedTab===0}"
        @click="selectedTab = 0"
      >{{$t('homeInfo.info')}}</span>
      <span
        class="ml-4 c-p"
        :class="{active:selectedTab===1}"
        @click="selectedTab = 1"
      >{{$t('homeInfo.performance')}}</span>
      <span
        class="ml-4 c-p"
        :class="{active:selectedTab===2}"
        @click="selectedTab = 2"
      >{{$t('homeInfo.zigbeeNetwork')}}</span>
      <span
        class="ml-4 c-p"
        :class="{active:selectedTab===3}"
        @click="selectedTab = 3"
      >{{$t('homeInfo.bluetoothNetwork')}}</span>
    </horizontal-scroll>
    <hc-general-info :hc="hc" v-if="selectedTab===0&&hc"/>
    <hc-performance-info :hc="hc" v-if="selectedTab===1&&hc"/>
  </card>
</template>

<script>
import HcGeneralInfo from "./Element/HcGeneralInfo";
import HcPerformanceInfo from "./Element/HcPerformanceInfo";
export default {
  name: "hc-master-info",
  props: {
    hc: Object
  },
  data() {
    return {
      selectedTab: 0
    };
  },
  components: {
    HcGeneralInfo,
    HcPerformanceInfo,
  },
};
</script>

<style lang="scss">
</style>
