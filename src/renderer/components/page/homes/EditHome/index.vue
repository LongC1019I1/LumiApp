<template>
  <div id="pageContent" class="bg-blur lumi-input">
    <div class="row m-0 h-100">
      <div class="col-7 h-100 w-100 p-2">
        <card style="position: relative">
          <gmap-map
              ref="map"
              :center="center"
              :options="googlemapOptions"
              :draggable="true"
              @dragend="updateCenterWhenDrag"
              :clickable="true"
              @click="updateCoordinates"
              class="h-100"
          >
            <gmap-marker
                :position="markers"
                :icon="{ url: require('../../../../../../static/img/icons/common/home.png')}"
            ></gmap-marker>
          </gmap-map>

          <!--          <i id="iconHome" class="mdi mdi-home"></i>-->
          <i id="crosshairs" @click="locatorButtonPressed" class="mdi mdi-crosshairs-gps"></i>

          <div
              id="nearAddress"
              class="pb-1"
              :style="!showNearAddres? 'height:250px': 'height:35px'"
          >
            <div
                class="p-1"
                id="showNearAddress"
                slot="title"
                @click="showNearAddres = !showNearAddres "
            >{{ $t('homes.text.showNearAddress') }}
            </div>
            <div id="listNearHome" class="pb-2">
              <p
                  class="m-1 p-2"
                  v-for="(address, index) in nearAddress"
                  :key="index"
                  @click="getNearAddress(address.geometry.location.lat, address.geometry.location.lng)"
                  href="#"
              >
                <i class="fa fa-map-marker"></i>
                {{ address.name }}
              </p>
            </div>
          </div>
        </card>
      </div>
      <div class="col-5 m-0 h-100 pb-2" id="box-right">
        <div class="saveOrCancel mt-2 col-12">
          <router-link style="color: white" to="/Homes">
            <div size="sm" class="bg-secondary button ml-3">{{ $t('cancel') }}</div>
          </router-link>

          <div size="sm" class="bg-primary button" @click="editHome">{{ $t('save') }}</div>
        </div>

        <div v-for="(hc,index) in macHc" :key="index" class="col-12 mb-3">
          <p>Mac Hc</p>
          <input
              type="text"
              class="form-control"
              v-model="macHc"
              style="color: gray"
              disabled
              aria-describedby="emailHelp"
              :placeholder="$t('homes.text.inputHomeName')"
          >
        </div>

        <div class="col-12 mb-3" id="homeName">
          <p>{{ $t('homes.text.homeName') }}</p>
          <input
              type="text"
              class="form-control"
              v-model="homeName"
              :class="{'input-error':!isNameValid}"
              aria-describedby="emailHelp"
              @input="checkNameInput"
              @keyup.enter="editHome"
              :placeholder="$t('homes.text.inputHomeName')"
          >
          <span v-show="inputNameError" class="text-error">{{ inputNameError }}</span>
        </div>

        <div class="col-12 mb-3" id="domainName">
          <p>{{ $t('homes.text.domainName') }}</p>
          <input
              type="text"
              class="form-control"
              id="domain"
              @input="checkDomainInput"
              :class="{'input-error':!isDomainValid}"
              :disabled="!isHaveDomain"
              v-model="domain"
              @keyup.enter="editHome"
              aria-describedby="emailHelp"
              :placeholder="$t('homes.text.inputDomainName')"
          >
          <span class="text-error" v-show="inputDomainError">{{ inputDomainError }}</span>
        </div>

        <div class="col-12 mb-3" id="address" style="position: relative">
          <p>{{ $t('homes.text.address') }}</p>

          <i id="marker" class="fa fa-map-marker" @click="locatorButtonPressed"></i>
          <gmap-autocomplete
              class="form-control"
              :value="address"
              :class="{'input-error':!isAddressValid}"
              :options="{componentRestrictions: {country: 'vn'}}"
              :placeholder="$t('homes.text.inputAddress') "
              ref="autocomplete"
              @place_changed="setAddress"
              style="padding-left: 5%"
          ></gmap-autocomplete>

          <p class="text-error" v-show="inputAddressError">{{ inputAddressError }}</p>
        </div>

        <div class="col-12" id="image" style="position: relative">
          <p>{{ $t('homes.text.inputImage') }}</p>

          <div class="image-upload">
            <label for="file-input">
              <i class="mdi mdi-camera"></i>
            </label>

            <input
                id="file-input"
                accept="image/*"
                ref="file"
                v-on:change="uploadImage"
                type="file"
            >
          </div>

          <img
              v-if="imageError == 'error' "
              src="static/img/icons/common/noimage.png"
              class="w-100"
              height="235px"
              style="border-radius: 15px;  object-fit: cover"
          >

          <img
              v-else-if="image == '' "
              src="static/img/homeDefault.jpg"
              class="w-100"
              height="235px"
              style="border-radius: 15px; object-fit: cover"
          >

          <img
              v-else
              :src="image"
              class="w-100"
              @error="imageLoadError"
              height="235px"
              style="border-radius: 15px; object-fit: cover"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editHome",
  props: ["homeInfo"],
  data() {
    return {
      homeName: "",
      domain: "",
      isImgChange: false,
      macHc: [],
      address: "",
      image: "",
      imageError: "",
      inputNameError: "",
      isNameValid: true,
      inputDomainError: "",
      isDomainValid: true,
      inputAddressError: "",
      isAddressValid: true,
      showNearAddres: false,
      file: "",
      isHaveDomain: true,
      googlemapOptions: {
        zoom: 16,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      },
      //Map
      showMap: false,
      center: {lat: 21.028511, lng: 105.804817},
      markers: {lat: 21.028511, lng: 105.804817},
      myplace: {lat: 21.028511, lng: 105.804817},
      nearAddress: [],
      selectedAddress: null,
      coordinates: null
    };
  },

  mounted() {
    this.geolocate();
  },
  methods: {
    editHome,
    checkNameInput,
    checkDomainInput,
    locatorButtonPressed,
    getAddressFrom,
    getNearBySearch,
    updateCoordinates,
    updateCenterWhenDrag,
    uploadImage,
    getNearAddress,
    setAddress,
    geolocate,
    imageLoadError
  }
};

