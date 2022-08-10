<template>
  <div id="history" class="h-100 pt-3">
    <div slot="header">
      <span class="notify">{{ this.$t("dashboard.title.History") }}</span>
    </div>

    <div
      class="col-12 boxnotify h-90 mt-2 p-0 overflow-y-auto"
      @scroll="scrollBody"
    >
      <div
        v-for="(devicedate, index) in historyDevices"
        :key="index"
        class="col row m-0 p-0 mynotify mb-2"
      >
        <p v-if="checkToday(index)">{{ $t("dashboard.text.today") }}</p>
        <p v-else>
          {{ index }}
        </p>
        <div class="col-12 m-0 p-0">
          <div
            class="col row m-0 p-0"
            v-for="(device, index) in devicedate"
            :key="index"
          >
            <div class="col-4 m-0 p-0">
              <span class="notify mb-2 timer">{{ device.timer }}</span>

              <i
                :class="
                  'icon-' +
                  getDefaultIconDevice(
                    device.deviceInfo,
                    device.data.status && device.data.states
                  )
                "
              ></i>
            </div>
            <div class="col-8 m-0 p-0">
              <p style="padding-right: 20px">
                {{ device.deviceInfo ? device.deviceInfo.name : "" }}
                <br />
                {{ device.roomInfo ? device.roomInfo.name + " - " : "-" }}
                {{ device.floorInfo ? device.floorInfo.name : "" }}
                <span>{{
                  getStatusDeviceFromVal(
                    device.deviceInfo,
                    device.data.status && device.data.states
                  )
                }}</span>
                <br />

                <span v-if="device.controlSource">
                  Điểu khiển bởi ứng dụng từ
                  <span class="controllerby">
                    {{ device.controlSource.id.split("-")[1] }}
                    <br />
                    {{ device.controlSource.id.split("-")[2] }}
                  </span>
                </span>
                <span v-else>
                  Điểu khiển bởi ứng dụng từ
                  <span style="color: #51e295">Unknown</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDefaultIconDevice, getStatusDeviceFromVal } from "@/plugins/helper";

import { format } from "fecha";

export default {
  name: "music-box",

  data() {
    return {
      page_size: 30,
    };
  },

  computed: {
    historyDevices,
  },

  methods: {
    getDefaultIconDevice,
    getStatusDeviceFromVal,
    checkDeviceOff,
    checkToday,
    scrollBody,
  },

  created() {
    $dispatch($api.Log.getLogDevice, { page_size: this.page_size });
  },
};

function historyDevices() {
  return $getters["Log/getLogDevicesByDate"];
}

function checkDeviceOff(states) {
  if (states.OnOff) {
    if (states.OnOff.on == false) {
      return false;
    }
    return true;
  }
  return true;
}
function checkToday(index) {
  if (format(Date.now(), "DD-MM-YYYY") == index) return true;
  return false;
}

function scrollBody(e, b) {
  if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
    $dispatch($api.Log.getLogDevice, {
      page_size: (this.page_size += 30),
    });
  }
}
</script>

<style lang="scss">
:root {
  --my-color: #ee9723;
}

#history {
  padding-left: 0.5rem;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  //overflow: scroll;
  .mynotify {
    .timer {
      display: block;
      margin-top: 2.2px;
    }

    p {
      font-size: 14.5px;
    }

    span {
      font-size: 14.5px;
    }

    i {
      font-size: 50px;
      text-align: center;
      margin: auto;
    }
  }

  .notify {
    color: var(--my-color);
  }
  .controllerby {
    display: block;
    overflow: hidden;
    color: #51e295;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
