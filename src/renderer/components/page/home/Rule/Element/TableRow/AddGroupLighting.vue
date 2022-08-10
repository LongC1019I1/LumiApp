<template>
  <tr :class="{selected}">
    <td>
      <i
        class="mdi"
        :class="selected?'mdi-checkbox-marked-outline':'mdi-checkbox-blank-outline'"
        @click="$emit('selectGroup', group)"
      />
    </td>
    <td>{{ group.name }}</td>
    <td>{{ room && room.name || ''}}</td>
    <td>{{ getTypeDeviceName(group) }}</td>
    <td>
      <i v-if="!status" class="mdi mdi-restore-alert icon-status-error text-danger"/>
      <i v-else-if="status.status === 'ERROR' " class="mdi mdi-sync-off icon-status-error"/>
      <base-slider v-else size="md" class="mb-0" :value="isAcive" @submit="controllGroupOnOff"></base-slider>
    </td>
  </tr>
</template>

<script>
import { getActiveDeviceFromVal, getTypeDeviceName } from "@/plugins/helper";
import { DEVICE_TRAIT, DEVICE_TYPE } from "@/plugins/variableConst";

export default {
  name: "group-row-add-group",
  props: {
    group: Object,
    selected: Boolean
  },
  data() {
    return {
      hasOnOffTrait: [DEVICE_TYPE.SWITCH, DEVICE_TYPE.LIGHT],
      room: "",
      isAcive: false
    };
  },
  computed: {
    status
  },
  methods: {
    getActiveDeviceFromVal,
    controllGroupOnOff,
    getTypeDeviceName
  },
  watch: {
    group: {
      handler: watchGroup,
      deep: true
    }
  },
  mounted: watchGroup
};

function watchGroup() {
  this.room = $state.HomeConfig.rooms.find(
    room => room.roomid == this.group.roomid
  );
}

function status() {
  let status = $getters["HomeControll/getGroupStatusByGroupID"](
    this.group && this.group.groupid
  );
  if (status)
    this.isAcive = getActiveDeviceFromVal(this.group, status && status.states);
  return status;
}

function controllGroupOnOff() {
  let execution = {
    command: DEVICE_TRAIT.OnOff,
    params: {
      on: !this.isAcive
    }
  };
  $dispatch($api.HomeControll.controllGroup, {
    groupid: this.group.groupid,
    execution
  });
}
</script>

<style lang="scss">
</style>