async function geolocate() {
  if (this.homeInfo.avatar == null) {
    this.image =
        "https://media.smarthome.lumi.com.vn/uploads/images/users//tmpphppez7jl-1599727598.jpg";
  } else {
    this.image = this.homeInfo.avatar;
  }

  this.domain = this.homeInfo.domain;
  this.homeName = this.homeInfo.name;
  this.homeInfo.hcs.forEach(hc => {
    if (hc.mac !== "" && hc.is_master == 1) {
      this.macHc.push(hc.mac);
    }
  });

  await this.homeInfo.hcs.forEach(hc => {
    if (hc.mac !== "") {
      this.isHaveDomain = false;
      document.getElementById("domain").style.color = "gray";
    }
  });

  if (this.domain !== "") {
    this.isHaveDomain = false;
    document.getElementById("domain").style.color = "gray";
  }
  let latitude = this.homeInfo.address_info.geometry.location.lat;
  let longitude = this.homeInfo.address_info.geometry.location.lng;

  this.markers = {
    lat: latitude,
    lng: longitude
  };

  this.center = {
    lat: latitude,
    lng: longitude
  };

  this.getAddressFrom(latitude, longitude);

  this.getNearBySearch(latitude, longitude);
}

function locatorButtonPressed() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      this.getAddressFrom(latitude, longitude);

      this.getNearBySearch(latitude, longitude);

      this.center = {
        lat: latitude,
        lng: longitude
      };
    });
  }
}

function getNearAddress(lat, long) {
  this.getAddressFrom(lat, long);
  this.getNearBySearch(lat, long);
  this.markers = {
    lat: lat,
    lng: long
  };
  this.center = {
    lat: lat,
    lng: long
  };
}

function setAddress(address) {
  this.selectedAddress = address;

  //Add Address
  this.address = this.selectedAddress.formatted_address;

  if (this.selectedAddress) {
    const marker = {
      lat: this.selectedAddress.geometry.location.lat(),
      lng: this.selectedAddress.geometry.location.lng()
    };

    this.markers = marker;
    this.center = marker;
    this.myplace = marker;
    this.$emit("onSelectedAddress", {
      lat: marker.lat,
      lng: marker.lng,
      address: this.selectedAddress.formatted_address
    });

    this.getNearBySearch(
        this.selectedAddress.geometry.location.lat(),
        this.selectedAddress.geometry.location.lng()
    );
  }
}

function updateCoordinates(location) {
  let lat = location.latLng.lat();
  let long = location.latLng.lng();

  this.getAddressFrom(lat, long);
  this.getNearBySearch(lat, long);
}

function updateCenterWhenDrag() {
  let lat = this.$refs.map.$mapObject.getCenter().lat();
  let long = this.$refs.map.$mapObject.getCenter().lng();

  this.center = {
    lat: lat,
    lng: long
  };
}

function getAddressFrom(lat, long) {
  $dispatch("Home/getMyAddress", {lat: lat, long: long}).then(response => {
    if (response.error_message) {
    } else {
      this.address = response.results[0].formatted_address;
    }

    this.markers = {
      lat: lat,
      lng: long
    };

    this.myplace = {
      lat: lat,
      lng: long
    };
  });
}

function getNearBySearch(lat, long) {
  $dispatch("Home/getNearAddress", {lat: lat, long: long}).then(response => {
    this.nearAddress = response.results;
  });
}

