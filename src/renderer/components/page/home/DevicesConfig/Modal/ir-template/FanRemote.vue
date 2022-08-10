<template>

  <div v-if="showFanRemote" id="remote">
    <div class="col row w-100 h-100 m-0 p-0">

      <div class="col-2 h-100 ">
        <div class="next-device">
          <i @click="minusChannel" class="mdi mdi-chevron-left "></i>
        </div>
      </div>

      <div class="col-8 mt-3">
        <div class="switch-air ">
          <div class="text-center mb-1 p-2">
            {{ remoteChannel ? remoteChannel.model : channel = 1 }}
          </div>

          <div class=" row pl-4 pr-4 pt-1">
            <div class="control-left col-12 ">

              <div class="h-50">
                <div @click="checkChannel(IRV2_ID_FAN.on_off)" class="icon wave mx-auto">
                  <i class="mdi mdi-power"/>
                </div>
              </div>

              <div class="h-50 ">
                <div @click="checkChannel(IRV2_ID_FAN.speed)" class="icon wave mx-auto">
                  <i class="mdi mdi-signal-cellular-3"/>
                </div>
              </div>
            </div>


          </div>
        </div>

        <div class="confirm-device mt-4">
          <p>{{ channel + ' / ' + remote.length }}</p>
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
import {getIrDataCommand} from "@/plugins/helper";
import {DEVICE_TRAIT, IRV2_ID_FAN} from "@/plugins/variableConst";


export default {
  name: "FanRemote",
  props: {
    showFanRemote: {
      type: Boolean,
      default: false
    },
    device: {
      type: Object
    }
  },


  data() {
    return {
      channel: 1,
      IRV2_ID_FAN
    }
  },

  methods: {
    plusChannel,
    minusChannel,
    getDefaultChannel,
    getIrDataCommand,
    checkChannel

  },

  computed: {
    remoteChannel,
    remote,
  }
}

//method


function getDefaultChannel(value) {
  this.channel = value
}

function minusChannel() {
  if (this.channel <= 1) {
    return this.channel = this.remote.length
  }
  return this.channel--
}

function plusChannel() {

  if (this.channel >= this.remote.length) {
    return this.channel = 1
  }
  return this.channel++
}

function checkChannel(code) {
  console.log('yess', code)

  this.device.irData = this.remoteChannel

  let execution = {
    command: DEVICE_TRAIT.IrActiveV2,
    params: {
      irActiveV2: getIrDataCommand(
          this.device.irtype,
          this.device.irData,
          this.device.irData.ir_code[code]
      )
    }
  };

  console.log('remote', execution)

  $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution
  })
}


function remoteChannel() {

  let channel = $state.IrRemote.fanRemote[(this.channel - 1)]
  $commit('IrRemote/UPDATE_CURRENT_CHANNEL', channel)
  return channel
}

function remote() {
  return $state.IrRemote.fanRemote


}


</script>

<style lang="scss">

#remote {

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
