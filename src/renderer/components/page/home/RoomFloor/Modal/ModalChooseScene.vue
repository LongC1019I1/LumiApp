<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-choose-scene modal-full-height modal-width-md"
    footerClasses="p-0"
    @close="$emit('closeModal')"
  >
    <template slot="header">
      <h5 class="text-center w-100">{{$t('roomFloor.text.addSceneToRoom')}}</h5>
      <span class="pull-right c-p" @click="$emit('closeModal')">
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
      </h5>
    </div>
    <div v-if="isShowSceneLighting" class="h-95 flex-start row pt-2 overflow-y-auto">
      <base-scene
        v-for="scene in lightingSceneList"
        :key="scene.ruleid"
        :scene="scene"
        :isActive="(scene.rooms||[]).includes(roomid)"
        @click="updateSceneInroom(scene)"
      ></base-scene>
    </div>
    <div v-else class="h-95 flex-start row pt-2 overflow-y-auto">
      <base-scene
        v-for="scene in normalSceneList"
        :key="scene.ruleid"
        :scene="scene"
        :isActive="(scene.rooms||[]).includes(roomid)"
        @click="updateSceneInroom(scene)"
      ></base-scene>
    </div>
  </modal>
</template>

<script>
import BaseScene from "../../../../base/controll/Scene";
import { TYPE_RULE } from "../../../../../plugins/variableConst";
export default {
  name: "modal-choose-sensor",
  props: {
    isShowModal: Boolean,
    roomid: String
  },
  data() {
    return {
      isShowSceneLighting: false
    };
  },
  computed: {
    normalSceneList,
    lightingSceneList
  },
  components: { BaseScene },
  methods: { updateSceneInroom }
};
function normalSceneList() {
  return $getters["HomeConfig/getRulesByType"]([TYPE_RULE.scene]);
}

function lightingSceneList() {
  return $getters["HomeConfig/getRulesByType"]([TYPE_RULE.scene_lighting]);
}

function updateSceneInroom(scene) {
  let updateData = {
    rooms: [...(scene.rooms || [])]
  };
  if (updateData.rooms.includes(this.roomid)) {
    let index = updateData.rooms.indexOf(this.roomid);
    if (index > -1) {
      updateData.rooms.splice(index, 1);
    }
  } else updateData.rooms.push(this.roomid);

  $dispatch($api.HomeConfig.updateRule, { ruleid: scene.ruleid, updateData });
}
</script>

<style lang="scss">
</style>
