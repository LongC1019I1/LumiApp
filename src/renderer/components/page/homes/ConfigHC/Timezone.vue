<template>
  <div id="ConfigHC-timezone" class="w-50 mh-100">
    <h6>{{$t('configHC.text.localTime')}}</h6>
    <div class="form-group disabled mt-2">
      <div class="form-info"><span>{{timer1}}</span><span>{{timer2}}</span></div>
    </div>
    <base-button size="sm" type="primary">{{$t('configHC.button.SYNC')}}</base-button>
    <h6 class="mt-3">{{$t('configHC.text.timezone')}}</h6>
    <v-select :options="timezoneList" v-model="timezone" :clearable="false" :searchable="false">
      <template #option="{ gmt, zone }">
        <span>({{gmt}}) {{zone}}</span>
      </template>
      <template #selected-option="{ gmt, zone }">
        <span>({{gmt}}) {{zone}}</span>
      </template>
    </v-select>
    <div class="text-center">
      <base-button
        size="sm"
        type="primary"
        class="ml-2"
        @click="submit"
        >{{ $t("save") }}</base-button
      >
      <base-button size="sm" type="secondary" @click="cancel">{{
        $t("cancel")
      }}</base-button>
    </div>
    </div>
</template>

<script>
import timezoneList from "./timezone.js";
export default {
  name: "configHC-timezone",
  props: ["hcData"],
  data() {
    return {
      timezone:
        timezoneList.filter((item) => {
          if (this.hcData.time.timezone)
            return item.zone == this.hcData.time.timezone;
          else if (this.hcData.time.timezoneUTC)
            return item.gmt == this.hcData.time.timezoneUTC;
          else return item.zone == "Asia/Bangkok";
        })[0] || timezoneList[0],
      localTime:
        new Date().getTime() -
        this.hcData.time.updateTime +
        this.hcData.time.timestamp * 1000,
      updateTime: setInterval(() => {
        this.localTime = this.localTime + 1000;
      }, 1000),
      timezoneList,
    };
  },
  computed: {
    timer1,
    timer2,
  },
  watch: {
    hcData() {
      this.timezone = timezoneList.find(
        (item) => item.zone == this.hcData.time.timezone
      );
    },
  },
  methods: {
    submit,
    cancel,
  },
  beforeDestroy,
};
function beforeDestroy() {
  clearInterval(this.updateTime);
}

function timer1() {
  let changeTime = new Date().getTimezoneOffset() - this.timezone.offset;
  return window.timer(this.localTime||new Date().getTime() + changeTime * 60 * 1000, "HH:mm:ss");
}

function timer2() {
  let changeTime = new Date().getTimezoneOffset() - this.timezone.offset;
  return window.timer(this.localTime||new Date().getTime() + changeTime * 60 * 1000, "DD-MM-YYYY");
}

async function submit() {
  let configResponse = await $dispatch(
    "ConfigHC/configTimezone",
    this.timezone
  );
  if (configResponse && configResponse.success) {
    $commit("ConfigHC/UPDATE_TIMEZONE", this.timezone);
    $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("configHC.message.updateTimezone"),
    });
  } else
    $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("notify.errorDefault"),
    });
}

function cancel() {
  this.timezone =
    this.timezoneList.filter((item) => {
      if (this.hcData.time.timezone)
        return item.zone == this.hcData.time.timezone;
      else if (this.hcData.time.timezoneUTC)
        return item.gmt == this.hcData.time.timezoneUTC;
      else return item.zone == "Asia/Bangkok";
    })[0] || timezoneList[0];
}
</script>

<style lang="scss">
#ConfigHC-timezone {
  .form-info {
    justify-content: space-between;
    padding-right: 0.75rem;
  }
}
</style>
