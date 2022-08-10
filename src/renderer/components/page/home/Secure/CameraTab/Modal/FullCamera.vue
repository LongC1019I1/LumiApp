<template>
  <modal
    v-if="isShowModal"
    :show="true"
    :showClose="false"
    class="bg-blur-lighter"
    modalClasses="modal-camera"
    bodyClasses="p-0"
    @close="closeModal"
  >
    <camera-box
      :camera="camera"
      :time="cameraStream.time"
      :mimimizeIcon="true"
    />
  </modal>
</template>

<script>
import CameraBox from "../Element/CameraBox";

export default {
  name: "modal-full-camera",
  components: { CameraBox },
  computed: {
    isShowModal,
    camera,
    cameraStream,
  },
  methods: { closeModal },
};

function cameraStream() {
  return $getters["CameraManager/getStreamInfo"](this.isShowModal);
}

function isShowModal() {
  return $state.ContentManager.modal.modalFullCamera;
}

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.isShowModal);
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalFullCamera",
    data: false,
  });
}
</script>

<style lang="scss">
</style>
