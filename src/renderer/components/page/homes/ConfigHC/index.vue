<template>
  <div>
    <div v-if="connectedHC" id="pageContent" class="configHC bg-blur2">
      <div class="row h-100 mr-0">
        <div class="col sidebar">
          <sidebar-menu :menu="menu" relative hideToggle showChild>
            <span slot="dropdown-icon"></span>
          </sidebar-menu>
        </div>
        <div class="col lumi-input overflow-y-auto">
          <div class="goback-btn pull-right c-p" @click="$router.currentRoute.query.mac?$router.push({name:'home-homeInfo'}):$router.push({name:'listHome'})">
            <i class="mdi mdi-close"></i>
            <span class="tooltip">{{$t('profile.text.exitSetting')}}</span>
          </div>
          <router-view
            ref="children"
            :hcData="hcData"
            @restartHC="restartHC"
            :connectedHC="connectedHC"
          />
        </div>
      </div>
    </div>
    <div v-else id="pageContent" class="configHC-connect bg-blur">
      <div class="row m-0 h-100">
        <div class="p-3 button-group">
          <base-button
            class="back-btn"
            type="primary"
            size="sm"
            icon="mdi mdi-chevron-double-left"
            @click="$router.back()"
          >
            <strong>{{ $t('configHC.button.back') }}</strong>
          </base-button>
        </div>
        <div class="container">
          <div class="row justify-content-center">
            <div class="row connectHC-tuitorial">
              <div class="col">
                <div class="mt-2">
                  <h5>
                    {{$t('configHC.text.connectHCtext1')}}
                    <strong>LUMI_HCxxxx</strong>
                    {{$t('configHC.text.connectHCtext2')}}
                  </h5>
                  <h5>
                    {{$t('configHC.text.wifiName')}}:
                    <strong>LUMI_HCxxxx</strong>
                    ({{$t('configHC.text.example')}}: LUMI_HC0C59)
                  </h5>
                  <h5>
                    {{$t('configHC.text.password')}}:
                    <strong>ABC123456</strong>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="connecting-text pl-3">
          <h4>
            {{$t('configHC.text.connecting')}}
            <div class="loading-dots">
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
            </div>
          </h4>
        </div>
      </div>
    </div>
    <modal
      v-if="loading"
      :show="true"
      class="configHC-connectInternet"
      modal-classes="modal-confirm"
      body-classes="text-center py-5 my-3"
    >
      <h5>{{$t('configHC.text.HCSettingText')}}</h5>
      <div class="loading-dots mt-3">
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
      </div>
    </modal>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
export default {
  name: "addHome",
  data() {
    return {
      intervalConnectHC: "",
      loading: false
    };
  },
  computed: {
    connectedHC() {
      return $state.ConfigHC.isConnected;
    },
    hcData() {
      return $state.ConfigHC.hcData;
    },
    menu() {
      return [
        {
          title: `HC_${this.hcData.mac}`,
          icon: "mdi mdi-cog",
          class: "mac-name",
          child: [
            {
              title: this.$t("configHC.menu.network"),
              href: {
                name: "configHC-network",
                query: this.$route.query
              },
              name: "configHC-network",
              icon: "mdi mdi-access-point-network"
            },
            {
              title: this.$t("configHC.menu.firmware"),
              href: {
                name: "configHC-firmware",
                query: this.$route.query
              },
              name: "configHC-firmware",
              icon: "mdi mdi-file-document-outline"
            },
            {
              title: this.$t("configHC.menu.timezone"),
              href: {
                name: "configHC-timezone",
                query: this.$route.query
              },
              name: "configHC-timezone",
              icon: "mdi mdi-clock"
            },
            {
              title: this.$t("configHC.menu.reboot"),
              href: {
                name: "configHC-reboot",
                query: this.$route.query
              },
              name: "configHC-reboot",
              icon: "mdi mdi-power"
            },

            {
              title: this.$t("configHC.menu.factoryReset"),
              href: {
                name: "configHC-factoryReset",
                query: this.$route.query
              },
              name: "configHC-factoryReset",
              icon: "mdi mdi-restore"
            }
          ]
        }
      ];
    }
  },
  created,
  destroyed,
  components: {
    SidebarMenu
  },
  methods: { submit, restartHC, cancel }
};
//cycle-life
function created() {
  $commit("ConfigHC/UPDATE_CURRENT_HC_SETTING", this.$route.query);
  this.intervalConnectHC = setInterval(() => {
    $dispatch($api.ConfigHC.loginHC).then(result => {
      if (result && result.success) {
        console.log(result);
        $alertify.success(this.$t("configHC.message.connectHCSuccess"));
        clearInterval(this.intervalConnectHC);
      }
    });
  }, 5000);

  $dispatch($api.ConfigHC.loginHC).then(result => {
    if (result && result.success) {
      $alertify.success(this.$t("configHC.message.connectHCSuccess"));
      clearInterval(this.intervalConnectHC);
    }
  });
}

function destroyed() {
  if (this.intervalConnectHC) clearInterval(this.intervalConnectHC);
  $dispatch($api.ConfigHC.resetData);
}

function submit() {
  this.$refs.children.submit();
}

function cancel() {
  this.$refs.children.cancel();
}

function restartHC(value) {
  this.loading = value;
}
</script>

<style lang="scss">
.configHC {
  .lumi-input {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    button.btn {
      height: auto;
      padding: 0.25rem 1rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
    }
    .goback-btn {
      position: fixed;
      top: 5rem;
      right: 1.5rem;
      height: 2.5rem;
      width: 2.5rem;
      font-size: 1.5rem;
      border-radius: 50%;
      .tooltip {
        display: none;
        opacity: 1;
        width: max-content;
        top: 100%;
        right: 50%;
        border-radius: 1rem;
        padding: 0 0.5rem;
      }
      &:hover {
        .tooltip {
          display: block;
        }
      }
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .sidebar {
    max-width: fit-content;
  }
  .v-sidebar-menu.vsm_expanded {
    margin-top: 1rem;
    height: calc(100% - 2rem);
    max-width: 300px !important;
    background-color: white;
    // border-top-right-radius: 1rem;
    // border-bottom-right-radius: 1rem;
    .vsm--item .vsm--link_level-1 {
      i.vsm--icon {
        background-color: transparent;
      }
      &.mac-name {
        padding-left: 1rem;
      }
      font-size: 1.2rem;
      font-weight: inherit;
      background: transparent;
      &:focus {
        outline: none;
      }
      box-shadow: none;
    }
    .vsm--link.vsm--link_level-2 {
      margin: 0.5rem 1.5rem;
      border-radius: 1rem;
      padding: 0rem 0.5rem;
      &.vsm--link_active {
        outline: none;
      }
      &:active {
        border: none;
        outline: none;
      }
    }
    .vsm--dropdown {
      .vsm--list {
        padding: 0px;
        background: transparent;
      }
    }
    .vsm--link_exact-active {
      font-weight: unset !important;
    }
  }
}
.configHC-connect,
.configHC-connectInternet {
  .button-group {
    z-index: 10;
  }
  .button-group {
    position: absolute;
  }
  .connectHC-tuitorial {
    i {
      font-size: 6rem;
    }
  }
  .connecting-text {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translate(-50%);
  }
  @keyframes dot-keyframes {
    0% {
      opacity: 0.4;
      transform: scale(1, 1);
    }

    50% {
      opacity: 1;
      transform: scale(1.2, 1.2);
    }

    100% {
      opacity: 0.4;
      transform: scale(1, 1);
    }
  }
}
</style>
