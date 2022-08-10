<template>
  <div id="deviceSecure" >
    <div class="offsecure row">
      <div class="label col-10">{{ checkSecureAll?  $t('secure.device-protected.off-device') : $t('secure.device-protected.on-device') }}</div>
      <div @click="openCloseSecurityHome" class="info float-right col-2 pl-5">
        <base-slider size="md" class="mb-0" :value="checkSecureAll"></base-slider>
      </div>
    </div>
    <div class="listDevices ">
      <div v-for="(device,index) in deviceSecure" :key="index" class="device float-left"
           v-show="!device.roomid || device.roomid === -1 ">

        <device-secure
            :device="device"
            @showModal="pinModal=true"
            @createRule="createDeviceRule"
            @deleteRule="deleteDeviceRule"
        />

      </div>
    </div>

    <div v-for="(element,index) in floorRoomDevice" :key="index" class="floorDevice">
      <div class="floor row">
        <div class="label col-10">{{ element.floor.name }}</div>
        <div @click="openCloseFloorInRoom(element.floor.floorid)" class="info col-2">
          <base-slider
              :value="floorInRoom(element.floor.floorid)" size="md" class="mb-0">
          </base-slider>
        </div>
      </div>
      <div class="mr-0 p-0" v-for="(room,index) in element.rooms" :key="index">
        <div class="room row">
          <div class="label col-10">{{ room.name }}</div>
          <div class="info col-2 " @click="openCloseDeviceInRoom(room.roomid)">
            <base-slider
                :value="deviceInRoom(room.roomid)"
                size="md" class="mb-0">
            </base-slider>
          </div>
        </div>
        <div class="listDevices ">
          <div v-for="(device,index) in room.deivceList" :key="index" class="device float-left"
               >
            <device-secure
                :device="device"
                @showModal="pinModal=true"
                @createRule="createDeviceRule"
                @deleteRule="deleteDeviceRule"
            />
          </div>
        </div>
      </div>
    </div>

    <pin-modal
        :showPinModal="pinModal===true"
        :typePin="typePin"
        @closeModal="pinModal = false"
        @createPin="$emit('createPin')"
        @update="offRule"
    />
  </div>
</template>

<script>
import {DEVICE_TRAIT} from "../../../../../../plugins/variableConst";
import DeviceSecure from "../../../../../base/controll/DeviceSecure";
import PinModal from "../../../../../base/custom/PinModal";
import {deviceStates} from "../../../../../../plugins/helper";

export default {
  name: "CreatePin",
  data() {
    return {
      pinModal: false,
      typePin: '',
      roomid: '',
      floorid: '',
    }
  },
  computed: {
    deviceSecure,
    rooms,
    floors,
    floorRoomDevice,
    checkSecureAll,
    deviceCurrentHomeValid,
  },
  methods: {
    openCloseSecurityHome,
    openCloseDeviceInRoom,
    offRule,
    submit,
    deleteRoomRules,
    createRoomRules,
    createDeviceRule,
    deleteDeviceRule,
    deleteDeviceInRule,
    deviceInRoom,
    currentDeviceRuleInRoom,
    fullDeviceInRoom,
    floorInRoom,
    openCloseFloorInRoom,
    deleteFloorRules,
    ruleRoomDelete,
    fullDeviceInFloor,

  },
  components: {
    DeviceSecure,
    PinModal
  }
}



//METHOD

async function openCloseFloorInRoom(floorid) {
  let roomsInFloor = this.rooms.filter(room => room.floorid === floorid)

  if (!this.floorInRoom(floorid)) {

    let myDeviceInFloor = this.fullDeviceInFloor(floorid)

    let deviceInFloorFull = myDeviceInFloor['deviceInFloorFull']

    let deviceInFloorCurrent = myDeviceInFloor['deviceInFloorCurrent']

    let deviceCreateRule = deviceInFloorFull.filter(device => !deviceInFloorCurrent.find(dev => dev.devid === device.devid))

    let floorUpdateConvert = []

    deviceCreateRule.forEach(dev => {
      floorUpdateConvert.push(deviceStates(dev))
    })
    createRule(floorUpdateConvert,this.$t('common.floor'))

  } else {

      this.pinModal = true
      this.floorid = floorid
      this.typePin = 'floor'

  }
}

