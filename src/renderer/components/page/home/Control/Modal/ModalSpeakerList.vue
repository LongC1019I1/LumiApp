<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-choose-scene modal-full-height modal-width-md"
    footerClasses="p-0"
    id="speakerList"
    @close="$emit('closeModal')"
  >
    <template #header>
      <h5 class="text-center w-100">{{$t('dashboard.settingSpeaker')}}</h5>
      <span class="pull-right c-p" @click="$emit('closeModal')">
        <i class="mdi mdi-close"></i>
      </span>
    </template>
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="speaker-box"
      v-model="speakerStructure"
      @change="dragend"
    >
      <nested-speaker
        @refreshSpeaker="refreshSpeaker"
        v-for="speakerData in speakerStructure"
        :key="speakerData.uuid"
        :speakerData="speakerData"
        :level="1"
      ></nested-speaker>
    </draggable>
  </modal>
</template>

<script>
import draggable from "vuedraggable";
import NestedSpeaker from "../Element/NestedSpeaker.vue";
import {
  DEVICE_TYPE,
  SPEAKER_CONFIG_CMD,
  DEVICE_TRAIT
} from "@/plugins/variableConst";

export default {
  name: "modal-speaker-list",
  props: {
    isShowModal: Boolean
  },
  display: "Nested",
  order: 16,
  components: {
    NestedSpeaker,
    draggable
  },
  data() {
    return {
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
  console.log(speakerList)
  if (speakerList && speakerList.length)
    speakerList.forEach(speaker => {
      if (!speaker.attr.isSlave) {
        this.speakerStructure.push({
          uuid: speaker.attr.speakerInformation&&speaker.attr.speakerInformation.upnp_uuid,
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
                uuid: [speaker.attr.speakerInformation&&speaker.attr.speakerInformation.upnp_uuid]
              }
            ]
          }
        }
      });
  }
}
</script>

<style lang="scss">
</style>
