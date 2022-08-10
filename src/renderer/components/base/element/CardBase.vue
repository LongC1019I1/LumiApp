<template>
    <div
      class="card"
      :class="[
         {'card-lift--hover': hover},
         {'shadow': shadow},
         {'card-shadow-hover': shadowHover},
         {[`shadow-${shadowSize}`]: shadowSize},
         {[`bg-gradient-${gradient}`]: gradient},
         {[`bg-${type}`]: type}
       ]"
    >
      <div class="card-header" :class="headerClasses" v-if="$slots.header">
        <slot name="header"></slot>
      </div>
      <div class="card-body" :class="bodyClasses" v-if="!noBody">
        <slot></slot>
      </div>

      <slot v-if="noBody"></slot>

      <div class="card-footer" :class="footerClasses" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: "card",
  props: {
    type: {
      type: String,
      description: "Card type"
    },
    gradient: {
      type: String,
      description: "Card background gradient type (warning,danger etc)"
    },
    hover: {
      type: Boolean,
      description: "Whether card should move on hover"
    },
    shadow: {
      type: Boolean,
      description: "Whether card has shadow"
    },
    shadowHover: {
      type: Boolean,
      description: "Whether card has shadow when hover"
    },
    shadowSize: {
      type: String,
      description: "Card shadow size"
    },
    noBody: {
      type: Boolean,
      default: false,
      description: "Whether card should have wrapper body class"
    },
    bodyClasses: {
      type: [String, Object, Array],
      description: "Card body css classes"
    },
    headerClasses: {
      type: [String, Object, Array],
      description: "Card header css classes"
    },
    footerClasses: {
      type: [String, Object, Array],
      description: "Card footer css classes"
    }
  }
};
</script>
<style scoped>
.card-body {
  height: 90%;
  overflow: auto;
}
.card-shadow-hover:hover {
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
</style>
