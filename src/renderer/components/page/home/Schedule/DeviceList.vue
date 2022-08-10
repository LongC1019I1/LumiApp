<template>
  <card id="schedule">
    <template #header>
      <div class="w-100 d-flex">
        <horizontal-scroll
          v-dragscroll
          class="list-floor w-100 overflow-hidden"
        >
          <span
            class="c-p"
            @click="$emit('updateSelectFloor', '')"
            :class="selectFLoor === '' ? 'choose-floor' : ''"
          >
            {{ $t("schedule.new") }}
          </span>
          <span
            v-for="(floor, index) in floors"
            :key="index"
            :class="selectFLoor === floor.floorid ? 'choose-floor' : ''"
            class="c-p"
            @click="showInfoRoomDevice(floor)"
          >
            {{ floor.name }}
          </span>
        </horizontal-scroll>
        <div v-if="floors&&floors.length" class="list-menu-floor w-max">
          <div slot="header" class="dropdown floor-list-dropdown ml-2">
            <i class="mdi mdi-dots-horizontal c-p"></i>
            <div class="dropdown-content py-3">
              <div class="h-100 overflow-y-auto">
                <template v-for="(floor, index) in floors">
                  <a
                    @click="showInfoRoomDevice(floor)"
                    class="dropdown-item c-p"
                    :key="index"
                    >{{ floor.name }}</a
                  >
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-200 d-flex justify-end">
        <div @click="$emit('showAddDeviceModal')" class="c-p">
          {{ $t("schedule.addSchedule") }}
        </div>
        <div class="add-schedule ml-2 c-p" @click="$emit('showAddDeviceModal')">
          <i class="mdi mdi-plus" />
        </div>
      </div>
    </template>
    <div v-if="selectFLoor !== ''">
      <div v-for="(room, index) in rooms" :key="index" class="roomDevices">
        <div class="titleRoom">
          {{ room.name }}
        </div>
        <div class="listDevices">
          <div
            v-for="(device, index) in devices"
            :key="index"
            v-show="device.roomid === room.roomid"
          >
            <device-schedule
              :device="device"
              @click.native="$emit('selectDevice', device)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="roomDevices" style="margin-top: 30px">
        <div class="listDevices">
          <div
            v-for="(device, index) in devices"
            :key="index"
            class="device"
            v-show="!device.roomid || device.roomid === -1"
          >
            <div @click="$emit('selectDevice', device)">
              <device-schedule :device="device" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import { TYPE_RULE } from "@/plugins/variableConst";
import DeviceSchedule from "../../../base/controll/DeviceSchedule";
import { DEVICE_TYPE } from "../../../../plugins/variableConst";

export default {
  name: "index",
  props: {
    selectFLoor: [String, Boolean],
  },
  data() {
    return {
      // selectFLoor: "",
      rooms: [],
    };
  },
  methods: {
    showInfoRoomDevice,
  },
  computed: {
    floors,
    devices,
  },
  components: {
    DeviceSchedule,
  },
  watch: {
    selectFLoor,
  },
  mounted() {
    selectFLoor.call(this, this.selectFLoor);
  },
};

function floors() {
  var floorArr = [];

  let schedules = $getters["HomeConfig/getAllRulesByType"]([
    TYPE_RULE.schedule,
  ]);
  let deviceRemote;

  schedules.forEach((schedule) => {
    let device =
      schedule.out && schedule.out.devices && schedule.out.devices[0];
    if (device && device.remoteid) {
      let id = device.remoteid;
      deviceRemote = $state.HomeConfig.remotes.find(
        (remote) => remote.remoteid === id
      );
    } else if (device && device.devid) {
      let id = device.devid;
      deviceRemote = $state.HomeConfig.devices.find(
        (device) => device.devid === id
      );
    }
    if (deviceRemote && deviceRemote.roomid) {
      let room = $state.HomeConfig.rooms.find(
        (room) => room.roomid === deviceRemote.roomid
      );
      if (room) {
        let floor = $state.HomeConfig.floors.find(
          (floor) => floor.floorid === room.floorid
        );

        const found = floorArr.some((el) => el.name === floor.name);
        if (!found) floorArr.push(floor);
      }
    }
  });
  let myFloorArr = [];
  $state.HomeConfig.floors.forEach((floor) => {
    let myFloor = floorArr.find((floorar) => floorar.floorid === floor.floorid);

    if (myFloor) {
      myFloorArr.push(myFloor);
    }
  });

  return myFloorArr;
}

function devices() {
  let arr = [];
  let deviceRemote;
  let schedules = $getters["HomeConfig/getAllRulesByType"]([
    TYPE_RULE.schedule,
  ]);

  schedules.forEach((schedule) => {
    if (schedule.out.devices) {
      let dev = schedule.out.devices[0];

      if (dev && dev.remoteid) {
        deviceRemote = $state.HomeConfig.remotes.find(
          (remote) => remote.remoteid === dev.remoteid
        );
      } else if (dev && dev.devid) {
        deviceRemote = $state.HomeConfig.devices.find(
          (device) =>
            device.devid === dev.devid &&
            device.type !== DEVICE_TYPE.IR &&
            device.type !== DEVICE_TYPE.IRV2
        );
      }
      if (dev && deviceRemote) {
        const found = deviceRemote.remoteid
          ? arr.some((el) => el.remoteid === deviceRemote.remoteid)
          : arr.some((el) => el.devid === deviceRemote.devid);
        if (!found) arr.unshift(deviceRemote);
      }
    }
  });

  return arr;
}

function showInfoRoomDevice(floor) {
  this.$emit("updateSelectFloor", floor.floorid);
}

function selectFLoor(selectFLoor) {
  let arrRoom = [];

  this.devices.forEach((device) => {
    let room = $state.HomeConfig.rooms.find(
      (roomEl) => roomEl.roomid === device.roomid
    );
    if (room) {
      const found = arrRoom.some((el) => el.roomid === room.roomid);
      if (!found) arrRoom.push(room);
    }
  });
  this.rooms = arrRoom.filter(
    (roomFLoor) => roomFLoor.floorid === selectFLoor
  );
}
</script>

<style scoped>
</style>
