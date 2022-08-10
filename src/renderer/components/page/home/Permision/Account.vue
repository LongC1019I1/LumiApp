<template>
  <card id="menuList" header-classes="p-0">
    <div slot="header" class="card-header">

      <div class="users">
        <i class="fa fa-users mr-2"></i>
        <p>
          {{ $t('permission.users') }}
        </p>
      </div>
    </div>
    <div class="card-body m-0 p-0 overflow-auto">
      <div
          v-for="(user,index) in users"
          :key="index"
          :title="user.email"
          @click="userSelect = user.userid; $store.commit('User/UPDATE_USER_CURRENT_PERMISSION',{data:user})"
          :class="{'userSelect': userSelect === user.userid && select !== 0 }"
          class="user text-overflow-hidden mb-3">
        {{ user.email ? user.email : user.phone }} <br>
        {{ getRoleUser(user) }}
        {{ user.expire_time ? ' - ' + getDayMonthYear(user.expire_time) : '' }}
      </div>
    </div>
  </card>
</template>

<script>
import {getRoleUser, getDayMonthYear} from "../../../../plugins/helper";

export default {
  name: "account",
  props: {
    select: {
      type: Number
    }
  },
  data() {
    return {
      userSelect: ''
    }
  },
  computed: {
    users
  },
  methods: {
    getRoleUser,
    getDayMonthYear
  },
  mounted() {
    $commit('User/UPDATE_USER_CURRENT_PERMISSION', {data: this.users[0]})
    this.userSelect = $state.User.userPermissionSelect.userid
  }
}


function users() {
  return $state.HomeConfig.users
}
</script>

<style scoped>

</style>
