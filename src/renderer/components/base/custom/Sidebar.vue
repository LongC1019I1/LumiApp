<template>
  <div class="col p-0" id="sidebar">
    <h5 class="font-weight-bold text-white mt-3">
      <span class="dot" :class="{active: isHcActive}"></span>
      <span class="home-name">{{homeName}}</span>
    </h5>
    <div v-if="localData" class="row local-data mt-2 d-flex align-center">
      <div class="col">
        <div>
          <i class="mdi mdi-map-marker"></i>
          {{localData.name}}
        </div>
        <div>
          <i class="mdi mdi-account-multiple"></i> {{$store.state.HomeConfig.users.length}}
        </div>
        <!-- <div>
          <i class="mdi mdi-flash"></i> ?????
        </div> -->
      </div>
      <div class="col pt-1">
        <div class="temperature">{{Math.round(localData.main&&localData.main.temp)||0}}°C</div>
        <div class="humidity">
          <i class="mdi mdi-water"></i>
          {{localData.main&&localData.main.humidity||0}} %
        </div>
        <img
          class="icon-wheather"
          :src="`http://openweathermap.org/img/wn/${localData.weather&&localData.weather[0]&&localData.weather[0].icon}.png`"
        >
      </div>
    </div>
    <div class="line"></div>
    <sidebar-menu :menu="menu" relative hideToggle showChild>
      <span slot="dropdown-icon"></span>
    </sidebar-menu>
    <div class="version text-center">
      <span>Version: {{version}}</span>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
export default {
  name: "addHome",
  data() {
    return {
      version: "0.15.1",
      menu: [
        {
          title: this.$t("home.menu.control"),
          href: { name: "home-controll" },
          icon: "mdi mdi-view-dashboard",
          exactPath: true
        },
        {
          title: this.$t("home.menu.roomFloor"),
          href: { name: "home-roomFloor" },
          icon: "mdi mdi-home",
          exactPath: true
        },
        {
          title: this.$t("home.menu.scene"),
          href: { name: "home-scene" },
          icon: "mdi mdi-view-agenda",
          exactPath: true
        },
        {
          title: this.$t("home.menu.rule"),
          href: { name: "home-rule" },
          icon: "mdi mdi-import",
          exactPath: true
        },
        {
          title: this.$t("home.menu.calendar"),
          href: { name: "home-schedule" },
          icon: "mdi mdi-clock-outline",
          exactPath: true
        },
        {
          title: this.$t("home.menu.group"),
          href: { name: "home-group" },
          icon: "mdi mdi-layers-triple",
          exactPath: true
        },
        // {
        //   title: this.$t("home.menu.HCL"),
        //   href: { name: "home-HCL" },
        //   icon: "mdi mdi-lightbulb-outline"
        // },
        // {
        //   title: this.$t("home.menu.history"),
        //   href: { name: "home-history" },
        //   icon: "mdi mdi-history"
        // },
        {
          title: this.$t("home.menu.permision"),
          href: { name: "home-permision" },
          icon: "mdi mdi-share-variant"
        },
        {
          title: this.$t("home.menu.security"),
          href: { name: "home-secure" },
          icon: "mdi mdi-security",
          exactPath: true
        },
        {
          title: this.$t("home.menu.setting"),
          href: { name: "home-configDevice" },
          icon: "mdi mdi-cog",
          exactPath: true
        },
        {
          title: this.$t("home.menu.homeInfo"),
          href: { name: "home-homeInfo" },
          icon: "mdi mdi-information",
          exactPath: true
        }
      ]
    };
  },
  components: {
    SidebarMenu
  },
  computed: {
    homeName,
    userNumber,
    localData,
    isHcActive
  },
  beforeCreate
};
function beforeCreate() {
  let location =
    $state.Home.currentHome &&
    $state.Home.currentHome.address_info &&
    $state.Home.currentHome.address_info.geometry.location;
  if (location)
    $dispatch($api.LocalData.getWeatherFromLocation, {
      location,
      language: "vi"
    });
  else $commit("LocalData/UPDATE_LOCAL_DATA", null);
}
//comuted
function homeName() {
  return $state.Home.currentHome&&$state.Home.currentHome.name;
}
function userNumber() {
  return $state.HomeConfig.users.length;
}
function localData() {
  return $state.LocalData.localData;
}

function isHcActive() {
  return $state.Home.currentHome&&$state.Home.currentHome.hcs&&$state.Home.currentHome.hcs.find(item => item.is_connect&&item.is_master);
}
</script>

<style lang="scss">
#sidebar {
  max-width: 235px;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  .v-sidebar-menu.vsm_expanded.vsm_relative {
    z-index: 0;
    &.vsm--link_exact-active {
      font-weight: unset !important;
    }
    min-width: 100%;
    height: calc(100% - 12rem);
    .vsm--item .vsm--link_level-1 {
      border-radius: 0.7rem;
      margin: 0.5rem;
      padding: 0px;
      padding-left: 0.5rem;
      font-size: 1.125rem;
      font-weight: inherit;
      box-shadow: none;
      line-height: 3rem;
      i.vsm--icon {
        height: 2.3rem;
        background-color: transparent;
        font-size: 2rem;
        margin-right: 1.5rem;
      }
      &.mac-name {
        padding-left: 1rem;
      }
      &:focus {
        outline: none;
      }
    }
  }
  .line {
    margin: 1rem 0 0.5rem;
    border-top: 2px solid gray;
  }
  .local-data {
    margin: 0 1rem 0 0;
    & > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 50%;
      font-size: 0.875rem;
      .temperature {
        margin-top: 0.3rem;
        font-size: 1.5rem;
      }
      .humidity {
        i {
          color: rgb(60, 151, 255);
        }
      }
      img.icon-wheather {
        position: absolute;
        top: 0rem;
        right: 0.5rem;
        width: 2rem;
        height: 2rem;
        object-fit: cover;
      }
      i {
        font-size: 1rem;
        position: relative;
        top: 2px;
      }
    }
  }

  .dot {
    margin-left: 1.1rem;
    height: 10px;
    width: 10px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    &.active {
      background-color: greenyellow;
    }
  }
  .version {
    position: relative;
    bottom: -0.5rem;
    font-size: 0.875rem;
  }
}
</style>
