<template>
  <div :userDevice="userDevice">
    <fragment v-if="selected === 1">
      <div class="roomDevice" v-for="(room,index) in roomDeviceRemote" :key="index"
           v-show="room.devicesList.length > 0 ">
        <div class="room">
          <div>{{ room.name }}</div>
          <div :style=" userRoleAdmin? 'visibility:hidden': '' " @click="selectAllRoomDeviceOrNot(room)">
            <i v-if="!checkDeviceSelectedInRoom(room)" class="mdi mdi-checkbox-blank-circle-outline"
            />
            <i v-else class="mdi mdi-checkbox-marked-circle"/>
          </div>
        </div>

        <div class="device">
          <device-check
              v-for="device in room.devicesList" :key="device.remoteid ? device.remoteid : device.devid"
              :check="myDeviceCheck.includes(device.remoteid ? device.remoteid : device.devid )"
              :device="device"
              :userRoleAdmin="userRoleAdmin"
              @pushDevice="pushDevice"
          />
        </div>
      </div>
    </fragment>
    <fragment v-if="selected === 3">
      <div class="roomDevice" v-for="(room,index) in roomDeviceRemote" :key="index"
           v-show=" room.remotesList.length > 0 ">
        <div class="room">
          <div>{{ room.name }}</div>
          <div @click="selectAllRoomRemotesOrNot(room)" :style=" userRoleAdmin? 'visibility:hidden': '' ">
            <i v-if="!checkRemotesSelectedInRoom(room)" class="mdi mdi-checkbox-blank-circle-outline"
            />
            <i v-else class="mdi mdi-checkbox-marked-circle"/>
          </div>
        </div>

        <div class="device">
          <device-check
              v-for="device in room.remotesList" :key="device.remoteid ? device.remoteid : device.devid"
              :check="myRemotesCheck.includes(device.remoteid ? device.remoteid : device.devid )"
              :userRoleAdmin="userRoleAdmin"
              :device="device"
              @pushDevice="pushRemote"
          />
        </div>
      </div>
    </fragment>
  </div>
</template>

<script>
import DeviceCheck from "../../../../base/controll/DeviceCheck";

export default {
  name: "DeviceList",
  props: {
    selected: {
      type: Number
    },
    userRoleAdmin: {
      type: Number
    },
    devicesSelect: {
      type: Array
    },
    remotesSelect: {
      type: Array
    }
  },
  data() {
    return {
      checkAll: false,
      myDeviceCheck: [],
      myRemotesCheck: []
    }
  },
  computed: {
    roomDeviceRemote,
    userDevice
    // userDeviceCurrent
  },
  components: {
    DeviceCheck
  },
  methods: {
    CheckDeviceSelect,
    pushDevice,
    pushRemote,
    checkDeviceSelectedInRoom,
    checkRemotesSelectedInRoom,
    deviceChooseCurrentInRoom,
    remotesChooseCurrentInRoom,
    selectAllRoomDeviceOrNot,
    selectAllRoomRemotesOrNot,
  },
  watch: {
    userDevice() {
      this.myDeviceCheck = $state.User.userPermissionSelect.devices && $state.User.userPermissionSelect.devices.slice() || []
      this.myRemotesCheck = $state.User.userPermissionSelect.remotes && $state.User.userPermissionSelect.remotes.slice() || []
      this.$emit('deviceShare', this.myDeviceCheck)
      this.$emit('remotesShare', this.myRemotesCheck)
    },
    devicesSelect(devSelect) {
      console.log({devSelect})
      this.myDeviceCheck = devSelect
    },
    remotesSelect(remoteSelect) {
      this.myRemotesCheck = remoteSelect
    },
  },
}

function CheckDeviceSelect(deviceAll) {
  for (let i = 0; i < deviceAll.length; i++) {
    if (this.userDevice.includes(deviceAll[i].devid)) {
      return true
    }
  }
  return false
}

function pushDevice($event) {
  if (this.myDeviceCheck.includes($event.devid)) {
    this.myDeviceCheck = this.myDeviceCheck.filter(devid => devid !== ($event.devid))
  } else {
    this.myDeviceCheck.push($event.devid)
  }
  this.$emit('deviceShare', this.myDeviceCheck)
}