function deleteFloorRules(floorid) {
  let roomsInFloor = this.rooms.filter(room => room.floorid === floorid)
  let allRules = $state.HomeConfig.rules.filter(dev => dev.type === 2 && dev.security === true)


  let ruleid = []

  roomsInFloor.forEach(room => {
    let ruleInRoom = this.ruleRoomDelete(room.roomid)

    let rules = ruleInRoom.filter( rule => !ruleid.find(rid => rid === rule ))

    if (rules)
      ruleid.push(...rules)


    //CHECK RULE FLOOR HAVE ALL DEVICE

  })

  if (ruleid.length > 0) {
    $dispatch('HomeConfig/deleteRule', {ruleid: ruleid})
  }

  allRules.forEach(rule => {
    let deviceInFloorFull = this.fullDeviceInFloor(floorid)['deviceInFloorFull']
    let deviceInRuleIsFull = deviceInFloorFull.filter(device => rule.in.devices.find(dev => dev.devid === device.devid))

      $dispatch('RuleManager/resetData')
      $commit('RuleManager/SET_DATA_SECURE', rule)

      let inDevice = Object.assign({}, $state.RuleManager.in)

      inDevice.devices = rule.in.devices.filter(device => !deviceInRuleIsFull.find(dev => dev.devid === device.devid))
      $commit('RuleManager/SET_DATA_SECURE', {in: inDevice})
      this.submit()

  })



}


function createRoomRules(roomid) {

  let deviceInRoomFull = this.fullDeviceInRoom(roomid)
  let deviceInRoomCurrent = this.currentDeviceRuleInRoom(roomid)

  let deviceUpdate = deviceInRoomFull.filter(device => !deviceInRoomCurrent.find(dev => dev.devid === device.devid))

  if (deviceUpdate) {
    createRule(deviceUpdate,this.$t('common.room'))
  }

}

function createDeviceRule(device) {
  let deviceConvert = []
  deviceConvert.push(deviceStates(device))
  createRule(deviceConvert, this.$t('common.device'))
}

async function deleteDeviceRule(device) {
    this.pinModal = true
    this.device = device
    this.typePin = 'device'
}

function deleteRoomRules(roomid) {
  let rules = $state.HomeConfig.rules.filter(dev => dev.type === 2 && dev.security === true)
  let ruleid = this.ruleRoomDelete(roomid)

  let deviceInRoomFull = this.fullDeviceInRoom(roomid)
  rules.forEach(rule => {
    //home OR floor

    //rule is more than 2

    let devieRule = []
    rule.in.devices.forEach(dev => {
      let device = deviceInRoomFull.find(device => device.devid === dev.devid)
      if (device){
        devieRule.push(device)
      }
    })

    let deivceRoomIsFull = deviceInRoomFull.filter(device => rule.in.devices.find(dev => dev.devid === device.devid))



    if ( deivceRoomIsFull.length >= 2  && deivceRoomIsFull.length < deviceInRoomFull.length  &&  deivceRoomIsFull.length < rule.in.devices.length) {
      $dispatch('RuleManager/resetData')
      $commit('RuleManager/SET_DATA_SECURE', rule)

      let inDevice = Object.assign({}, $state.RuleManager.in)

      inDevice.devices = rule.in.devices.filter(device => !deivceRoomIsFull.find(dev => dev.devid === device.devid))
      $commit('RuleManager/SET_DATA_SECURE', {in: inDevice})
      this.submit()
    }



    if (deivceRoomIsFull.length === deviceInRoomFull.length && deivceRoomIsFull.length < rule.in.devices.length) {
      $dispatch('RuleManager/resetData')
      $commit('RuleManager/SET_DATA_SECURE', rule)

      let inDevice = Object.assign({}, $state.RuleManager.in)

      inDevice.devices = rule.in.devices.filter(device => !deivceRoomIsFull.find(dev => dev.devid === device.devid))
      $commit('RuleManager/SET_DATA_SECURE', {in: inDevice})
      this.submit()
    }
  })

  $dispatch('HomeConfig/deleteRule', {ruleid: ruleid})
}

async function openCloseSecurityHome() {
  $dispatch('RuleManager/resetData')

  if (!this.checkSecureAll) {

    let deviceCurrent = currentDevice()
    let deviceInsertSecure = this.deviceSecure.filter(dev => !deviceCurrent.find(devCurrent => devCurrent.devid === dev.devid))
    let deviceInsertConvert = []

    deviceInsertSecure.forEach(dev => {
      deviceInsertConvert.push(deviceStates(dev))
    })

    createRule(deviceInsertSecure, this.$t('common.home'))

  } else {
      this.pinModal = true
      this.typePin = 'home'
  }
}


async function openCloseDeviceInRoom(roomid) {


  if (!this.deviceInRoom(roomid)) {
    return this.createRoomRules(roomid)

  } else {

      this.pinModal = true
      this.roomid = roomid
      this.typePin = 'room'

  }
}


