<template>
  <card id="overviewInfo">
    <!-- name  -->
    <div class="info-item">
      <div class="name">{{$store.state.Home.currentHome.name}}</div>
      <div class="info">
        <span
          class="value"
        >{{$store.state.HomeConfig.devices.length+$store.state.HomeConfig.cameras.length}} {{$t('homeInfo.device')}}</span>
      </div>
    </div>
    <!-- hc -->
    <div class="info-item" @click="listHC.length?isShowListHC=!isShowListHC:''">
      <div class="name">{{$t('homeInfo.HC')}}</div>
      <div class="info">
        <span class="value">{{listHC.length}}</span>
        <span v-if="listHC.length" class="icon">
          <i class="mdi" :class="isShowListHC?'mdi-chevron-up':'mdi-chevron-down'"></i>
        </span>
      </div>
    </div>
    <div v-if="isShowListHC" class="info-item-list">
      <div v-for="hc in listHC" :key="hc.hc_id" class="info-item-chilren">
        <div
          class="name"
        >{{hc.is_master?'HC':'LC'}}_{{hc.mac.slice(12).toUpperCase()}} - FW {{hc.fwversion}}</div>
        <div class="info">
          <span
            class="value"
          >{{$store.state.HomeConfig.devices.filter(item=>hc.hc_id===item.hc_id).length}} {{$t('homeInfo.device')}}</span>
        </div>
      </div>
    </div>
    <!-- rule -->
    <div class="info-item" @click="listRule.length?isShowListRule=!isShowListRule:''">
      <div class="name">{{$t('homeInfo.Rule')}}</div>
      <div class="info">
        <span class="value">{{listRule.length}}</span>
        <span v-if="listRule.length" class="icon">
          <i class="mdi" :class="isShowListRule?'mdi-chevron-up':'mdi-chevron-down'"></i>
        </span>
      </div>
    </div>
    <div v-if="isShowListRule" class="info-item-list">
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.ruleNormal')}}</div>
        <div class="info">
          <span class="value">{{listRuleNormal.length}}</span>
        </div>
      </div>
      <div class="info-item-chilren">
        <div class="name">{{$t('homeInfo.ruleSecure')}}</div>
        <div class="info">
          <span class="value">{{listRuleSecure.length}}</span>
        </div>
      </div>
    </div>
    <!-- scene -->
    <div class="info-item" @click="listScene.length?isShowListScene=!isShowListScene:''">
      <div class="name">{{$t('homeInfo.Scene')}}</div>
      <div class="info">
        <span class="value">{{listScene.length}}</span>
        <span v-if="listScene.length" class="icon">
          <i class="mdi" :class="isShowListScene?'mdi-chevron-up':'mdi-chevron-down'"></i>
        </span>
      </div>
    </div>
    <div v-if="isShowListScene" class="info-item-list">
      <div v-for="scene in listScene" :key="scene.ruleid" class="info-item-chilren">
        <div class="name">{{scene.name}}</div>
        <div class="info">
          <span
            class="value"
          >{{scene.out.devices.length+scene.out.groups.length}} {{$t('homeInfo.device')}}</span>
        </div>
      </div>
    </div>
    <!-- schedule -->
    <div class="info-item">
      <div class="name">{{$t('homeInfo.Schedule')}}</div>
      <div class="info">
        <span class="value">{{listSchedule.length}}</span>
      </div>
    </div>
    <!-- group-->
    <div class="info-item" @click="listGroup.length?isShowListGroup=!isShowListGroup:''">
      <div class="name">{{$t('homeInfo.Group')}}</div>
      <div class="info">
        <span class="value">{{listGroup.length}}</span>
        <span v-if="listGroup.length" class="icon">
          <i class="mdi" :class="isShowListGroup?'mdi-chevron-up':'mdi-chevron-down'"></i>
        </span>
      </div>
    </div>
    <div v-if="isShowListGroup" class="info-item-list">
      <div v-for="group in listGroup" :key="group.groupid" class="info-item-chilren">
        <div class="name">{{group.name}}</div>
        <div class="info">
          <span class="value">
            {{group.type===GROUP_TYPE.normalGroup?
            $store.state.HomeConfig.devices.filter(item=>item.groupid===group.groupid).length:
            group.devices&&group.devices.length}} {{$t('homeInfo.device')}}
          </span>
        </div>
      </div>
    </div>
    <!-- HCL-->
    <div class="info-item">
      <div class="name">{{$t('homeInfo.HCL')}}</div>
      <div class="info">
        <span class="value">{{listHCL.length}}</span>
      </div>
    </div>
    <!-- Camera-->
    <div class="info-item">
      <div class="name">{{$t('homeInfo.Camera')}}</div>
      <div class="info">
        <span class="value">{{listCamera.length}}</span>
      </div>
    </div>
    <!-- Remote-->
    <div class="info-item">
      <div class="name">{{$t('homeInfo.Remote')}}</div>
      <div class="info">
        <span class="value">{{listRemote.length}}</span>
      </div>
    </div>
    <!-- User-->
    <div class="info-item">
      <div class="name">{{$t('homeInfo.User')}}</div>
      <div class="info">
        <span class="value">{{listUser.length}}</span>
      </div>
    </div>
    <!-- Floor-->
    <div class="info-item">
      <div class="name">{{$t('homeInfo.Floor')}}</div>
      <div class="info">
        <span class="value">{{listFloor.length}}</span>
      </div>
    </div>
    <!-- Room-->
    <div class="info-item">
      <div class="name">{{$t('room')}}</div>
      <div class="info">
        <span class="value">{{listRoom.length}}</span>
      </div>
    </div>
  </card>
</template>

<script>
import { TYPE_RULE, GROUP_TYPE } from "@/plugins/variableConst";

export default {
  name: "overview-info",
  data() {
    return {
      isShowListHC: false,
      isShowListRule: false,
      isShowListScene: false,
      isShowListSchedule: false,
      isShowListGroup: false,
      //data
      listHC: $state.HomeConfig.hcs,
      listGroup: $state.HomeConfig.groups,
      listHCL: $state.HomeConfig.groups,
      listCamera: $state.HomeConfig.cameras,
      listRemote: $state.HomeConfig.remotes,
      listFloor: $state.HomeConfig.floors,
      listRoom: $state.HomeConfig.rooms,
      listUser: $state.HomeConfig.users,
      GROUP_TYPE
    };
  },
  computed: {
    listRule,
    listRuleNormal,
    listRuleSecure,
    listScene,
    listSchedule
  }
};

function listRule() {
  return $getters["HomeConfig/getAllRulesByType"]([
    TYPE_RULE.rule_nomal,
    TYPE_RULE.rule_security
  ]);
}
function listRuleNormal() {
  return $getters["HomeConfig/getAllRulesByType"]([TYPE_RULE.rule_nomal]);
}
function listRuleSecure() {
  return $getters["HomeConfig/getAllRulesByType"]([TYPE_RULE.rule_security]);
}

function listScene() {
  return $getters["HomeConfig/getAllRulesByType"]([TYPE_RULE.scene]);
}

function listSchedule() {
  return $getters["HomeConfig/getAllRulesByType"]([TYPE_RULE.schedule]);
}
</script>

<style lang="scss">
</style>
