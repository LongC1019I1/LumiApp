<template>
  <div class="col scene-item" :class="{'active':isShortcut}" @click="$emit('click')">
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
  },
  data() {
    return {
      isShortcut:
        this.scene.shortcut_by_user &&
        this.scene.shortcut_by_user[$state.Customer.customerData.id]
    };
  },
  watch: {
    scene: {
      handler(scene) {
        let customer_id = $state.Customer.customerData.id;
        this.isShortcut =
          scene.shortcut_by_user && scene.shortcut_by_user[customer_id];
      },
      deep: true
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
