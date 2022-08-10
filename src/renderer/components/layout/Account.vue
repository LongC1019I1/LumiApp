<template>
  <section class="section section-shaped section-lg my-0 p-0" id="accountPage">
    <div id="backgroundImage" class="h-100">
      <img src="static/img/brand/background.jpeg" class="h-100">
    </div>
    <div id="mainContent" class="h-100 bg-blur account-input">
      <div class="container">
        <card type="secondary" body-classes="overflow-inherit" class="border-0 bg-transparent">
          <div class="mb-5">
            <div class="text-center text-muted mb-5">
              <img src="static/img/brand/logo-lumi.png" alt="logo-lumi" id="mainLogo">
            </div>
            <router-view/>
          </div>
          <div class="text-center">
            <strong>Copyright &copy;&nbsp;</strong>Lumi Life
            <strong>2020</strong>
          </div>
        </card>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "account-layout",
  methods: {}
};
</script>

<style lang ="scss">
#accountPage {
  .container {
    width: 612px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    & > div {
      justify-content: center;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  button {
    width: 100%;
  }
  #backgroundImage {
    position: fixed;
    width: 100%;

    img {
      width: 100%;
      object-fit: cover;
    }
  }
  #mainContent {
    position: fixed;
    width: 100%;

    #mainLogo {
      height: 100px;
    }
  }
}

@media (max-height: 800px) {
  #accountPage {
    .mb-5 {
      margin-bottom: 1.5rem !important;
    }

    .my-4 {
      margin-top: 1.2rem !important;
      margin-bottom: 1.2rem !important;
    }

    .mt-3 {
      margin-top: 0.5rem !important;
    }
    #mainContent {
      position: fixed;
      width: 100%;
      #mainLogo {
        height: 100px;
      }
      .form-group {
        margin-top: 2px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
