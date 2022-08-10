<template>
  <fragment>
    <base-button class="m" @click="$emit('addAccount')">
      <i slot="icon" class="mdi mdi-plus"></i>
      {{ this.$t('permission.add-account') }}
    </base-button>

    <table id="tableUser" class="table table-hover m-0">
      <thead>
      <tr>
        <th>{{ $t('permission.text.list-share') }}</th>
        <th>{{ $t('permission.text.user-type') }}</th>
        <th>{{ $t('permission.text.expired-time') }}</th>
        <th>{{ $t('permission.text.status') }}</th>
        <th>{{ $t('permission.text.option') }}</th>
      </tr>
      </thead>

      <tbody v-if="users.length > 0 ">
      <tr v-for="(user,index) in users" :key="index" :class="!user.enable? 'user-offline':''">
        <td class="td--name text-overflow-hidden">
          {{ user.email ? user.email : user.phone }}
        </td>
        <td> {{ getRoleUser(user) }}</td>
        <td>{{ getRoleUser(user) === $t('permission.role.user') ? '' : getDayMonthYear(user.expire_time) }}</td>
        <td>
          <base-slider
              @submit="showModalDelete = true; userCurrent.userid = user.userid; userCurrent.enable = user.enable"
              :disabled="!isAdmin"
              class="switch-md" :value="user.enable"/>
        </td>
        <td v-if="!isAdmin">
          <div class="option">
            <i class="fa fa-edit c-p"></i>
            <i class="fa fa-trash c-p"></i>
          </div>
        </td>

        <td v-else>
          <div class="option">
            <i class="fa fa-edit c-p" @click="$emit('accountEdit', user)"></i>
            <i class="fa fa-trash c-p"></i>
          </div>
        </td>
      </tr>
      </tbody>

      <tbody v-else>
      <tr>
        <td class="td--name text-overflow-hidden">
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      </tbody>

      <modal-delete
          :modalDelete="showModalDelete"
          @closeModal="showModalDelete = false"
          @changeStatus="changeStatusUser"
      />

    </table>
  </fragment>

</template>

<script>

import {getRoleUser, getDayMonthYear} from "../../../../../plugins/helper";
import ModalDelete from "../../../../base/Modal/ModalDelete";

export default {
  name: "AccountList",
  computed: {
    users,
    isAdmin
  },
  data() {
    return {
      showModalDelete: false,
      admin: 0,
      userCurrent: {
        userid: 0,
        enable: 0
      }
    }
  },
  methods: {
    getRoleUser,
    getDayMonthYear,
    changeStatusUser
  },

  watch: {
    isAdmin(isadmin) {
      console.log('isAdmin', isAdmin)
      this.admin = isadmin
    }
  },

  components: {
    ModalDelete
  },

}

function users() {
  return $state.HomeConfig.users
}

function changeStatusUser() {
  this.showModalDelete = false
  $dispatch('User/changeStatusUserPermission', {
    userid: this.userCurrent.userid,
    enable: this.userCurrent.enable === 1 ? 0 : 1
  })
}

function isAdmin() {
  return $state.Customer.customerData.admin
}
</script>

<style scoped>

</style>
