<template>
  <card id="info" class="overflow-auto">

    <div slot="header">
      <span v-for="item in menu" :key="item.value" class="menu-item mr-4"
            :class="item.value === menuSelected? 'active' :''"
            :style=" !isAdmin && item.value !== 0 ? 'display:none !important':'' "
            @click="menuSelected = item.value; $emit('select',item.value)"
      >
        {{ item.name }}
      </span>
    </div>

    <account-list
        v-if="menuSelected === 0"
        @accountEdit="setAccount"
        @addAccount="addAccount"
    />

    <element-list
        :selected="menuSelected"
        v-else
    />

    <add-user
        :isShowModal="showUserPermission"
        @closeModal="showUserPermission=false"
        :haveAccount="account"
    />

  </card>
</template>

<script>
import AccountList from "./Element/AccountList";
import AddUser from "./Modal/AddUser";
import ElementList from "./Element/ElementList";

export default {
  name: "info",
  props:['isAdmin'],
  data() {
    return {
      showUserPermission: false,
      showModalDelete: false,
      menuSelected: 0,
      account: [],
      menu: [
        {
          "name": this.$t('permission.menu.share'),
          "value": 0
        },
        {
          "name": this.$t('permission.menu.device'),
          "value": 1
        },
        // {
        //   "name": this.$t('permission.menu.lighting'),
        //   "value": 2
        // },
        {
          "name": this.$t('permission.menu.ir'),
          "value": 3
        },
        {
          "name": this.$t('permission.menu.rules'),
          "value": 4
        },
        {
          "name": this.$t('permission.menu.sence'),
          "value": 5
        },
        // {
        //   "name": this.$t('permission.menu.hcl'),
        //   "value": 6
        // },
      ]
    }
  },

  components: {
    ElementList,
    AccountList,
    AddUser,
  },
  methods: {
    setAccount,
    addAccount
  }
}


function setAccount($event) {
  this.account = $event;
  this.showUserPermission = true
}

function addAccount() {
  this.account = '';
  this.showUserPermission = true
}


</script>

<style scoped>

</style>
