<template>
  <SlideYUpTransition :duration="animationDuration">
    <div
      class="modal"
      @click.self="backdropClick?closeModal():''"
      :class="[{'show d-block': show,
      'd-none': !show,
      'modal-mini': type === 'mini', 'fade':isFade}]"
      v-show="show"
      tabindex="-1"
      role="dialog"
      :aria-hidden="!show"
    >
      <div
        class="modal-dialog"
        :class="[{'modal-notice': type === 'notice',
        'modal-dialog-centered': centered}, modalClasses]"
      >
        <div
          class="modal-content"
          :class="[gradient ? `bg-gradient-${gradient}` : '',modalContentClasses]"
        >
          <div class="modal-header" :class="[headerClasses]" v-if="$slots.header">
            <slot name="header"></slot>
            <slot name="close-button">
              <button
                type="button"
                class="close"
                v-if="showClose"
                @click="closeModal"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span :aria-hidden="!show">×</span>
              </button>
            </slot>
          </div>

          <div class="modal-body overflow-y-auto" :class="bodyClasses" v-scroll="scrollBody">
            <slot></slot>
          </div>

          <div class="modal-footer" :class="footerClasses" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </SlideYUpTransition>
</template>
<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "modal",
  components: {
    SlideYUpTransition
  },
  props: {
    backdropClick: {
      type: Boolean,
      default: true
    },
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
    isFade: {
      type: Boolean,
      default: true
    },
    centered: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "",
      validator(value) {
        let acceptedValues = ["", "notice", "mini"];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: 'Modal type (notice|mini|"") '
    },
    modalClasses: {
      type: [Object, String],
      description: "Modal dialog css classes"
    },
    modalContentClasses: {
      type: [Object, String],
      description: "Modal dialog content css classes"
    },
    gradient: {
      type: String,
      description: "Modal gradient type (danger, primary etc)"
    },
    headerClasses: {
      type: [Object, String],
      description: "Modal Header css classes"
    },
    bodyClasses: {
      type: [Object, String],
      description: "Modal Body css classes"
    },
    footerClasses: {
      type: [Object, String],
      description: "Modal Footer css classes"
    },
    animationDuration: {
      type: Number,
      default: 500,
      description: "Modal transition duration"
    }
  },
  methods: {
    closeModal() {
      // this.$emit("update:show", false);
      this.$emit("close");
    },
    scrollBody(event, body) {
      this.$emit("scrollBody", event, body);
    }
  },
  watch: {
    show(val) {
      let documentClasses = document.body.classList;
      if (val) {
        documentClasses.add("modal-open");
      } else {
        documentClasses.remove("modal-open");
      }
    }
  }
};
</script>
<style lang="scss">
.modal {
  .modal-content {
    border-radius: 1rem;
    .modal-header {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      padding: 0.5rem;
      border-bottom: none;
      .close > span:not(.sr-only) {
        font-size: 2rem;
        color: aliceblue;
      }
      background-color: gray;
    }
    .modal-body {
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
  }
  .modal-width-md {
    .modal-content {
      min-width: 600px;
      max-width: 600px;
    }
  }
  .modal-full-height {
    .modal-content {
      top: 1.8rem;
      border-radius: 1rem;
      height: calc(100vh - 57px - 2rem);
      max-height: calc(100vh - 57px - 2rem);
      .modal-header {
        i {
          font-size: 1.2rem;
        }
      }
      .modal-body {
        height: 100%;
        max-height: 100%;
      }
    }
  }
  .modal-input {
    .modal-body {
      padding: 1rem 3rem;
      input {
        border-radius: 0.5rem;
      }
    }
  }
}
</style>
