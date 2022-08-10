<template>
  <div class="speaker">
    <div
      class="speaker-item"
      :class="{
        active:speaker&&speaker.devid==$store.state.ContentManager.currentSpeaker, 
      }"
      @click="chooseSpeaker"
    >
      <div class="mb-1">&nbsp;{{ speaker&&speaker.name }}</div>
      <i class="mdi mdi-speaker"/>
      <span v-if="isDisconected" class="error-speaker text-danger">
        <i class="mdi mdi-sync-off mdi-36px"></i>
      </span>
      <div class="speaker-info">
        <div class="song-name text-overflow-hidden">
          <i class="mdi mdi-music-clef-treble"/>
          <span>{{ songname }}</span>
        </div>
        <div class="volume-slider">
          <i
            class="mdi c-p"
            :class="mute?'mdi-volume-off':'mdi-volume-high'"
            @click="updateMuteStatus"
          ></i>
          <vue-slider
            class="speaker-slider"
            @drag-end="changeVolume"
            :drag-on-click="true"
            tooltip="none"
            v-model="volume"
          />
        </div>
      </div>
    </div>
    <!-- {{status}} -->
    <draggable
      v-if="level<2"
      v-bind="dragOptions"
      tag="div"
      class="speaker-item-sub"
      v-model="speakerData.slaveList"
      @change="dragend"
    >
      <nested-speaker
        class="speaker-slider"
        v-for="speakerData in speakerData.slaveList"
        :key="speakerData.uuid"
        :speakerData="speakerData"
        :level="level+1"
      />
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { watch } from "fs";
import {
  DEVICE_TRAIT,
  SPEAKER_CONFIG_CMD,
  DEVICE_TYPE
} from "@/plugins/variableConst";

export default {
  name: "nested-speaker",
  props: {
    speakerData: Object,
    level: Number
  },
  data() {
    return {
      isDisconected: false,
      songname: "Unknown",
      mute: false,
      volume: 0
    };
  },
  components: {
    draggable
  },
  computed: {
    dragOptions,
    speaker,
    status
  },
  watch: {
    status
  },
  methods: {
    dragend,
    changeVolume,
    updateMuteStatus,
    chooseSpeaker
  }
};

function dragOptions() {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  };
}

function speaker() {
  return $getters["HomeConfig/getSpeakerByUuid"](this.speakerData.uuid);
}

function status() {
  if (!this.speaker) return {};
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.speaker ? this.speaker.devid : ""
  );
  if (status && status.states) {
    let { PlayController, Speaker } = status.states;
    this.songname = PlayController&&PlayController.value.musicInfo.Title;
    this.mute = Speaker&&Speaker.mute == "0" ? false : true;
    this.volume = Speaker&&Speaker.volume;
    this.isDisconected = status&&status.status=='ERROR'
  }
  return status;
}

function dragend(data) {
  if (data.added) {
    if (!data.added.element.uuid) {
      return;
    }
    let slayerSpeaker = $getters["HomeConfig/getSpeakerByUuid"](
      data.added.element.uuid
    );
    let masterSpeaker = this.speaker;
    if (slayerSpeaker && slayerSpeaker.attr.slaveList.slaves) {
      this.$emit("refreshSpeaker");
      return;
    }
    $dispatch($api.HomeControll.controllDevice, {
      devid: slayerSpeaker.devid,
      execution: {
        command: DEVICE_TRAIT.ConfigSpeaker,
        params: {
          configCmd: SPEAKER_CONFIG_CMD.JOIN_TO_GROUP,
          value: {
            masterId: masterSpeaker.hash || masterSpeaker.devid.split("_")[1],
            listSlave: [slayerSpeaker.hash || slayerSpeaker.devid.split("_")[1]]
          }
        }
      }
    });
  }
}

function changeVolume() {
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.speaker.devid,
    execution: {
      command: DEVICE_TRAIT.Speaker,
      params: {
        volume: this.volume
      }
    }
  });
}

function updateMuteStatus() {
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.speaker.devid,
    execution: {
      command: DEVICE_TRAIT.Speaker,
      params: {
        mute: this.mute ? "0" : "1"
      }
    }
  });
}

function chooseSpeaker() {
  if (this.isDisconected) {
    return $alertify
      .confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("devices.text.wakeupDevice"),
        showCancelButton: true,
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel")
      })
      .then(result => {
        if (result.isConfirmed)
          $dispatch($api.HomeControll.wakeupDevices, this.speaker.devid);
      });
  }
  if (this.speaker && this.speaker.attr && this.speaker.attr.isSlave) {
    let masterSpeaker = $state.HomeConfig.devices.find(
      item =>
        item.type == DEVICE_TYPE.SPEAKER &&
        item.attr.slaveList.slaves &&
        item.attr.slaveList.slave_list.find(
          item => item.uuid == this.speaker.attr.speakerInformation&&this.speaker.attr.speakerInformation.upnp_uuid
        )
    );
    if (masterSpeaker)
      $dispatch("ContentManager/setCurrentSpeaker", masterSpeaker.devid);
  } else
    $dispatch(
      "ContentManager/setCurrentSpeaker",
      this.speaker && this.speaker.devid
    );
}
</script>

<style lang="scss">
.speaker-box {
  margin: 0;
  min-height: 1rem;
  & > .speaker {
    .speaker-item {
      z-index: 1;
      position: relative;
      padding: 1rem;
      margin: 0rem 0 0 0;
      border-radius: 1rem;
      & > i {
        position: absolute;
        font-size: 4rem;
        top: 1.4rem;
        left: 0.2rem;
      }
      .speaker-info {
        line-height: 1.8rem;
        margin-left: 3.3rem;
      }
      .error-speaker {
        position: absolute;
        right: .5rem;
        top: 0;
      }
    }
    .speaker-item-sub {
      content: "";
      margin: 0 0 0 4rem;
      min-height: 1rem;
      &.level-1 {
        margin-left: 0px;
      }
      .speaker {
        margin: 1rem 0;
        position: relative;
        &::before {
          content: "";
          border-left: solid 1px white;
          border-bottom: solid 1px white;
          position: absolute;
          left: -2rem;
          top: -100%;
          width: 10%;
          height: 150%;
          z-index: 0;
        }
        &:active {
          &::before {
            border: none;
          }
        }
      }
      .speaker-item {
        & > i {
          display: none;
        }
        .speaker-info {
          .song-name {
            display: none;
          }
          line-height: 1.8rem;
          margin-left: 0rem;
        }
      }
    }
    .volume-slider {
      display: flex;
      align-items: center;
    }
  }
}
</style>
