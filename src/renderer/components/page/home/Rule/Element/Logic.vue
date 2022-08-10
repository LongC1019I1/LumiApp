<template>
  <base-dropdown class="rule-info-box" position="right" :ruleLogic="ruleLogic">
    <template #title>
      <div class="d-flex justify-between w-100">
        <div class="label">{{$t('rule.logicRule')}}</div>
        <div class="info">
          <span
            class="text-overflow-hidden"
            v-if="currentLogic"
          >{{currentLogic.name}} - {{$t(currentLogic.description)}}</span>
          <i class="dropdown-icon mdi mdi-menu-down"></i>
        </div>
      </div>
    </template>
    <div
      v-for="logic in logicOption"
      :key="logic.name"
      class="dropdown-item text-overflow-hidden"
      @click="updateLogic(logic.value)"
    >{{logic.name}} - {{$t(logic.description)}}</div>
  </base-dropdown>
</template>

<script>
let logicOption = [
  {
    name: "AND",
    description: "rule.logicANDDescription",
    value: { logic: 0, sequenceType: 0 }
  },
  {
    name: "OR",
    description: "rule.logicORDescription",
    value: { logic: 1, sequenceType: 0 }
  },
  {
    name: "SEQUENCE - Interrupt",
    description: "rule.logicSequenceInterruptDescription",
    value: { logic: 2, sequenceType: 0 }
  },
  {
    name: "SEQUENCE - Sequentially",
    description: "rule.logicSequenceSequentiallyDescription",
    value: { logic: 2, sequenceType: 1 }
  }
];
import { DEVICE_TYPE, DEVICE_TRAIT } from "@/plugins/variableConst";
export default {
  name: "rule-manager",
  data() {
    return {
      logicOption,
      currentLogic: logicOption[0]
    };
  },
  computed: {
    ruleLogic
  },
  methods: {
    updateLogic
  }
};

function ruleLogic() {
  let logic = $state.RuleManager.in.logic;
  let sequenceType = $state.RuleManager.in.sequenceType;
  if (!logic) this.currentLogic = this.logicOption[0];
  else if (logic === 1) this.currentLogic = this.logicOption[1];
  else if (logic === 2 && sequenceType === 0)
    this.currentLogic = this.logicOption[2];
  else if (logic === 2 && sequenceType === 1)
    this.currentLogic = this.logicOption[3];
}

async function updateLogic(value) {
  if (value.logic === 2 && value.sequenceType === 1) {
    let listDevice = $state.RuleManager.in.devices.map(device => device.devid);
    listDevice = $state.HomeConfig.devices.filter(device =>
      listDevice.includes(device.devid)
    );
    listDevice = listDevice.filter(
      device =>
        [
          DEVICE_TYPE.CURTAIN,
          DEVICE_TYPE.FAN,
          DEVICE_TYPE.LIGHT,
          DEVICE_TYPE.LIGHTV2,
          DEVICE_TYPE.SPEAKER
        ].includes(device.type) ||
        (device.type === DEVICE_TYPE.SENSOR &&
          device.traits.find(item =>
            [
              DEVICE_TRAIT.Battery,
              DEVICE_TRAIT.Luminance,
              DEVICE_TRAIT.Humidity,
              DEVICE_TRAIT.Temperature
            ].includes(item.name)
          ))
    );
    if (listDevice && listDevice.length) {
      let confirmChangeLogic = await $alertify.confirm({
        title: this.$t("notify.notifyWarninglTitle"),
        text: this.$t("rule.notifyLogicSequenceWarning"),
        showCancelButton: true,
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel")
      });
      if (!(confirmChangeLogic && confirmChangeLogic.isConfirmed)) return;
      let listDeviceids = listDevice.map(device => device.devid);
      listDeviceids.forEach(devid => {
        $commit("RuleManager/DELETE_ALL_DEVICE_INPUT", devid);
      });
    }
  }
  let newInData = { ...$state.RuleManager.in, ...value };
  $commit("RuleManager/SET_DATA", { in: newInData });
}
</script>

<style lang="scss">
</style>
