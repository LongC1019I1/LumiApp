<template>
  <base-nav type="success" effect="dark" expand class="row" id="header">
    <div id="headerLogo" class="col-4 ml-3">
      <img src="static/img/brand/logo-lumi-white.png" alt="logo-lumi">
    </div>
    <div class="col-4 text-center">
      <h6 v-if="showPagename" class="m-0 text-white">
        <strong>{{$t(`homes.title.${$route.name}`)}}</strong>
      </h6>
    </div>

    <div class="col-4 header-user">
      <base-dropdown id="userInfo" tag="div" class="nav-item pull-right" position="right">
        <div slot="title" class="user-title text-overflow-hidden">
          <span class="front-title mr-2 text-overflow-hidden">{{username}}</span>
          <img class="avata" :src="avataUrl||'static/img/userDefault.png'">
        </div>
        <div class="media d-flex align-items-center dropdown-item">
          <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
            <img class="avata" :src="avataUrl||'static/img/userDefault.png'">
          </div>
          <div class="media-body ml-3">
            <div class="text-overflow-hidden">
              <h6 class="mb-md-1 text-black">{{email||' '}}</h6>
            </div>
            <div class="text-overflow-hidden">
              <h6 class="mb-md-1 text-black">{{phone||' '}}</h6>
            </div>
          </div>
        </div>
        <router-link v-if="$route.name!='listHome'" class="dropdown-item" :to="{name: 'listHome'}">
          <i class="mdi mdi-home"></i>
          <span>{{$t('header.text.listHome')}}</span>
        </router-link>
        <router-link class="dropdown-item" :to="{name: 'profile'}">
          <i class="mdi mdi-cog"></i>
          <span>{{$t('header.text.profile')}}</span>
        </router-link>
        <a class="dropdown-item logout" @click="logout">
          <i class="mdi mdi-logout"></i>
          <span>{{$t('header.text.logout')}}</span>
        </a>
      </base-dropdown>
      <notification/>
      <base-dropdown id="language" tag="div" class="nav-item pull-right" position="right">
        <span slot="title" class="language-image">
          <img class="flag" :src="`static/img/flag-${language}.png`">
        </span>
        <span class="dropdown-item first-el" @click="$store.commit('ContentManager/SET_LANG', 'VN')">
          <img class="flag" src="static/img/flag-VN.png">
          <span>Tiếng việt</span>
        </span>
        <span class="dropdown-item" @click="$store.commit('ContentManager/SET_LANG', 'GB')">
          <img class="flag" src="static/img/flag-GB.png">
          <span>English</span>
        </span>
      </base-dropdown>
    </div>
  </base-nav>
</template>

<script>
import Notification from "./Notification";
export default {
  name: "listHome-header",
  props: {
    showPagename: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Notification
  },
  data() {
    return {
      searchValue: ""
    };
  },
  computed: {
    username,
    phone,
    email,
    avataUrl,
    isListHomePage,
    language() {
      return $state.ContentManager.language || "VN";
    }
  },
  methods: {
    logout,
    search
  }
};

async function logout() {
  let confirm = await $alertify.confirm({
    title: this.$t("notify.notifyWarninglTitle"),
    text: this.$t("header.message.confirmLogout"),
    showCancelButton: true,
    confirmButtonText: this.$t("confirm"),
    cancelButtonText: this.$t("cancel")
  });
  if (confirm.isConfirmed) {
    let logoutResponse = await $dispatch($api.User.logout);
    if (logoutResponse && logoutResponse.success) {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("password");
      localStorage.removeItem("phone");
      localStorage.removeItem("email");
      sessionStorage.removeItem("access_token");
      restart();
      this.$router.push({ name: "account-login" });
    } else $alertify.error(logoutResponse.message);
  }
}
function search() {
  this.$emit("search", this.searchValue);
}

function isListHomePage() {
  return this.$route.name == "listHome";
}
function avataUrl() {
  return $state.Customer.customerData.avatar;
}
function username() {
  return $state.Customer.customerData.name;
}
function phone() {
  return $state.Customer.customerData.phone;
}
function email() {
  return $state.Customer.customerData.email;
}
function language() {
  return $state.I18n.lang;
}
</script>

<style lang="scss">
#header {
  padding: 0px;
  #headerLogo {
    img {
      height: 47px;
      margin: 5px 10px;
    }
  }
  .header-user {
    display: inline;
    padding-right: 4rem;
  }
}
</style>
