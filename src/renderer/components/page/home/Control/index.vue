<template>
  <div class="h-100" id="homeControl">
    <div v-if="isShowSpeakerControll" class="main-layout" id="speakerControl">
      <speaker-controll @closeSpeakerControll="isShowSpeakerControll = false"/>
    </div>
    <div v-show="!isShowSpeakerControll" class="main-layout row">
      <div class="layout center-layout hidden-scroll col row">
        <div class="h-100 col">
          <div class="box">
            <music-box
                @showSpeakerList="isShowModalSpeakerList = true"
                @showSpeakerControll="isShowSpeakerControll = true"
            />
          </div>
          <div class="box">
            <room-list/>
          </div>
        </div>
        <div class="h-100 col">
          <div class="box">
            <often-used-scenes @showUsedScenesSetting="isShowModalChooseScene = true"/>
          </div>
          <div class="box">
            <often-used-controlls @showUsedDevicesSetting="isShowModalOftenUsedControll = true"/>
          </div>
        </div>
      </div>
      <div class="layout right-layout col p-0">
        <history/>
      </div>
    </div>
    <modal-choose-scene
        :isShowModal="isShowModalChooseScene"
        @closeModal="isShowModalChooseScene=false"
    />
    <modal-speaker-list
        :isShowModal="isShowModalSpeakerList"
        @closeModal="isShowModalSpeakerList=false"
    />
    <modal-choose-often-used-controll
        :isShowModal="isShowModalOftenUsedControll"
        @closeModal="isShowModalOftenUsedControll=false"
    />
  </div>
</template>

<script>
import MusicBox from "./MusicBox";
import RoomList from "./RoomList";
import OftenUsedControlls from "./OftenUsedControlls";
import OftenUsedScenes from "./OftenUsedScenes";
import History from "./History";
import speakerControll from "./SpeakerControll";

//modal
import ModalChooseScene from "./Modal/ModalChooseScene";
import ModalSpeakerList from "./Modal/ModalSpeakerList";
import ModalChooseOftenUsedControll from "./Modal/ModalChooseOftenUsedControll";

export default {
  name: "dashboard",
  data() {
    return {
      isShowSpeakerControll: this.$route.query.isShowSpeakerControll,
      isShowModalChooseScene: false,
      isShowModalSpeakerList: false,
      isShowModalOftenUsedControll: false,
    };
  },
  components: {
    MusicBox,
    OftenUsedControlls,
    OftenUsedScenes,
    History,
    RoomList,
    speakerControll,
    //modal
    ModalChooseScene,
    ModalSpeakerList,
    ModalChooseOftenUsedControll,
  },


};



</script>

<style scoped lang="scss">
.center-layout {
  max-width: calc(100% - 235px);

  & > div {
    &:nth-child(1) {
      padding-right: 0.5rem;
    }

    &:nth-child(2) {
      padding-left: 0.5rem;
    }

    min-width: 50%;
    @media (max-width: 1368px) {
      min-width: 100%;
      &:nth-child(1) {
        padding-right: 1rem;
        margin-bottom: 1rem;
      }
      &:nth-child(2) {
        padding-left: 1rem;
      }
    }

    & > div {
      &:nth-child(1) {
        height: 245px;
      }

      &:nth-child(2) {
        height: calc(100% - 245px);
      }
    }
  }
}

.right-layout {
  max-width: 235px;
}

.localInfo-box {
  height: calc(30% - 58px);
}
</style>
