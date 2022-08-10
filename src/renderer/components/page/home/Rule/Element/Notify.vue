<template>
  <fragment :notify="notify">
    <div class="rule-info-box">
      <div class="label">{{$t('rule.notify')}}</div>
      <div class="info">
        <base-slider size="md" class="mb-0" :value="isHaveNotify" @submit="updateNotify('onOff')"></base-slider>
      </div>
    </div>
    <template v-if="isHaveNotify">
      <div class="rule-info-box replay-timer-box">
        <div class="col px-2 d-flex align-center">
          <div class="min-w-maxcontent">{{$t('rule.content')}}:</div>
          <input
            id="notifyContentInput"
            type="text"
            class="form-group mx-2 mb-0 px-3 py-2 w-80"
            :placeholder="$t('rule.contentPlacholder')"
            v-model="content"
            @input="updateNotify('content', content)"
          >
        </div>
        <div class="w-max d-flex align-center">
          <div class="w-max no-wrap">{{$t('rule.numberNotify')}}:</div>
          <v-select
            class="timer-select mx-2"
            :options="[1,2,3,4,5,6,7,8,9,10]"
            :value="notifyTimes"
            :clearable="false"
            :searchable="false"
            @input="value=>{updateNotify('notifyTimes', value)}"
          >
            <template #open-indicator>
              <span v-bind="selectAttributes">
                <i class="mdi mdi-menu-down"></i>
              </span>
            </template>
            <template #option="{label}">
              <span>{{Number(label)}} {{$t('rule.times')}}</span>
            </template>
            <template #selected-option="{label}">
              <span>{{Number(label)}} {{$t('rule.times')}}</span>
            </template>
          </v-select>
        </div>
        <div v-if="notifyTimes>1" class="w-max d-flex align-center">
          <div class="w-max no-wrap">{{$t('rule.cycleNotify')}}:</div>
          <masked-input
            type="text"
            class="form-group mx-2 mb-0 px-3 py-2"
            v-model="notifyCycle"
            @keyup="updateNotify('notifyCycle', calcTimestamp(notifyCycle))"
            :showMask="true"
            :keepCharPositions="true"
            :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
            placeholderChar="-"
          ></masked-input>
        </div>
      </div>
      <div class="rule-info-box notify-on-app justify-start align-start p-3">
        <div class="title col-3 px-1">{{$t('rule.notifyOnApp')}}</div>
        <div class="row col-9 px-3">
          <div
            v-for="user in listUser"
            :key="user.userid"
            class="col-4 min-w-200 text-overflow-hidden c-p"
            @click="updateNotify('push', user.email||user.phone)"
          >
            <span>
              <i
                class="mdi"
                :class="push.includes(user.email||user.phone)?'mdi-checkbox-marked':'mdi-checkbox-blank-outline'"
              ></i>
            </span>
            <span>{{user.email||user.phone}}</span>
          </div>
        </div>
      </div>
      <div class="rule-info-box notify-send-email justify-start align-start p-3">
        <div class="title col-3 px-1">{{$t('rule.notifyOnEmail')}}</div>
        <div class="row col-9 px-3">
          <template v-for="user in listUser">
            <div
              :key="user.userid"
              v-if="user.email"
              class="col-4 min-w-200 text-overflow-hidden c-p"
              @click="updateNotify('email', user.email)"
            >
              <span>
                <i
                  class="mdi"
                  :class="email.includes(user.email)?'mdi-checkbox-marked':'mdi-checkbox-blank-outline'"
                ></i>
              </span>
              <span>{{user.email}}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="rule-info-box dcom-box justify-start align-start">
        <div class="title col-3 px-1">{{$t('rule.smsFromDcom')}}</div>
        <div class="row col-9 px-3">
          <div class="col-4">
            <input
              type="text"
              class="form-group mb-0 px-3 py-2 w-100"
              :class="{'input-error':newPhonesmsDcomError}"
              :placeholder="$t('rule.enterPhoneNumber')"
              v-model="newPhonesmsDcom"
              maxlength="15"
              @input="newPhonesmsDcom?checkPhoneValid('smsDcom'):newPhonesmsDcomError=''"
            >
            <span>{{newPhonesmsDcomError}}</span>
          </div>
          <div class="col-8">
            <base-button
              class="border-radius-3"
              @click="updateNotify('smsDcom', newPhonesmsDcom)"
            >{{$t('add')}}</base-button>
          </div>
          <div
            v-for="phone in smsDcom"
            :key="phone"
            class="col-4 min-w-200 text-overflow-hidden pt-2"
          >
            <div
              class="bg-disabled2 border-radius-3 p-2 text-overflow-hidden d-flex justify-between"
            >
              <div class="text-overflow-hidden px-2">{{phone}}</div>
              <span class="px-2 c-p" @click="updateNotify('removeSmsDcom', phone, true)">
                <i class="mdi mdi-trash-can"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="rule-info-box dcom-box justify-start align-start p-3">
        <div class="title col-3 px-1">{{$t('rule.callFromDcom')}}</div>
        <div class="row col-9 px-3">
          <div class="col-4">
            <input
              type="text"
              class="form-group mb-0 px-3 py-2 w-100"
              :class="{'input-error':newPhonecallDcomError}"
              :placeholder="$t('rule.enterPhoneNumber')"
              v-model="newPhonecallDcom"
              maxlength="15"
              @input="newPhonecallDcom?checkPhoneValid('callDcom'):newPhonecallDcomError=''"
            >
            <span>{{newPhonecallDcomError}}</span>
          </div>
          <div class="col-8">
            <base-button
              class="border-radius-3"
              @click="updateNotify('callDcom', newPhonecallDcom)"
            >{{$t('add')}}</base-button>
          </div>
          <div
            v-for="phone in callDcom"
            :key="phone"
            class="col-4 min-w-200 text-overflow-hidden pt-2"
          >
            <div
              class="bg-disabled2 border-radius-3 p-2 text-overflow-hidden d-flex justify-between"
            >
              <div class="text-overflow-hidden px-2">{{phone}}</div>
              <span class="px-2 c-p" @click="updateNotify('removeCallDcom', phone, true)">
                <i class="mdi mdi-trash-can"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </fragment>
