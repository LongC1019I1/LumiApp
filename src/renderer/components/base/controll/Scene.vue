<template>
  <div class="col scene-item" :class="{'active':isActive}" @click="$emit('click')">
    <base-alert class="p-0 c-p wave">
      <icon :name="'icon-'+getIconScene(scene.iconkey).icon"></icon>
      <span class="mx-2 text-overflow-hidden">{{scene.name}}</span>
    </base-alert>
  </div>
</template>
<script>
import { getIconScene } from "@/plugins/helper";
export default {
  name: "base-device",
  props: {
    scene: {
      type: Object
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getIconScene
  }
};
</script>
<style lang="scss">
.scene-item {
  .alert {
    display: flex;
    align-items: center;
    border-radius: 0.8rem;
    i {
      font-size: 1.5rem;
      padding-left: 0.5rem;
    }
  }
}
</style>
