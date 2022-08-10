<template>
  <div class="offline-song-list col-8 h-100" :speakerid="currentSpeaker" :status="status">
    <div v-if="!currentSpeaker" class="no-song-box h-95">
      <span>{{$t('dashboard.text.chooseSpeaker')}}</span>
    </div>
    <template v-else>
      <div class="h-5">
        <h5>
          <i class="fa fa-usb"></i>
          <span class="ml-1">{{$t('dashboard.title.listSong')}}</span>
        </h5>
      </div>
      <div v-if="!(listMusic&&listMusic.length)" class="no-song-box h-95">
        <span>{{$t('dashboard.text.noSongInList')}}</span>
      </div>
      <div v-else class="h-95 py-3">
        <div class="h-100 overflow-auto pr-3">
          <offline-song-info
            v-for="(song, index) in listMusic"
            :key="index"
            :index="index"
            :song="song"
            :isActive="currentSong==index+1"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import OfflineSongInfo from "./OfflineSongInfo";
export default {
  name: "offline-song-list",
  components: { OfflineSongInfo },
  data() {
    return {
      listMusic: [],
      currentSong: 0
    };
  },
  computed: {
    currentSpeaker,
    status
  },
  watch: {
    currentSpeaker: status
  },
  mounted() {
    if (this.currentSpeaker)
      $dispatch(
        $api.HCMusic.getPlayListUSB,
        $state.ContentManager.currentSpeaker
      );
  }
};

function currentSpeaker() {
  return $state.ContentManager.currentSpeaker;
}

function status() {
  if (!this.currentSpeaker) return;
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.currentSpeaker
  );
  if (
    status &&
    status.states.PlayController &&
    status.states.PlayController.value.musicInfo
  ) {
    this.currentSong = status.states.PlayController.value.musicInfo.plicurr;
  }
  if (
    status &&
    status.states.ConfigSpeaker &&
    status.states.ConfigSpeaker.value.num
  ) {
    this.listMusic = status.states.ConfigSpeaker.value.infolist;
  }
  // else this.listMusic = [];
  return status;
}
</script>

<style lang="scss">
#speakerControll {
  .offline-song-list {
    .no-song-box {
      display: flex;
      justify-content: center;
      span {
        position: absolute;
        top: 35%;
      }
    }
    .song-item {
      border-radius: 0.5rem;
    }
  }
  .speaker-list {
    .speaker-list-box {
      border-radius: 1rem;
    }
  }
}
</style>