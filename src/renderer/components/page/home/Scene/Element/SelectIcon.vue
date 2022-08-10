<template>
  <base-dropdown class="scene-dropdown w-100 dropdown-icon mb-3" position="right">
    <template #title>
      <div class="scene-info-box">
        <div class="label">{{$t('scene.icon')}}</div>
        <div class="info">
          <i class="scene-icon" :class="'icon-'+(ICON_SCENE[currentIcon]||ICON_SCENE['-1']).icon"></i>
          <span class="ml-2">{{$t('devices.'+(ICON_SCENE[currentIcon]||ICON_SCENE['-1']).name)}}</span>
          <i class="dropdown-icon mdi mdi-menu-down"></i>
        </div>
      </div>
    </template>
    <div
      class="dropdown-item"
      v-for="(icon, index) in ICON_SCENE"
      :key="index"
      @click="$store.commit('RuleManager/SET_DATA', { iconkey: index })"
    >
      <i :class="'icon-'+icon.icon"></i>
      {{$t('devices.'+icon.name)}}
    </div>
  </base-dropdown>
</template>

<script>
import { ICON_SCENE } from "@/plugins/variableConst";

export default {
  name: "select-scene-icon",
  data() {
    return {
      ICON_SCENE
    };
  },
  computed: {
    currentIcon
  }
};

function currentIcon() {
  return $state.RuleManager.iconkey;
}
</script>

<style lang="scss">
</style>
