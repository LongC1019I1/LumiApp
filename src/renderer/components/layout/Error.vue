<template>
  <div>
    <h1>404 error notfound</h1>
    <router-link to="/">go Home</router-link>
    <br>
    <a @click="goBack">goBack</a>
  </div>
</template>

<script>
export default {
  name: "landing-page",
  methods: {
    goBack,
  },
};

function goBack(e) {
  this.$router.back()
}
</script>

<style></style>
