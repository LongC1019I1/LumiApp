<template>
  <div class="state-device">
    <div class="state redmine" :class="{ 'show-redmine': !isHaveNotify }">
      <div class="group-info-box mb-3" :notify="notify">
        <div class="scene-info-box d-flex justify-between">
          <div class="label">{{ $t("scene.notify") }}</div>
          <div class="info pr-3">
            <base-slider
              size="md"
              class="mb-0"
              :value="isHaveNotify"
              @submit="updateNotify('onOff')"
            ></base-slider>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isHaveNotify"
      class="state redmine-content scene-info-box replay-timer-box d-flex px-3"
    >
      <div class="w-100 d-flex align-center">
        <div class="min-w-maxcontent">{{ $t("scene.content") }}:</div>
        <input
          type="text"
          class="form-group mx-2 mb-0 ml-4 px-3 py-2 w-100 notify-content-input"
          :placeholder="$t('scene.contentPlacholder')"
          v-model="content"
          @input="updateNotify('content', content)"
        />
      </div>
      <div class="w-max d-flex align-center">
        <div class="w-max no-wrap mr-3">{{ $t("scene.beforeNotify") }}:</div>
        <v-select
          class="timer-select mx-2"
          :options="beforeList"
          :value="before"
          :clearable="false"
          :searchable="false"
          @input="
            (value) => {
              updateNotify('before', value);
            }
          "
        >
          <template #open-indicator>
            <span v-bind="selectAttributes">
              <i class="mdi mdi-menu-down"></i>
            </span>
          </template>
          <template #option="{ label }">
            <span>{{ Number(label) }} {{ $t("scene.minute") }}</span>
          </template>
          <template #selected-option="{ label }">
            <span>{{ Number(label) }} {{ $t("scene.minute") }}</span>
          </template>
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scene-manager",
  props: {},
  data() {
    return {
      isHaveNotify: false,
      content: "",
      before: "00",
      beforeList: ["00", "05", "10", "15", "20", "30"],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
    };
  },
  computed: {
    notify,
  },
  methods: {
    updateNotify,
  },
};

function notify() {
  let notify = $state.RuleManager.out.notify;
  if (!notify) {
    this.isHaveNotify = false;
    return;
  }
  this.isHaveNotify = true;
  this.content = notify.content;
  this.before = notify.before;
  return notify;
}

function updateNotify(key, value) {
  let out = Object.assign({}, $state.RuleManager.out);
  switch (key) {
    case "onOff":
      if (this.isHaveNotify) out.notify = false;
      else
        out.notify = {
          before: "00",
          content: "",
          email: [],
          push: [
            $state.Customer.customerData.verify_email
              ? $state.Customer.customerData.email
              : $state.Customer.customerData.phone,
          ],
          sms: [],
        };
      return $commit("RuleManager/SET_DATA", {
        out,
      });
    case "before":
      return $commit("RuleManager/UPDATE_NOTIFY_STATUS", {
        param: key,
        data: value,
      });
    case "content":
      return $commit("RuleManager/UPDATE_NOTIFY_STATUS", {
        param: key,
        data: value,
      });
  }
}
</script>

<style lang="scss">
</style>
