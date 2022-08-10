<template>
  <component
    class="dropdown"
    :is="tag"
    :class="[{show: isOpen}, {'dropdown': direction === 'down'}, {'dropup': direction ==='up'}]"
    aria-haspopup="true"
    :aria-expanded="isOpen"
    @click="disabled?'':toggleDropDown()"
    v-click-outside="closeDropDown"
  >
    <slot name="title">
      <a class="dropdown-toggle nav-link" :class="{'caret': arrow}" data-toggle="dropdown">
        <span class="front-title">{{frontTitle}}</span>
        <i :class="icon"></i>
        <span class="no-icon">{{title}}</span>
      </a>
    </slot>
    <ul
      class="dropdown-menu"
      :class="[{'dropdown-menu-right': position === 'right'}, {show: isOpen}, menuClasses]"
    >
      <slot></slot>
    </ul>
  </component>
</template>
<script>
export default {
  name: "base-dropdown",
  props: {
    direction: {
      type: String,
      default: "down"
    },
    title: {
      type: String,
      description: "Dropdown title"
    },
    frontTitle: {
      type: String,
      description: "Dropdown title"
    },
    icon: {
      type: String,
      description: "Icon for dropdown title"
    },
    position: {
      type: String,
      description: "Position of dropdown menu (e.g right|left)"
    },
    menuClasses: {
      type: [String, Object],
      description: "Dropdown menu classes"
    },
    arrow: {
      type: Boolean,
      description: "Whether dropdown arrow should be show"
    },
    disabled: {
      type: Boolean,
      default:false, 
      description: "Whether dropdown arrow should be show"
    },
    tag: {
      type: String,
      default: "li",
      description: "Dropdown html tag (e.g div, li etc)"
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
      this.$emit("change", this.isOpen);
    },
    closeDropDown() {
      this.isOpen = false;
      this.$emit("change", this.isOpen);
    }
  }
};
</script>
<style scoped>
.dropdown {
  list-style-type: none;
}

.dropdown .dropdown-toggle {
  cursor: pointer;
}
.dropdown-menu{
  top: 82%
}
.front-title{
  position: relative;
  font-size: 1rem;
  top: -.7rem;
}
</style>
