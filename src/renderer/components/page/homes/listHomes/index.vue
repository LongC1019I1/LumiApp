<template>
  <div id="pageContent" class="bg-blur2">
    <div class="row m-3 listhome-search">
      <div v-if="isHasHome" class="col-md-8 col-lg-3">
        <input
          class="form-control"
          type="search"
          :placeholder="$t('homes.text.homeSearchPlacehoder')"
          aria-label="Search"
          style=" width: 100%; min-width: 300px"
          v-model="searchValue"
          maxlength="20"
        >
        <i class="search-icon mdi mdi-magnify"></i>
      </div>
      <div class="col">
        <router-link :to="{name:'addHome'}" class="addhome-btn pull-right p-2">
          {{ $t('homes.button.addHome') }}
          <i class="mdi mdi-plus"></i>
        </router-link>
      </div>
    </div>
    <div v-if="isHasHome" class="listhome row m-3 pb-2">
      <home-info
        @modalConfirmPassword="showModal($event, homeInfo)"
        v-for="homeInfo in listHome"
        :key="homeInfo.id"
        :homeInfo="homeInfo"
      ></home-info>
    </div>
    <div v-else class="no-home-screen">
      <div class="text-center">
        <h5>{{ $t('homes.text.noHomeAddnewText1') }}</h5>
        <h5>{{ $t('homes.text.noHomeAddnewText2') }}</h5>
      </div>
    </div>

    <div id="deleteHome">
      <modal-delete-home
        :modal="showModalDelete"
        :homeInfo="homeInfo"
        @closeModal="showModalDelete = false"
        @showModalVerify="showModalVerify=true"
      />

      <modal-verify-code
        :modalVerify="showModalVerify"
        :homeInfo="homeInfo"
        @closeModal="showModalVerify = false"
      />
    </div>
  </div>
</template>

<script>
import HomeInfo from "./HomeInfo";
import { md5 } from "../../account/function";
import ModalDeleteHome from "./modal/ModalDeleteHome";
import ModalVerifyCode from "./modal/ModalVerifyCode";

export default {
  name: "ListHomes",
  data() {
    return {
      searchValue: "",
      showModalDelete: false,
      homeInfo: {},
      showModalVerify: false
    };
  },
  components: {
    ModalVerifyCode,
    HomeInfo,
    ModalDeleteHome
  },
  methods: {
    showModal
  },
  mounted() {
    $dispatch($api.Home.getListHomeByUserID);
    if ($state.Home.currentHome.id) {
      $commit("Home/UPDATE_CURRENT_HOME", false);
      $dispatch($api.Socket.leavingRoom, [$state.Home.currentHome.id]);
    }
  },
  computed: {
    isHasHome: function() {
      return $state.Home.listHome.length;
    },
    listHome
  }
};

//computed
function listHome() {
  return $getters["Home/getListHomeFilter"](this.searchValue);
}

//method

async function showModal($event, homeInfo) {
  let flag = true;

  await homeInfo.hcs.forEach(hc => {
    if (hc.mac !== "") {
      $alertify.confirmHome({
        text: this.$t("homes.deleteHome.deleteHcBefore"),
        confirm: "OK"
      });
      //Xoa va tro lai modal va password rong
      flag = false;
    }
  });

  if (flag == true) {
    this.showModalDelete = true;
    this.homeInfo = $event;
  }
}
</script>
<style lang="scss">
.listhome-search {
  position: relative;

  input {
    padding-left: 3rem;

    &:focus {
      color: white;
    }
  }

  input,
  .addhome-btn {
    height: 2.5rem;
    color: white;
    background-color: #73cca6;
    border: none;
    border-radius: 0.7rem;

    &::placeholder {
      color: white;
    }

    &:-ms-input-placeholder {
      color: white;
    }

    &::-ms-input-placeholder {
      color: white;
    }
  }

  i.search-icon {
    color: white;
    font-size: 1.7rem;
    position: absolute;
    left: 1.5rem;
    top: 0px;
    cursor: pointer;
  }
}

.listhome {
  height: calc(100% - 3.5rem);
  align-content: start;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}

.no-home-screen {
  display: grid;
  height: calc(100% - 3.5rem);
  align-items: center;
}

#pageContent {
  #deleteHome {
    .input-password {
      .modal-content {
        width: 435px !important;
      }

      .modal-body {
        .input-group {
          height: 38px;
          width: 300px;
          margin: auto;
          border-radius: 9px !important;
        }

        .input-group-text {
          width: 40px;
          border-radius: 50%;

          .mdi-lock {
            color: white;
            font-size: 18px;
            position: relative;
            top: -3px;
            border-radius: 50%;
          }

          .mdi-key {
            color: white;
            font-size: 18px;
            position: relative;
            top: -3px;
            border-radius: 50%;
          }

          .mdi-close {
            display: none;
          }
        }

        input {
          height: 35px;
        }

        .password-error {
          text-align: center;
          font-size: 14px;
          position: relative;
          left: 22px;
        }

        .password-invalid {
          display: table-row;
        }
      }

      .show-remove-pass {
        .mdi-close {
          color: white !important;
          font-size: 18px;
          position: relative;
          top: -3px;
          border-radius: 50%;
          display: block !important;
        }
      }
    }
  }
}
</style>
