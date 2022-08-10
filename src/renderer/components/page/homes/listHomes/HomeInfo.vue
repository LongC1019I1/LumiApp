<template>
  <div class="home-element col pb-3">
    <div class="option">
      <div v-if="mainHc" class="config-home" @click="copyMac">
        <i class="fa fa-copy"/>
        <div class="tooltip-hover">{{ $t('homes.button.copyMac') }}</div>
      </div>

      <div v-else class="config-home" @click="gotoHome">
        <i class="mdi mdi-plus"/>
        <div class="tooltip-hover">{{ $t('homes.button.addHc') }}</div>
      </div>

      <div class="config-home" @click="updateHome(homeInfo)">
        <i class="fa fa-edit"/>
        <div class="tooltip-hover">{{ $t('homes.button.editHomeInfo') }}</div>
      </div>

      <div class="config-home" @click=" $emit('modalConfirmPassword',homeInfo) ">
        <i class="fa fa-trash"/>
        <div class="tooltip-hover">{{ $t('homes.button.deleteHome') }}</div>
      </div>
    </div>
    <div class="home-image" @click="gotoHome">
      <img
        alt="Home image"
        class="img-fluid rounded shadow"
        :src="homeInfo.avatar||'static/img/homeDefault.jpg'"
      >
    </div>
    <div class="home-info row m-0" @click="gotoHome">
      <div class="col-12">
        <span>
          <i v-if="mainHc&&mainHc.is_connect" class="mdi mdi-circle" style="color: lightgreen"></i>
          <i v-else class="mdi mdi-circle" style="color: #CCCCCC"></i>
        </span>
        <span>
          <strong>&nbsp;{{ homeInfo.name }}</strong>
        </span>
      </div>
      <div class="col-12 row m-0">
        <div class="col-6 pl-4 text-overflow-hidden p-0 domain">
          {{
          $t('homeConfig.text.domain') + homeInfo.domain
          }}
        </div>
        <div class="col-6 p-0" v-if="mainHc&&mainHc.mac">
          <span class="pull-right text-overflow-hidden mac" ref="mac">{{ mainHc.mac }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-info",
  props: ["homeInfo"],
  data() {
    return {
      mainHc: this.homeInfo.hcs.find(item => item.is_master),
      modals: {
        modal0: false
      }
    };
  },
  methods: {
    gotoHome,
    updateHome,
    copyMac
  }
};

//methode
async function gotoHome() {
  if (this.mainHc) {
    this.$router.push({
      name: "home-controll",
      params: { homeID: this.homeInfo.id }
    });
  } else {
    let confirm = await $alertify.custom({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("homes.message.homeNotHaveHCMaster"),
      confirmButtonText: this.$t("confirm"),
      cancelButtonText: this.$t("cancel"),
      showCancelButton: true
    });
    if (confirm && confirm.value)
      this.$router.push({
        name: "addHC",
        params: { homeID: this.homeInfo.id }
      });
  }
}

function updateHome(homeInfo) {
  this.$router.push({
    name: "editHome",
    params: { homeInfo: homeInfo }
  });
}

function copyMac() {
  const el = document.createElement("textarea");
  el.value = this.$refs.mac.innerText;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  $alertify.success(this.$t("homeConfig.text.macHC-copy-success"));
}
</script>


<style lang="scss">
.home-element {
  flex: 0 0 33.3333%;
  min-width: 33.333%;
  max-width: 33.333% !important;
  height: 36% !important;
  position: relative;
  @media (min-width: 1368px) {
    flex: 0 0 25%;
    min-width: 25%;
    max-width: 25% !important;
  }

  .home-action {
    .nav-link {
      padding: 0px;

      i:not(.fa) {
        top: -2px;
      }
    }

    z-index: 1;
    text-align: center;
    height: 35px;
    width: 35px;
    color: white;
    background-color: #c3c3c3;
    border-radius: 50%;
    font-size: 25px;
    position: absolute;
    top: 5%;
    right: 8%;

    &:hover {
      background-color: #a7a7a7;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .home-image {
    height: 70%;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    position: relative;
  }

  .home-info {
    background-color: #5e5e5e;
    width: 100%;
    height: 30%;
    padding-top: 3%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    .domain,
    .mac {
      font-size: 0.875rem;
    }
  }

  .option {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.4s linear;
    position: absolute;
    right: 25px;
    top: 5px;
    z-index: 100;

    .config-home {
      float: left;
      position: relative;
      width: 30px;
      height: 30px;
      margin: 4px 0;
      border-radius: 50%;
      display: none;

      i {
        color: #4a4a44;
        font-size: 17px;
        position: absolute;
        right: 5px;
        top: 6px;
        color: white;
      }

      .tooltip-hover {
        display: none;
      }
    }

    .config-home:hover {
      background-color: rgba(255, 255, 255, 0.5);

      .tooltip-hover {
        position: absolute;
        display: block;
        min-width: 75px;
        right: -20px;
        top: 33px;
        height: 30px;
        line-height: 30px;
        background-color: #707070;
        text-align: center;
        border-radius: 5px;
      }

      i {
        color: white !important;
      }
    }

    .config-home:nth-child(1) {
      .mdi-plus {
        top: -2.2px;
        right: 4.5px;
        font-size: 20px;
        display: block !important;
      }
    }

    .config-home:nth-child(1):hover {
      .tooltip-hover {
        min-width: 150px;
        right: -50px;
      }

      i {
        color: black;
      }
    }

    .config-home:nth-child(3) {
      i {
        right: 8px;
        top: 6px;
      }
    }

    .config-home:nth-child(3):hover {
      .tooltip-hover {
        min-width: 75px;
        right: -8px;
      }
    }
  }

  &:hover {
    .option {
      visibility: visible;
      opacity: 1;
    }

    .config-home {
      display: block;
    }

    .img-fluid {
      background-color: #1fa2ff!important;
    }
  }
}
</style>
