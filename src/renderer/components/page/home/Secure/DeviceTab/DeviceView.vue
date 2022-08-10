
<template>
  <card >

    <create-pin v-if="id === 1"/>
    <device-security
        @createPin = "id = 1; $emit('createPin')"
        v-if="id === 2" />
    <device-protected
        @createPin = "id = 1; $emit('createPin')"
        v-if="id === 3" />

  </card>
</template>

<script>

import CreatePin from "./Element/CreatePin";
import DeviceSecurity from "./Element/DeviceSecurity";
import DeviceProtected from "./Element/DeviceProtected";

export default {
  name: "camera-view-tab",
  props: {
    id: [Number,String],
  },
  data() {
    return {isShowHistory: false, isShowListConfig: false};
  },
  computed: {
    camera,
  },
  components: {
    CreatePin,
    DeviceSecurity,
    DeviceProtected
  },
  methods: {
    deleteCamera,
  },


};

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.camid);
}

function deleteCamera() {
  $alertify
      .confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("secure.confirmDeleteCamera"),
        showCancelButton: true,
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
      })
      .then((result) => {
        if (result && result.isConfirmed)
          $dispatch($api.HomeConfig.deleteCamera, {cameraid: this.camid});
        this.$emit("updateSelectedCamera", false);
      });
}
</script>

<style lang="scss">
</style>
