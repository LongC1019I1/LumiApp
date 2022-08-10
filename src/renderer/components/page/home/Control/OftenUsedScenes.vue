<template>
  <card id="oftenUsedScenes">
    <h5 slot="header" class="mb-0">
      <span class="title">{{$t('dashboard.title.oftenUsedScenes')}}</span>
      <i class="pull-right c-p mdi mdi-cog" @click="$emit('showUsedScenesSetting')"></i>
    </h5>
    <div class="row">
      <base-scene
        v-for="scene in oftenUsedScenes"
        :key="scene.ruleid"
        :scene="scene"
        @click="controllRule(scene.ruleid)"
      ></base-scene>
    </div>
  </card>
</template>

<script>
import BaseScene from "../../../base/controll/Scene";
import { TYPE_RULE } from "../../../../plugins/variableConst";
export default {
  name: "often-used-scenes",
  computed: {
    oftenUsedScenes
  },
  components: {
    BaseScene
  },
  methods: {
    controllRule
  }
};

function oftenUsedScenes() {
  let customerID = $state.Customer.customerData.id;
  return $getters["HomeConfig/getOftenUsedRulesByType"]({
    type: [TYPE_RULE.scene, TYPE_RULE.scene_lighting],
    customerID
  });
}

function controllRule(ruleid) {
  $dispatch($api.HomeControll.controllRule, { ruleid });
}
</script>

<style lang="scss">
#oftenUsedScenes {
  .scene-item {
    min-width: 50%;
    max-width: 50%;
  }
}
</style>
