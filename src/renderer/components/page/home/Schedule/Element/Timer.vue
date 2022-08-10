<template>
  <div class="state-device">
    <div class="state" :schedule="schedule">
      {{ $t("schedule.time.set-time") }}
    </div>
    <div class="state">
      <div class="scene-info-box d-flex">
        <div class="time-box min-w-maxcontent">
          <span class="min-w-maxcontent">{{ $t("scene.time") }}:</span>
          <v-select
            class="timer-select select-time"
            :options="typeTimerList"
            :reduce="(label) => label.value"
            label="label"
            :value="typeTimer"
            :clearable="false"
            :searchable="false"
            @input="updateSchedule"
          >
            <template #open-indicator>
              <span v-bind="selectAttributes">
                <i class="mdi mdi-menu-down"></i>
              </span>
            </template>
          </v-select>
        </div>
        <div v-if="typeTimer === 0" class="time-box w-100">
          <span class="choose-time">{{ $t("rule.chooseTime") }}:</span>
          <div class="group-input">
            <masked-input
              type="text"
              class="text-center form-group mx-2 mb-0 px-3 py-2"
              v-model="inputTimer"
              :showMask="true"
              :keepCharPositions="true"
              :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
              placeholderChar="-"
              @keyup="updateSchedule('time')"
            ></masked-input>
          </div>
        </div>
        <template v-else>
          <div class="time-box w-100">
            <span class="mr-2">{{ $t("schedule.state.select-time") }}:</span>
            <v-select
              class="timer-select mx-2"
              :options="offsetList"
              :value="offset"
              :clearable="false"
              :searchable="false"
              @input="
                (value) => {
                  updateSchedule('offset', value);
                }
              "
            >
              <template #open-indicator>
                <span v-bind="selectAttributes">
                  <i class="mdi mdi-menu-down"></i>
                </span>
              </template>
              <template #selected-option="{ label }">
                <span v-if="label < 60 && label > -60 && label !== '0'">
                  {{ Math.abs(label) }}
                  {{ $t("scene.minute") }}
                </span>
                <span v-if="label >= 60 || label <= -60">
                  {{ Math.abs(label / 60) }}
                  {{ $t("scene.hour") }}
                </span>
                <span v-if="label < 0">&nbsp;{{ $t("scene.before") }}</span>
                <span v-if="label > 0">&nbsp;{{ $t("scene.after") }}</span>
                <span v-if="typeTimer === 1"
                  >&nbsp;{{
                    label == "0" ? $t("scene.sunrise") : $t("scene.sunrise2")
                  }}</span
                >
                <span v-if="typeTimer === 2"
                  >&nbsp;{{
                    label == "0" ? $t("scene.sunset") : $t("scene.sunset2")
                  }}</span
                >
              </template>
              <template #option="{ label }">
                <span v-if="label < 60 && label > -60 && label !== 0">
                  {{ Math.abs(label) }}
                  {{ $t("scene.minute") }}
                </span>
                <span v-if="label >= 60 || label <= -60">
                  {{ Math.abs(label / 60) }}
                  {{ $t("scene.hour") }}
                </span>
                <span v-if="label < 0">&nbsp;{{ $t("scene.before") }}</span>
                <span v-if="label > 0">&nbsp;{{ $t("scene.after") }}</span>
                <span v-if="typeTimer === 1"
                  >&nbsp;{{
                    label === 0 ? $t("scene.sunrise") : $t("scene.sunrise2")
                  }}</span
                >
                <span v-if="typeTimer === 2"
                  >&nbsp;{{
                    label === 0 ? $t("scene.sunset") : $t("scene.sunset2")
                  }}</span
                >
              </template>
            </v-select>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scene-timer",
  data() {
    return {
      hasSchedule: false,
      typeTimer: 0,
      inputTimer: "",
      repeatList: [
        { label: "monday", value: 0 },
        { label: "tuesday", value: 0 },
        { label: "thirday", value: 0 },
        { label: "wednessday", value: 0 },
        { label: "friday", value: 0 },
        { label: "saturday", value: 0 },
        { label: "sunday", value: 0 },
      ],
      offset: 0,
      typeTimerList: [
        {
          label: this.$t("scene.specificallyTime"),
          value: 0,
        },
        {
          label: this.$t("scene.sunrise"),
          value: 1,
        },
        {
          label: this.$t("scene.sunset"),
          value: 2,
        },
      ],
      offsetList: [
        -240,
        -180,
        -120,
        -60,
        -45,
        -30,
        -15,
        0,
        15,
        30,
        45,
        60,
        120,
        180,
        240,
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
    };
  },
  computed: {
    schedule,
  },

  methods: {
    updateSchedule,
    toggleAllRepeat,
  },
};

function schedule() {
  let schedule = $state.RuleManager.in.schedule;
  if (schedule) {
    this.hasSchedule = true;
    let typeTimer = schedule.starttime && schedule.starttime.moment;
    let repeatTime =
      schedule.repeat &&
      schedule.repeat.date &&
      schedule.repeat.date.split("").map(Number);
    if (repeatTime && repeatTime.length)
      this.repeatList.forEach((item, index) => {
        item.value = repeatTime[index];
      });
    if (!typeTimer) {
      this.typeTimer = 0;
      this.inputTimer = schedule.starttime;
      return schedule;
    }
    if (typeTimer === "sunrise") this.typeTimer = 1;
    if (typeTimer === "sunset") this.typeTimer = 2;
    this.offset = schedule.starttime.offset || "0";
    return schedule;
  }
  this.hasSchedule = false;
}

function updateSchedule(key, value) {
  let schedule = Object.assign({}, $state.RuleManager.in.schedule);
  switch (key) {
    case "onOff":
      if (this.hasSchedule) return $commit("RuleManager/SET_DATA", { in: {} });
      else {
        schedule.endtime = timer(Date.now(), "HH:mm");
        schedule.starttime = timer(Date.now(), "HH:mm");
      }
      break;
    case 0:
      schedule.endtime = timer(Date.now(), "HH:mm");
      schedule.starttime = timer(Date.now(), "HH:mm");
      break;
    case 1:
      schedule.endtime = { moment: "sunrise", offset: 0 };
      schedule.starttime = { moment: "sunrise", offset: 0 };
      break;
    case 2:
      schedule.endtime = { moment: "sunset", offset: 0 };
      schedule.starttime = { moment: "sunset", offset: 0 };
      break;
    case "time":
      if (this.inputTimer.includes("-")) return;
      let checkTimer = this.inputTimer.split(":");
      if (Number(checkTimer[0]) > 24) checkTimer[0] = 24;
      if (Number(checkTimer[1]) > 59) checkTimer[1] = 59;
      schedule.endtime = checkTimer.join(":");
      schedule.starttime = checkTimer.join(":");
      break;
    case "offset":
      if (this.typeTimer === 1) {
        schedule.endtime = { moment: "sunrise", offset: value };
        schedule.starttime = { moment: "sunrise", offset: value };
      }

      if (this.typeTimer === 2) {
        schedule.endtime = { moment: "sunset", offset: value };
        schedule.starttime = { moment: "sunset", offset: value };
      }

      break;
  }

  $commit("RuleManager/SET_DATA", {
    in: {
      schedule,
    },
  });
}

function toggleAllRepeat() {
  if (this.repeatList.find((item) => !item.value))
    this.repeatList.forEach((item) => (item.value = 1));
  else this.repeatList.forEach((item) => (item.value = 0));
  updateSchedule.call(this, "repeat", false);
}
</script>

<style lang="scss">
</style>
