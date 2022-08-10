<template>
  <fixed-modal class="fixed-modal-camera" v-if="isShowModal">
    <camera-box
      :camera="camera"
      :time="cameraStream.time"
      :fixedCamera="true"
    />
  </fixed-modal>
</template>

<script>
import FixedModal from "@/components/base/custom/FixedModal";
import CameraBox from "../Element/CameraBox";
export default {
  name: "modal-fixed-camera",
  computed: {
    isShowModal,
    camera,
    cameraStream,
  },
  components: { FixedModal, CameraBox },
  methods: { closeModal },
};

function isShowModal() {
  return $state.ContentManager.modal.modalFixedCamera;
}

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.isShowModal);
}

function cameraStream() {
  return $getters["CameraManager/getStreamInfo"](this.isShowModal);
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalFixedCamera",
    data: false,
  });
}
</script>

<style lang="scss">
</style>
