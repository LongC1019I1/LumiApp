<template>
  <div id="scene" class="main-layout">
    <div class="scene-list-box">
      <scene-list :sceneType="sceneType" @updateSceneType="updateSceneType"/>
    </div>
    <div class="scene-manager-box">
      <scene-manager v-if="sceneType===TYPE_RULE.scene"/>
      <scene-lighting
        v-else-if="sceneType===TYPE_RULE.scene_lighting"
        @showModalAddDeviceLighting="isShowModalAddDeviceLighting=true"
      />
      <card v-else>
        <div class="justify-content-center text-center">
          <h5>{{$t('scene.tutorialText')}}</h5>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { TYPE_RULE } from "@/plugins/variableConst";
import SceneManager from "./SceneManager";
import SceneLighting from "./SceneLighting";
import SceneList from "./SceneList";
//
export default {
  name: "scene",
  data() {
    return {
      sceneType: 1,
      TYPE_RULE
    };
  },
  components: {
    SceneList,
    SceneManager,
    SceneLighting
  },
  methods: {
    updateSceneType
  },
  destroyed() {
    $dispatch($api.RuleManager.resetData);
  }
};

function updateSceneType(value) {
  this.sceneType = value;
  $dispatch("RuleManager/setRule", false);
}
</script>

<style lang="scss">

</style>
