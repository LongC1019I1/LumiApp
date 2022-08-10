<template>
  <div class="speaker">
    <div
      class="speaker-item"
      :class="{active:speaker&&speaker.devid==$store.state.ContentManager.currentSpeaker}"
      @click="chooseSpeaker"
    >
      <i
        class="mdi"
        :class="speaker&&speaker.devid==$store.state.ContentManager.currentSpeaker?'mdi-speaker-wireless':'mdi-speaker'"
      />
      <span v-if="status && status.status == 'ERROR'" class="error-speaker text-danger">
        <i class="mdi mdi-sync-off mdi-36px"></i>
      </span>
      <span class="ml-3 text-overflow-hidden">{{ speaker&&speaker.name }}</span>
    </div>

    <draggable
      v-if="level<2"
      v-bind="dragOptions"
      tag="div"
      class="speaker-item-sub speaker-box2"
      v-model="speakerData.slaveList"
      @change="dragend"
    >
      <nested-speaker2
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
import {
  DEVICE_TRAIT,
  SPEAKER_CONFIG_CMD,
  DEVICE_TYPE
} from "@/plugins/variableConst";

export default {
  name: "nested-speaker2",
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
  methods: {
    chooseSpeaker,
    dragend
  }
};

function status() {
  if (!this.speaker) return {};
  return $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.speaker ? this.speaker.devid : ""
  );
}

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

function chooseSpeaker() {
  if (this.status && this.status.status == "ERROR") {
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
.speaker-box2 {
  margin: 0;
  padding: 0rem 1rem;
  .speaker-item {
    position: relative;
    z-index: 1;
    display: flex;
    padding: 0rem 0.5rem;
    border-radius: 0.5rem;
    align-items: center;
    & > i {
      font-size: 2rem;
    }
    .error-speaker {
      position: absolute;
      right: 0.5rem;
      top: 0;
    }
  }
  .speaker-item-sub.speaker-box2 {
    margin: 0 0 0 2rem;
    padding: 1rem 0rem 0rem 1rem;
    .speaker {
      position: relative;
      &::before {
        content: "";
        border-left: solid 1px white;
        border-bottom: solid 1px white;
        position: absolute;
        left: -1.85rem;
        top: -100%;
        width: 30%;
        height: 150%;
        z-index: 0;
      }
      &:active {
        &::before {
          border: none;
        }
      }
      .speaker-item {
        margin-bottom: 1rem;

        .speaker-info {
          .song-name {
            display: none;
          }
          line-height: 1.8rem;
          margin-left: 0rem;
        }
      }
    }
  }
}
</style>