function floorInRoom(floorid) {

  let roomInFloor = this.rooms.filter(room => room.floorid === floorid)

  let countDeviceCurrent = 0
  let countDeviceFull = 0

  roomInFloor.forEach(room => {
    let deviceInRoomCurrent = this.currentDeviceRuleInRoom(room.roomid).length
    let deviceInRoomFull = this.fullDeviceInRoom(room.roomid).length

    countDeviceCurrent += deviceInRoomCurrent
    countDeviceFull += deviceInRoomFull

  })

  return countDeviceFull === countDeviceCurrent ? true : false
}


//COMPUTED


function rooms() {
  let rooms = []

  this.deviceSecure.forEach(dev => {
    if (dev && dev.roomid) {
      let room = $state.HomeConfig.rooms.find(room => room.roomid === dev.roomid);
      if (room) {
        let findRoom = rooms.find(myRoom => myRoom.roomid === room.roomid)
        if (!findRoom) {
          rooms.push(room)
        }
      }

    }
  })
  return rooms
}

function floors() {
  let floors = []

  this.rooms.forEach(room => {
    if (room && room.floorid) {
      let floor = $state.HomeConfig.floors.find(floor => floor.floorid === room.floorid);
      let findFloor = floors.find(myFloor => myFloor.floorid === floor.floorid)
      if (!findFloor) {
        floors.push(floor)
      }
    }
  })
  return floors
}

function deviceSecure() {
  let deviceSecure = []
  let devices = $state.HomeConfig.devices

  devices.forEach(device => {
        if (device.protected && device.protected === 1 || device.protected === 0) {
          deviceSecure.push(device)
        } else {
          let deviceSuit
          device.traits.forEach(trait => {
            switch (trait.name) {
              case DEVICE_TRAIT.ContactSensor:
              case DEVICE_TRAIT.Pir:
              case DEVICE_TRAIT.WaterAlarm:
              case DEVICE_TRAIT.GasAlarm:
              case DEVICE_TRAIT.COAlarm:
              case DEVICE_TRAIT.SmokeAlarm:
              case DEVICE_TRAIT.ShockAlarm:
                deviceSuit = true;
                break
              default:
                deviceSuit = false;
            }
            if (deviceSuit) {
              if (!deviceSecure.find(dev => dev.devid === device.devid)) {
                deviceSecure.push(device)
              }

            }
          })
        }
      }
  )
  return deviceSecure
}

function checkSecureAll() {

  return this.deviceCurrentHomeValid.length === this.deviceSecure.length;

}


function floorRoomDevice(){

  let arr = []

  this.floors.forEach(floor => {

    let rooms = []

    let roomFind = this.rooms.filter( room => room.floorid === floor.floorid)
    if (roomFind){
      rooms.push(...roomFind)
    }

    let devices = []

    rooms.forEach( room => {
      let deviceFind = this.deviceSecure.filter( device =>  device.roomid === room.roomid   )

      if (deviceFind && deviceFind.length > 0 ){
        room.deivceList = deviceFind
      }
    })

    let floorsRoomsDevices = {
      floor : floor,
      rooms: rooms,
    }

    arr.push(floorsRoomsDevices)

  })
  return arr
}

//HELPER

function createRule(deviceInsertConvert, type) {
  $dispatch('RuleManager/resetData')
  //IN RULE
  let inDevice = Object.assign({}, $state.RuleManager.in.device)

  inDevice.devices = deviceInsertConvert
  inDevice.logic = 1

  $commit("RuleManager/SET_DATA_SECURE", {
    in: inDevice
  });

  //OUT RULE
  let out = Object.assign({}, $state.RuleManager.out.device)
  out.notify = {
    before: "00",
    content: `Alarm-${type}-` + $state.Home.currentHome.name,
    email: [],
    push: [
      $state.Customer.customerData.verify_email
          ? $state.Customer.customerData.email
          : $state.Customer.customerData.phone
    ],
    sms: [],
    notifyTimes: 1,
    notifyCycle: 1
  }




  let name = `Alarm-${type}-` + $state.Home.currentHome.name


  $commit("RuleManager/SET_DATA_SECURE", {
    out
  });

  $commit("RuleManager/SET_DATA_SECURE", {
    name
  });

  submit()
}

