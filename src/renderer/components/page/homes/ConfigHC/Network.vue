<template>
  <div class="w-50 mh-100">
    <span>{{ $t("configHC.text.networkMode") }}</span>
    <v-select
      :options="[
        {
          label: $t('configHC.text.networkMode_LAN'),
          value: 'lan',
        },
        { label: $t('configHC.text.networkMode_wifi'), value: 'wifi' },
      ]"
      :reduce="(label) => label.value"
      v-model="network_interface"
      label="label"
      :clearable="false"
      :searchable="false"
      @input="resetWifi"
    ></v-select>
    <div v-if="network_interface == 'wifi'" class="wifi-config">
      <h5 class="mt-4">
        <strong>{{ $t("configHC.text.accessPoint") }}</strong>
      </h5>
      <h6>{{ $t("configHC.text.detectedWifiNetwork") }}</h6>
      <v-select
        :class="{ 'input-error': wifiError }"
        :options="wifiList"
        v-model="wifi"
        label="name"
        :placeholder="$t('configHC.text.chooseWifi')"
        :clearable="false"
        :searchable="false"
        @input="wifiError = ''"
      >
        <template #option="{ name, quality }">
          <h6 class="w-100">
            <span>{{ name }}</span>
            <span class="pull-right">{{ quality ? quality + "%" : "" }}</span>
          </h6>
        </template>
      </v-select>
      <span class="text-error">{{ wifiError }}</span>
      <div class="pb-2">
        <base-button @click="resetWifi" size="sm" type="primary">{{
          $t("configHC.button.resetWifi")
        }}</base-button>
      </div>
      <h6>{{ $t("configHC.text.password") }}</h6>
      <base-input
        inputID="password"
        v-model="configData.password"
        :type="isShowPassword ? 'text' : 'password'"
        :addon-right-icon="isShowPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
        @rightIconClick="isShowPassword = !isShowPassword"
        :placeholder="$t('configHC.text.passwordWifi')"
        class="mt-2 mb-0"
        :class="{ 'input-error': passwordError }"
        @input="passwordError = ''"
      />
      <span class="text-error">&nbsp;{{ passwordError }}</span>
    </div>
    <div v-if="network_interface == 'lan'" class="ap-config">
      <h5 class="mt-4">
        <strong>{{ $t("configHC.text.APSetting") }}</strong>
      </h5>
      <h6>{{ $t("configHC.text.SSID") }}</h6>
      <base-input
        inputID="password"
        v-model="configData.ap.ssid"
        type="text"
        placeholder="---"
        class="mt-2 mb-0"
        :class="{ 'input-error': wifiError }"
        @input="wifiError = ''"
      />
      <span class="text-error">&nbsp;{{ wifiError }}</span>
      <h6>{{ $t("configHC.text.password") }}</h6>
      <base-input
        inputID="password"
        v-model="configData.ap.password"
        :type="isShowPassword ? 'text' : 'password'"
        :addon-right-icon="isShowPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
        @rightIconClick="isShowPassword = !isShowPassword"
        placeholder="---"
        class="mt-2 mb-0"
        :class="{ 'input-error': passwordError }"
        @input="passwordError = ''"
      />
      <span class="text-error">&nbsp;{{ passwordError }}</span>
    </div>
    <h5>
      <strong>{{ $t("configHC.text.WAN") }}</strong>
    </h5>
    <span>{{ $t("configHC.text.IPMode") }}</span>
    <v-select
      class="mt-2"
      :options="[
        {
          label: 'DHCP',
          value: 0,
        },
        { label: 'Static', value: 1 },
      ]"
      :reduce="(label) => label.value"
      v-model="configData.network_mode"
      label="label"
      :clearable="false"
      :searchable="false"
    ></v-select>
    <div v-if="configData.network_mode">
      <h6>{{ $t("configHC.text.IPAddress") }}</h6>
      <base-input
        inputID="ip"
        v-model="configData.static_info.ip"
        class="mt-2 mb-0"
        :class="{ 'input-error': IPAddressError }"
        placeholder="0.0.0.0"
        @keyup="IPAddressError = ''"
      />
      <span class="text-error">&nbsp;{{ IPAddressError }}</span>
      <h6>{{ $t("configHC.text.netmask") }}</h6>
      <base-input
        inputID="netmask"
        v-model="configData.static_info.netmask"
        class="mt-2 mb-0"
        :class="{ 'input-error': netmaskError }"
        placeholder="0.0.0.0"
        @keyup="netmaskError = ''"
      />
      <span class="text-error">&nbsp;{{ netmaskError }}</span>
      <h6>{{ $t("configHC.text.gateway") }}</h6>
      <base-input
        inputID="gateway"
        v-model="configData.static_info.gateway"
        class="mt-2 mb-0"
        :class="{ 'input-error': gatewayError }"
        placeholder="0.0.0.0"
        @keyup="gatewayError = ''"
      />
      <span class="text-error">&nbsp;{{ gatewayError }}</span>
      <h6>{{ $t("configHC.text.DNS") }}</h6>
      <base-input
        inputID="DNS"
        v-model="configData.static_info.dns"
        class="mt-2 mb-0"
        :class="{ 'input-error': DNSError }"
        placeholder="0.0.0.0"
        @keyup="DNSError = ''"
      />
      <span class="text-error">&nbsp;{{ DNSError }}</span>
    </div>
    <div class="text-center">
      <base-button size="sm" type="primary" class="ml-2" @click="submit">{{
        $t("save")
      }}</base-button>
      <base-button size="sm" type="secondary" @click="cancel">{{
        $t("cancel")
      }}</base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "configHC-network",
  props: ["hcData"],
  data() {
    return {
      wifiList: [],
      wifi: "",
      wifiError: "",
      passwordError: "",
      IPAddressError: "",
      gatewayError: "",
      DNSError: "",
      netmaskError: "",
      network_interface: this.hcData.network.network_interface || "lan",
      isShowPassword: false,
      configData: {
        ssid: "",
        password: "",
        ap: {
          ssid:
            this.hcData.network && this.hcData.network.ap
              ? this.hcData.network.ap.ssid
              : "",
          password:
            this.hcData.network && this.hcData.network.ap
              ? this.hcData.network.ap.password
              : "",
        },
        is_new: false,
        network_mode: this.hcData.network.network_mode || 0,
        static_info: {
          ip: this.hcData.network.ip || "",
          gateway: this.hcData.network.gateway || "",
          netmask: this.hcData.network.netmask || "",
          dns: this.hcData.network.dns || "",
        },
      },
    };
  },
  methods: {
    submit,
    cancel: resetData,
    resetWifi,
  },
  watch: {
    wifi() {
      if (this.wifi) {
        this.configData.ssid = this.wifi.name;
        this.configData.is_new = this.wifi.password == 0;
      }
    },
  },
  mounted: resetWifi,
};
//cycle-life
async function resetWifi() {
  if (this.network_interface == "wifi") {
    let wifiList = await $dispatch($api.ConfigHC.getWifiList);
    if (wifiList && wifiList.success) this.wifiList = wifiList.data;
  }
}
//methods
function resetData() {
  (this.wifiError = ""),
    (this.passwordError = ""),
    (this.IPAddressError = ""),
    (this.gatewayError = ""),
    (this.DNSError = ""),
    (this.netmaskError = ""),
    (this.configData.ssid = "");
  this.configData.password = "";
  this.configData.ap.ssid =
    this.hcData.network && this.hcData.network.ap
      ? this.hcData.network.ap.ssid
      : "";
  this.configData.ap.password =
    this.hcData.network && this.hcData.network.ap
      ? this.hcData.network.ap.password
      : "";
  this.configData.is_new = false;
  // this.configData.network_mode = this.hcData.network.network_mode;
  this.configData.static_info.ip = this.hcData.network.ip || "";
  this.configData.static_info.gateway = this.hcData.network.gateway || "";
  this.configData.static_info.netmask = this.hcData.network.netmask || "";
  this.configData.static_info.dns = this.hcData.network.dns || "";
}

