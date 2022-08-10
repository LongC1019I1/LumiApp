<template>
  <fragment>
    <div class="rule-info-box" :schedule="schedule">
      <div class="label">{{ $t("rule.timer") }}</div>
      <div class="info">
        <base-slider
          size="md"
          :value="hasSchedule"
          @submit="updateSchedule('onOff')"
          class="mb-0"
        ></base-slider>
      </div>
    </div>
    <div v-if="hasSchedule" class="rule-info-box">
      <div class="time-box px-2">
        <span class="min-w-maxcontent">{{ $t("rule.time") }}:</span>
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
      <template v-if="typeTimer === 0">
        <div class="time-box col-4 px-2">
          <span>{{ $t("rule.from") }}:</span>
          <div class="group-input">
            <masked-input
              type="text"
              class="form-group mx-2 mb-0 px-3 py-2"
              v-model="inputTimer1"
              :showMask="true"
              :keepCharPositions="true"
              :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
              placeholderChar="-"
              @keyup="updateSchedule('time')"
            ></masked-input>
            <i class="time-picker-icon mdi mdi-clock-outline"></i>
          </div>
        </div>
        <div class="time-box col-4 px-2">
          <span>{{ $t("rule.to") }}:</span>
          <div class="group-input">
            <masked-input
              type="text"
              class="form-group mx-2 mb-0 px-3 py-2"
              v-model="inputTimer2"
              :showMask="true"
              :keepCharPositions="true"
              :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
              placeholderChar="-"
              @keyup="updateSchedule('time')"
            ></masked-input>
            <i class="time-picker-icon mdi mdi-clock-outline"></i>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="time-box col-4 px-2">
          <span>{{ $t("rule.from") }}:</span>
          <v-select
            class="timer-select mx-2"
            :options="offsetList"
            :value="offset1"
            :clearable="false"
            :searchable="false"
            @input="
              (value) => {
                updateSchedule('offset1', value);
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
                {{ $t("rule.minute") }}
              </span>
              <span v-if="label >= 60 || label <= -60">
                {{ Math.abs(label / 60) }}
                {{ $t("rule.hour") }}
              </span>
              <span v-if="label < 0">&nbsp;{{ $t("rule.before") }}</span>
              <span v-if="label > 0">&nbsp;{{ $t("rule.after") }}</span>
              <span v-if="typeTimer === 1">
                &nbsp;{{
                  label == "0" ? $t("rule.sunrise") : $t("rule.sunrise2")
                }}
              </span>
              <span v-if="typeTimer === 2">
                &nbsp;{{
                  label == "0" ? $t("rule.sunset") : $t("rule.sunset2")
                }}
              </span>
            </template>
            <template #option="{ label }">
              <span v-if="label < 60 && label > -60 && label !== 0">
                {{ Math.abs(label) }}
                {{ $t("rule.minute") }}
              </span>
              <span v-if="label >= 60 || label <= -60">
                {{ Math.abs(label / 60) }}
                {{ $t("rule.hour") }}
              </span>
              <span v-if="label < 0">&nbsp;{{ $t("rule.before") }}</span>
              <span v-if="label > 0">&nbsp;{{ $t("rule.after") }}</span>
              <span v-if="typeTimer === 1">
                &nbsp;{{
                  label === 0 ? $t("rule.sunrise") : $t("rule.sunrise2")
                }}
              </span>
              <span v-if="typeTimer === 2">
                &nbsp;{{ label === 0 ? $t("rule.sunset") : $t("rule.sunset2") }}
              </span>
            </template>
          </v-select>
        </div>
        <div class="time-box col-4 px-2">
          <span>{{ $t("rule.to") }}:</span>
          <v-select
            class="timer-select mx-2"
            :options="offsetList"
            :value="offset2"
            :clearable="false"
            :searchable="false"
            @input="
              (value) => {
                updateSchedule('offset2', value);
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
                {{ $t("rule.minute") }}
              </span>
              <span v-if="label >= 60 || label <= -60">
                {{ Math.abs(label / 60) }}
                {{ $t("rule.hour") }}
              </span>
              <span v-if="label < 0">&nbsp;{{ $t("rule.before") }}</span>
              <span v-if="label > 0">&nbsp;{{ $t("rule.after") }}</span>
              <span v-if="typeTimer === 1">
                &nbsp;{{
                  label == "0" ? $t("rule.sunset") : $t("rule.sunset2")
                }}
              </span>
              <span v-if="typeTimer === 2">
                &nbsp;{{
                  label == "0" ? $t("rule.sunrise") : $t("rule.sunrise2")
                }}
              </span>
            </template>
            <template #option="{ label }">
              <span v-if="label < 60 && label > -60 && label !== 0">
                {{ Math.abs(label) }}
                {{ $t("rule.minute") }}
              </span>
              <span v-if="label >= 60 || label <= -60">
                {{ Math.abs(label / 60) }}
                {{ $t("rule.hour") }}
              </span>
              <span v-if="label < 0">&nbsp;{{ $t("rule.before") }}</span>
              <span v-if="label > 0">&nbsp;{{ $t("rule.after") }}</span>
              <span v-if="typeTimer === 1">
                &nbsp;{{ label === 0 ? $t("rule.sunset") : $t("rule.sunset2") }}
              </span>
              <span v-if="typeTimer === 2">
                &nbsp;{{
                  label === 0 ? $t("rule.sunrise") : $t("rule.sunrise2")
                }}
              </span>
            </template>
          </v-select>
        </div>
      </template>
    </div>
    <div
      v-if="hasSchedule"
      class="rule-info-box replay-timer-box justify-start align-start"
    >
      <div class="title w-max px-2">{{ $t("rule.replay") }}</div>
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
            <span>{{ $t("rule.all") }}</span>
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
            <span>{{ $t("rule." + value.label) }}</span>
          </span>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "rule-timer",
  data() {
    return {
      hasSchedule: false,
      typeTimer: 0,
      inputTimer1: "",
      inputTimer2: "",
      repeatList: [
        { label: "monday", value: 0 },
        { label: "tuesday", value: 0 },
        { label: "thirday", value: 0 },
        { label: "wednessday", value: 0 },
        { label: "friday", value: 0 },
        { label: "saturday", value: 0 },
        { label: "sunday", value: 0 },
      ],
      offset1: 0,
      offset2: 0,
      typeTimerList: [
        {
          label: this.$t("rule.specificallyTime"),
          value: 0,
        },
        {
          label: this.$t("rule.day"),
          value: 1,
        },
        {
          label: this.$t("rule.night"),
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
      this.inputTimer1 = schedule.starttime;
      this.inputTimer2 = schedule.endtime;
      return schedule;
    }
    if (typeTimer === "sunrise") this.typeTimer = 1;
    if (typeTimer === "sunset") this.typeTimer = 2;
    this.offset1 = schedule.starttime.offset || "0";
    this.offset2 = schedule.endtime.offset || "0";
    return schedule;
  }
  this.hasSchedule = false;
}

function updateSchedule(key, value) {
  let inData = Object.assign({}, $state.RuleManager.in);
  switch (key) {
    case "onOff":
      if (this.hasSchedule) delete inData.schedule;
      else
        inData.schedule = {
          starttime: timer(Date.now(), "HH:mm"),
          endtime: timer(Date.now(), "HH:mm"),
        };
      break;
    case 0:
      inData.schedule = {
        starttime: timer(Date.now(), "HH:mm"),
        endtime: timer(Date.now(), "HH:mm"),
      };
      break;
    case 1:
      inData.schedule = {
        starttime: { moment: "sunrise", offset: 0 },
        endtime: { moment: "sunset", offset: 0 },
      };
      break;
    case 2:
      inData.schedule = {
        starttime: { moment: "sunset", offset: 0 },
        endtime: { moment: "sunrise", offset: 0 },
      };
      break;
    case "time":
      if (this.inputTimer1.includes("-") || this.inputTimer2.includes("-"))
        return;

      let checkTimer1 = this.inputTimer1.split(":");
      let checkTimer2 = this.inputTimer2.split(":");

      if (Number(checkTimer1[0]) > 24) checkTimer1[0] = 24;
      if (Number(checkTimer1[1]) > 59) checkTimer1[1] = 59;

      if (Number(checkTimer2[0]) > 24) checkTimer2[0] = 24;
      if (Number(checkTimer2[1]) > 59) checkTimer2[1] = 59;

      inData.schedule = {
        starttime: checkTimer1.join(":"),
        endtime: checkTimer2.join(":"),
      };
      break;
    case "offset1":
      if (this.typeTimer === 1)
        inData.schedule = {
          starttime: { moment: "sunrise", offset: value },
          endtime: { moment: "sunset", offset: this.offset2 },
        };
      if (this.typeTimer === 2)
        inData.schedule = {
          starttime: { moment: "sunset", offset: value },
          endtime: { moment: "sunrise", offset: this.offset2 },
        };
      break;
    case "offset2":
      if (this.typeTimer === 1)
        inData.schedule = {
          starttime: { moment: "sunrise", offset: this.offset1 },
          endtime: { moment: "sunset", offset: value },
        };
      if (this.typeTimer === 2)
        inData.schedule = {
          starttime: { moment: "sunset", offset: this.offset1 },
          endtime: { moment: "sunrise", offset: value },
        };
      break;
    case "repeat":
      if (value !== false)
        this.repeatList[value].value = !this.repeatList[value].value;
      inData.schedule.repeat = {
        abouttime: [],
        date: this.repeatList.map((item) => (item.value ? "1" : "0")).join(""),
        type: 0,
      };
      break;
  }
  $commit("RuleManager/SET_DATA", {
    in: inData,
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
