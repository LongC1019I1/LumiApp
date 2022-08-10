<template>
  <card id="menuList" header-classes="p-0">
    <!-- overview -->
    <div
      class="menu-item pr-2 mb-3 c-p"
      :class="{active: menuSelected===0}"
      @click="$emit('changeMenu', 0)"
    >
      <div class="name text-overflow-hidden">
        <span class="text-overflow-hidden">{{ this.$t("homeInfo.overviewInfo") }}</span>
      </div>
    </div>
    <!-- master hc -->
    <div
      class="menu-item pr-2 mb-3 c-p"
      :class="{active:hcMaster&&hc_mac===hcMaster.mac && menuSelected===1}"
      @click="$emit('changeMenu', 1, hcMaster.mac)"
    >
      <div class="name text-overflow-hidden">
        <span class="text-overflow-hidden">{{ this.$t("homeInfo.HCMasterInfo") }}</span>
      </div>
    </div>
    <!-- slave hc -->
    <div class="mb-3">
      <div class="menu-item pr-2 c-p" @click="isShowListHcSlave=!isShowListHcSlave">
        <div class="name text-overflow-hidden">
          <span class="text-overflow-hidden">{{ this.$t("homeInfo.HCSlaveList") }}</span>
        </div>
      </div>
      <div class="menu-list-lv2" v-if="isShowListHcSlave">
        <div v-for="hc in hcSlaveList" :key="hc.mac">
          <div
            class="menu-item-lv2 c-p"
            @click="$emit('changeMenu', 1, hc.mac)"
            :class="{active: hc.mac === hc_mac&&menuSelected===1}"
          >
            <div class="text-overflow-hidden name">
              <span class="text-overflow-hidden">{{ hc.mac }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="menu-item-lv2 item-button c-p" @click="$router.push({name:'addHC'})">
              <div>
                {{$t('homeInfo.add')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- ota -->
    <div
      class="menu-item pr-2 mb-3 c-p"
      :class="{active: menuSelected===2}"
      @click="$emit('changeMenu', 2)"
    >
      <div class="name text-overflow-hidden">
        <span class="text-overflow-hidden">{{ this.$t("homeInfo.OTA") }}</span>
      </div>
    </div>
    <div
      class="menu-item pr-2 mb-3 c-p"
      :class="{active: menuSelected===3}"
      @click="$emit('changeMenu', 3)"
    >
      <div class="name text-overflow-hidden">
        <span class="text-overflow-hidden">{{ this.$t("homeInfo.backup") }}</span>
      </div>
    </div>
    <!-- <div>
      <div
        class="menu-item-lv2 pr-2 mb-3 c-p"
        :class="{active: menuSelected===4}"
        @click="$emit('changeMenu', 4)"
      >
        <div class="name text-overflow-hidden">
          <span class="text-overflow-hidden">{{ this.$t("homeInfo.removeHC") }}</span>
        </div>
      </div>
    </div> -->
  </card>
</template>

<script>
export default {
  name: "menu-list",
  props: {
    menuSelected: Number,
    hc_mac: [String, Boolean]
  },
  data() {
    return {
      isShowListHcSlave: false
    };
  },
  computed: {
    hcSlaveList,
    hcMaster
  }
};

function hcSlaveList() {
  return $state.HomeConfig.hcs.filter(item => !item.is_master);
}

function hcMaster() {
  return $state.HomeConfig.hcs.find(item => item.is_master);
}
</script>

<style lang="scss">
</style>