function ruleRoomDelete(roomid) {
  let rules = $state.HomeConfig.rules.filter(dev => dev.type === 2 && dev.security === true)
  let ruleid = []

  let deviceInRoomFull = this.fullDeviceInRoom(roomid)

  rules.forEach(rule => {

    let deivceRoomIsFull = deviceInRoomFull.filter(device => rule.in.devices.find(dev => dev.devid === device.devid))

    rule.in.devices.forEach(el => {


      let device = $state.HomeConfig.devices.find(dev => dev.devid === el.devid && dev.roomid === roomid)
      let length = rule.in.devices.length

      if (length === 0) {
        !ruleid.find(myRule => myRule === rule.ruleid) ? ruleid.push(rule.ruleid) : ''
      }

      //device
      if (device && length === 1) {
        !ruleid.find(myRule => myRule === rule.ruleid) ? ruleid.push(rule.ruleid) : ''
      }

      if ( deivceRoomIsFull.length === rule.in.devices.length) {
        ruleid.push(rule.ruleid)
      }

    })

    //room



    if (deivceRoomIsFull.length === deviceInRoomFull.length && deivceRoomIsFull.length === rule.in.devices.length) {
      !ruleid.find(myRule => myRule === rule.ruleid) ? ruleid.push(rule.ruleid) : ''
    }
  })

  return ruleid
}

function fullDeviceInFloor(floorid) {
  let roomsInFloor = this.rooms.filter(room => room.floorid === floorid)

  let arrFloor = []

  roomsInFloor.forEach(room => {
    arrFloor = arrFloor.concat(this.fullDeviceInRoom(room.roomid))
  })

  let deviceInFloorFull = []
  let deviceInFloorCurrent = []

  arrFloor.forEach(dev => {

    let deviceFull = this.fullDeviceInRoom(dev.roomid)
    let deviceFullUpdate = deviceFull.filter(device => !deviceInFloorFull.find(dev => dev.devid === device.devid))
    if (deviceFullUpdate) {
      deviceInFloorFull = deviceInFloorFull.concat(deviceFullUpdate)
    }

    let deviceCurrent = this.currentDeviceRuleInRoom(dev.roomid)
    let deviceCurrentUpdate = deviceCurrent.filter(device => !deviceInFloorCurrent.find(dev => dev.devid === device.devid))

    if (deviceCurrentUpdate) {
      deviceInFloorCurrent = deviceInFloorCurrent.concat(deviceCurrentUpdate)
    }
  })

  let myDeviceInRoom = []
  myDeviceInRoom['deviceInFloorCurrent'] = deviceInFloorCurrent
  myDeviceInRoom['deviceInFloorFull'] = deviceInFloorFull

  return myDeviceInRoom
}


function fullDeviceInRoom(roomid) {
  let deviceInRoomFull = []

  this.deviceSecure.forEach(dev => {
    if (dev.roomid === roomid) {
      let device = deviceInRoomFull.find(devFull => devFull && devFull.devid === dev.devid)
      if (!device) {
        deviceInRoomFull.push(dev)
      }
    }
  })
  return deviceInRoomFull
}

function currentDevice() {
  let rules = $state.HomeConfig.rules.filter(dev => dev.type === 2)
  let deviceCurrent = []

  rules.forEach(rule => {
    let arrDev = rule.in.devices.filter(dev => !deviceCurrent.find(devCur => devCur.devid === dev.devid))

    deviceCurrent = deviceCurrent.concat(arrDev)
  })

  return deviceCurrent
}

function deviceCurrentHomeValid() {
  let rules = $state.HomeConfig.rules.filter(dev => dev.type === 2)
  let deviceCurrent = []

  rules.forEach(rule => {
    let arrDev = rule.in.devices.filter(dev => !deviceCurrent.find(devCur => devCur.devid === dev.devid))

    deviceCurrent = deviceCurrent.concat(arrDev)
  })

  //convertTodevice

  let deviceConvert = []
  deviceCurrent.forEach(device => {

    let mydevice = $state.HomeConfig.devices.find(dev => dev.devid === device.devid)

    if (mydevice) {
      deviceConvert.push(mydevice)
    }
  })

  let deviceCurrentValid = []

  deviceConvert.forEach(device => {
    if (device.protected && device.protected === 1 || device.protected === 0) {
      deviceCurrentValid.push(device)
    } else {
      let deviceSuit
      device.traits.forEach(trait => {
        switch (trait.name) {
          case DEVICE_TRAIT.ContactSensor:
          case DEVICE_TRAIT.Pir:
          case DEVICE_TRAIT.WaterAlarm:
          case DEVICE_TRAIT.GasAlarm:
          case DEVICE_TRAIT.COAlarm:
          case DEVICE_TRAIT.SmokeAlarm:
          case DEVICE_TRAIT.ShockAlarm:
            deviceSuit = true;
            break
          default:
            deviceSuit = false;
        }
        if (deviceSuit) {
          deviceCurrentValid.push(device)
        }
      })
    }
  })

  return deviceCurrentValid
}

