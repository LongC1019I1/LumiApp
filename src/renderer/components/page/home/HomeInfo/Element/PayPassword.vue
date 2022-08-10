<template>
  <span class="payPassword">
    <input
        ref="input"
        :aria-disabled="disable"
        v-model="val"
        type="password"
        :name="name"
        class="sixDigitPassword"
        @keyup="keydown"
        @contextmenu="() => false"
        @paste="() => false"
        @copy="() => false"
        @cut="() => false"
        @blur="blur"
        autocomplete="off"
        :maxlength="length"
        :minlength="length">
    <div
        @focus="focus"
        class="sixDigitPassword"
        :tabindex="tabindex">
      <i
          :key="i"
          :style=" index ===  val.length ? 'border: 1px solid white !important ': ''"
          v-for="(index, i) in length">
        <b v-show="index <= val.length"
           :style=" index ===  val.length ? 'top: 16px; left: 16px': ''"
        />
      </i>

    </div>
  </span>
</template>

<script>
export default {
  name: 'PayPassword',
  props: {
    onlyNumber: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 6
    },
    tabindex: {
      type: Number,
      default: 0
    },
    disable: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'payPassword'
    },
    id_backup: {
      type: String
    }
  },
  data() {
    return {
      status: '',
      val: '',
      step: 0,
      MODE: {
        FOCUS: 1,
        BLUR: 2,
        COMPLETE: 3
      }
    }
  },
  computed: {
    inputStyle() {
      return {
        width: `29px`,
        left: `${this.val.length * this.step}px`
      }
    }
  },
  watch: {
    val(val) {
      this.$emit('input', val)

      if (this.status === this.MODE.BLUR) {
        return
      }

      if (val.length === this.length) {
        this.status = this.MODE.COMPLETE
      } else {
        this.status = this.MODE.FOCUS
      }
    },
    value(value) {
      this.updateVal(value)
    }
  },
  mounted() {
    this.status = this.MODE.BLUR
    this.updateVal(this.value)
    this.step = (this.$el.offsetWidth - 2) / this.length
  },
  methods: {

    keydown(e) {

      console.log(this.val)
      if (this.val.length === 4) {
        if ( $state.HomeConfig.users.find(user => user.pin !== undefined && user.pin !== null  && user.pin_code !== undefined && user.pin_code !== null).pin === this.val) {
          console.log('mylog', $state.HomeConfig.users.find(user => user.pin !== undefined && user.pin !== null  && user.pin_code !== undefined && user.pin_code !== null ).pin)
          $dispatch('Home/restoreData', {backup_id: this.id_backup})
          $commit('Home/UPDATE_ID_RESTORE', this.id_backup)
          this.val = ''
          this.$emit('closeModal')
        } else {
          this.val = ''
        }

      }

      if (!this.onlyNumber) {
        return
      }

      const key = e.charCode || e.keyCode || 0

      if (!(
          key == 8 ||
          key == 9 ||
          key == 46 ||
          key == 110 ||
          key == 190 ||
          (key >= 35 && key <= 40) ||
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105)
      )) {
        e.preventDefault()
      }
    },
    updateVal(value) {
      if (this.val === value || value.length > this.length) {
        return
      }

      this.val = value
    },
    clear() {
      this.val = ''
      this.$emit('clear')
    },
    blur() {
      this.status = this.MODE.BLUR

      this.$emit('blur')
    },
    focus(e) {
      if (this.disable) {
        if (e) {
          e.preventDefault()
          e.stopPropagation()
        }
        return false
      }

      this.$refs.input.focus()

      if (this.val.length === this.length) {

        this.status = this.MODE.COMPLETE
      } else {
        this.status = this.MODE.FOCUS
      }

      this.$emit('focus')
    }
  }
}
</script>

<style>

</style>