</template>

<script>
import { calcTimestamp } from "@/plugins/helper";
export default {
  name: "rule-notify",
  props: {},
  data() {
    return {
      isHaveNotify: false,
      content: "",
      newPhonesmsDcom: "",
      newPhonecallDcom: "",
      newPhonesmsDcomError: "",
      newPhonecallDcomError: "",
      email: [],
      sms: [],
      push: [],
      smsDcom: [],
      callDcom: [],
      notifyTimes: 1,
      notifyCycle: 0,
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator"
      },
      listUser: $state.HomeConfig.users
    };
  },
  computed: {
    notify
  },
  methods: {
    updateNotify,
    checkPhoneValid,
    calcTimestamp
  }
};

function notify() {
  let notify = $state.RuleManager.out.notify;
  if (!notify) {
    this.isHaveNotify = false;
    return;
  }
  this.isHaveNotify = true;
  this.content = notify.content||'';
  this.email = [...notify.email] || [];
  this.sms = [...notify.sms] || [];
  this.push = [...notify.push] || [];
  this.smsDcom = [...notify.smsDcom] || [];
  this.callDcom = [...notify.callDcom] || [];
  this.notifyTimes = notify.notifyTimes||0;
  this.notifyCycle = timer((notify.notifyCycle||0) * 1000 - 7 * 3600000, "HH:mm:ss");
  return notify;
}

function updateNotify(key, value, checkDelete) {
  let out = Object.assign({}, $state.RuleManager.out);
  let index;
  switch (key) {
    case "onOff":
      if (this.isHaveNotify) out.notify = false;
      else
        out.notify = {
          content: "",
          email: [],
          push: [],
          sms: [],
          smsDcom: [],
          callDcom: [],
          notifyTimes: 1,
          notifyCycle: 0
        };
      return $commit("RuleManager/SET_DATA", {
        out
      });
    case "notifyTimes":
    case "notifyCycle":
    case "content":
      return $commit("RuleManager/UPDATE_NOTIFY_STATUS", {
        param: key,
        data: value
      });
    case "push":
    case "email":
      index = this[key].findIndex(item => item === value);
      if (index === -1) this[key].push(value);
      else this[key].splice(index, 1);
      return $commit("RuleManager/UPDATE_NOTIFY_STATUS", {
        param: key,
        data: this[key]
      });
    case "callDcom":
    case "smsDcom":
      checkPhoneValid.call(this, key);
      if (this["newPhone" + key + "Error"]) return;
      if (this[key].includes(value)) return;
      else this[key].push(value);
      this["newPhone" + key] = "";
      return $commit("RuleManager/UPDATE_NOTIFY_STATUS", {
        param: key,
        data: this[key]
      });
    case "removeCallDcom":
      index = this.callDcom.findIndex(item => item === value);
      if (index === -1) return;
      else this.callDcom.splice(index, 1);
      return $commit("RuleManager/UPDATE_NOTIFY_STATUS", {
        param: 'callDcom',
        data: this.callDcom
      });
    case "removeSmsDcom":
      index = this.smsDcom.findIndex(item => item === value);
      if (index === -1) return;
      else this.smsDcom.splice(index, 1);
      return $commit("RuleManager/UPDATE_NOTIFY_STATUS", {
        param: 'smsDcom',
        data: this.smsDcom
      });
  }
}

function checkPhoneValid(key) {
  let regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  if (!this["newPhone" + key]) {
    this["newPhone" + key + "Error"] = this.$t("rule.PleaseEnterPhoneNumber");
    return false;
  } else if (!regex.test(this["newPhone" + key])) {
    this["newPhone" + key + "Error"] = this.$t("rule.phoneNumberInvalid");
    return false;
  } else {
    this["newPhone" + key + "Error"] = "";
    return true;
  }
}
</script>

<style lang="scss">
</style>
