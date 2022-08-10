<template>
  <div id="pageContent" class="bg-blur lumi-input">
    <div class="row m-0 h-100">
      <div class="col-7 h-100 w-100 p-2">
        <card bodyClass="h-100" style="position: relative">
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
          <i id="crosshairs" @click="locatorPressed" class="mdi mdi-crosshairs-gps"></i>

          <div
            id="nearAddress"
            class="pb-1"
            :style="!showNearAddres? 'height:250px': 'height:35px'"
          >
            <div
              class="p-1"
              slot="title"
              id="showNearAddress"
              @click="showNearAddres = !showNearAddres "
            >{{ $t('homes.text.showNearAddress') }}</div>

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

          <!--          </div>-->
        </card>
      </div>
      <div class="col-5 m-0 h-100 pb-3" id="box-right">
        <div class="saveOrCancel mt-3 mb-5 col-12">
          <div class="float-right">
            <router-link style="color: white" to="/Homes">
              <div size="sm" class="bg-secondary button ml-3">{{ $t('cancel') }}</div>
            </router-link>

            <div size="sm" class="bg-primary button" @click="addHome">{{ $t('save') }}</div>
          </div>
        </div>

        <div class="col-12 mb-4" id="homeName">
          <p>{{ $t('homes.text.homeName') }}</p>
          <input
            type="text"
            class="form-control"
            v-model="homeName"
            :class="{'input-error':!isNameValid}"
            aria-describedby="emailHelp"
            @input="checkNameInput"
            @keyup.enter="addHome"
            :placeholder="$t('homes.text.inputHomeName')"
          >
          <span v-show="inputNameError" class="text-error">{{ inputNameError }}</span>
        </div>

        <div class="col-12 mb-4" id="domainName">
          <p>{{ $t('homes.text.domainName') }}</p>
          <input
            type="text"
            class="form-control"
            @input="checkDomainInput"
            :class="{'input-error':!isDomainValid}"
            v-model="domain"
            aria-describedby="emailHelp"
            @keyup.enter="addHome"
            :placeholder="$t('homes.text.inputDomainName')"
          >
          <span class="text-error" v-show="inputDomainError">{{ inputDomainError }}</span>
        </div>

        <div class="col-12 mb-4" id="address">
          <p>{{ $t('homes.text.address') }}</p>

          <i @click="locatorPressed" id="marker" class="fa fa-map-marker"></i>

          <gmap-autocomplete
            class="form-control"
            :value="address"
            :class="{'input-error':!isAddressValid}"
            :options="{componentRestrictions: {country: 'vn'}}"
            :placeholder="$t('homes.text.inputAddress') "
            @input="checkAddressInput"
            @place_changed="setAddress"
            style="padding-left: 5%; color: white"
          ></gmap-autocomplete>

          <span class="text-error" v-show="inputAddressError">{{ inputAddressError }}</span>
        </div>

        <div class="col-12 mb-4" id="image" style="position: relative">
          <p>{{ $t('homes.text.inputImage') }}</p>

          <div class="image-upload">
            <label for="file-input">
              <i class="mdi mdi-camera"></i>
            </label>

            <input
              accept="image/*"
              id="file-input"
              ref="file"
              v-on:change="uploadImage"
              type="file"
            >
          </div>

          <img
            v-if="image == '' "
            src="static/img/homeDefault.jpg"
            class="w-100"
            height="250px"
            style="border-radius: 15px; object-fit: cover"
          >

          <img
            v-else
            :src="image"
            class="w-100"
            height="250px"
            style="border-radius: 15px; object-fit: cover"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addHome",
  data() {
    return {
      homeName: "",
      domain: "",
      address: "",
      image: "",
      inputNameError: "",
      isNameValid: true,
      inputDomainError: "",
      isDomainValid: true,
      inputAddressError: "",
      isAddressValid: true,
      showNearAddres: false,
      file: "",
      googlemapOptions: {
        zoom: 16,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      },
      //Map
      showMap: false,
      center: {},
      markers: {},
      myplace: {},
      currentLocation: {},
      nearAddress: [],
      selectedAddress: null,
      coordinates: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    addHome,
    checkNameInput,
    checkDomainInput,
    checkAddressInput,
    locatorPressed,
    getAddressFrom,
    getNearBySearch,
    updateCenterWhenDrag,
    updateCoordinates,
    uploadImage,
    getNearAddress,
    setAddress,
    geolocate
  }
};

function getNearAddress(lat, long) {
  // this.showNearAddres = true;
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

function geolocate() {
  navigator.geolocation.getCurrentPosition(position => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    this.markers = {
      lat: latitude,
      lng: longitude
    };

    this.center = {
      lat: latitude,
      lng: longitude
    };

    this.currentLocation = {
      lat: latitude,
      lng: longitude
    };

    this.getAddressFrom(latitude, longitude);

    this.getNearBySearch(latitude, longitude);
  });
}

function locatorPressed() {
  this.center = this.currentLocation;

  this.getAddressFrom(this.currentLocation.lat, this.currentLocation.lng);
  this.getNearBySearch(this.currentLocation.lat, this.currentLocation.lng);

  this.center = this.currentLocation;
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
  $dispatch($api.Home.getMyAddress, { lat: lat, long: long }).then(response => {
    if (response.error_message) {
      this.inputAddressError = response.error_message;
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
  $dispatch($api.Home.getNearAddress, { lat: lat, long: long }).then(
    response => {
      this.nearAddress = response.results;
    }
  );
}

async function addHome() {
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
    this.isDomainValid = false;
  }

  if ($getters["Home/getDomainByHomeID"](this.domain) !== undefined) {
    this.inputDomainError = this.$t("homeConfig.domain-exist");
    this.isDomainValid = false;
  }

  //Address

  if (this.address == "") {
    this.inputAddressError = this.$t("homeConfig.no-address-empty");
  }

  if (
    this.inputDomainError == "" &&
    this.inputNameError == "" &&
    this.inputAddressError == ""
  ) {
    if (this.image !== "") {
      let files = document.getElementById("file-input").files[0];

      let uploadFileResponse = await $dispatch($api.Media.uploadFile, {
        files
      });

      if (uploadFileResponse && uploadFileResponse.success)
        this.image = uploadFileResponse.data.files[0];
    }

    await $dispatch($api.Home.addAndUpdateHome, {
      name: this.homeName,
      domain: this.domain,
      avatar: this.image,
      lat: this.myplace.lat,
      lng: this.myplace.lng
    }).then(response => {
      if (response && response.success) {
        $alertify.success(this.$t("homeConfig.add-home-success"));
        this.$router.push("/Homes");
      } else {
        if (response.data.error.domain[0] !== "") {
          this.isDomainValid = false;
          return (this.inputDomainError = this.$t("homeConfig.domain-exist"));
        } else {
          $alertify.fail(response.message);
        }
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

function checkAddressInput() {
  this.isAddressValid = this.address !== "";
  if (this.isAddressValid) this.inputAddressError = "";
}

function uploadImage(e) {
  let reader = new FileReader();
  reader.onload = e => {
    this.image = e.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}
</script>

<style scoped lang="scss">
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
    background: #999999!important;
  }
  .button:nth-child(2):hover {
    background: dodgerblue!important;
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
