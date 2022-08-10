<template>
  <div class="RuleSence" :userRuleSence="userRuleSence">
    <div v-for="rule in RuleSence" :key="rule.ruleid"
         class="rs-element" :class="{'checked': (myRulesSencesCheck.includes(rule.ruleid) && !userRoleAdmin)}"
    @click="filterRule(rule.ruleid)"
    >
      <div>
        <i v-show="selected === 5" class="icon-sence" :class="'icon-' + getIconScene(rule.iconkey).icon">
        </i>
        {{ rule.name }}
      </div>

      <div :style=" userRoleAdmin? 'visibility:hidden': '' ">
        <i v-if="!myRulesSencesCheck.includes(rule.ruleid)" class="mdi mdi-checkbox-blank-circle-outline" @click=" checkAll = !checkAll"/>
        <i v-else class="mdi mdi-checkbox-marked-circle" @click=" checkAll = !checkAll"/>
      </div>
    </div>
  </div>
</template>

<script>
import {getIconScene} from "../../../../../plugins/helper";

export default {
  name: "DeviceList",
  props: {
    selected: {
      type: Number
    },
    userRoleAdmin: {
      type: Number
    },
    rulesSelect: {
      type: Array
    }
  },
  data() {
    return {
      checkAll: false,
      myRulesSencesCheck:[]
    }
  },
  computed: {
    RuleSence,
    userRuleSence
  },
  methods: {
    getIconScene,
    filterRule
  },
  components: {},
  watch:{
    userRuleSence(){
      this.$emit('ruleSence',this.myRulesSencesCheck)
    },
    rulesSelect(rules){
      console.log({rules})
      this.myRulesSencesCheck = rules
    }
  }
}

function filterRule(ruleid){
  if (this.myRulesSencesCheck.includes(ruleid)) {
   this.myRulesSencesCheck = this.myRulesSencesCheck.filter( myRule => myRule !== ruleid )
  }else {
    this.myRulesSencesCheck.push(ruleid)
  }

  this.$emit('ruleSence',this.myRulesSencesCheck)
  console.log('this.myRulesSencesCheck',this.myRulesSencesCheck)
}

function RuleSence() {

  if (this.selected === 4) {
    return $state.HomeConfig.rules.filter(rule => (rule.type === 0 || rule.type === 2) && !rule.security)
  }

  if (this.selected === 5) {
    return $state.HomeConfig.rules.filter(rule => (rule.type === 1) && !rule.security)
  }

}

function userRuleSence(){
  this.myRulesSencesCheck = $state.User.userPermissionSelect.rules && $state.User.userPermissionSelect.rules.slice() || []

}
</script>

<style scoped>

</style>
