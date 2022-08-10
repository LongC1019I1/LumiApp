<template>
  <fragment>
    <card
        id="ruleManager"
        class="bg-transparent"
        bodyClasses="pl-0 pr-1 m-0 pb-1"
    >
      <template #header>
        <div class="left-box"></div>
        <div class="right-box">
          <base-button v-if="ruleid" type="secondary" @click="submit">
            {{ $t("save") }}
          </base-button>
          <base-button v-else type="secondary" @click="submit">
            {{ $t("rule.addRule") }}
          </base-button>
          <base-button type="secondary" @click="cancel">
            {{ $t("cancel") }}
          </base-button>
        </div>
      </template>
      <div class="group-info-box">
        <type/>
        <name ref="name"/>
      </div>
      <div class="group-info-box mb-3">
        <secure/>
        <logic
            v-if="
            !$store.state.RuleManager.in.delay &&
            $store.state.RuleManager.in.delay !== 0
          "
        />
      </div>
      <div class="group-info-box mb-3">
        <table class="table scene-info-box mb-1">
          <thead>
          <tr>
            <th class="text-left">{{ $t("rule.input") }}</th>
          </tr>
          </thead>
        </table>
        <device-input
            @showPin="showPin = true; myDevice = $event "
        />
        <timer/>
      </div>
      <div class="group-info-box">
        <table class="table scene-info-box mb-1">
          <thead>
          <tr>
            <th class="text-left">{{ $t("rule.output") }}</th>
          </tr>
          </thead>
        </table>
        <device-output
            @showPin="showPin = true; myDevice = $event "
        />
        <scene-output/>
        <group-lighting-output/>
        <notify/>
      </div>
      <delete v-if="$store.state.RuleManager.ruleid"/>
    </card>

    <pin-modal
        :showPinModal="showPin"
        @closeModal="showPin = false"
        @update="
          controllDeviceDefault(myDevice.devid);
          showPin = false;"
    />
  </fragment>
</template>

<script>
import Type from "./Element/Type";
import Name from "./Element/Name";
import Secure from "./Element/Secure";
import Logic from "./Element/Logic";
import Timer from "./Element/Timer";
import Notify from "./Element/Notify";
import Delete from "./Element/Delete";
import DeviceInput from "./Element/DeviceInput";
import DeviceOutput from "./Element/DeviceOutput";
import SceneOutput from "./Element/SceneOutput";
import GroupLightingOutput from "./Element/GroupLightingOutput";
import PinModal from "../../../base/custom/PinModal";
import {controllDeviceDefault} from "../../../../plugins/helper";
//modal
export default {
  name: "rule-manager",
  data() {
    return {
      showPin: false,
      myDevice: {},
    }
  },
  components: {
    Type,
    Name,
    Secure,
    Logic,
    DeviceInput,
    Timer,
    DeviceOutput,
    SceneOutput,
    GroupLightingOutput,
    Notify,
    Delete,
    PinModal
  },
  computed: {
    ruleid,
  },
  methods: {
    submit,
    cancel,
    controllDeviceDefault
  },
};

function ruleid() {
  return $state.RuleManager.ruleid;
}

async function submit() {
  let data = (({
                 enable,
                 iconkey,
                 name,
                 out,
                 roomid,
                 rooms,
                 shortcut,
                 shortcut_by_user,
                 type,
               }) => ({
    enable,
    iconkey,
    name,
    out,
    roomid,
    rooms,
    shortcut,
    shortcut_by_user,
    type,
  }))($state.RuleManager);
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let roomName = data.name.trim();
  if (!roomName) {
    this.$refs.name.$refs.ruleName.focus();
    return (this.$refs.name.ruleNameError = this.$t(
        "rule.pleaseEnterRuleName"
    ));
  }
  if (format.test(roomName)) {
    this.$refs.name.$refs.ruleName.focus();
    return (this.$refs.name.ruleNameError = this.$t(
        "rule.ruleNoSpecialCharacter"
    ));
  }
  data.in = $state.RuleManager.in;

  if (
      !(
          data.in &&
          data.in.devices &&
          data.in.devices.length &&
          ((data.out.devices && data.out.devices.length) ||
              (data.out.scenes && data.out.scenes.length) ||
              (data.out.groups && data.out.groups.length))
      )
  ) {
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("rule.noDeviceInputOrOutput"),
    });
  }
  if (data.out.notify) {
    if (!data.out.notify.content.trim()) {
      document.getElementById("notifyContentInput").focus();
      return $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("rule.notifyContentNotEmpty"),
      });
    }
    if (
        !(
            data.out.notify.email.length ||
            data.out.notify.push.length ||
            data.out.notify.smsDcom.length ||
            data.out.notify.callDcom.length
        )
    ) {
      document.getElementById("notifyContentInput").focus();
      return $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("rule.notifyTypeChoose"),
      });
    }
  }
  if (this.ruleid) {
    let currentTime = new Date();
    data.time_update = {
      day: currentTime.getDate(),
      month: currentTime.getMonth() + 1,
      time: Math.floor(currentTime.getTime() / 1000),
      year: currentTime.getFullYear(),
    };
    await $dispatch($api.HomeConfig.updateRule, {
      ruleid: this.ruleid,
      updateData: data,
    });
  } else {
    await $dispatch($api.HomeConfig.createRule, {
      data: [data],
    });
  }
  $dispatch($api.RuleManager.setRule, false);
}

function cancel() {
  this.$refs.name.ruleNameError = "";
  $dispatch($api.RuleManager.setRule, false);
}
</script>

<style lang="scss">
</style>