function currentDeviceRuleInRoom(roomid) {

  let rules = $state.HomeConfig.rules.filter(dev => dev.type === 2 && dev.security === true)
  let deviceInRoomCurrent = []

  rules.forEach(rule => {
    rule.in.devices.forEach(el => {
      let device = $state.HomeConfig.devices.find(dev => dev.devid === el.devid && dev.roomid === roomid)
      if (device) {
        let deviceCurrent = deviceInRoomCurrent.find(dev => dev && dev.devid === device.devid)
        if (!deviceCurrent) {
          deviceInRoomCurrent.push(device)
        }
      }
    })
  })

  return deviceInRoomCurrent
}


async function offRule(myType) {
  this.pinModal = false

  switch (myType) {
    case 'home':
      let arrRule = []
      let rules = $state.HomeConfig.rules.filter(dev => dev.type === 2)
      rules.forEach(rule => {
        if (rule.in.devices.length === 0)
          arrRule.push(rule.ruleid)
        let myRule = rule.in.devices.find(device => this.currentDeviceRuleInRoom(dev => dev.devid === device.devid))
        if (myRule) {
          arrRule.push(rule.ruleid)
        }
      })
      $dispatch('HomeConfig/deleteRule', {ruleid: arrRule})
      break

    case 'room':
      this.deleteRoomRules(this.roomid)
      break

    case 'floor':
      this.deleteFloorRules(this.floorid)
      break

    case 'device':
      this.deleteDeviceInRule(this.device)
  }
}

function deleteDeviceInRule(device) {
  let rules = $state.HomeConfig.rules.filter(dev => dev.type === 2 && dev.security === true)
  let ruleid = []

  rules.forEach(rule => {

    let deviceInRule = rule.in.devices.find(dev => dev.devid === device.devid)

    if (deviceInRule) {
      if (rule.in.devices.length === 1) {
        ruleid.push(rule.ruleid)
        return $dispatch('HomeConfig/deleteRule', {ruleid: ruleid})
      }

      if (rule.in.devices.length > 1) {
        $dispatch('RuleManager/resetData')
        $commit('RuleManager/SET_DATA_SECURE', rule)

        let inDevice = Object.assign({}, $state.RuleManager.in)

        inDevice.devices = rule.in.devices.filter(dev => dev.devid !== device.devid)
        $commit('RuleManager/SET_DATA_SECURE', {in: inDevice})
        return this.submit()
      }
    }
  })
}

async function submit() {

  let data = (({
                 enable,
                 iconkey,
                 name,
                 out,
                 roomid,
                 active,
                 shortcut,
                 shortcut_by_user,
                 type,
               }) => ({
    enable,
    iconkey,
    name,
    out,
    roomid,
    active,
    shortcut,
    shortcut_by_user,
    type,
  }))($state.RuleManager);

  data.in = $state.RuleManager.in
  data.type = 2
      data.security = true

  if ($state.RuleManager.ruleid) {
    await $dispatch($api.HomeConfig.updateRule, {
      ruleid: $state.RuleManager.ruleid,
      updateData: data
    });
  } else {
    await $dispatch($api.HomeConfig.createRule, {
      data: [data]
    });
    $dispatch($api.RuleManager.setRule, false);
  }
}

function deviceInRoom(roomid) {
  let rules = $state.HomeConfig.rules.filter(dev => dev.type === 2 && dev.security === true)

  let deviceInRoomFull = []
  let deviceInRoomCurrent = []

  this.deviceSecure.forEach(dev => {
    if (dev.roomid === roomid) {
      let device = deviceInRoomFull.find(devFull => devFull && devFull.devid === dev.devid)
      if (!device) {
        deviceInRoomFull.push(dev)
      }
    }
  })

  rules.forEach(rule => {
    rule.in.devices.forEach(el => {
      let device = $state.HomeConfig.devices.find(dev => dev.devid === el.devid && dev.roomid === roomid)
      if (device) {
        let deviceCurrent = deviceInRoomCurrent.find(dev => dev && dev.devid === device.devid)
        if (!deviceCurrent) {
          deviceInRoomCurrent.push(device)
        }
      }
    })
  })
  return deviceInRoomCurrent.length === deviceInRoomFull.length ? true : false
}

</script>

<style scoped>

</style>
