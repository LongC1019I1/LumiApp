<template>
  <fragment>
    <modal-add-scene :isShowModal="isShowModalAddScene" @closeModal="isShowModalAddScene = false"/>
    <table v-if="listSceneOutput.length" class="table scene-info-box mb-1">
      <thead>
        <tr>
          <th>{{ $t("scene.delay") }}</th>
          <th>{{ $t("scene.transition") }}</th>
          <th>{{ $t("scene.sceneName") }}</th>
          <th>{{ $t("room") }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <scene-output-row
          v-for="(scene, index) in listSceneOutput"
          :key="scene.ruleid"
          :scene="scene"
          :index="index"
        />
        <tr>
          <td colspan="5" class="p-2">
            <div class="pull-right d-flex align-center">
              <span>{{ $t("scene.addScene") }}</span>
              <base-button
                class="mr-4 ml-2 add-item-button"
                size="md"
                type="secondary"
                @click="isShowModalAddScene = true"
              >
                <i class="mdi mdi-plus"></i>
              </base-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="scene-info-box mb-1">
      <div class="label">{{ $t("rule.addSceneOutput") }}</div>
      <div class="info">
        <base-button
          class="ml-2 mr-2 add-item-button"
          size="md"
          type="secondary"
          @click="isShowModalAddScene = true"
        >
          <i class="mdi mdi-plus"></i>
        </base-button>
      </div>
    </div>
  </fragment>
</template>

<script>
import SceneOutputRow from "./TableRow/SceneOutput";
import ModalAddScene from "../Modal/AddScene";

export default {
  name: "scene-output",
  data() {
    return {
      isShowModalAddScene: false
    };
  },
  components: {
    SceneOutputRow,
    ModalAddScene
  },
  computed: {
    listSceneOutput
  },
  methods: {
    updateDeviceOutput,
    deleteDeviceOutput
  }
};

function listSceneOutput() {
  return $state.RuleManager.out.scenes;
}

function updateDeviceOutput(device, index) {
  this.currentIndex = index;
  this.isShowModalUpdateDeviceOutput = true;
}

function deleteDeviceOutput(device, index) {
  this.currentIndex = index;
  this.currentDevice = device;
  this.isShowModalConfirmDeleteDeviceOutput = true;
}
</script>

<style lang="scss">
</style>
