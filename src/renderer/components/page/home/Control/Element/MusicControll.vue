<template>
  <div class="music-controll" :value="speaker" :value2="status">
    <div class="controll1-box col">
      <div>
        <i class="c-p mdi mdi-rewind" @click="previousSong"></i>
      </div>
      <div>
        <i
          class="mdi c-p"
          :class="songStatus=='play'?'mdi-pause-circle-outline':songStatus=='pause'?'mdi-play':'mdi-play'"
          @click="updateSongStatus"
        ></i>
      </div>
      <div>
        <i class="c-p mdi mdi-fast-forward" @click="nextSong"></i>
      </div>
      <div>
        <i
          class="mdi c-p"
          :class="loopMode==0?'mdi-repeat':loopMode==1?'mdi-repeat-once':'mdi-repeat-off'"
          @click="updateLoopMode"
        ></i>
      </div>
    </div>
    <div class="song-box col-3">
      <img src="static/img/base-music.jpg">
      <div class="pl-2 text-overflow-hidden">
        <h5 class="text-overflow-hidden">{{Title}}</h5>
        <h6 class="text-overflow-hidden">{{Artist}}</h6>
      </div>
    </div>
    <div class="controll2-box col py-2">
      <div class="current-time pr-3">{{currentTime2}}</div>
      <div class="slider-bar">
        <vue-slider
          :disabled="!speaker"
          class="music-slider"
          @drag-end="updateSongTime"
          :drag-on-click="true"
          tooltip="none"
          v-model="curpos2"
          :min="0"
          :max="totlen"
        />
      </div>
      <div class="total-time pl-3">{{totalTime}}</div>
    </div>
    <div class="volume-box col-2 py-2">
      <div class="volume-slider">
        <i
          class="mdi c-p"
          :class="mute?'mdi-volume-off':'mdi-volume-high'"
          @click="updateMuteStatus"
        ></i>
        <vue-slider
          :disabled="!speaker"
          class="music-slider"
          @drag-end="changeVolume"
          :drag-on-click="true"
          tooltip="none"
          v-model="volume"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  DEVICE_TRAIT,
  PLAY_CONTROL
} from "@/plugins/variableConst";
export default {
  name: "music-controll",
  data() {
    return {
      speakerName: "",
      Title: "Unknown",
      Artist: "Unknown",
      mute: false,
      volume: 50,
      loopMode: 0,
      songStatus: "play",
      playController: {},
      curpos2: 0,
      curpos: 0,
      totlen: 0,
      currentTime2: "00:00",
      currentTime: "00:00",
      totalTime: "00:00",
      trackerTimer: setInterval(() => {
        if (this.curpos2 < this.totlen - 1000 && this.songStatus == "play") {
          this.curpos2 += 1000;
          this.currentTime2 = timer(this.curpos2, "m:ss");
        }
      }, 1000)
    };
  },
  computed: {
    speaker,
    status
  },
  methods: {
    changeVolume,
    updateMuteStatus,
    updateLoopMode,
    updateSongStatus,
    updateSongTime,
    previousSong,
    nextSong
  },
  watch: {
    currentTime() {
      this.currentTime2 = this.currentTime;
    },
    curpos() {
      if (this.curpos >= this.totlen) this.curpos2 = this.totlen - 1000;
      else this.curpos2 = this.curpos;
    }
    // status
  },
  beforeDestroy
};
//life-cycle

function beforeDestroy() {
  clearInterval(this.trackerTimer);
}

function speaker() {
  return $getters["HomeConfig/getDevice"]($state.ContentManager.currentSpeaker);
}

function status() {
  if (!this.speaker) return {};
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.speaker.devid || ""
  );
  if (status && status.states) {
    let { PlayController, Speaker, LoopMode } = status.states;
    this.Album =
      (PlayController && PlayController.value.musicInfo.Album) || "Unknown";
    this.Artist =
      (PlayController && PlayController.value.musicInfo.Artist) || "Unknown";
    this.Title =
      (PlayController && PlayController.value.musicInfo.Title) || "Unknown";
    this.mute = Speaker.mute == "0" ? false : true;
    this.volume = Speaker.volume;
    this.songStatus =
      (PlayController && PlayController.value.status) || "pause";
    this.loopMode = Number(LoopMode.loopMode);
    this.curpos = 0;
    this.totlen = PlayController
      ? Number(PlayController.value.musicInfo.totlen)
      : 0;
    this.curpos = PlayController
      ? Number(PlayController.value.musicInfo.curpos)
      : 0;
    this.currentTime = timer(this.curpos, "m:ss");
    this.totalTime = timer(this.totlen, "m:ss");
  }
  return status;
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

function updateLoopMode() {
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.speaker.devid,
    execution: {
      command: DEVICE_TRAIT.LoopMode,
      params: {
        loopMode: this.loopMode == 0 ? 1 : this.loopMode == 1 ? 2 : 0
      }
    }
  });
}

function updateSongStatus() {
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.speaker.devid,
    execution: {
      command: DEVICE_TRAIT.PlayController,
      params: {
        controller:
          this.songStatus == "play" ? PLAY_CONTROL.pause : PLAY_CONTROL.resume
      }
    }
  });
}

function previousSong() {
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.speaker.devid,
    execution: {
      command: DEVICE_TRAIT.PlayController,
      params: {
        controller: PLAY_CONTROL.previous
      }
    }
  });
}

function nextSong() {
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.speaker.devid,
    execution: {
      command: DEVICE_TRAIT.PlayController,
      params: {
        controller: PLAY_CONTROL.next
      }
    }
  });
}

function updateSongTime() {
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.speaker.devid,
    execution: {
      command: DEVICE_TRAIT.PlayController,
      params: {
        controller: PLAY_CONTROL.seek,
        value: Math.round(this.curpos2 / 1000)
      }
    }
  });
}
</script>

<style lang="scss">
#speakerControll {
  .music-controll {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div,
    .volume-slider {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .song-box {
      justify-content: flex-start;
      img {
        height: 4rem;
        width: 4rem;
        border-radius: 0.5rem;
        object-fit: cover;
      }
    }
    .controll1-box {
      font-size: 2rem;
      max-width: 250px;
    }
    .slider-bar,
    .volume-slider {
      width: 90%;
      i {
        font-size: 1.5rem;
      }
    }
  }
}
</style>