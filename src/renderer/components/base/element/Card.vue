<template>
  <div
    class="card h-100"
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
    <div
      class="card-body h-100"
      :class="[{'pt-0 mt-0':$slots.header},...bodyClasses]"
      v-if="!noBody"
      v-scroll="handleScroll"
    >
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
  },
  methods: {
    handleScroll
  }
};

function handleScroll(event, body) {
  this.$emit("scrollBody", event, body);
}
</script>
<style scoped lang="scss">
.card {
  border-radius: 1rem;
  .card-body {
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem 1rem 0.5rem 1rem;
    overflow: auto;
  }
  .card-header {
    margin: 0;
    padding: 1rem;
  }
  .card-footer {
    padding: 1rem;
  }
  &.card-shadow-hover:hover {
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
      0 5px 15px rgba(0, 0, 0, 0.07) !important;
  }
  &.open-tab {
    .card-header {
      margin: 0;
      padding: .5rem;
      font-size: 1.125rem;
    }
  }
}
</style>
