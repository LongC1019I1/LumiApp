<template>
  <div class="group-info-box mb-3" :schedule="schedule">
    <div class="scene-info-box">
      <div class="label">{{ $t("scene.timer") }}</div>
      <div class="info">
        <base-slider
          size="md"
          :value="hasSchedule"
          @submit="updateSchedule('onOff')"
          class="mb-0"
        ></base-slider>
      </div>
    </div>
    <div v-if="hasSchedule" class="scene-info-box">
      <div class="time-box w-100 p-2">
        <span class="min-w-maxcontent">{{ $t("scene.time") }}:</span>
        <v-select
          class="timer-select mx-2"
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
      <div v-if="typeTimer === 0" class="time-box w-100 p-2">
        <span class="min-w-maxcontent"> {{ $t("scene.chooseTime") }}:</span>
        <div class="group-input">
          <masked-input
            type="text"
            class="form-group mx-2 mb-0 px-3 py-2"
            v-model="inputTimer"
            :showMask="true"
            :keepCharPositions="true"
            :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
            placeholderChar="-"
            @keyup="updateSchedule('time')"
          ></masked-input>
          <i class="time-picker-icon mdi mdi-clock-outline"></i>
        </div>
      </div>
      <template v-else>
        <div class="time-box w-100 p-2">
          <span class="min-w-maxcontent">{{ $t("scene.chooseTime") }}:</span>
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
    <div
      v-if="hasSchedule"
      class="scene-info-box replay-timer-box justify-start align-start"
    >
      <div class="title w-max px-2">{{ $t("scene.replay") }}</div>
      <div class="row col px-5">
        <div class="col-3">
          <span class="c-p" @click="toggleAllRepeat">
            <span>
              <i
                class="mdi"
                :class="
                  this.repeatList.find((item) => !item.value)
                    ? 'mdi-checkbox-blank-outline'
                    : 'mdi-checkbox-marked-outline'
                "
              ></i>
            </span>
            <span>{{ $t("scene.all") }}</span>
          </span>
        </div>
        <div v-for="(value, index) in repeatList" :key="index" class="col-3">
          <span class="c-p" @click="updateSchedule('repeat', index)">
            <span>
              <i
                class="mdi"
                :class="
                  value.value
                    ? 'mdi-checkbox-marked-outline'
                    : 'mdi-checkbox-blank-outline'
                "
              ></i>
            </span>
            <span>{{ $t("scene." + value.label) }}</span>
          </span>
        </div>
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
      else
        schedule = {
          endtime: timer(Date.now(), "HH:mm"),
          starttime: timer(Date.now(), "HH:mm"),
        };
      break;
    case 0:
      schedule = {
        endtime: timer(Date.now(), "HH:mm"),
        starttime: timer(Date.now(), "HH:mm"),
      };
      break;
    case 1:
      schedule = {
        endtime: { moment: "sunrise", offset: 0 },
        starttime: { moment: "sunrise", offset: 0 },
      };
      break;
    case 2:
      schedule = {
        endtime: { moment: "sunset", offset: 0 },
        starttime: { moment: "sunset", offset: 0 },
      };
      break;
    case "time":
      if (this.inputTimer.includes("-")) return;
      let checkTimer = this.inputTimer.split(":")
      if (Number(checkTimer[0]) > 24) checkTimer[0] = 24;
      if (Number(checkTimer[1]) > 59) checkTimer[1] = 59;
      schedule = {
        endtime: checkTimer.join(":"),
        starttime: checkTimer.join(":"),
      };
      break;
    case "offset":
      if (this.typeTimer === 1)
        schedule = {
          endtime: { moment: "sunrise", offset: value },
          starttime: { moment: "sunrise", offset: value },
        };
      if (this.typeTimer === 2)
        schedule = {
          endtime: { moment: "sunset", offset: value },
          starttime: { moment: "sunset", offset: value },
        };
      break;
    case "repeat":
      if (value !== false)
        this.repeatList[value].value = !this.repeatList[value].value;
      schedule.repeat = {
        abouttime: [],
        date: this.repeatList.map((item) => (item.value ? "1" : "0")).join(""),
        type: 0,
      };
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
