<template>
  <card>
    <h5 slot="header">
      <span class="active">{{
        selectedCamera ? $t("secure.updateCamera") : $t("secure.addCamera")
      }}</span>
    </h5>
    <!-- type -->
    <div class="form-group has-label">
      <label>{{ $t("secure.cameraType") }}</label>
      <v-select
        :options="listCameraType"
        :reduce="(label) => label.value"
        :clearable="false"
        :searchable="false"
        class="w-90-170"
        v-model="type"
        @input="type === '3' ? resetData({ type, name, roomid }) : ''"
      >
        <template #open-indicator>
          <span v-bind="selectAttributes" class="bg-transparent">
            <i class="mdi mdi-menu-down"></i>
          </span>
        </template>
      </v-select>
    </div>
    <!-- name -->
    <base-input
      inputID="cameraName"
      :label="$t('secure.cameraName')"
      :placeholder="$t('secure.enterCameraName')"
      v-model="name"
      maxlength="25"
      @keyup.enter="updateData"
    ></base-input>
    <!-- room -->
    <div class="form-group has-label">
      <label>{{ $t("secure.choooseRoom") }}</label>
      <v-select
        :options="listRoombyFloor"
        :reduce="(label) => label.roomid"
        :clearable="false"
        :searchable="false"
        :placeholder="$t('secure.choooseRoom')"
        class="w-90-170"
        v-model="roomid"
      >
        <template #open-indicator>
          <span v-bind="selectAttributes" class="bg-transparent">
            <i class="mdi mdi-menu-down"></i>
          </span>
        </template>
      </v-select>
    </div>
    <!-- account -->
    <template v-if="type !== '3'">
      <base-input
        :label="$t('secure.user')"
        :placeholder="$t('secure.enterUser')"
        v-model="user"
        @keyup.enter="updateData"
      ></base-input>
      <!-- password -->
      <base-input
        :label="$t('secure.password')"
        :type="isShowPassword ? 'text' : 'password'"
        :addon-right-icon="isShowPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
        @rightIconClick="isShowPassword = !isShowPassword"
        :placeholder="$t('secure.enterPassword')"
        v-model="pass"
        @input="(value) => (this.pass = value.trim())"
        @keyup.enter="updateData"
      ></base-input>
      <div class="form-group has-label">
        <label>{{ $t("secure.thread") }}</label>
        <v-select
          :options="listThread"
          :reduce="(label) => label.value"
          :clearable="false"
          :searchable="false"
          class="w-90-170"
          v-model="main"
        >
          <template #open-indicator>
            <span v-bind="selectAttributes" class="bg-transparent">
              <i class="mdi mdi-menu-down"></i>
            </span>
          </template>
        </v-select>
      </div>
      <base-input
        :label="$t('secure.IPAddress')"
        :placeholder="$t('secure.enterIPAddress')"
        v-model="ip"
        @input="value=>ip=value.replace(/[^\d|\.]/, '')"
        @keyup.enter="updateData"
      ></base-input>
      <base-input
        :label="$t('secure.port')"
        :placeholder="$t('secure.enterPort')"
        v-model="port"
        type="number"
        min="0"
        @keyup.enter="updateData"
      ></base-input>

      <base-input
        v-if="type !== '0'"
        :label="$t('secure.chanel')"
        :placeholder="$t('secure.enterChanel')"
        v-model="channel"
        type="number"
        min="0"
        @keyup.enter="updateData"
      ></base-input>
      <base-input
        v-else
        :label="$t('secure.string')"
        placeholder="rtsp://exam.stream"
        v-model="string"
        @input="(value) => (string = value.trim())"
        @keyup.enter="updateData"
      ></base-input>
      <base-input
        :label="$t('secure.domain')"
        :placeholder="$t('secure.enterDomain')"
        v-model="dns"
        @input="(value) => (dns = value.trim())"
      ></base-input>
      <base-input
        :label="$t('secure.port2')"
        :placeholder="$t('secure.enterPort')"
        v-model="port2"
        type="number"
        min="0"
        @keyup.enter="updateData"
      ></base-input>
      <base-input
        :label="$t('secure.chanel2')"
        :placeholder="$t('secure.enterChanel2')"
        v-model="channel2"
        type="number"
        min="0"
        @keyup.enter="updateData"
      ></base-input>
    </template>
    <base-input
      v-else
      :label="$t('secure.string')"
      placeholder="rtsp://exam.stream"
      v-model="string"
      @keyup.enter="updateData"
    ></base-input>
    <div slot="footer" class="text-center">
      <base-button class="footer-button" @click="updateData">{{
        $t("save")
      }}</base-button>
      <base-button
        class="footer-button"
        @click="
          selectedCamera ? $emit('updateViewName', 'camera-view') : resetData()
        "
        >{{ $t("cancel") }}</base-button
      >
    </div>
  </card>
