<template>
  <card id="sceneList" header-classes="p-0 mb-3">
    <div slot="header" class="row menu-header m-0">
      <div
        v-for="(select, index) in selectSceneTypeOption"
        :key="index"
        @click="
          TYPE_RULE.scene_lighting === select.value
            ? ''
            : $emit('updateSceneType', select.value)
        "
        class="col-6 c-p"
        :class="{
          active: sceneType === select.value,
          disabled: TYPE_RULE.scene_lighting === select.value,
        }"
      >
        {{ select.label }}
      </div>
    </div>
    <!-- <v-select
        class="mb-3 header-select"
        :options="selectSceneTypeOption"
        :reduce="label => label.value"
        label="label"
        :value="sceneType"
        :clearable="false"
        :searchable="false"
        :placeholder="$t('scene.choosseSceneType')"
        @input="(value)=>{$emit('updateSceneType', value)}"
      >
        <template #open-indicator>
          <span v-bind="selectAttributes">
            <i class="mdi mdi-menu-down"></i>
          </span>
        </template>
    </v-select>-->
    <template v-for="scene in listScene">
      <div :key="scene.ruleid" class="mb-3 c-p">
        <div
          class="scene pr-2"
          :class="{
            disabled: !scene.enable,
            active: selectedScene === scene.ruleid,
          }"
        >
          <div
            class="name text-overflow-hidden pl-1"
            @click="scene.enable ? controllRule(scene.ruleid) : ''"
          >
            <i

              :class="'icon-' + getIconScene(scene.iconkey).icon"
            ></i>
            <span class="text-overflow-hidden">{{ scene.name }}</span>
          </div>
          <div class="option c-p">
            <div @click="$store.dispatch('RuleManager/setRule', scene)">
              <div class="tooltip-hover">{{ $t("scene.editScene") }}</div>
              <i class="fa fa-edit" />
            </div>
            <div v-if="scene.enable" @click="toggleEnable(scene.ruleid, 0)">
              <div class="tooltip-hover">{{ $t("scene.turnOffScene") }}</div>
              <i class="mdi mdi-sync-off" />
            </div>
            <div v-else @click="toggleEnable(scene.ruleid, 1)">
              <div class="tooltip-hover">{{ $t("scene.turnOnScene") }}</div>
              <i class="mdi mdi-sync" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import { getIconScene } from "@/plugins/helper";
import { TYPE_RULE } from "@/plugins/variableConst";

export default {
  name: "sceneList",
  props: {
    sceneType: [Number, Boolean],
  },
  data() {
    return {
      selectSceneTypeOption: [
        {
          label: this.$t("scene.sceneNormal"),
          value: TYPE_RULE.scene,
        },
        {
          label: this.$t("scene.sceneLighting"),
          value: TYPE_RULE.scene_lighting,
        },
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
      TYPE_RULE,
    };
  },
  computed: {
    listScene,
    selectedScene,
  },
  methods: {
    getIconScene,
    toggleEnable,
    controllRule,
  },
};

function selectedScene() {
  return $state.RuleManager.ruleid;
}

function listScene() {
  return $getters["HomeConfig/getAllRulesByType"]([this.sceneType]).sort(
    (a, b) => b.enable - a.enable
  );
}

async function toggleEnable(ruleid, enable) {
  $dispatch($api.HomeConfig.updateRule, {
    ruleid,
    updateData: {
      enable,
    },
  });
}

function controllRule(ruleid) {
  $dispatch($api.HomeControll.controllRule, { ruleid });
}
</script>

<style lang="scss">
</style>
