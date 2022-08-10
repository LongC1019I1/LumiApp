<template>
  <div class="mr-3 pt-5">
    <div role="form">
      <!-- country -->
      <div class="selectCountryBox">
        <span class="country-label">&nbsp;{{$t('profile.text.language')}}&nbsp;</span>
        <vue-tel-input
          id="selectCounty"
          enabledCountryCode
          wrapperClasses="form-group input-group input-group-alternative"
          inputClasses="form-control"
          :defaultCountry="language"
          :dropdownOptions="{disabledDialCode: true}"
          :onlyCountries="['vn', 'gb']"
          :placeholder="$t('profile.text.language')"
          @country-changed="selectCountry"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "configHC-wifi",
  data() {
    return {
      language: $state.ContentManager.language || 'VN'
    };
  },
  methods: {
    selectCountry,
    submit,
  },
};

//methods
function submit() {
  $commit("ContentManager/SET_LANG", this.language)
}

function selectCountry(e) {
  this.language = e.iso2;
  let keyCode = document.getElementsByClassName("vti__country-code")[0];
  keyCode.innerHTML = ` ${e.name}`;
}
</script>

<style lang="scss">
</style>
