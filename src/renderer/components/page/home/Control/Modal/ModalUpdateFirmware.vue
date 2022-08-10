<template>
  <modal-icon

      :show.sync="ShowModalFirm"
      :showClose="false"
      modalClasses="modal-confirm"
      footerClasses="p-0"
      id="ModalDeviceFirmware"
  >
    <h5 class="text-center mb-3">{{ this.$t("home.text.notification") }}</h5>
    <p style="text-align: center; margin-top: 32px">{{ $t("home.text.new-version-firmware") }}</p>

    <div class="form-group">

    </div>


    <template slot="footer">
      <base-button @click="notShowUpdateFirmware">{{ $t('home.text.ignore') }}</base-button>
      <base-button @click="$emit('closeModal')">{{ $t('home.text.remind-me-later') }}</base-button>
      <base-button class="ml-auto" @click="goDetail">
        {{
          $t('home.text.detail')
        }}
      </base-button>


    </template>
  </modal-icon>
</template>

<script>

import ModalIcon from "../../../../base/element/ModalIcon";

export default {
  name: "model-device-in",
  props: {
    ShowModalFirm: {
      type: Boolean,
      default: true,

    },
    device: {
      type: Object
    },
    deviceName: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    notShowUpdateFirmware,
    goDetail
  },


  components: {
    ModalIcon,
  }
}

function notShowUpdateFirmware() {
  let email = localStorage.getItem('email')
  let phone = localStorage.getItem('phone')
  let machc = $state.Home.currentHome.hcs && $state.Home.currentHome.hcs.find(item => item.is_connect && item.is_master).mac;
  let firmwareId = $state.Home.firmware.id

  $commit('Home/NOT_SHOW_MODAL_FIRMWARE', email)
  $commit('Home/NOT_SHOW_MODAL_FIRMWARE', phone)
  $commit('Home/NOT_SHOW_MODAL_FIRMWARE', machc)
  $commit('Home/NOT_SHOW_MODAL_FIRMWARE', firmwareId)
  this.$emit('closeModal')
}


function goDetail(){
  $commit('Home/SELECT_HOMEIFO',2)
  this.$router.push({
    name: "home-homeInfo",
  }).catch(() => {})
  this.$emit('closeModal')
}


</script>

<style lang="scss">

#ModalDeviceFirmware {

  .modal-footer {
    button {
      min-width: 33%;
    }
  }

  .isInputValid {
    border: 1px solid #F63737;
    border-radius: 7px;
  }

  .modal-content {
    width: 510px !important;
    position: absolute !important;
    height: 230px !important;

    .modal-body {
      padding: 18px 15px 10px 18px !important;

      p {
        font-size: 18px;
      }

      input {
        font-size: 16px;
      }

      #iconDevice {
        position: relative !important;

        .dropdown {
          position: absolute !important;
          top: 0;
        }

        .button-no-change-icon {
          background-color: #393933;
          border: none;
          color: #fff;
          position: relative;
          height: 46px;
          width: 100%;
          padding: 0 20px;
          border-radius: 7px;

          i:first-child {
            float: left;
            font-size: 34px;
            line-height: 46px;
            margin-right: 29px;
          }

          span {
            float: left;
            line-height: 46px;
          }

          .mdi-menu-down {
            float: right;
            font-size: 24px;
            line-height: 46px;
            position: relative;
            left: 35px;
          }


        }

        li {
          width: 100%;

          button {
            width: 100%;
            height: 45px;
            color: white;
            border-radius: 8px;
            background: #393933;
            position: absolute;
            z-index: 2;


            .icon-config {
              font-size: 31px;
              float: left;
              padding-left: 21px;
              padding-right: 33px;
            }

            .show-icon {
              position: absolute;
              right: 0px;
              bottom: 3%;
              top: 25%;
              font-size: 25px;
              height: 0px;
            }

            span {
              padding-top: 2px;
            }
          }
        }

        ul {
          background: #201a1a;
          color: white;
          font-size: 30px;
          width: 100%;
          z-index: 1;
          overflow: auto;
          max-height: 300px;
          top: 32px;

          li:hover {
            background-color: #707070;
          }

          .icon-device {
            padding-left: 28px;
            padding-top: 4px;

            span {
              font-size: 18px;
              margin-left: 33px;
              padding-bottom: 10px;
              display: inline-block;
            }

          }
        }


      }
    }


  }

}


</style>