async function editHome() {
  //Nhà
  if (this.homeName == "") {
    this.inputNameError = this.$t("homeConfig.no-empty-homeName");
    this.isNameValid = false;
  }

  if (this.homeName.length > 25) {
    this.inputNameError = this.$t("homeConfig.no-more-than-25-characters");
    this.isNameValid = false;
  }

  //Domain
  if (this.domain == "") {
    this.inputDomainError = this.$t("homeConfig.no-empty-domain");
    this.isDomainValid = false;
  }

  if (this.domain.length > 25) {
    this.inputDomainError = this.$t(
        "homeConfig.domain-no-more-than-25-characters"
    );
    this.isDomainValid = false;
  }

  if (/[ !@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/.test(this.domain)) {
    this.inputDomainError = this.$t("homeConfig.domain-no-special-characters");
    this.isNameValid = false;
  }

  if ($getters["Home/getDomainByHomeID"](this.domain) !== undefined) {
    if (
        $getters["Home/getDomainByHomeID"](this.domain).domain ==
        this.homeInfo.domain
    ) {
      this.inputDomainError = "";
    } else {
      this.inputDomainError = this.$t("homeConfig.domain-exist");
    }
  }

  if (
      this.inputDomainError == "" &&
      this.inputNameError == "" &&
      this.inputAddressError == ""
  ) {
    if (this.isImgChange) {
      let files = document.getElementById("file-input").files[0];

      let uploadFileResponse = await $dispatch($api.Media.uploadFile, {
        files
      });

      if (uploadFileResponse && uploadFileResponse.success)
        this.image = uploadFileResponse.data.files[0];
    }

    await $dispatch($api.Home.addAndUpdateHome, {
      home_id: this.homeInfo.id,
      name: this.homeName,
      domain: this.domain,
      avatar: this.image,
      lat: this.myplace.lat,
      lng: this.myplace.lng
    }).then(response => {
      let res = String(response);
      if (res.includes("Error")) {
        if (res.includes("Domain")) {
          this.isDomainValid = false;

          return (this.inputDomainError = res.slice(6));
        } else return $alertify.fail(res.slice(6));
      } else {
        $alertify.success(this.$t("homeConfig.edit-home-success"));
        this.$router.push("/Homes");
      }
    });
  }
}

function checkNameInput() {
  this.isNameValid = this.homeName !== "" && this.homeName.length < 25;
  if (this.isNameValid) this.inputNameError = "";
}

function checkDomainInput() {
  this.isDomainValid =
      this.domain !== "" &&
      this.domain.length < 25 &&
      !/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/.test(this.domain) &&
      $getters["Home/getDomainByHomeID"](this.domain) == undefined;
  if (this.isDomainValid) this.inputDomainError = "";
}

function uploadImage(e) {
  this.isImgChange = true;
  let reader = new FileReader();
  reader.onload = e => {
    this.image = e.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}

function imageLoadError() {
  this.imageError = "error";
}
</script>

<style scoped lang="scss">
#iconHome {
  position: absolute;
  bottom: 50%;
  right: 50%;
  font-size: 30px;
  color: red;
}

#pageContent {
  font-size: 18px;

  .button:nth-child(1) {
    background: #707070 !important;
  }

  .button:nth-child(1):hover {
    background: #999999 !important;
  }

  .button:nth-child(2):hover {
    background: dodgerblue !important;
  }

  #nearAddress {
    box-shadow: 8px 0 10px 0px rgba(0, 0, 0, 0.05);
  }

  p {
    font-size: 17px;
  }
}

.lumi-input input,
.lumi-input select,
.lumi-input button {
  height: auto !important;
}

#crosshairs {
  position: absolute;
  bottom: 130px;
  right: 28px;
  font-size: 35px;
  color: #6f6f6f;
}

.saveOrCancel {
  flex-direction: row-reverse;
  margin-bottom: 30px;

  .button {
    font-size: 15px;
    float: right;
    text-transform: capitalize !important;
    text-align: center;
    padding: 5px 15px;
    border-radius: 10px;
  }

  .button:nth-child(2) {
    width: 75px;
  }
}

#marker {
  position: absolute;
  top: 64%;
  left: 4.6%;
  color: white;
  font-size: 20px;
}

.image-upload {
  z-index: 1;
  text-align: center;
  border-radius: 50px;
  position: absolute;
  top: 50px;
  right: 30px;
}

.image-upload label {
  border-radius: 30px;
  width: 30px;
  height: 30px;
  background: #6f6f6f;
  position: relative;
}

.image-upload label i {
  font-size: 20px;
  position: absolute;
  top: 0;
  right: 5px;
  color: white;
}

#box-right input {
  font-size: 16px;
  border: 1px solid #badaff;
  border-radius: 5px;
  color: #ffffff !important;
  background: transparent !important;
}

#nearAddress p:hover {
  background: #eeeeee;
}

#nearAddress {
  overflow: auto;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 65% !important;
  background: white;
  position: absolute;
  bottom: 15.6px;
  left: 16.4px;
  transition: height 0.5s;
  border-radius: 0 10px 0 0;
}

#listNearHome {
  height: 90%;
  overflow: auto;
  overflow-x: hidden;
  color: #2b2b58;

  p {
    i {
      font-size: 20px;
      padding-right: 5px;
    }

    overflow-wrap: break-word;
  }
}

#showNearAddress {
  background: #f4f5f7;
  color: #2b2b58;
  text-align: center;
  position: sticky;
  padding-left: 8px !important;
  margin-bottom: 10px;
  padding-bottom: 8px !important;
  width: auto !important;
}

#address {
  position: relative;
}

.image-upload > input {
  display: none;
}

.image-upload i {
  cursor: pointer;
}
</style>