</template>

<script>
export default {
  name: "camera-form-tab",
  props: {
    selectedCamera: [String, Boolean],
  },
  data() {
    return {
      type: "1",
      name: "",
      user: "",
      pass: "",
      ip: "",
      port: "",
      dns: "",
      port2: "",
      channel: "",
      channel2: "",
      main: "0",
      string: "",
      roomid: "",
      p2p: false,
      record: false,
      isShowPassword: false,
      listCameraType: [
        {
          label: "Dahua",
          value: "1",
        },
        {
          label: "Hikvision",
          value: "2",
        },
        {
          label: this.$t("secure.enterString"),
          value: "3",
        },
        {
          label: this.$t("secure.other"),
          value: "0",
        },
      ],
      listThread: [
        {
          label: this.$t("secure.threadMain"),
          value: "0",
        },
        {
          label: this.$t("secure.threadExtra"),
          value: "1",
        },
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
    };
  },
  watch: {
    selectedCamera,
  },
  computed: {
    listRoombyFloor,
  },
  methods: {
    updateData,
    resetData,
  },
  mounted: selectedCamera,
};

function selectedCamera() {
  if (!this.selectedCamera) return resetData.call(this);
  let currentCamera = $getters["HomeConfig/getCameraByID"](this.selectedCamera);
  resetData.call(this, currentCamera);
}

function listRoombyFloor() {
  let listFloor = $getters["HomeConfig/getFillterRoomsByFloor"];
  let listRoom = [];
  listFloor.forEach((floor) => {
    floor.roomList.forEach((room) => {
      listRoom.push({ ...room, label: `${floor.floorName} - ${room.name}` });
    });
  });
  return listRoom;
}

function updateData() {
  if (!this.name || !this.name.trim()) {
    document.getElementById("cameraName").focus();
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("secure.pleaseEnterCameraName"),
    });
  }
  if (!this.roomid) {
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("secure.pleaseEnterCameraRoom"),
    });
  }

  if (this.type === "3") {
    if (!this.string) {
      return $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("secure.pleaseEnterString"),
      });
    }
  } else {
    if (!(this.user && this.pass && this.user.trim() && this.pass.trim())) {
      return $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("secure.pleaseEnterUserAndPass"),
      });
    }
    if (this.type !== "0" && !(this.channel || this.channel2)) {
      return $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("secure.pleaseEnterChannel"),
      });
    }
    if (this.type === "0" && !(this.string && this.string.trim())) {
      return $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("secure.pleaseEnterString"),
      });
    }
    if (
      !(
        (this.ip || this.port || this.dns || this.port2) &&
        ((this.ip && this.port) || (this.dns && this.dns.trim() && this.port2))
      )
    ) {
      return $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("secure.pleaseEnterNetwork"),
      });
    }
  }
  let updateData = {
    type: this.type,
    name: this.name.trim(),
    user: this.user.trim(),
    pass: this.pass.trim(),
    ip: this.ip,
    port: this.port,
    dns: this.dns.trim(),
    port2: this.port2,
    channel: this.channel,
    channel2: this.channel2,
    main: this.main.trim(),
    string: this.string.trim(),
    roomid: this.roomid,
    p2p: false,
    record: false,
  };
  if (this.selectedCamera) {
    return $dispatch($api.HomeConfig.updateCamera, {
      camid: this.selectedCamera,
      updateData,
    }).then((result) => {
        $alertify.success(this.$t("updateSuccess"));
        this.$emit("updateViewName", "camera-view");
    });
  }
  return $dispatch($api.HomeConfig.addCameras, [updateData]).then((result) => {
      $alertify.success(this.$t("addSuccess"));
      this.resetData();
  });
}

function resetData({
  type = "1",
  name = "",
  user = "",
  pass = "",
  ip = "",
  port = "",
  dns = "",
  port2 = "",
  channel = "",
  channel2 = "",
  main = "0",
  string = "",
  roomid = "",
  p2p = false,
  record = false,
} = {}) {
  Object.assign(this, {
    type,
    name,
    user,
    pass,
    ip,
    port,
    dns,
    port2,
    channel,
    channel2,
    main,
    string,
    roomid,
    p2p,
    record,
  });
}
</script>

<style lang="scss">
</style>
