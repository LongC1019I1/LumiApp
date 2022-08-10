<template>
  <div class="state-device mt-2">
    <div
      class="state redmine"
      :class="{ 'show-redmine': !hasRepeat }"
      style="margin-bottom: 0px !important"
    >
      <div class="group-info-box" :repeat="repeat">
        <div class="scene-info-box row">
          <div class="label col-10">{{ $t("scene.replay") }}</div>
          <div class="info col-2">
            <base-slider
              size="md"
              :value="hasRepeat"
              @submit="updateSchedule('onOff')"
              class="mb-0"
            ></base-slider>
          </div>
        </div>
      </div>
    </div>
    <div class="state">
      <div
        v-if="hasRepeat"
        class="repeat-schedule scene-info-box replay-timer-box"
      >
        <div class="d-flex">
          <div @click="updateSchedule('week')">
            <i v-if="repeat.type === 0" class="mdi mdi-radiobox-marked" />
            <i v-else class="mdi mdi-radiobox-blank" />
            {{ $t("schedule.week") }}
          </div>
          <div @click="updateSchedule('cycle')" class="ml-3">
            <i v-if="repeat.type === 1" class="mdi mdi-radiobox-marked" />
            <i v-else class="mdi mdi-radiobox-blank" />

            {{ $t("schedule.from-time") }}
          </div>
        </div>
        <div class="col-12">
          <div v-if="repeat.type === 0" class="row">
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
            <div
              v-for="(value, index) in repeatList"
              :key="index"
              class="col-3 mb-1"
            >
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
          <div v-if="repeat.type === 1" class="calender-schedule pb-2">
            <div class="d-flex">
              <div class="">
                {{ $t("schedule.start-date") }}
              </div>
              <div class="pl-2">
                <date-picker
                  v-model="abouttime.time"
                  valueType="format"
                  value-type="DD/MM/YYYY"
                  @change="updateSchedule('cycle')"
                  format="DD-MM-YYYY"
                ></date-picker>
              </div>
            </div>
            <div class="d-flex cycle align-center">
              <div>{{ $t("schedule.cycle") }}:</div>
              <div class="ml-2">
                <base-input
                  class="mb-0"
                  v-model="abouttime.after"
                  type="number"
                  @input="updateSchedule('cycle')"
                  :placeholder="$t('schedule.input-date')"
                />
              </div>
            </div>
          </div>
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
      time1: null,
      radio: {
        radio1: "radio1",
      },
      hasRepeat: false,
      typeTimer: 0,
      abouttime: {
        time: timer(new Date().getTime(), "DD-MM-YYYY"),
        after: "",
      },
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
    repeat,
  },
  methods: {
    updateSchedule,
    toggleAllRepeat,
    onlyNumber,
  },
};

function onlyNumber($event) {
  //console.log($event.keyCode); //keyCodes value
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    // 46 is dot
    $event.preventDefault();
  }
  let number = Number($event);
  if (number < 0 || number > 365) {
    $event.preventDefault();
  }
}

function repeat() {
  let repeat =
    $state.RuleManager.in.schedule && $state.RuleManager.in.schedule.repeat;
  if (repeat) {
    this.hasRepeat = true;
    // let typeTimer = schedule.starttime && schedule.starttime.moment;
    let repeatTime = repeat && repeat.date && repeat.date.split("").map(Number);
    if (repeatTime && repeatTime.length)
      this.repeatList.forEach((item, index) => {
        item.value = repeatTime[index];
      });
    let cycle = repeat && repeat.abouttime;
    if (cycle) {
      this.abouttime.time = cycle.day + "-" + cycle.month + "-" + cycle.year;
      this.abouttime.after = cycle.after;
    }
    return repeat;
  }
  this.hasRepeat = false;
}

function updateSchedule(key, value) {
  let schedule = JSON.parse(JSON.stringify($state.RuleManager.in.schedule));
  let repeat = Object.assign({}, schedule.repeat);

  switch (key) {
    case "onOff":
      if (this.hasRepeat) {
        let inData = Object.assign({}, $state.RuleManager.in.schedule);

        delete schedule.repeat;

        inData.schedule = schedule;
        $commit("RuleManager/SET_DATA", { in: inData });
        return (this.hasRepeat = false);
      } else schedule.repeat = { type: 0, date: "1111111" };
      break;

    case "repeat":
      if (value !== false)
        this.repeatList[value].value = !this.repeatList[value].value;
      break;

    case "cycle":
      let time = this.abouttime.time.split("-");

      //LIMIT 0 TO 365
      let cycle = Math.round(this.abouttime.after);
      if (cycle > 365) cycle = 365;
      if (cycle < 0) cycle = 0;
      schedule.repeat = {
        type: 1,
        abouttime: {
          after: cycle,
          day: time[0],
          month: time[1],
          year: time[2],
        },
      };
      break;

    //Chi de chuyen trang thai sang la week khong phai la cycle
    case "week":
      repeat.type = 0;
      schedule.repeat = { type: 0, date: "1111111" };
      break;
  }
  if (key === "repeat")
    schedule.repeat.date = this.repeatList
      .map((item) => (item.value ? "1" : "0"))
      .join("");

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
