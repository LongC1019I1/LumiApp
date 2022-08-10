<template>
  <div id="group" class="main-layout">
    <div class="group-list-box">
      <group-list
        :groupType="groupType"
        @updateGroupType="
          (value) => {
            groupType = value;
            selectedGroup = false;
            $refs.groupNormal.selectedGroup = false;
          }
        "
        @showModalGroup="showModalGroup"
        :selectedGroup="selectedGroup"
        @selectGroup="(groupid) => (selectedGroup = groupid)"
      />
    </div>
    <div class="group-manager-box">
      <group-normal
        ref="groupNormal"
        v-if="groupType === GROUP_TYPE.normalGroup"
        :groupid="selectedGroup"
        @removeSelectedGroup="selectedGroup = false"
      />
      <group-lighting
        v-else-if="groupType === GROUP_TYPE.lightingGroup"
        :groupid="selectedGroup"
        @removeSelectedGroup="selectedGroup = false"
        @showModalAddDeviceLighting="isShowModalAddDeviceLighting = true"
      />
      <card v-else>
        <div class="justify-content-center text-center">
          <h5>{{ $t("group.tutorialText") }}</h5>
        </div>
      </card>
    </div>
    <modal-group
      ref="groupModal"
      :isShowModalGroup="isShowModalGroup"
      @closeModal="isShowModalGroup = false"
      :groupType="groupType"
    />
    <modal-add-device-lighting
      ref="addDeviceLightingModal"
      :isShowModalAddDeviceLighting="isShowModalAddDeviceLighting"
      @closeModal="isShowModalAddDeviceLighting = false"
      :groupid="selectedGroup"
    />
  </div>
</template>

<script>
import { GROUP_TYPE } from "@/plugins/variableConst";

import GroupNormal from "./GroupNormal";
import GroupLighting from "./GroupLighting";
import GroupList from "./GroupList";
import ModalGroup from "./Modal/ModalGroup";
import ModalAddDeviceLighting from "./Modal/ModalAddDeviceLighting";
export default {
  name: "group",
  data() {
    return {
      groupType: 0,
      selectedGroup: false,
      isShowModalGroup: false,
      isShowModalAddDeviceLighting: false,
      GROUP_TYPE,
    };
  },
  components: {
    GroupList,
    GroupNormal,
    GroupLighting,
    ModalGroup,
    ModalAddDeviceLighting,
  },
  methods: {
    showModalGroup,
  },
};

function showModalGroup(groupid, name) {
  this.isShowModalGroup = true;
  this.$refs.groupModal.groupid = groupid || "";
  this.$refs.groupModal.groupName = name || "";
}
</script>

<style scoped lang="scss">
#group {
  display: flex;
  .group-list-box {
    width: 300px;
    max-width: 300px;
  }
  .group-manager-box {
    padding-left: 1rem;
    width: calc(100% - 300px);
  }
}
</style>
