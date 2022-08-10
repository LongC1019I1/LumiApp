<template>
  <div id="homesPage" class="h-100">
    <Header @search="reloaddata"/>
    <div id="backgroundImage">
      <img src="static/img/brand/background.jpeg" class="h-100">
    </div>
    <fade-transition origin="center" mode="out-in" :duration="250">
      <router-view :searchValue="searchValue"/>
    </fade-transition>

  </div>
</template>

<script>
import Header from "../base/custom/Header";

export default {
  name: "homes",
  beforeCreate,
  components: {
    Header
  },
  data: function() {
    return {
      searchValue: ""
    };
  },
  computed: {
    listHome,
    connectStatus() {
      return $state.Socket.connectStatus;
    }
  },
  methods: {
    reloaddata
  }

};
//hook
function beforeCreate() {
  $dispatch($api.Customer.info);
  if ($state.Socket.connectStatus == 0)
    $dispatch($api.Socket.connect);
}

//method
function reloaddata(searchValue) {
  this.searchValue = searchValue;
}
//computed
function listHome() {
  return $getters["Home/getListHomeFilter"](this.searchValue);
}
</script>

<style lang="scss">
#backgroundImage {
    position: fixed;
    height: calc(100% - 57px);
    img {
        width: 100%;
        object-fit: cover;
    }
}
.home-element {
  height: 33%;
}
@media (max-height: 700px) {
  .home-element {
    height: 50%;
  }
}
.home-element:hover {
  cursor: pointer;
  opacity: 0.9;
  .home-image {
    opacity: 0.7;
  }
}
</style>
