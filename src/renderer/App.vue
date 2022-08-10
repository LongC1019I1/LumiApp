<template>
  <div id="app" class="night-theme">
    <!-- <router-view name="header"></router-view> -->
    <main class="h-100">
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view/>
      </fade-transition>
    </main>
    <!-- <router-view name="footer"></router-view> -->
    <fade-transition origin="center" mode="out-in" :duration="250">
      <div id="loader" class="pageload-overlay pageload-loading" v-if="isLoading">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
    </fade-transition>
  </div>
</template>

<script>
export default {
  name: "app-container",
  computed: {
    isLoading() {
      return $state.ContentManager.isLoading;
    }
  },
  beforeCreate() {
    $commit("ContentManager/SET_PAGE_LOADING", false);
    $commit("Socket/UPDATE_STATUS_CONNECT", 0);
    $commit("Socket/UPDATE_STATUS_JOINROOM", 0);
  },
  beforeDestroy(){
    restart()
  }
};
</script>

<style>
</style>
