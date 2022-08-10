<template>
  <div class="main-layout" id="cameraTab">
    <div class="menu-box">
      <camera-list
        @updateViewName="updateViewName"
        @updateSelectedCamera="updateSelectedCamera"
        :viewName="viewName"
        :selectedCamera="selectedCamera"
      />
    </div>
    <div class="info-box">
      <camera-view-all
        v-if="
          viewName === 'camera-view' &&
          !selectedCamera &&
          $store.state.HomeConfig.cameras.length
        "
      />
      <camera-licence
        v-if="viewName === 'camera-licence'"
        :camid="selectedCamera"
      />
      <camera-view
        v-if="viewName === 'camera-view' && selectedCamera"
        @updateViewName="updateViewName"
        @updateSelectedCamera="updateSelectedCamera"
        :camid="selectedCamera"
      />
      <camera-form
        v-if="
          viewName === 'camera-form' ||
          $store.state.HomeConfig.cameras.length === 0
        "
        @updateViewName="updateViewName"
        :selectedCamera="selectedCamera"
      />

      <camera-config-video
        v-if="viewName === 'camera-config-video'"
        @updateViewName="updateViewName"
        :selectedCamera="selectedCamera"
      />
      <camera-config-update-view-detect
        v-if="viewName === 'camera-config-update-view-detect'"
        @updateViewName="updateViewName"
        :selectedCamera="selectedCamera"
      />
      <camera-config-intrusion-detect
        v-if="viewName === 'camera-config-intrusion-detect'"
        @updateViewName="updateViewName"
        :selectedCamera="selectedCamera"
      />
      <camera-config-hurdles-detect
        v-if="viewName === 'camera-config-hurdles-detect'"
        @updateViewName="updateViewName"
        :selectedCamera="selectedCamera"
      />
      <camera-config-flash
        v-if="viewName === 'camera-config-flash'"
        @updateViewName="updateViewName"
        :selectedCamera="selectedCamera"
      />
      <camera-config-alarm
        v-if="viewName === 'camera-config-alarm'"
        @updateViewName="updateViewName"
        :selectedCamera="selectedCamera"
      />
    </div>
  </div>
</template>

<script>
import CameraList from "./CameraList";
import CameraLicence from "./CameraLicence";
import CameraViewAll from "./CameraViewAll";
import CameraView from "./CameraView";
import CameraForm from "./CameraForm";
//config
import CameraConfigVideo from "./Config/CameraConfigVideo";
import CameraConfigUpdateViewDetect from "./Config/CameraConfigUpdateViewDetect";
import CameraConfigIntrusionDetect from "./Config/CameraConfigIntrusionDetect";
import CameraConfigHurdlesDetect from "./Config/CameraConfigHurdlesDetect";
import CameraConfigFlash from "./Config/CameraConfigFlash";
import CameraConfigAlarm from "./Config/CameraConfigAlarm";

export default {
  name: "camera-tab",
  data() {
    return {
      viewName: "camera-view",
      selectedCamera: false,
      // viewName: "camera-config-hurdles-detect",
      // selectedCamera: $state.HomeConfig.cameras[1].camid,
    };
  },
  components: {
    CameraViewAll,
    CameraView,
    CameraList,
    CameraForm,
    CameraLicence,
    //config
    CameraConfigVideo,
    CameraConfigUpdateViewDetect,
    CameraConfigIntrusionDetect,
    CameraConfigHurdlesDetect,
    CameraConfigFlash,
    CameraConfigAlarm,
  },
  methods: {
    updateViewName,
    updateSelectedCamera,
  },
};

function updateViewName(value) {
  this.viewName = value || "camera-form";
}

function updateSelectedCamera(value) {
  this.selectedCamera = value;
  if (this.viewName !== "camera-licence") this.viewName = "camera-view";
}
</script>

<style lang="scss">
</style>
