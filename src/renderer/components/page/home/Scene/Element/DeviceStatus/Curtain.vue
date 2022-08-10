<template>
  <div>
    <v-select
      :options="curtainStatus"
      :reduce="label => label.value"
      v-model="currentCurtainStatus"
      label="label"
      :clearable="false"
      :searchable="false"
      @input="updateCurtainStatus"
      :class="{'mb-5 pb-5':currentCurtainStatus===1}"
    >
      <template #open-indicator>
        <span v-bind="selectAttributes">
          <i class="mdi mdi-menu-down"></i>
        </span>
      </template>
    </v-select>
    <div v-if="currentCurtainStatus!==1" class="pl-2 mt-5 row device-status">
      <div class="pl-3 w-max">
        <i :class="(statusList.find(item=>item.value===status)||statusList[0]).icon"></i>
      </div>
      <div class="col">
        <vue-slider
          class="curtain-rule-slider"
          @drag-end="updateStatus"
          :drag-on-click="true"
          v-model="status"
          :data="statusList"
          tooltip="always"
          :tooltip-formatter="'{value}%'"
        >
          <template v-slot:step="{ label, active }">
            <div :class="['custom-step', { active }]"></div>
          </template>
        </vue-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { DEVICE_TRAIT } from "@/plugins/variableConst";

let statusList = [
  {
    icon: "icon-device-curtain-horizontal-6",
    value: 0
  },
  {
    icon: "icon-device-curtain-horizontal-5",
    value: 17
  },
  {
    icon: "icon-device-curtain-horizontal-3",
    value: 33
  },
  {
    icon: "icon-device-curtain-horizontal-3",
    value: 50
  },
  {
    icon: "icon-device-curtain-horizontal-2",
    value: 67
  },
  {
    icon: "icon-device-curtain-horizontal-1",
    value: 83
  },
  {
    icon: "icon-device-curtain-horizontal-0",
    value: 100
  }
]

export default {
  name: "modal-update-deivce-switch",
  props: {
    value: Object
  },
  data() {
    return {
      status:
        (this.value.params.level || 0) === 99
          ? 100
          : this.value.params.level || 0,
      currentCurtainStatus:
        this.value.params.start === false
          ? 1
          : this.value.params.level === 100
          ? 2
          : 0,
      statusList,
      curtainStatus: [
        { label: this.$t("scene.open"), value: 0 },
        { label: this.$t("scene.stop"), value: 1 },
        { label: this.$t("scene.close"), value: 2 }
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator"
      },
      DEVICE_TRAIT
    };
  },
  watch: {
    value(value) {
      this.status =
        (value.params.level || 0) === 99 ? 100 : value.params.level || 0;
    }
  },

  mounted() {
    console.log('value',this.value)
  },
  methods: {
    updateCurtainStatus,
    updateStatus
  }
};

function updateStatus() {
  if (this.status === 100) this.currentCurtainStatus = 2;
  else this.currentCurtainStatus = 0;
  this.$emit("updateStatus", {
    command: DEVICE_TRAIT.Level,
    params: { level: this.status === 100 ? 99 : this.status }
  });
}

function updateCurtainStatus() {
  if (this.currentCurtainStatus === 2) this.status = 100;
  if (this.currentCurtainStatus === 0) this.status = 0;
  if (this.currentCurtainStatus === 1)
    this.$emit("updateStatus", {
      command: DEVICE_TRAIT.StartStop,
      params: { start: false }
    });
  else
    this.$emit("updateStatus", {
      command: DEVICE_TRAIT.Level,
      params: { level: this.status === 100 ? 99 : this.status }
    });
}
</script>

<style lang="scss">
</style>
