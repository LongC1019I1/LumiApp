<template>
  <div class="main-layout" id="cameraTab">
    <div class="menu-box">
      <device-list
        @updateSelectedCamera="updateSelectedCamera"
        :viewName="viewName"
        :selectedCamera="selectedCamera"
      />
    </div>
    <div class="info-box">

      <device-view
        @updateSelectedCamera="updateSelectedCamera"
        @createPin="selectedCamera = 1 "
        :id="selectedCamera"
      />
    </div>
  </div>
</template>

<script>
import DeviceList from "./DeviceList";
import DeviceView from "./DeviceView";
//config

export default {
  name: "camera-tab",
  data() {
    return {
      viewName: $state.HomeConfig.cameras.length
        ? "camera-view"
        : "camera-form",
      selectedCamera: 1,
    };
  },
  components: {
    DeviceView,
    DeviceList,
  },

  methods: {
    updateSelectedCamera,
  },



};



function updateSelectedCamera(value) {
  this.selectedCamera = value;
}
</script>

<style lang="scss">
</style>
