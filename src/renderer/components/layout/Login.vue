g
<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/github.svg" />
                  Github
                </base-button>

                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/google.svg" />
                  Google
                </base-button>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                ></base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                ></base-input>
                <base-checkbox>Remember me</base-checkbox>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="signin">Sign In</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="#" class="text-light">
                <small>Create new account</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "landing-page",
  methods: {
    signin,
  },
};

function signin(e) {
  this.$router.push("/home/dashboard");
  // console.log(this);
  // let router = this.$router;
  // console.log(router);
  // this.$http({
  //   method: "POST",
  //   uri: "https://api.smarthome.lumi.com.vn/site/login",
  //   body: {
  //     email: "testhcv1.5@gmail.com",
  //     password: "lumivn274",
  //   },
  //   headers: {
  //     "X-Lumi-Api-Key": "98CPB8ITIRGHVO3OJ5QT",
  //   },
  //   json: true,
  // })
  //   .then((response) => {
  //     console.log(0, response);
  //     alert("success");
  //     router.push("/createHome");
  //     this.$store._mutations.DECREMENT_MAIN_COUNTER[0](
  //       this.$store.state.Counter
  //     );
  //   })
  //   .catch((error) => {
  //     alert("error");
  //     console.log(1, error);
  //   });
}
</script>

<style></style>
