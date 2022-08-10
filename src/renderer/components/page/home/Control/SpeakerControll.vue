<template>
  <card id="speakerControll" bodyClasses="pb-0 mb-0">
    <h5 slot="header">
      <span
        class="c-p"
        :class="{'active':!isOnlineSong}"
        @click="isOnlineSong= false"
      >{{$t('dashboard.title.myMusic')}}</span>
      <span
        class="ml-2 c-p"
        :class="{'active':isOnlineSong}"
        @click="isOnlineSong= true"
      >{{$t('dashboard.title.onlineMusic')}}</span>
      <i class="pull-right c-p mdi mdi-window-close" @click="$emit('closeSpeakerControll')"></i>
    </h5>
    <div class="speaker-controll row h-100">
      <online-song v-if="isOnlineSong"/>
      <offline-song v-else/>
      <div class="speaker-list h-100 col-4">
        <div class="h-5">
          <h5>
            <span class="ml-1">{{$t('dashboard.title.SpeakerList')}}</span>
          </h5>
        </div>
        <div class="h-95 py-3">
          <div class="speaker-list-box h-100 py-3">
            <div class="h-100 overflow-y-auto">
              <draggable
                v-bind="dragOptions"
                tag="div"
                class="speaker-box2"
                v-model="speakerStructure"
                @change="dragend"
              >
                <nested-speaker2
                  v-for="speakerData in speakerStructure"
                  @refreshSpeaker="refreshSpeaker"
                  :key="speakerData.uuid"
                  :speakerData="speakerData"
                  :level="1"
                ></nested-speaker2>
              </draggable>
              <!-- <nested-speaker2 v-model="speakerList"/> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <music-controll slot="footer"/>
  </card>
</template>

<script>
import draggable from "vuedraggable";
import NestedSpeaker2 from "./Element/NestedSpeaker2.vue";
import OfflineSong from "./Element/OfflineSong.vue";
import OnlineSong from "./Element/OnlineSong.vue";
import MusicControll from "./Element/MusicControll.vue";
import {
  DEVICE_TYPE,
  DEVICE_TRAIT,
  SPEAKER_CONFIG_CMD
} from "@/plugins/variableConst";

export default {
  name: "speaker-list",
  display: "Nested",
  order: 16,
  components: {
    draggable,
    NestedSpeaker2,
    OfflineSong,
    OnlineSong,
    MusicControll
  },
  data() {
    return {
      isOnlineSong: false,
      speakerStructure: []
    };
  },
  computed: {
    dragOptions,
    speakerList
  },
  watch: {
    speakerList: {
      handler: refreshSpeaker,
      deep: true
    }
  },
  methods: {
    dragend,
    refreshSpeaker
  },
  mounted: refreshSpeaker
};

function refreshSpeaker() {
  let speakerList = $getters["HomeConfig/getDeviceByType"](DEVICE_TYPE.SPEAKER);
  this.speakerStructure.splice(0, this.speakerStructure.length);
  if (speakerList && speakerList.length)
    speakerList.forEach(speaker => {
      if (!speaker.attr.isSlave) {
        this.speakerStructure.push({
          uuid: (speaker.attr.speakerInformation||{}).upnp_uuid,
          slaveList:
            (speaker.attr &&
              speaker.attr.slaveList &&
              speaker.attr.slaveList.slave_list &&
              speaker.attr.slaveList.slave_list.map(item => {
                return { uuid: item.uuid, slaveList: [] };
              })) ||
            []
        });
      }
    });
}

function dragOptions() {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  };
}

function speakerList() {
  return $getters["HomeConfig/getDeviceByType"](DEVICE_TYPE.SPEAKER);
}

function dragend(data) {
  if (data.added) {
    let speakerUuid = data.added.element.uuid;
    let speaker = $getters["HomeConfig/getSpeakerByUuid"](speakerUuid);
    let masterSpeaker =
      this.speakerList &&
      this.speakerList.find(
        item =>
          item.attr.slaveList.slave_list &&
          item.attr.slaveList.slave_list.find(
            slaveSpeaker => slaveSpeaker.uuid == speakerUuid
          )
      );
    if (masterSpeaker)
      $dispatch($api.HomeControll.controllDevice, {
        devid: masterSpeaker.devid,
        execution: {
          command: DEVICE_TRAIT.ConfigSpeaker,
          params: {
            configCmd: SPEAKER_CONFIG_CMD.KICKOUT_SLAVE,
            value: [
              {
                ip: speaker.attr.speakerInformation.apcli0,
                uuid: [(speaker.attr.speakerInformation||{}).upnp_uuid]
              }
            ]
          }
        },
      });
  }
}
</script>

<style lang="scss">
#speakerControll {
  .card-body {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    .speaker-controll {
      display: flex;
    }
    .speaker-list {
      .speaker-list-box {
        overflow-x: hidden;
        border-radius: 1rem;
      }
    }
  }
}
</style>
