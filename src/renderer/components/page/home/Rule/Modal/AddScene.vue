<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-add-scene-output modal-full-height modal-width-md"
    footerClasses="p-0"
    @close="closeModal"
  >
    <template slot="header">
      <h5 class="text-center w-100">{{$t('rule.addSceneOutput')}}</h5>
      <span class="pull-right c-p" @click="closeModal">
        <i class="mdi mdi-close"></i>
      </span>
    </template>
    <div class="h-5 select-header">
      <h5>
        <span
          class="c-p"
          :class="{active:!isShowSceneLighting}"
          @click="isShowSceneLighting=false"
        >{{$t('roomFloor.text.normalScene')}}</span>
        <span
          class="ml-2 c-p"
          :class="{active:isShowSceneLighting}"
          @click="isShowSceneLighting=true"
        >{{$t('roomFloor.text.lightingScene')}}</span>
        <base-button
          class="border-radius-3 pull-right"
          @click="addScenes"
          :class="{disabled:!selectedScenes.length}"
        >{{$t('rule.addScene')}}</base-button>
      </h5>
    </div>

    <div class="h-90 w-fit-content flex-start row p-2 overflow-y-auto">
      <div v-for="scene in listScene" :key="scene.ruleid" class="p-2 col-6">
        <div
          class="scene-item px-2 py-1"
          :class="{active:selectedScenes.includes(scene.ruleid)}"
          @click="toggleSelectScene(scene.ruleid)"
        >
          <div class="scene-info text-overflow-hidden">
            <i :class="'icon-'+getIconScene(scene.iconkey).icon"></i>
            <span class="text-overflow-hidden pl-2">{{scene.name}}</span>
          </div>
          <span>
            <i
              class="mdi"
              :class="selectedScenes.includes(scene.ruleid)?'mdi-checkbox-marked':'mdi-checkbox-blank-outline'"
            ></i>
          </span>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { TYPE_RULE } from "../../../../../plugins/variableConst";
import { getIconScene } from "../../../../../plugins/helper";
export default {
  name: "modal-choose-sensor",
  props: {
    isShowModal: Boolean
  },
  data() {
    return {
      isShowSceneLighting: false,
      selectedScenes: []
    };
  },
  computed: {
    listScene
  },
  methods: {
    addScenes,
    toggleSelectScene,
    getIconScene,
    closeModal
  }
};
function listScene() {
  return $getters["HomeConfig/getRulesByType"]([
    this.isShowSceneLighting ? TYPE_RULE.scene_lighting : TYPE_RULE.scene
  ]).filter(
    scene =>
      !($state.RuleManager.out.scenes || []).find(
        item => item.ruleid === scene.ruleid
      )
  );
}

function toggleSelectScene(sceneid) {
  let index = this.selectedScenes.findIndex(item => sceneid === item);
  if (index === -1) {
    this.selectedScenes.push(sceneid);
  } else {
    this.selectedScenes.splice(index, 1);
  }
}

function addScenes() {
  $commit("RuleManager/ADD_SCENESS_OUTPUT", this.selectedScenes);
  this.selectedScenes = [];
}

function closeModal() {
  this.selectedScenes = [];
  this.$emit("closeModal");
}
</script>

<style lang="scss">
</style>