function pushRemote($event) {
  if (this.myRemotesCheck.includes($event.remoteid)) {
    this.myRemotesCheck = this.myRemotesCheck.filter(remoteid => remoteid !== ($event.remoteid))
  } else {
    this.myRemotesCheck.push($event.remoteid)
  }
  this.$emit('remotesShare', this.myRemotesCheck)
}

function checkDeviceSelectedInRoom(room) {
  let countFullDeviceInRoom = room.devicesList.length

  let countChooseDeviceCurrentInRoom = this.deviceChooseCurrentInRoom(room).length


  if (countChooseDeviceCurrentInRoom === countFullDeviceInRoom) {
    return true
  }
  return false
}

function checkRemotesSelectedInRoom(room) {
  let countFullRemotesInRoom = room.remotesList.length

  let countChooseRemotesCurrentInRoom = this.remotesChooseCurrentInRoom(room).length


  if (countChooseRemotesCurrentInRoom === countFullRemotesInRoom) {
    return true
  }
  return false
}


function selectAllRoomDeviceOrNot(room) {

  let FullDeviceInRoom = room.devicesList.map(device => device.devid)

  let DeviceChooseCurrentRoom = this.deviceChooseCurrentInRoom(room)

  if (FullDeviceInRoom.length === DeviceChooseCurrentRoom.length) {
    console.log(1)
    this.myDeviceCheck = this.myDeviceCheck.filter(devid => devid !== DeviceChooseCurrentRoom.find(deviceid => deviceid === devid))
    console.log('this.myDeviceCheck', this.myDeviceCheck)
  }


  if (FullDeviceInRoom.length > DeviceChooseCurrentRoom.length) {

    let myDevicePush = FullDeviceInRoom.filter(devid => devid !== DeviceChooseCurrentRoom.find(deviceid => deviceid === devid))
    console.log('this.myDeviceCheck', myDevicePush)
    this.myDeviceCheck.push(...myDevicePush)
  }

  this.$emit('deviceShare', this.myDeviceCheck)
}

function selectAllRoomRemotesOrNot(room) {
  let FullRemotesInRoom = room.remotesList.map(remote => remote.remoteid)
  let RemotesChooseCurrentRoom = this.remotesChooseCurrentInRoom(room)

  if (FullRemotesInRoom.length === RemotesChooseCurrentRoom.length) {
    this.myRemotesCheck = this.myRemotesCheck.filter(remoteid => remoteid !== RemotesChooseCurrentRoom.find(remote => remote === remoteid))
    console.log('this.myDeviceCheck', this.myRemotesCheck)
  }


  if (FullRemotesInRoom.length > RemotesChooseCurrentRoom.length) {

    let myRemotesPush = FullRemotesInRoom.filter(remoteid => remoteid !== RemotesChooseCurrentRoom.find(remote => remote === remoteid))
    console.log('this.myRemotesPush', myRemotesPush)
    this.myRemotesCheck.push(...myRemotesPush)
  }

  this.$emit('myRemotesPush', this.myRemotesCheck)
}


function deviceChooseCurrentInRoom(room) {
  return this.myDeviceCheck.filter(devid => {
    let device = room.devicesList.find(dev => dev.remoteid ? dev.remoteid : dev.devid === devid)
    if (device && device.devid) {
      return devid === device.devid
    }
  })
}

function remotesChooseCurrentInRoom(room) {
  return this.myRemotesCheck.filter(remoteid => {
    let remote = room.remotesList.find(remote => remote.remoteid === remoteid)
    if (remote && remote.remoteid) {
      return remoteid === remote.remoteid
    }
  })
}


function userDevice() {
  this.myDeviceCheck = $state.User.userPermissionSelect.devices && $state.User.userPermissionSelect.devices.slice() || []
  this.myRemotesCheck = $state.User.userPermissionSelect.remotes && $state.User.userPermissionSelect.remotes.slice() || []
}

function roomDeviceRemote() {
  return $state.User.roomDeviceUserDev
}

</script>

<style scoped>

</style>
