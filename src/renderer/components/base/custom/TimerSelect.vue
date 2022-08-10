<template>
  <div class="timer-select" v-click-outside="closeSelectList">
    <div v-if="isShow" class="select-list">
      <div class="hours">
        <div
          v-for="index in listHours"
          :key="index"
          :class="{active: index==hours}"
          @click="updateTimer('hours', index)"
        >{{index}}</div>
      </div>
      <div class="minutes">
        <div
          v-for="index in listMinusteSecond"
          :key="index"
          :class="{active: index==minutes}"
          @click="updateTimer('minutes', index)"
        >{{index}}</div>
      </div>
      <div class="seconds">
        <div
          v-for="index in listMinusteSecond"
          :key="index"
          :class="{active: index==seconds}"
          @click="updateTimer('seconds', index)"
        >{{index}}</div>
      </div>
    </div>
    <div class="form-group input-group">
      <masked-input
        type="text"
        class="form-control"
        v-model="inputTimer"
        @keyup="updateInputString"
        :showMask="true"
        :keepCharPositions="true"
        :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/,':',/[0-9]/, /[0-9]/,]"
        placeholderChar="_"
      ></masked-input>
      <div class="input-group-append">
        <div class="input-group-text p-0" @click="isShow=!isShow">
          <i class="mdi mdi-clock"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let listHours = Array.from({ length: 24 }, (v, k) =>
  k < 10 ? `0${k}` : `${k}`
);
let listMinusteSecond = Array.from({ length: 60 }, (v, k) =>
  k < 10 ? `0${k}` : `${k}`
);

export default {
  name: "timer-select",
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      inputTimer: "00:00:00",
      isShow: true,
      listHours,
      listMinusteSecond,
      hours: "00",
      minutes: "00",
      seconds: "00"
    };
  },
  methods: { updateInputString, updateTimer, closeSelectList }
};

function updateInputString() {
  let newTimer = this.inputTimer.split(":");
  if (newTimer[0] && newTimer[0] > 23) newTimer[0] = "23";
  if (newTimer[0] && newTimer[1] > 59) newTimer[1] = "59";
  if (newTimer[0] && newTimer[2] > 59) newTimer[2] = "59";
  this.inputTimer = newTimer.join(":");
  this.hours = newTimer[0];
  this.minutes = newTimer[1];
  this.seconds = newTimer[2];
  this.$emit('input', this.inputTimer)
}

function updateTimer(type, value) {
  this[type] = value;
  this.inputTimer = `${this.hours}:${this.minutes}:${this.seconds}`;
  this.$emit('input', this.inputTimer)
}

function closeSelectList() {
  this.isShow = false;
}
</script>

<style scoped lang="scss">
</style>
