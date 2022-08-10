<template>
  <modal
    v-if="modalDeviceHistory"
    :show="true"
    :showClose="false"
    :backdropClick="false"
    modalClasses="modal-device-info modal-full-height"
    footerClasses="p-0"
    @close="closeModal"
  >
    <template slot="header">
      <h5 class="text-center w-100">
        {{ device.name }}
      </h5>
      <span class="pull-right c-p" @click="closeModal">
        <i class="mdi mdi-close"></i>
      </span>
    </template>
    <div>
      <h6 class="py-2">{{ $t("roomFloor.text.deviceHistory") }}</h6>
      <date-picker
        v-model="date"
        id="device-history-datepicker"
        :append-to-body="false"
        value-type="format"
        format="DD/MM/YYYY"
        @input="updateData"
        :clearable="false"
      ></date-picker>
    </div>
    <div class="list-log-device mt-2">
      <div
        v-for="{ deviceInfo, data, _id, controlSource, time } in logList"
        :key="_id"
        class="log-item"
      >
        <div class="icon-box">
          <i
            :class="`icon-${getDefaultIconDevice(deviceInfo, data.states)} ${
              getActiveDeviceFromVal(deviceInfo, data.states) ? '' : 'disabled'
            } spin-${
              data.states && data.states.Speed && data.states.Speed.speed
            }`"
          >
          </i>
        </div>
        <div class="content-box">
          <div class="font-18">
            {{ $t(getStatusDeviceFromVal(deviceInfo, data.states)) }}
          </div>
          <template v-if="controlSource">
            <div>
              {{ $t("log.controllBy") }}
              <span class="text-success">{{
                getControlSourceType(controlSource)
              }}</span>
              <span v-if="controlSource.type === 'app'">{{
                $t("log.from")
              }}</span>
              <span v-if="controlSource.type === 'app'">{{
                $t(controlSource.id)
              }}</span>
            </div>
          </template>
        </div>
        <div class="time-box">{{ timerControll(time * 1000, "hh-mm-ss") }}</div>
      </div>
    </div>
  </modal>
</template>

<script>
import {
  getDefaultIconDevice,
  getStatusDeviceFromVal,
  getActiveDeviceFromVal,
} from "@/plugins/helper";
export default {
  name: "modal-deivce-info",
  data() {
    return {
      date: timer(Date.now(), "DD/MM/YYYY"),
    };
  },
  computed: {
    modalDeviceHistory,
    device,
    logList,
  },
  methods: {
    closeModal,
    updateData,
    getDefaultIconDevice,
    getStatusDeviceFromVal,
    getActiveDeviceFromVal,
    getControlSourceType,
    timerControll: (data) => {
      return timer(data, "hh:mm a");
    },
  },
  watch: {
    modalDeviceHistory: updateData,
  },
  mounted: updateData,
};

function modalDeviceHistory() {
  return $state.ContentManager.modal.modalDeviceHistory;
}

function device() {
  return $getters["HomeConfig/getDevice"](this.modalDeviceHistory);
}

function updateData() {
  if (this.modalDeviceHistory)
    $dispatch($api.Log.getLogDevice, {
      device_id: this.modalDeviceHistory,
      date: this.date,
    });
}

function logList() {
  return $state.Log.logDevice;
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalDeviceHistory",
    data: false,
  });
  $commit("Log/UPDATE_LOGDEVICE", []);
}

function getControlSourceType(controlSource) {
  if (!controlSource) return;
  const { type, name, ruleType } = controlSource;
  if (type === "app") {
    return this.$t("log.app");
  }
  if (type === "physic") {
    return this.$t("log.physic");
  }
  if (type === "device") {
    return this.$t("log.device");
  }
  if (type === "group") {
    return `${this.$t("log.group")} ${name}`;
  }
  if (type === "rule") {
    if (ruleType === 1) {
      return `${this.$t("log.scene")} ${name}`;
    }
    if (ruleType === 3) {
      return this.$t("log.schedule");
    }
    return `${this.$t("log.rule")} ${name}`;
  }
}
</script>

<style lang="scss" scope>
.modal-device-info {
  .modal-body {
    display: flex;
    flex-direction: column;
    .list-log-device {
      height: 100%;
      max-height: 100%;
      overflow-y: auto;
    }
  }
}
.log-item {
  display: flex;
  background-color: #333940;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  .icon-box {
    font-size: 1.5rem;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content-box {
    width: 100%;
  }
  .time-box {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 150px;
  }
}
</style>
