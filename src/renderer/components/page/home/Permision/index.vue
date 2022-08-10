<template>
  <div class="main-layout" id="permission" :class="!isAdmin? 'not-admin':''">
    <div class="menu-box">
      <account
          :select="select"
      />
    </div>

    <div class="info-box">
      <info-permission
          @select="select = $event"
          :isAdmin="isAdmin"
      />
    </div>
  </div>
</template>

<script>
import account from "./Account";
import infoPermission from './Info'

export default {
  name: "index",
  data() {
    return {
      select: 0
    }
  },
  components: {
    account,
    infoPermission
  },
  computed: {
    isAdmin
  },
  created() {
    $commit('Customer/CUSTOMER_IS_ADMIN')
  }
}

function isAdmin() {

  return $state.Customer.customerData.admin
}
</script>

<style scoped>

</style>
