<template>
  <div>
    <div v-for="(device,index) in deviceIr"
         :key="index" class="dropdown-item"

         @click="addDeviceInArr(device.name)">

      <div class="device-title">
        {{ device.name }}

        <i v-if="deviceSelect.includes(device.name)" class=" mdi mdi-chevron-up icon-typical"/>
        <i v-else class=" mdi mdi-chevron-down icon-typical"/>
      </div>

      <ul :style="deviceSelect.includes(device.name)?'display:block':'display:none'" v-if="device.type == 'IR_AC' "
          class="ir-device">

        <li @click="selectAirRemote(ac,device.type)" v-for="(ac,index) in irAc" :key="'ac'+index">
          {{ ac }}
        </li>

      </ul>

      <ul :style="deviceSelect.includes(device.name)?'display:block':'display:none'" v-if="device.type == 'IR_TV' "
          class="ir-device">

        <li @click="selectTVRemote(tv,device.type)" v-for="(tv,index) in irTV" :key="'tv'+index">
          {{ tv }}
        </li>
      </ul>

      <ul :style="deviceSelect.includes(device.name)?'display:block':'display:none'" v-if="device.type == 'IR_STB' "
          class="ir-device">
        <li @click="selectSTBRemote(stb,device.type)" v-for="(stb,index) in irSTB" :key="'stb'+index">
          {{ stb }}
        </li>
      </ul>

      <ul :style="deviceSelect.includes(device.name)?'display:block':'display:none'" v-if="device.type == 'IR_FAN' "
          class="ir-device">

        <li @click="selectFanRemote(fan,device.type)" v-for="(fan,index) in irFan" :key="'fan'+index">
          {{ fan }}
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: "ModalIrTemplate",
  props: ['isChannelValid'],
  data() {
    return {
      deviceIr: [
        {
          name: this.$t('deviceList.text.air-conditioner-controls'),
          type: 'IR_AC'
        },
        {
          name: this.$t('deviceList.text.control-tv'),
          type: 'IR_TV'
        },
        {
          name: this.$t('deviceList.text.control-swing'),
          type: 'IR_FAN'
        },
        {
          name: this.$t('deviceList.text.control-digital'),
          type: 'IR_STB'
        },

      ],
      deviceSelect: [],
    }
  },

  methods: {
    addDeviceInArr,
    selectAirRemote,
    selectTVRemote,
    selectSTBRemote,
    selectFanRemote,
    changeDefaultValidAndStatusCss
  },
  computed: {
    irAc,
    irFan,
    irSTB,
    irTV
  },
}

function addDeviceInArr(deviceName) {

  this.changeDefaultValidAndStatusCss()

  if (this.deviceSelect.includes(deviceName)) {

    this.deviceSelect = this.deviceSelect.filter(device => device !== deviceName)

  } else {
    this.deviceSelect.push(deviceName)
  }

}



//methods
function changeDefaultValidAndStatusCss() {
  this.$emit('changeStatusRemote')
  $commit('IrRemote/UPDATE_CURRENT_CHANNEL',{})
}

function selectTVRemote(tv, irType) {
  this.$emit('selectIrDevice', `${this.$t('deviceList.text.tv')} - ` + tv, irType);
  $dispatch($api.IrRemote.getRemote, {'data_type': irType, 'manufacture': tv})
}

function selectSTBRemote(stb, irType) {
  this.$emit('selectIrDevice', `${this.$t('deviceList.text.set-top-box')} - ` + stb, irType)
  $dispatch($api.IrRemote.getRemote, {'data_type': irType, 'manufacture': stb})
}

function selectAirRemote(nameAc, irType) {
  console.log(12)
  this.$emit('selectIrDevice', `${this.$t('deviceList.text.air-conditioner')} - ` + nameAc, irType);
  $dispatch($api.IrRemote.getRemote, {'data_type': irType, 'manufacture': nameAc})
}

function selectFanRemote(fan, irType) {
  this.$emit('selectIrDevice', `${this.$t('deviceList.text.fan')} - ` + fan, irType);
  $dispatch($api.IrRemote.getRemote, {'data_type': irType, 'manufacture': fan})
}

//computed

function irAc() {
  return $state.IrTemplate.listIrAC
}

function irFan() {
  return $state.IrTemplate.listIrFan
}

function irSTB() {
  return $state.IrTemplate.listIrSTB
}

function irTV() {
  return $state.IrTemplate.listIrTV
}

</script>

<style lang="scss">

.device-title {

  position: relative;

  i {
    position: absolute;
    right: -7px;
  }
}

</style>
