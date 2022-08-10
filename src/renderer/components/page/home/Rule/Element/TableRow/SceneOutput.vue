<template>
  <tr>
    <td>
      <masked-input
        type="text"
        class="delay-time-input"
        v-model="inputTimer"
        @input="updateData(index, 'delay', calcTimestamp(inputTimer))"
        :showMask="true"
        :keepCharPositions="true"
        :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
        placeholderChar="-"
      ></masked-input>
    </td>
    <td>
      <input
        v-if="sceneInfo&&sceneInfo.type===TYPE_RULE.scene_lighting"
        type="number"
        v-model="transition"
        @input="updateTransition"
        class="delay-time-input pl-3"
        min="0"
        max="5"
      >
    </td>
    <td class="text-overflow-hidden max-w-200" :title="sceneInfo && sceneInfo.name">{{ sceneInfo && sceneInfo.name }}</td>
    <td class="text-overflow-hidden max-w-200" :title=" room|| '' ">{{ room|| "" }}</td>
    <td>
      <base-button
        class="py-1 px-3 border-radius-2"
        @click="$store.commit('RuleManager/DELETE_SCENE_OUTPUT', index);"
      >{{$t('delete')}}</base-button>
    </td>
  </tr>
</template>

<script>
import { calcTimestamp } from "@/plugins/helper";
import { TYPE_RULE } from "@/plugins/variableConst";
export default {
  name: "scene-row",
  props: {
    scene: Object,
    index: Number
  },
  data() {
    return {
      inputTimer: timer(this.scene.delay * 1000 - 7 * 3600000, "HH:mm:ss"),
      transition: (this.scene.transition || 0) / 1000,
      room: "",
      TYPE_RULE
    };
  },
  computed: {
    sceneInfo
  },
  watch: {
    scene: { handler: resetData, deep: true }
  },
  methods: {
    calcTimestamp,
    updateData,
    updateTransition
  }
};

function sceneInfo() {
  let { ruleid } = this.scene;
  let scene = $state.HomeConfig.rules.find(item => item.ruleid == ruleid);
  if (scene) {
    this.room = $state.HomeConfig.rooms
      .filter(room => (scene.rooms || []).includes(room.roomid))
      .map(room => room.name)
      .join(", ");
  }
  return scene;
}

function resetData(scene) {
  if (!scene) return;
  this.inputTimer = timer((scene.delay || 0) * 1000 - 7 * 3600000, "HH:mm:ss");
  this.transition = (scene.transition || 0) / 1000;
}

function updateData(index, param, data) {
  $commit("RuleManager/UPDATE_OUTPUT_SCENE_STATUS", {
    index,
    param,
    data
  });
}

function updateTransition() {
  if (this.transition > 5) this.transition = 5;
  if (this.transition < 0) this.transition = 0;
  updateData(this.index, "transition", this.transition * 1000);
}
</script>

<style lang="scss"></style>
