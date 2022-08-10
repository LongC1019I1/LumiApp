<template>
  <card id="hcOta" class="overflow-auto">

    <div class="row">
      <div class="box-left">
        <i class="mdi mdi mdi-cog mr-2"></i>
      </div>

      <div class="box-right">
        <h5 class="mb-5"> {{ this.$t('homeInfo.update_firmware') }}</h5>

        <div class=" update">
          <div class="float-left"> {{ this.$t('homeInfo.auto-update') }}</div>
          <div @click="changeStatusOta" class="float-right">
            <base-slider size="md" :value="ota_status"></base-slider>
          </div>
        </div>
        <div style="clear: both"></div>

        <div v-if=" ota_status == 0 && firmware.id  " class="w-100 firmware" >
          <div class="title-new-firmware mt-3 mb-3" style="color: #ff2b2b !important">
            {{this.$t('homeInfo.new-version')}}
          </div>

          <div class="firmware-info m-0 p-0">
            <div class="float-left">
              {{firmware.name}}
            </div>

            <div class="float-right">
<!--              {{ format(firmware.date,'DD-MM-YYYY') }}-->
            </div>

          </div>

          <base-button @click="updateFirmware" type="secondary" class="update-firmware">
            {{this.$t('homeInfo.update-firmware')}}
          </base-button>

        </div>

        <div v-if="ota_status == 0 && !firmware.id" class="w-100 firmware" >
          <div class="title-new-firmware mt-3 mb-3"> {{this.$t('homeInfo.firmware-is-latest')}}</div>
        </div>

      </div>
    </div>
  </card>

</template>

<script>
import {format} from "fecha"
export default {
  name: "hc-ota",
  props: {
    hc: Object
  },
  data() {
    return {};
  },

  mounted() {
    $dispatch('Home/getFirmware')
  },

  computed: {
    ota_status,
    firmware
  },

  methods: {
    changeStatusOta,
    format,
    updateFirmware
  },

  components: {}
};

//methods

async function changeStatusOta() {


  let ota = this.ota_status === 1 ? 0 : 1;

  await $dispatch('Home/changeStatusOta', {home_id: this.$route.params.homeID, ota_status: ota})

  await $dispatch($api.Home.getListHomeByUserID);

  if (this.ota_status === 0){
    $commit('Home/GET_DEFAULT_SHOW_FIRMWARE')
  }


}

//computed
function ota_status() {
  return $state.Home.currentHome.hc_auto_ota;
}

function firmware() {
  return $state.Home.firmware;
}

function updateFirmware() {

  $dispatch('Home/updateFirmware', {home_id: this.$route.params.homeID, firmware_id: this.firmware.id })

}

</script>

<style lang="scss">
</style>
