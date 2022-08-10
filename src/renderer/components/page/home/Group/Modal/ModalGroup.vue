<template>
  <modal
    :show.sync="isShowModalGroup"
    :showClose="false"
    modalClasses="modal-input"
    footerClasses="p-0"
    @close="closeModal"
  >
    <h5 class="text-center">{{$t('group.groupInfo')}}</h5>
    <div class="mt-3">
      <base-input
        inputID="groupNameInputEdit"
        maxlength="30"
        type="text"
        :placeholder="$t('group.enterName')"
        v-model="groupName"
        class="mb-0"
        @input="checkInput"
        :inputClasses="groupNameError?'input-error':''"
        @onEnter="condfirmEdit"
      />
      <span class="text-error">{{groupNameError}}&nbsp;</span>
    </div>
    <template slot="footer">
      <base-button @click="condfirmEdit">{{$t('confirm')}}</base-button>
      <base-button class="ml-auto" @click="closeModal">{{$t('cancel')}}</base-button>
    </template>
  </modal>
</template>

<script>
export default {
  name: "modal-group",
  props: {
    isShowModalGroup: {
      type: Boolean,
      default: false
    },
    groupType: Number
  },
  data() {
    return {
      groupid: "",
      groupName: "",
      groupNameError: ""
    };
  },
  methods: {
    checkInput,
    condfirmEdit,
    closeModal
  },
  updated: focusInput
};

function checkInput() {
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let groupName = this.groupName.trim();
  if (!groupName) this.groupNameError = this.$t("group.pleaseEnterFloorName");
  else if (format.test(groupName))
    this.groupNameError = this.$t("group.groupNoSpecialCharacter");
  else this.groupNameError = "";
}

function condfirmEdit() {
  checkInput.call(this);
  if (!this.groupName.trim() || this.groupNameError) return;
  if (this.groupid)
    $dispatch($api.HomeConfig.updateGroup, {
      groupid: this.groupid,
      updateData: {
        name: this.groupName.trim()
      }
    });
  else
    $dispatch($api.HomeConfig.addGroups, [
      {
        name: this.groupName.trim(),
        enable: 1,
        type: this.groupType
      }
    ]);
  closeModal.call(this);
}

function closeModal() {
  this.groupid = "";
  this.groupName = "";
  this.groupNameError = "";
  this.$emit("closeModal");
}

function focusInput() {
  document.getElementById("groupNameInputEdit").focus();
}
</script>

<style scoped lang="scss">
</style>
