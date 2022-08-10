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
      <div class="text-center mb-3">{{ $t("scene.confirmDeleteGroup") }}</div>
      <div class="c-p checkbox" @click="isDeleteAllGroup = !isDeleteAllGroup">
        <span
          ><i
            class="mdi"
            :class="
              isDeleteAllGroup
                ? 'mdi-checkbox-marked'
                : 'mdi-checkbox-blank-outline'
            "
          ></i
        ></span>
        <span class="ml-2">{{ $t("scene.deleteAllGroup") }}</span>
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
    group: [Object, Boolean],
  },
  data() {
    return {
      isDeleteAllGroup: false,
    };
  },
  methods: {
    confirm,
    closeModal,
  },
};

function confirm() {
  if (this.group)
    if (this.isDeleteAllGroup)
      $commit(
        "RuleManager/DELETE_ALL_GROUP_OUTPUT",
        this.group.groupid
      );
    else $commit("RuleManager/DELETE_GROUP_OUTPUT", this.index);
  closeModal.call(this);
}

function closeModal() {
  this.isDeleteAllGroup = false;
  this.$emit("closeModal");
}
</script>

<style scoped lang="scss">
</style>
