<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-choose-scene modal-full-height modal-width-md"
    footerClasses="p-0"
    @close="$emit('closeModal')"
  >
    <template #header>
      <h5 class="text-center w-100">{{ $t("dashboard.addOftenUsedScene") }}</h5>
      <span class="pull-right c-p" @click="$emit('closeModal')">
        <i class="mdi mdi-close"></i>
      </span>
    </template>
    <div class="h-5 select-header">
      <h5>
        <span
          class="c-p"
          :class="{ active: !isShowSceneLighting }"
          @click="isShowSceneLighting = false"
          >{{ $t("roomFloor.text.normalScene") }}</span
        >
        <span
          class="ml-2 c-p"
          :class="{ active: isShowSceneLighting }"
          @click="isShowSceneLighting = true"
          >{{ $t("roomFloor.text.lightingScene") }}</span
        >
      </h5>
    </div>
    <div
      v-if="isShowSceneLighting"
      class="h-95 flex-start row pt-2 overflow-y-auto"
    >
      <base-scene
        v-for="scene in lightingSceneList"
        :key="scene.ruleid"
        :scene="scene"
        @click="updateSceneShortcut(scene)"
      ></base-scene>
    </div>
    <div v-else class="h-95 flex-start row pt-2 overflow-y-auto">
      <base-scene
        v-for="scene in normalSceneList"
        :key="scene.ruleid"
        :scene="scene"
        @click="updateSceneShortcut(scene)"
      ></base-scene>
    </div>
  </modal>
</template>

<script>
import BaseScene from "../Element/SceneSetting";
import { TYPE_RULE } from "../../../../../plugins/variableConst";
export default {
  name: "modal-choose-sensor",
  props: {
    isShowModal: Boolean,
    roomid: String,
  },
  data() {
    return {
      isShowSceneLighting: false,
    };
  },
  computed: {
    normalSceneList,
    lightingSceneList,
  },
  components: { BaseScene },
  methods: { updateSceneShortcut },
};
function normalSceneList() {
  return $getters["HomeConfig/getRulesByType"]([TYPE_RULE.scene]);
}

function lightingSceneList() {
  return $getters["HomeConfig/getRulesByType"]([TYPE_RULE.scene_lighting]);
}

function updateSceneShortcut(scene) {
  let customer_id = $state.Customer.customerData.id;
  let updateData = { shortcut_by_user: {} };
  if (scene.shortcut_by_user)
    Object.assign(updateData.shortcut_by_user, scene.shortcut_by_user);
  if (scene.shortcut_by_user[customer_id] == 1)
    updateData.shortcut_by_user[customer_id] = 0;
  else updateData.shortcut_by_user[customer_id] = 1;
  $dispatch($api.HomeConfig.updateRule, {
    ruleid: scene.ruleid,
    updateData,
    animation: false,
  });
}
</script>

<style lang="scss">
</style>
