<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-choose-scene modal-full-height modal-width-md"
    footerClasses="p-0"
    bodyClasses="pt-0 pr-0"
    id="ModaloftenUsedDevicesSetting"
    @close="$emit('closeModal')"
  >
    <template #header>
      <h5 class="text-center w-100">{{$t('dashboard.addOftenUsedDevice')}}</h5>
      <span class="pull-right c-p" @click="$emit('closeModal')">
        <i class="mdi mdi-close"></i>
      </span>
    </template>
    <div class="list-floor my-2">
      <horizontal-scroll ref="scrollHeader" v-dragscroll class="overflow-hidden pull-right">
        <template v-for="floor in listFloors">
          <span
            :ref="floor.floorid"
            v-if="floor.roomList&&floor.roomList.length"
            class="mr-3 c-p"
            :class="{'active':floor.floorid == floorid}"
            v-on:click="floorid =floor.floorid"
            :key="floor.floorid"
          >{{ floor.name }}</span>
        </template>
      </horizontal-scroll>
      <div class="dropdown floor-list-dropdown mr-3 ml-2">
        <i class="mdi mdi-dots-horizontal c-p"></i>
        <div class="dropdown-content py-3">
          <div class="h-100 overflow-y-auto">
            <template v-for="floor in listFloors">
              <a
                v-if="floor.roomList&&floor.roomList.length"
                class="dropdown-item c-p"
                v-on:click="selectFloor(floor.floorid)"
                :key="floor.floorid"
              >{{ floor.name }}</a>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="room-device-list overflow-y-auto">
      <template v-for="(room) in listRooms">
        <div :key="room.roomid" v-if="listDevicesFilterByRoom[room.roomid]">
          <h6>{{ room.name }}</h6>
          <div class="list-device">
            <device-setting
              v-for="device in listDevicesFilterByRoom[room.roomid]"
              :key="device.deviceid"
              :device="device"
            />
          </div>
        </div>
      </template>
    </div>
  </modal>
</template>

<script>
import { getDefaultIconDevice, getStatusDeviceFromVal } from "@/plugins/helper";

import DeviceSetting from "../Element/DeviceSetting";

export default {
  name: "modal-often-used-control-setting",
  props: {
    isShowModal: Boolean
  },
  data() {
    return {
      floorid: ""
    };
  },
  components: {
    DeviceSetting
  },
  computed: {
    listFloors,
    listRooms,
    listDevicesFilterByRoom
  },
  watch: {
    listFloors: mounted
  },
  methods: {
    getDefaultIconDevice,
    getStatusDeviceFromVal,
    selectFloor
  },
  mounted
};

function mounted() {
  if (!this.floorid && this.listFloors[0])
    this.floorid = this.listFloors[0].floorid;
}

function listFloors() {
  return $getters["HomeConfig/getFillterRoomsHasDeviceByFloor"];
}

function listRooms() {
  let currentFloor = this.listFloors.find(item => item.floorid == this.floorid);
  if (currentFloor) return currentFloor.roomList;
  else return [];
}

function listDevicesFilterByRoom() {
  return $getters["HomeConfig/getFillterControllInRoom"];
}

function selectFloor(floorid) {
  this.floorid = floorid;
  this.$refs.scrollHeader.$el.scrollLeft =
    this.$refs[floorid][0].offsetLeft - this.$refs[floorid][0].offsetWidth;
}
</script>

<style lang="scss">
#ModaloftenUsedDevicesSetting {
  .list-floor {
    display: flex;
    justify-content: space-between;
  }
  .card-body {
    padding-right: 0 !important;
  }
  .room-device-list {
    max-height: calc(100% - 3.5rem);
    .list-device {
      display: flex;
      flex-wrap: wrap;
    }
    /* flexible */
    .device-item {
      min-width: 25%;
      max-width: 25%;
    }
  }
}
</style>
