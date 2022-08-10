<template>
  <modal-icon
      :show.sync="showPinModal"
      :showClose="false"
      modalClasses="modal-input"
      footerClasses="p-0"
      id="pinModal"
  >
    <h5 class="text-center mb-3">{{ this.$t("homeInfo.homeConfig.input_pin") }}</h5>
    <pay-password
        :length="4"
        :id_backup="backup_id"
        @closeModal="showPinModal = false"
        @update="$emit('update')"
    />
    <template slot="footer">
      <base-button @click="$emit('closeModal')">{{ $t('cancel') }}</base-button>
    </template>
  </modal-icon>
</template>

<script>

import ModalIcon from "../../../../base/element/ModalIcon";
import PayPassword from "./PayPassword";
import "vue-pay-password/dist/vue-pay-password.css"


export default {
  name: "PinModal",
  props: {
    showPinModal: {
      type: Boolean,
      default: false,
    },
    backup_id: {
      type: String
    }

  },
  data() {
    return {};
  },

  components: {
    ModalIcon,
    PayPassword
  }
}


</script>

<style lang="scss">

#pinModal {

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
    height: 200px !important;

    .modal-body {
      padding: 18px 15px 10px 18px !important;
      height: 130px;

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
