<template>
  <div>
    <div class="group-info-box c-p">
      <div
        class="scene-info-box"
        :class="{ 'input-error': sceneNameError }"
        @click="$refs.sceneName.focus()"
      >
        <div class="label">{{ $t("scene.sceneName") }}</div>
        <div class="info">
          <input
            id="sceneName"
            ref="sceneName"
            type="text"
            class="text-right"
            maxlength="30"
            :placeholder="$t('scene.enterSceneName')"
            v-model="currentName"
          />
        </div>
      </div>
    </div>
    <span class="text-error">{{ sceneNameError }}&nbsp;</span>
  </div>
</template>

<script>
export default {
  name: "scene-manager",
  data() {
    return {
      sceneNameError: "",
    };
  },
  computed: {
    currentName: {
      get() {
        return $state.RuleManager.name;
      },
      set(value) {
        let roomName = value.trim();
        if (!roomName)
          this.sceneNameError = this.$t("scene.pleaseEnterSceneName");
        $commit("RuleManager/SET_DATA", { name: value });
      },
    },
  },
  watch: {
    currentName(value) {
      let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      let roomName = value.trim();
      if (roomName) this.sceneNameError = "";
      if (format.test(roomName))
        this.sceneNameError = this.$t("scene.sceneNoSpecialCharacter");
    },
  },
};
</script>

<style lang="scss">
</style>
