<template>
  <div id="pageContent" class="profile bg-blur2 lumi-input">
    <div class="row h-100 ml-0 mr-0">
      <sidebar-menu :menu="menu" relative hideToggle showChild>
        <span slot="dropdown-icon"></span>
      </sidebar-menu>
      <div class="col pr-0 overflow-y-auto pt-3 pr-3">
        <div class="goback-btn pull-right c-p" @click="$router.push({name:'listHome'})">
          <i class="mdi mdi-close"></i>
          <span class="tooltip">{{$t('profile.text.exitSetting')}}</span>
        </div>
        <router-view ref="children"/>
      </div>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
export default {
  name: "addHome",
  data() {
    return {
      menu: [
        {
          title: this.$t("profile.menu.userSetting"),
          icon: "mdi mdi-cog",
          child: [
            {
              title: this.$t("profile.menu.userInfo"),
              href: { name: "profile-userInfo" },
              icon: "mdi mdi-information"
            },
            {
              title: this.$t("profile.menu.changePassword"),
              href: { name: "profile-changePassword" },
              icon: "mdi mdi-lock"
            }
            // {
            //   title: this.$t("profile.menu.language"),
            //   href: { name: "profile-language" },
            //   icon: "mdi mdi-web"
            // }
          ]
        }
      ]
    };
  },
  components: {
    SidebarMenu
  },
  methods: { submit, cancel }
};
//cycle-life

function submit() {
  this.$refs.children.submit();
}
function cancel() {
  this.$refs.children.cancel();
}
</script>

<style lang="scss">
.profile {
  .sidebar {
    max-width: 250px !important;
  }
  .goback-btn {
    position: fixed;
    right: 1.5rem;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.5rem;
    border-radius: 50%;
    .tooltip {
      display: none;
      opacity: 1;
      width: max-content;
      top: 100%;
      right: 50%;
      border-radius:1rem;
      padding: 0 .5rem;
    }
    &:hover {
      .tooltip {
        display: block;
      }
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .v-sidebar-menu.vsm_expanded {
    margin-top: 1rem;
    height: calc(100% - 2rem);
    max-width: 250px !important;
    background-color: white;
    // border-top-right-radius: 1rem;
    // border-bottom-right-radius: 1rem;
    .vsm--item {
      .vsm--link_level-1 {
        i.vsm--icon {
          background-color: transparent;
        }
        &.mac-name {
          padding-left: 1rem;
        }
        font-size: 1.2rem;
        font-weight: bold;
        background: transparent;
        &:focus {
          outline: none;
        }
        box-shadow: none;
      }
      .vsm--link.vsm--link_level-2 {
        margin: 0.5rem 1.5rem;
        border-radius: 1rem;
        padding: 0rem 0.5rem;
        &.vsm--link_active {
          outline: none;
        }
        &:active {
          border: none;
          outline: none;
        }
      }
    }
    .vsm--dropdown {
      .vsm--list {
        padding: 0px;
        background: transparent;
      }
    }
    .vsm--link_exact-active {
      font-weight: unset !important;
    }
  }
}
</style>
