<template>
  <div class="w-100 mt-3 " id="homeConfig">

    <div class="list-hc-config">
      <div class="float-left">
        {{ $t('homeInfo.homeConfig.total_hcs') }}
      </div>
      <div class="float-right">
        {{ homeConfig.hcs }}
      </div>
    </div>

    <div class="list-hc-config">
      <div class="float-left">
        {{ $t('homeInfo.homeConfig.total_devices') }}
      </div>
      <div class="float-right">
        {{ homeConfig.devices }}
      </div>
    </div>

    <div class="list-hc-config">
      <div class="float-left">
        {{ $t('homeInfo.homeConfig.total_floors') }}
      </div>
      <div class="float-right">
        {{ homeConfig.floors }}
      </div>
    </div>

    <div class="list-hc-config">
      <div class="float-left">
        {{ $t('homeInfo.homeConfig.total_rooms') }}
      </div>
      <div class="float-right">
        {{ homeConfig.rooms }}
      </div>
    </div>

    <div class="list-hc-config">
      <div class="float-left">
        {{ $t('homeInfo.homeConfig.total_rules') }}
      </div>
      <div class="float-right">
        {{ homeConfig.rules }}
      </div>
    </div>

    <div class="list-hc-config">
      <div class="float-left">
        {{ $t('homeInfo.homeConfig.total_scenes') }}
      </div>
      <div class="float-right">
        {{ homeConfig.scenes }}
      </div>
    </div>

    <div class="list-hc-config">
      <div class="float-left">
        {{ $t('homeInfo.homeConfig.total_schedules') }}
      </div>
      <div class="float-right">
        {{ homeConfig.schedules }}
      </div>
    </div>


    <div class="list-hc-config">
      <div class="float-left">
        Tổng số nhóm
      </div>
      <div class="float-right">
        {{ homeConfig.groups }}
      </div>
    </div>

    <div class="list-hc-config">
      <div class="float-left">
        Tổng số camera
      </div>
      <div class="float-right">
        {{ homeConfig.cameras }}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ListHomeConfig",
  computed: {
    homeConfig
  }
}

function homeConfig() {
  return $state.Home.homeConfig
}
</script>

<style scoped>

</style>
