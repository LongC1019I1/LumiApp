<template>
  <div class="state-device">
    <div class="state">
      {{ $t("schedule.state.state") }}
    </div>
    <!--            SELECT STATE-->
    <div class="state setState pr-5">
      <div class="d-flex schedule-speaker">
        <div class="min-w-maxcontent mt-2">
          {{ $t("schedule.state.select-state") }}:
        </div>
        <div class="w-100">
          <div class="pb-5" :speakerStatus="speakerStatus">
            <v-select
              style="color: white !important"
              :options="statusList"
              :reduce="(label) => label.value"
              v-model="status"
              label="label"
              :clearable="false"
              :searchable="false"
              @input="
                isShowChooseSongBox = false;
                isShowVolume = false;
                updateStatus();
              "
            >
              <template #open-indicator>
                <span v-bind="selectAttributes">
                  <i class="mdi mdi-menu-down"></i>
                </span>
              </template>
            </v-select>
            <div
              v-if="status === PLAY_CONTROL.resume"
              class="d-flex justify-center mt-4 w-max flex-wrap flex-column"
            >
              <div
                class="my-3 d-flex align-center c-p"
                @click="
                  isShowChooseSongBox = !isShowChooseSongBox;
                  updateStatus();
                "
              >
                <i
                  class="mdi font-20"
                  :class="
                    isShowChooseSongBox
                      ? 'mdi-checkbox-marked'
                      : 'mdi-checkbox-blank-outline'
                  "
                ></i>
                <span class="pl-2">{{ $t("scene.chooseSong") }}</span>
                <span v-if="isLoadingMusic && isShowChooseSongBox" class="pl-2">
                  <i class="mdi mdi-spin mdi-loading"></i>
                </span>
              </div>
              <div
                v-if="
                  isShowChooseSongBox &&
                  !isLoadingMusic &&
                  listMusic &&
                  listMusic.length
                "
                class="song-box my-3"
              >
                <template v-for="(songItem, index) in listMusic">
                  <div
                    :key="index"
                    class="song-item"
                    :class="{ active: index + 1 === song }"
                    @click="
                      song = index + 1;
                      updateStatus();
                    "
                  >
                    <div class="icon">
                      <i class="fa fa-music"></i>
                    </div>
                    <div class="pl-2 w-80 song-artist">
                      <div class="text-overflow-hidden">
                        {{ songItem.Title }}
                      </div>
                      <div class="text-overflow-hidden">
                        {{ songItem.Artist }}
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div
                class="my-3 c-p d-flex align-center"
                @click="
                  isShowVolume = !isShowVolume;
                  updateStatus();
                "
              >
                <i
                  class="mdi font-20"
                  :class="
                    isShowVolume
                      ? 'mdi-checkbox-marked'
                      : 'mdi-checkbox-blank-outline'
                  "
                ></i>
                <span class="pl-2">{{ $t("scene.volumeSlider") }}</span>
              </div>
              <div v-if="isShowVolume" class="volume-box mt-3 px-2">
                <vue-slider
                class="w-250"
                  v-model="volume"
                  @drag-end="updateStatus"
                  :drag-on-click="true"
                  tooltip="always"
                  :tooltip-formatter="'{value}%'"
                ></vue-slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DEVICE_TRAIT,
  PLAY_CONTROL,
  SPEAKER_CONFIG_CMD,
} from "../../../../../../plugins/variableConst";

export default {
  name: "Speaker",

  props: {
    value: [Object, Array],
    device: Object,
    schedule: Object,
  },
  data() {
    return {
      status: PLAY_CONTROL.resume,
      song: 1,
      volume: 50,
      isShowChooseSongBox: false,
      isShowVolume: false,
      isLoadingMusic: false,
      listMusic: [],
      DEVICE_TRAIT,
      PLAY_CONTROL,
      statusList: [
        { label: "Play", value: PLAY_CONTROL.resume },
        { label: "Pause", value: PLAY_CONTROL.pause },
        { label: "Next", value: PLAY_CONTROL.next },
        { label: "Prev", value: PLAY_CONTROL.previous },
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
    };
  },
  computed: {
    speakerStatus,
  },
  watch: {
    value: updateDate,
    isShowChooseSongBox,
    schedule() {
      delete this.schedule.device;
      $dispatch("RuleManager/setRule", this.schedule);
    },
  },
  methods: {
    updateStatus,
  },
  mounted: updateDate,
};

function isShowChooseSongBox(value) {
  if (value) {
    $dispatch($api.HCMusic.getPlayListUSB, this.device && this.device.devid);
    this.isLoadingMusic = true;
  }
}

function speakerStatus() {
  if (!this.device) return;
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.device.devid
  );

  console.log("mystatus", status);
  if (
    status &&
    status.states.ConfigSpeaker &&
    status.states.ConfigSpeaker.value.num
  ) {
    this.listMusic = status.states.ConfigSpeaker.value.infolist;
    this.isLoadingMusic = false;
  }
  return status;
}

function updateDate() {
  this.isShowChooseSongBox = false;
  this.isShowVolume = false;
  let controller = this.value.find(
    (item) => item.command === DEVICE_TRAIT.PlayController
  );
  if (controller) this.status = controller.params.controller;
  else {
    this.status = PLAY_CONTROL.resume;
    let playSong = this.value.find(
      (item) => item.command === DEVICE_TRAIT.ConfigSpeaker
    );
    if (playSong) {
      this.isShowChooseSongBox = true;
      this.song = playSong.params.value;
    }
    let volumeControll = this.value.find(
      (item) => item.command === DEVICE_TRAIT.Speaker
    );
    if (volumeControll) {
      this.isShowVolume = true;
      this.volume = volumeControll.params.volume;
    }
  }
}

function updateStatus() {
  let execution = [];
  if (
    this.status !== PLAY_CONTROL.resume ||
    (!this.isShowChooseSongBox && !this.isShowVolume)
  )
    execution.push({
      command: DEVICE_TRAIT.PlayController,
      params: {
        controller: this.status,
      },
    });
  else {
    if (this.isShowChooseSongBox) {
      execution.push({
        command: DEVICE_TRAIT.ConfigSpeaker,
        params: {
          configCmd: SPEAKER_CONFIG_CMD.PLAY_USB_DISK,
          value: this.song,
        },
      });
    }
    if (this.isShowVolume) {
      execution.push({
        command: DEVICE_TRAIT.Speaker,
        params: {
          volume: this.volume,
        },
      });
    }
  }
  this.$emit("updateStatus", execution);
}
</script>

<style lang="scss">
</style>
