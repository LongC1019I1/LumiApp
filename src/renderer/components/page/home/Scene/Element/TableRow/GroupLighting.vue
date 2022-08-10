<template>
  <tr :group="group">
    <td>
      <masked-input
        type="text"
        class="delay-time-input"
        v-model="inputTimer"
        @keyup="updateData(index, 'delay', calcTimestamp(inputTimer))"
        :showMask="true"
        :keepCharPositions="true"
        :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
        placeholderChar="-"
      ></masked-input>
    </td>
    <td>
      <input
        type="number"
        v-model="transition"
        @keyup="$emit('updateData', 'transition', transition)"
        class="delay-time-input"
        min="0"
        max="5"
      >
    </td>
    <td>{{ groupInfo && groupInfo.name }}</td>
    <td>{{ (room && room.name) || "" }}</td>
    <td>
      <!-- <base-slider
        size="md"
        class="mb-0"
        :value="getActiveGroupFromExecution(groupInfo, group.execution)"
        @submit="
          updateStatus(
            DEVICE_TRAIT.OnOff,
            !getActiveGroupFromExecution(groupInfo, group.execution)
          )
        "
      />-->
    </td>
    <td class="p-0">
      <!-- <base-dropdown position="right" class="group-menu">
        <template #title>
          <div class="c-p">
            <i class="mdi mdi-dots-horizontal"></i>
          </div>
        </template>
        <div class="dropdown-item" @click="$emit('updateGroupOutput')">
          <i class="mdi mdi-clipboard-edit-outline"></i>
          {{ $t("edit") }}
        </div>
        <div class="dropdown-item" @click="$emit('deleteGroupOutput')">
          <i class="mdi mdi-delete"></i>
          {{ $t("delete") }}
        </div>
        <div
          class="dropdown-item"
          @click="$store.commit('RuleManager/DUPLICATE_DEVICE_OUTPUT', index)"
        >
          <i class="mdi mdi-content-copy"></i>
          {{ $t("add") }}
        </div>
      </base-dropdown> -->
    </td>
  </tr>
</template>

<script>
import { calcTimestamp } from "@/plugins/helper";
import {
  DEVICE_TRAIT,
  DEVICE_TYPE,
  IR_ID_AIR,
  IR_TYPE,
  IRV2_ALL_TYPE,
  MODE_DAIKIN,
  SPEED_DAIKIN,
  SWING_DAIKIN,
  SPEED_IRV2_AC,
  SWING_IRV2_AC,
  MODE_IRV2_AC
} from "@/plugins/variableConst";
import { log } from "util";

export default {
  name: "group-row",
  props: {
    group: Object,
    index: Number
  },
  data() {
    return {
      inputTimer: timer(
        (this.group && this.group.delay) || 0 * 1000 - 7 * 3600000,
        "HH:mm:ss"
      ),
      transition: (this.group && this.group.transition) || 0,
      room: "",
      hc: "",
      DEVICE_TYPE,
      DEVICE_TRAIT,
      IR_TYPE
    };
  },
  computed: {
    groupInfo
  },
  watch: {
    group: { handler: resetData, deep: true }
  },
  methods: {
    calcTimestamp,
    updateData,
    updateStatus
  },
  mounted() {
    console.log(this.group);
  }
};

function groupInfo() {
  let group = $state.HomeConfig.groups.find(
    item => item.groupid === this.group.groupid
  );
  console.log(group);
  if (group) {
    this.room = $state.HomeConfig.rooms.find(
      room => room.roomid == group.roomid
    );
  }
  return group;
}

function resetData(group) {
  if (!group) return;
  this.inputTimer = timer((group.delay || 0) * 1000 - 7 * 3600000, "HH:mm:ss");
  this.transition = group.transition;
  this.execution = group && group.execution;
}

function updateData(index, param, data) {
  // console.log("log", this.index, this.inputTimer);
  $commit("RuleManager/UPDATE_OUTPUT_DEVICE_STATUS", {
    index,
    param,
    data
  });
}

function updateStatus(traits, value) {
  if (!this.groupInfo) return;
  switch (this.groupInfo.type) {
    case DEVICE_TYPE.SWITCH:
      updateData(this.index, "execution", {
        command: traits,
        params: { on: value }
      });
      break;
  }
}
</script>

<style lang="scss"></style>
