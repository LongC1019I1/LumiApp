<template>
  <fragment>
    <div id="elementShare">
      <div v-show="!userRoleAdmin " class="header">
        <base-button class="share"
                     @click="shareDevices"
        >
          {{ this.$t('permission.text.share') }}
        </base-button>

        <div class="select-all">
          {{ $t('permission.text.all') }}
          <i  v-if="!!(share.remotes.length === fullRemotes.length && share.devices.length === fullDevices.length && share.rules.length === fullRules.length )"  class=" check-all-home mdi mdi-checkbox-marked-circle" @click="selectNone"/>
          <i v-else
             class=" check-all-home mdi mdi-radiobox-blank" @click="selectAll"/>
        </div>
      </div>

      <div>
        <device-list
            v-show="selected === 1 || selected === 2 || selected === 3 "
            @deviceShare="share.devices = $event "
            @remotesShare="share.remotes = $event "
            :userRoleAdmin="userRoleAdmin"
            :selected="selected"
            :devicesSelect="share.devices"
            :remotesSelect="share.remotes"
        />
        <rule-sence-list
            @ruleSence="share.rules = $event"
            :selected="selected"
            :userRoleAdmin="userRoleAdmin"
            :rulesSelect="share.rules"
            v-show="selected === 4 || selected === 5 "
        />
      </div>
    </div>

  </fragment>
</template>

<script>

import DeviceList from "./DeviceList";
import RuleSenceList from "./RuleSenceList";

export default {
  name: "ElementList",
  props: {
    selected: {
      type: Number
    }
  },
  data() {
    return {
      share: {
        devices: $state.User.userPermissionSelect.devices || [],
        remotes: $state.User.userPermissionSelect.remotes || [],
        rules: $state.User.userPermissionSelect.rules || [],
      },
    }
  },
  methods: {
    selectAll,
    selectNone,
    shareDevices
  },
  components: {
    DeviceList,
    RuleSenceList
  },
  computed: {
    userRoleAdmin,
    fullDevices,
    fullRemotes,
    fullRules
  }
}

function userRoleAdmin() {
  return $state.User.userPermissionSelect.admin
}

function selectAll() {
  this.share.devices = this.fullDevices
  this.share.remotes = this.fullRemotes
  this.share.rules  = this.fullRules

}

 function shareDevices(){
 return  $dispatch('User/updateShareUserDevice',{devices: this.share.devices, remotes: this.share.remotes, rules: this.share.rules})
   .then((result) => {
     console.log('result', result)
     if (result)
       $alertify.success(
       this.$t("permission.text.share-success")
       );
   });
}

function fullDevices() {
  return $state.HomeConfig.devices.filter(dev => dev.roomid && dev.roomid !== -1).map( dev => dev.devid)
}

function fullRemotes() {
  return $state.HomeConfig.remotes.filter(remote => remote.roomid && remote.roomid !== -1 ).map( remote => remote.remoteid)
}

function fullRules(){
  return ($state.HomeConfig.rules.filter(rule => (rule.type === 1) && !rule.security).concat($state.HomeConfig.rules.filter(rule => (rule.type === 0 || rule.type === 2) && !rule.security))).map(rule => rule.ruleid)
}

function selectNone() {
  this.share.devices = []
  this.share.remotes = []
  this.share.rules = []
  console.log('share', this.share)
}

</script>

<style scoped>

</style>
