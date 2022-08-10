<template>
  <label
  @click="disabled?'':$emit('submit')"
    class="switch"
    :class="{
    'switch-sm' :size=='sm',
    'switch-md' :size=='md',
    'switch-lg' :size=='lg',
    checked:value
    }"
  >
    <span class="slider" :class="{round:!square, disabled: disabled}"></span>
  </label>
</template>
<script>
export default {
  name: "base-slider",
  props: {
    value: {
      type:  [ Boolean, Number ],
      description: "Slider value"
    },
    disabled: {
      type: Boolean,
      default: false,
      description: "Whether slider is disabled"
    },
    square: {
      type: Boolean,
      default: false,
      description: "Slider type (e.g primary, danger etc)"
    },
    size: {
      type: String,
      default: "",
      description: "Slider size (sm, lg)"
    }
  }
};
</script>
<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  &.checked .slider {
    background-color: #2196f3;
    &:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
    &.round {
      border-radius: 34px;
      &:before {
        border-radius: 50%;
      }
    }
  }
  &.switch-sm {
    width: 30px;
    height: 17px;
    &.checked .slider {
      &:before {
        -webkit-transform: translateX(13px);
        -ms-transform: translateX(13px);
        transform: translateX(13px);
      }
    }
    .slider {
      &:before {
        position: absolute;
        content: "";
        height: 13px;
        width: 13px;
        left: 2px;
        bottom: 2px;
      }
      &.round {
        border-radius: 17px;
      }
    }
  }
  &.switch-md {
    width: 45px;
    height: 25px;
    &.checked .slider {
      &:before {
        -webkit-transform: translateX(15px);
        -ms-transform: translateX(15px);
        transform: translateX(20px);
      }
    }
    .slider {
      &:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
      }
      &.round {
        border-radius: 25px;
      }
    }
  }
  &.switch-lg {
    width: 90px;
    height: 51px;
    &.checked .slider {
      &:before {
        -webkit-transform: translateX(39px);
        -ms-transform: translateX(39px);
        transform: translateX(39px);
      }
    }
    .slider {
      &:before {
        position: absolute;
        content: "";
        height: 39px;
        width: 39px;
        left: 6px;
        bottom: 6px;
      }
      &.round {
        border-radius: 51px;
      }
    }
  }
}
</style>

