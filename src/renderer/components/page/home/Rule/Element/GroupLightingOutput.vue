<template>
  <fragment>
    <modal-add-group-lighting
      :isShowModal="isShowModalAddGroupLighting"
      @closeModal="isShowModalAddGroupLighting = false"
    />
    <modal-update-group-output
      :index="currentIndex"
      :isShowModal="isShowModalUpdateGroupOutput"
      @closeModal="isShowModalUpdateGroupOutput = false"
    />
    <modal-confirm-delete-group-output
      :index="currentIndex"
      :group="currentGroup"
      :isShowModal="isShowModalConfirmDeleteGroupOutput"
      @closeModal="isShowModalConfirmDeleteGroupOutput = false"
    />
    <table v-if="listGrouplightingOutput.length" class="table scene-info-box mb-1 overflow-inherit">
      <thead>
        <tr>
          <th>{{ $t("scene.delay") }}</th>
          <th>{{ $t("scene.transition") }}</th>
          <th>{{ $t("rule.nameGroup") }}</th>
          <th>{{ $t("room") }}</th>
          <th>{{ $t("scene.status") }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <group-lighting-output-row
          v-for="(group, index) in listGrouplightingOutput"
          :key="index"
          :group="group"
          :index="index"
          @updateGroupOutput="updateGroupOutput(group, index)"
          @deleteGroupOutput="deleteGroupOutput(group, index)"
        />
        <tr class="disabled">
          <td colspan="7" class="py-2">
            <div class="pull-right d-flex align-center">
              <span>{{ $t("rule.addGroupLightingOutput") }}</span>
              <base-button
                class="mr-4 ml-2 add-item-button disabled"
                size="md"
                type="secondary"
                @click="isShowModalAddGroupLighting = false"
              >
                <i class="mdi mdi-plus"></i>
              </base-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="scene-info-box mb-1 disabled">
      <div class="label">{{ $t("rule.addGroupLighting") }}</div>
      <div class="info">
        <base-button
          class="ml-2 mr-2 add-item-button disabled"
          size="md"
          type="secondary"
          @click="isShowModalAddGroupLighting = false"
        >
          <i class="mdi mdi-plus"></i>
        </base-button>
      </div>
    </div>
  </fragment>
</template>

<script>
import GroupLightingOutputRow from "./TableRow/GroupLightingOutput";
import ModalAddGroupLighting from "../Modal/AddGroupLighting";
import ModalUpdateGroupOutput from "../Modal/UpdateGroupOutput";
import ModalConfirmDeleteGroupOutput from "../Modal/ConfirmDeleteGroupOutput";
export default {
  name: "scene-manager",
  data() {
    return {
      currentIndex: false,
      currentGroup: false,
      isShowModalAddGroupLighting: false,
      isShowModalUpdateGroupOutput: false,
      isShowModalConfirmDeleteGroupOutput: false
    };
  },
  components: {
    GroupLightingOutputRow,
    ModalAddGroupLighting,
    ModalUpdateGroupOutput,
    ModalConfirmDeleteGroupOutput
  },
  computed: {
    listGrouplightingOutput
  },
  methods: {
    updateGroupOutput,
    deleteGroupOutput
  }
};

function listGrouplightingOutput() {
  return $state.RuleManager.out.groups;
}

function updateGroupOutput(group, index) {
  this.currentIndex = index;
  this.isShowModalUpdateGroupOutput = true;
}

function deleteGroupOutput(group, index) {
  this.currentIndex = index;
  this.currentGroup = group;
  this.isShowModalConfirmDeleteGroupOutput = true;
}
</script>

<style lang="scss">
</style>
