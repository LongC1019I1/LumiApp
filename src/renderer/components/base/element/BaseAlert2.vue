<template>
  <fade-transition>
    <div
      class="alert"
      :class="[`alert-${type}`, {'alert-dismissible': dismissible}]"
      role="alert"
      v-if="visible"
    >
      <slot v-if="!dismissible">
        <span v-if="icon" class="alert-inner--icon">
          <i :class="icon"></i>
        </span>
        <span v-if="$slots.text" class="alert-inner--text">
          <slot name="text"></slot>
        </span>
      </slot>
      <template v-else>
        <slot>
          <span v-if="icon" class="alert-inner--icon">
            <i :class="icon"></i>
          </span>
          <span v-if="$slots.text" class="alert-inner--text">
            <slot name="text"></slot>
          </span>
        </slot>
        <slot name="dismiss-icon">
          <button
            type="button"
            data-dismiss="alert"
            aria-label="Close"
            class="close"
            @click="dismissAlert"
          >
            <span aria-hidden="true">×</span>
          </button>
        </slot>
      </template>
    </div>
  </fade-transition>
</template>
<script>

export default {
  name: "base-alert",
  props: {
    type: {
      type: String,
      default: "default",
      description: "Alert type",
    },
    icon: {
      type: String,
      default: "",
      description: "Alert icon. Will be overwritten by default slot",
    },
    dismissible: {
      type: Boolean,
      default: false,
      description: "Whether alert is closes when clicking",
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    dismissAlert() {
      this.visible = false;
    },
  },
};
</script>
<style scoped>
/* .alert:hover {
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
} */
</style>