
<template>
  <div class="main-layout" id="homeInfo">
    <div class="menu-box">
      <menu-tab
        @changeMenu="changeMenu"
        :menuSelected="menuSelected"
        :hc_mac="hc_mac"
      />
    </div>
    <div class="info-box">
      <overview-info v-if="menuSelected===0"/>
      <hc-info v-if="menuSelected===1" :hc="hc"/>
      <hc-ota v-if="menuSelected===2"/>
      <backup-restore v-if="menuSelected==3" />
    </div>
  </div>
</template>

<script>
import MenuTab from "./Menu";
import OverviewInfo from "./OverviewInfo";
import HcInfo from "./HcInfo";
import HcOta from "./HcOta";
import BackupRestore from "./BackupRestore";

export default {
  name: "AddHome",
  data() {
    return {
      menuSelected: 0,
      hc_mac: ''
    };
  },

  watch:{
    homeInfoSelect(){
      console.log(111)
      this.menuSelected = this.homeInfoSelect
    }
  },
  destroyed() {
    console.log(222)
    $commit('Home/SELECT_HOMEIFO',0)
  },
  components: {
    MenuTab,
    OverviewInfo,
    HcInfo,
    HcOta,
    BackupRestore
  },
  computed: {
    hc() {
      return (
        $state.HomeConfig.hcs.find(item => item.mac === this.hc_mac) ||
        {}
      );
    },
    homeInfoSelect(){
      return $state.Home.homeInfoSelect
    }
  },
  methods:{
    changeMenu
  },
  created() {

   this.menuSelected =  this.homeInfoSelect
   // this.menuSelected =  this.homeInfoSelect
  }
};
function changeMenu(menuSelected, hc_mac){
  this.hc_mac = hc_mac;
  this.menuSelected = menuSelected
}
</script>

<style lang="scss">
</style>
