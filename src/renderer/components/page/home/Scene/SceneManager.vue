<template>
  <card id="sceneManager" class="bg-transparent" bodyClasses="p-0 m-0">
    <template #header>
      <div class="left-box"></div>
      <div class="right-box">
        <template v-if="ruleid">
          <base-button type="secondary" @click="submit">{{
            $t("save")
          }}</base-button>
          <base-button type="secondary" @click="cancel">{{
            $t("cancel")
          }}</base-button>
        </template>
        <base-button v-else type="secondary" @click="submit">{{
          $t("scene.addScene")
        }}</base-button>
      </div>
    </template>
    <name ref="name" />
    <div class="group-info-box">
      <table class="table scene-info-box mb-1">
        <thead>
          <tr>
            <th class="text-left">{{ $t("scene.output") }}</th>
          </tr>
        </thead>
      </table>
      <device-output />
      <group-lighting-output />
    </div>
    <select-icon />
    <timer />
    <notify />
    <select-room />
    <shortcut />
    <delete v-if="$store.state.RuleManager.ruleid" />
  </card>
</template>

<script>
import { TYPE_RULE } from "@/plugins/variableConst";
import GroupLightingOutput from "./Element/GroupLightingOutput";
import DeviceOutput from "./Element/DeviceOutput";
import Name from "./Element/Name";
import Timer from "./Element/Timer";
import Notify from "./Element/Notify";
import SelectIcon from "./Element/SelectIcon";
import SelectRoom from "./Element/SelectRoom";
import Shortcut from "./Element/Shortcut";
import Delete from "./Element/Delete";
export default {
  name: "scene-normal",
  computed: {
    ruleid,
  },
  components: {
    Name,
    DeviceOutput,
    GroupLightingOutput,
    SelectIcon,
    Timer,
    Notify,
    SelectRoom,
    Shortcut,
    Delete,
  },
  methods: {
    submit,
    cancel,
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
    shortcut_by_user,
  }) => ({
    enable,
    iconkey,
    name,
    out,
    roomid,
    rooms,
    shortcut_by_user,
  }))($state.RuleManager);
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let roomName = data.name.trim();
  if (!roomName) {
    await $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("scene.pleaseEnterSceneName"),
    });
    this.$refs.name.$refs.sceneName.focus();
    return (this.$refs.name.sceneNameError = this.$t(
      "scene.pleaseEnterSceneName"
    ));
  }
  if (format.test(roomName)) {
    this.$refs.name.$refs.sceneName.focus();
    return (this.$refs.name.sceneNameError = this.$t(
      "scene.sceneNoSpecialCharacter"
    ));
  }
  if (
    (!data.out.devices || !data.out.devices.length) &&
    (!data.out.groups || !data.out.groups.length)
  ) {
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("scene.noDeviceOutput"),
    });
  }
  if (data.out.notify && !data.out.notify.content.trim()) {
    document.getElementById("notifyContentInput").focus();
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("scene.notifyContentNotEmpty"),
    });
  }
  data.in = $state.RuleManager.in;
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
    data.type = TYPE_RULE.scene;
    await $dispatch($api.HomeConfig.createRule, {
      data: [data],
    });
    await $dispatch($api.RuleManager.setRule, false);
  }
}

function cancel() {
  this.$refs.name.sceneNameError = "";
  $dispatch($api.RuleManager.setRule, false);
}
</script>

<style lang="scss">
</style>
