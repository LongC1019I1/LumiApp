<template>
  <div>
    <div class="info-item-list mt-3">
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.name')}}</div>
        <div class="info">
          <span class="value">{{hc.is_master?'HC':'LC'}}_{{hc.mac.slice(12).toUpperCase()}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.mac')}}</div>
        <div class="info">
          <span class="value">{{hc.mac}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.wifi')}}</div>
        <div class="info">
          <span class="value">{{hc.wifi_interface.wifi_name||''}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.gateway')}}</div>
        <div class="info">
          <span class="value">{{hc.wifi_interface.gateway}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.ip')}}</div>
        <div class="info">
          <span class="value">{{hc.ip}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.ipMode')}}</div>
        <div class="info">
          <span class="value">{{hc.wifi_interface.network_mode?'Static':'DHCP'}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.conectServer')}}</div>
        <div class="info">
          <span class="value">{{hc.is_connect?$t('homeInfo.connected'):$t('homeInfo.notConnected')}}</span>
        </div>
      </div>
      <div v-if="!hc.is_master" class="info-item-chilren">
        <div class="name">{{$t('homeInfo.conectHCMaster')}}</div>
        <div class="info">
          <span class="value">{{hc.is_connect?$t('homeInfo.connected'):$t('homeInfo.notConnected')}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.timezone')}}</div>
        <div class="info">
          <span class="value">{{hc.timezone}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.version')}}</div>
        <div class="info">
          <span class="value">{{hc.fwversion}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.updateTime')}}</div>
        <div class="info">
          <span class="value">{{hc.last_update}}</span>
        </div>
      </div>
    </div>
    <div class="mt-3 mr-2">
      <base-button
        class="pull-right ml-2"
        @click="isShowModalConfirmDeleteHc=true"
      >{{$t('delete')}}</base-button>
      <base-button
        class="pull-right"
        @click="$router.push({name: 'configHC-network', query:{mac: hc.mac, ip: hc.ip}})"
      >{{$t('homeInfo.setting')}}</base-button>
    </div>
    <modal :show.sync="isShowModalConfirmDeleteHc" modalClasses="modal-confirm" footerClasses="p-0">
      <h5
        class="text-center"
      >{{hc.is_master && $store.state.HomeConfig.hcs.find(item => !item.is_master)?$t("homeInfo.confirmDeleteMasterHcFromHomeHasLc"):''}} {{$t('homeInfo.confirmDelete', {type: hc.is_master?'HC':'LC'})}}</h5>
      <div class="m-4 text-center">
        <base-checkbox class="p-0" v-model="isForceDelete">{{$t('homeInfo.forceDelete')}}</base-checkbox>
      </div>
      <template slot="footer">
        <base-button class="modal-button" @click="deleteHC">{{$t('confirm')}}</base-button>
        <base-button
          class="ml-auto modal-button"
          @click="isShowModalConfirmDeleteHc=false"
        >{{$t('cancel')}}</base-button>
      </template>
    </modal>
    <modal
      :show.sync="isShowModalConfirmVerifyCode"
      modalClasses="modal-input lumi-input"
      footerClasses="p-0"
    >
      <h5 class="text-center">{{$t('notify.notifyWarninglTitle')}}</h5>
      <h6
        class="text-center m-4"
      >{{$t('homeInfo.forceDeleteConfirmText', {type: hc.is_master?'HC':'LC'})}}</h6>
      <div class="px-5">
        <base-input
          v-model="verifyCode"
          inputID="verifyCode"
          class="text-white"
          addon-left-icon="mdi mdi-key"
          addon-right-icon="mdi mdi-close"
          @rightIconClick="verifyCode='', inputError=''"
          :class="{'input-error':!isVerifyCodeValid||inputError}"
          type="number"
          @input="checkVerifyCode"
          @onEnter="deleteHCConfirm"
        />
        <span class="text-error">&nbsp;{{inputError}}</span>
      </div>
      <template slot="footer">
        <base-button class="modal-button" @click="deleteHCConfirm">{{$t('confirm')}}</base-button>
        <base-button
          class="ml-auto modal-button"
          @click="isShowModalConfirmVerifyCode=false"
        >{{$t('cancel')}}</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { checkVerifyCode } from "../../../account/function.js";
export default {
  name: "hc-general-info",
  props: {
    hc: Object
  },
  data() {
    return {
      isShowModalConfirmDeleteHc: false,
      isShowModalConfirmVerifyCode: false,
      isForceDelete: false,
      isVerifyCodeValid: true,
      verifyCode: "",
      inputError: ""
    };
  },
  methods: {
    deleteHC,
    deleteHCConfirm,
    checkVerifyCode
  }
};

async function deleteHC() {
  let data = {
    home_id: $state.Home.currentHome.id,
    force: this.isForceDelete ? 1 : 0,
    machc: this.hc.mac
  };
  let confirmReset = await $dispatch($api.Home.resetFactory, data);
  if (confirmReset && confirmReset.success) {
    this.isShowModalConfirmDeleteHc = false;
    this.isShowModalConfirmVerifyCode = true;
  }
}

async function deleteHCConfirm() {
  if (!this.verifyCode) {
    this.inputError = this.$t("homeInfo.notEmpyVerifyCode");
    document.getElementById("verifyCode").focus();
  } else if (!this.isVerifyCodeValid) {
    this.inputError = this.$t("homeInfo.verifyCodeInvalid");
    document.getElementById("verifyCode").focus();
  } else {
    let data = {
      home_id: $state.Home.currentHome.id,
      machc: this.hc.mac,
      verify_code: this.verifyCode
    };
    let confirmReset = await $dispatch($api.Home.resetFactoryConfirm, data);
    if (confirmReset && confirmReset.success) {
      this.isShowModalConfirmVerifyCode = false;
      $alertify.success(this.$t("notify.success"));
      $router.push({ name: "listHome" });
    } else {
      if (confirmReset && confirmReset.statusCode === 501)
        this.inputError = confirmReset.message;
      else this.inputError = " ";
      document.getElementById("verifyCode").focus();
      $alertify.error(confirmReset.message || this.$t("notify.errorDefault"));
    }
  }
}
</script>

<style lang="scss">
</style>