async function submit() {
  let ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (this.network_interface == "lan") {
    if (!this.configData.ap.ssid)
      this.wifiError = this.$t("configHC.message.enterYourWifi");
    if (!this.configData.ap.password)
      this.passwordError = this.$t("configHC.message.enterYourPassword");
    else if (this.configData.ap.password.length < 8)
      this.passwordError = this.$t("configHC.message.passwordTooShort");
  } else if (this.network_interface == "wifi") {
    if (!this.configData.ssid)
      this.wifiError = this.$t("configHC.message.chooseYourWifi");
    if (!this.configData.password)
      this.passwordError = this.$t("configHC.message.enterYourPassword");
  }
  if (this.configData.network_mode == 1) {
    if (!this.configData.static_info.ip)
      this.IPAddressError = this.$t("configHC.message.enterYourIPAddress");
    else if (!ipRegex.test(this.configData.static_info.ip))
      this.IPAddressError = this.$t("configHC.message.IPAddressInvalid");
    if (!this.configData.static_info.gateway)
      this.gatewayError = this.$t("configHC.message.enterYourGateway");
    else if (!ipRegex.test(this.configData.static_info.gateway))
      this.gatewayError = this.$t("configHC.message.gatewayInvalid");
    if (!this.configData.static_info.dns)
      this.DNSError = this.$t("configHC.message.enterYourDNS");
    else if (!ipRegex.test(this.configData.static_info.dns))
      this.DNSError = this.$t("configHC.message.DNSInvalid");
    if (!this.configData.static_info.netmask)
      this.netmaskError = this.$t("configHC.message.enterYourNetnask");
    else if (!ipRegex.test(this.configData.static_info.netmask))
      this.netmaskError = this.$t("configHC.message.netmaskInvalid");
  }
  if (this.wifiError) {
    return;
  }
  if (this.passwordError) {
    document.getElementById("password").focus();
    return;
  }
  if (this.IPAddressError) {
    document.getElementById("ip").focus();
    return;
  }
  if (this.gatewayError) {
    document.getElementById("gateway").focus();
    return;
  }
  if (this.DNSError) {
    document.getElementById("DNS").focus();
    return;
  }
  if (this.netmaskError) {
    document.getElementById("netmask").focus();
    return;
  }
  let configResponse;
  if (this.network_interface == "lan")
    configResponse = await $dispatch($api.ConfigHC.configLAN, this.configData);
  else if (this.network_interface == "wifi")
    configResponse = await $dispatch($api.ConfigHC.configWifi, this.configData);
  if (!(configResponse && configResponse.success)) {
    return;
  }
  if (this.network_interface == "lan")
    await $alertify.confirm({
      html: this.$t("configHC.message.configLanSuccess"),
    });
  else if (this.network_interface == "wifi")
    await $alertify.confirm({
      html: this.$t("configHC.message.configWifiSuccess", {
        wifi: this.configData.ssid,
      }),
    });
  this.$emit("restartHC", true);
  setTimeout(() => {
    let limitCheck = 0;
    let checkingHCNetwork = setInterval(async () => {
      if (limitCheck++ == 50) {
        clearInterval(checkingHCNetwork);
        await $alertify.confirm({
          html: this.$t("configHC.message.notConnectHC"),
          showCancelButton: false,
        });
        this.$router.push({ name: "listHome" });
      }
      let checkHCNetworkResponse = await $dispatch(
        "Mac/checkHCNetwork",
        configResponse.data
      );
      if (
        checkHCNetworkResponse &&
        checkHCNetworkResponse.success &&
        checkHCNetworkResponse.data.connected_internet
      ) {
        clearInterval(checkingHCNetwork);
        if (this.$route.query.isAddHCToHome == true) {
          let addHCToHomeResponse = await $dispatch($api.Mac.addHCToHome, {
            mac: configResponse.data.authorized_code,
            home_id: this.$route.params.homeID,
            network_session_config: configResponse.data.network_session_config,
          });
          if (addHCToHomeResponse && addHCToHomeResponse.success) {
            await $alertify.confirm({
              title: this.$t("notify.notifyDefautlTitle"),
              text: this.$t("configHC.message.addHCToHomeSuccess"),
            });
            this.$router.push({ name: "listHome" });
            return;
          } else {
            await $alertify.confirm({
              text: addHCToHomeResponse.message,
            });
            this.$router.push({ name: "listHome" });
            return;
          }
        }
        await $alertify.confirm({
          text: this.$t("configHC.message.HCConnectInternetSuccess"),
          showCancelButton: false,
        });
        if ($state.ConfigHC.currentHcMac)
          $router.push({
            name: "home-controll",
            params: {
              homeID: $router.currentRoute.params.homeID,
            },
          });
        else
          $router.push({
            name: "listHome",
          });
      }
    }, 5000);
  }, 30000);
}
</script>

<style lang="scss">
</style>
