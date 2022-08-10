<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-confirm"
    footerClasses="p-0"
    @close="closeModal"
  >
    <h5 class="text-center">{{ $t("notify.notifyDefautlTitle") }}</h5>
    <div class="mt-3 mb-3">
      <div class="text-center mb-3">{{ $t("scene.confirmDeleteDevice") }}</div>
      <div class="c-p checkbox" @click="isDeleteAllDevice = !isDeleteAllDevice">
        <span
          ><i
            class="mdi"
            :class="
              isDeleteAllDevice
                ? 'mdi-checkbox-marked'
                : 'mdi-checkbox-blank-outline'
            "
          ></i
        ></span>
        <span class="ml-2">{{ $t("scene.deleteAllDevice") }}</span>
      </div>
    </div>
    <template slot="footer">
      <base-button @click="confirm">{{ $t("confirm") }}</base-button>
      <base-button class="ml-auto" @click="closeModal">{{
        $t("cancel")
      }}</base-button>
    </template>
  </modal>
</template>

<script>
export default {
  name: "modal-add-room",
  props: {
    isShowModal: {
      type: Boolean,
      default: false,
    },
    index: [Number, Boolean],
    device: [Object, Boolean],
  },
  data() {
    return {
      isDeleteAllDevice: false,
    };
  },
  methods: {
    confirm,
    closeModal,
  },
};

function confirm() {
  console.log(this.index, this.isDeleteAllDevice, this.device);
  if (this.device || (this.index === 0 && this.device))
    if (this.isDeleteAllDevice)
      $commit(
        "RuleManager/DELETE_ALL_DEVICE_OUTPUT",
        this.device.remoteid || this.device.devid
      );
    else $commit("RuleManager/DELETE_DEVICE_OUTPUT", this.index);
  closeModal.call(this);
}

function closeModal() {
  this.isDeleteAllDevice = false;
  this.$emit("closeModal");
}
</script>

<style scoped lang="scss">
</style>
