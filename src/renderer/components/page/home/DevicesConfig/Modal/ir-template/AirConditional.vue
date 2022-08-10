<template>

  <div v-if="showAirRemote" id="airRemote">
    <div class="col row w-100 h-100 m-0 p-0">

      <div class="col-2 h-100 ">
        <div class="next-device">
          <i @click="minusChannel" class="mdi mdi-chevron-left "></i>
        </div>
      </div>

      <div class="col-8 mt-3">
        <div class="switch-air ">
          <div class="text-center mb-1 p-2">
            {{ airRemoteChannel ? airRemoteChannel.model : channel = 1 }}
          </div>

          <div class=" row pl-4 pr-4 pt-1">
            <div class="control-left col-6 ">

              <div class="h-50">
                <div @click="checkPower" class="icon wave">
                  <i class="mdi mdi-power"/>
                </div>
              </div>

              <div class="h-50 ">
                <div @click="checkMode" class="icon wave">
                  <i class="mdi mdi-snowflake"/>
                </div>
              </div>


            </div>

            <div class="control-right col-6">
              <div class=" h-100 volume ">
                <div @click="checkTemperaturePlus" class="icon wave">
                  <i class="mdi mdi-plus"/>
                </div>

                <div class=" temp wave ">
                  Temp
                </div>

                <div @click="checkTemperatureMinus" class="icon wave">
                  <i class="mdi mdi-minus"/>
                </div>

              </div>
            </div>


          </div>
        </div>

        <div class="confirm-device mt-4">
          <p>{{ channel + ' / ' + airRemote.length }}</p>
          {{ $t('devices.irv2.confirm-connect') }}
        </div>

      </div>

      <div class="col-2 ">
        <div class="next-device">
          <i @click="plusChannel" class="mdi mdi-chevron-right ">
          </i>

        </div>
      </div>

    </div>

  </div>


</template>

<script>
import {getIrAcDataCommand} from "@/plugins/helper";
import {MODE_IRV2_AC} from "@/plugins/variableConst";
import {DEVICE_TRAIT} from "@/plugins/variableConst";


export default {
  name: "air-remote",
  props: {
    showAirRemote: {
      type: Boolean,
      default: false
    },
    device: {
      type: Object
    },
  },


  data() {
    return {
      channel: 1,
      power: 0,
      mode: 0,
      temperature: 15,
      MODE_IRV2_AC
    }
  },

  methods: {
    plusChannel,
    minusChannel,
    getDefaultChannel,
    checkPower,
    getIrAcDataCommand,
    checkMode,
    checkTemperaturePlus,
    checkTemperatureMinus,
    checkChannel

  },

  computed: {
    airRemoteChannel,
    airRemote,
  }
}

//method

function checkTemperatureMinus() {

  console.log(this.device)
  if (this.temperature <= 16) {
    this.temperature = 32
  } else {
    this.temperature--
  }

  this.checkChannel()

}

function checkTemperaturePlus() {

  if (this.temperature == 32) {
    this.temperature = 16
  } else {
    this.temperature++
  }

  this.checkChannel()
}

function checkMode() {

  if (this.mode == (this.MODE_IRV2_AC.length - 1)) {
    this.mode = 0
  } else {
    this.mode++
  }

  this.checkChannel()

}

function checkPower() {

  this.power == 0 ? this.power = 1 : this.power = 0;
  this.checkChannel()

}

function getDefaultChannel(value) {
  this.channel = value
}

function minusChannel() {
  if (this.channel <= 1) {
    return this.channel = this.airRemote.length
  }
  return this.channel--
}

function plusChannel() {

  if (this.channel >= this.airRemote.length) {
    return this.channel = 1
  }
  return this.channel++
}

function checkChannel() {
  console.log( 'IRAC', this.MODE_IRV2_AC)
  console.log( 'airRemote', this.airRemoteChannel)
  let execution = {
    command: DEVICE_TRAIT.IrActiveV2,
    params: {
      irActiveV2: getIrAcDataCommand(this.airRemoteChannel.cmd_rule, {
        'power': this.power,
        'mode': this.MODE_IRV2_AC[this.mode].mode,
        'temp': this.temperature,
        'swing': 0
      })
    }
  };

  // $dispatch($api.HomeControll.controllDevice, {
  //   devid: this.device.devid,
  //   execution
  // })
}



function airRemoteChannel() {
  let channel = $state.IrRemote.airRemote[(this.channel - 1)]

  $commit('IrRemote/UPDATE_CURRENT_CHANNEL', channel)

  return channel
}

function airRemote() {
  return $state.IrRemote.airRemote
}




</script>

<style lang="scss">

#airRemote {

  .next-device {

    i {
      color: #707070;
    }

    i:hover {
      color: white;
    }

    font-size: 40px;
    position: relative;
    top: 120px;
  }

  .icon {
    width: 70px;
    height: 70px;
    color: white;
    background-color: #393933;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;

    i {
      font-size: 45px;
      position: relative;
      top: 7px;
    }
  }

  .switch-air {
    border-radius: 10px;
    background-color: #707070;
    font-size: 18px;

    .control-left {
      height: 220px;
    }

    .control-right {
      height: 185px;

      .volume {
        width: 80px;
        background-color: #393933;
        border-radius: 50px;
      }

      .icon {
        width: 80px !important;
        height: 70px !important;

        i {
          font-size: 30px !important;
        }
      }


      .temp {
        text-align: center;
        font-size: 15px;
        margin: 10px 0;
      }
    }
  }

  .volume {
    width: 70px;
    background-color: #393933;
  }

  .confirm-device {
    text-align: center;
  }

}


</style>
