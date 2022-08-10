<template>
  <tr :group="group">
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
        type="number"
        v-model="transition"
        @input="updateTransition"
        class="delay-time-input pl-3"
        min="0"
        max="5"
      >
    </td>
    <td>{{ groupInfo && groupInfo.name }}</td>
    <td>{{ (room && room.name) || "" }}</td>
    <td v-if="groupInfo && groupInfo.type === DEVICE_TYPE.SWITCH">
      <base-slider
        size="md"
        class="mb-0"
        :value="getActiveDeviceFromExecution(groupInfo, group.execution)"
        @submit="
          updateStatus(
            DEVICE_TRAIT.OnOff,
            !getActiveDeviceFromExecution(groupInfo, group.execution)
          )
        "
      />
    </td>
    <td class="text-overflow-hidden max-w-100" v-else></td>
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
          @click="$store.commit('RuleManager/DUPLICATE_GROUP_OUTPUT', index)"
        >
          <i class="mdi mdi-content-copy"></i>
          {{ $t("add") }}
        </div>
      </base-dropdown> -->
    </td>
  </tr>
</template>

<script>
import {
  getStatusDeviceFromExecution,
  getActiveDeviceFromExecution,
  calcTimestamp
} from "@/plugins/helper";
import { DEVICE_TRAIT, DEVICE_TYPE } from "@/plugins/variableConst";
import { log } from "util";

export default {
  name: "group-row",
  props: {
    group: Object,
    index: Number
  },
  data() {
    return {
      inputTimer: timer(this.group.delay * 1000 - 7 * 3600000, "HH:mm:ss"),
      transition: (this.group.execution.transition || 0) / 1000,
      room: "",
      DEVICE_TYPE,
      DEVICE_TRAIT
    };
  },
  computed: {
    groupInfo,
    status
  },
  watch: {
    group: { handler: resetData, deep: true }
  },
  methods: {
    getStatusDeviceFromExecution,
    getActiveDeviceFromExecution,
    calcTimestamp,
    updateData,
    updateStatus,
    updateTransition
  }
};

function groupInfo() {
  let group = $state.HomeConfig.groups.find(
    item => item.groupid === this.group.groupid
  );
  if (group) {
    this.room = $state.HomeConfig.rooms.find(
      room => room.roomid == group.roomid
    );
  }
  return group;
}

function status() {
  let status = $getters["HomeControll/getGroupStatusByGroupID"](
    this.group && this.group.devid
  );
  return status;
}

function resetData(group) {
  if (!group) return;
  this.inputTimer = timer((group.delay || 0) * 1000 - 7 * 3600000, "HH:mm:ss");
  this.execution = group && group.execution;
  this.transition = (this.group.execution.transition || 0) / 1000;
}

function updateData(index, param, data) {
  $commit("RuleManager/UPDATE_OUTPUT_GROUP_STATUS", {
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

function updateTransition() {
  if (this.transition > 5) this.transition = 5;
  if (this.transition < 0) this.transition = 0;
  updateData(this.index, "execution", {
    ...this.group.execution,
    transition: this.transition * 1000
  });
}
</script>

<style lang="scss"></style>
