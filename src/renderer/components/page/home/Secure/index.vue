<template>
  <card class="bg-transparent" id="secure" bodyClasses="mb-0 p-0" headerClasses="px-0">
    <horizontal-scroll ref="scrollHeader" slot="header" v-dragscroll class="overflow-hidden">
      <span
        class="c-p"
        :class="{active:selectedTab===0}"
        @click="selectedTab = 0"
      >{{$t('secure.camera')}}</span>
      <span
        class="ml-4 c-p"
        :class="{active:selectedTab===1}"
        @click="selectedTab = 1"
      >{{$t('secure.secure-Device')}}</span>
    </horizontal-scroll>
    <camera-tab v-if="selectedTab===0"/>
    <device-tab v-if="selectedTab===1"/>
  </card>
</template>

<script>
import CameraTab from "./CameraTab/index";
import DeviceTab from "./DeviceTab/index"

export default {
  name: "scene",
  data() {
    return {
      selectedTab: 0
    };
  },
  components: {
    CameraTab,
    DeviceTab
  },
  methods: {},
  created() {

    this.selectedTab =  this.$route.params.selectPin || 0
  }

};
</script>

<style lang="scss">
</style>
