<template>
  <card id="musicBox" bodyClasses="pb-0 mb-0">
    <div class="music-manager">
      <div class="speaker-list">
        <div class="c-p" @click="$emit('showSpeakerList')">
          <i class="mdi mdi-speaker"></i>
        </div>
        <div
          class="speacker-name text-overflow-hidden"
          :title="speaker&&speaker.name"
        >{{speaker&&speaker.name}}</div>
      </div>
      <div class="center-box">
        <div class="text-center">
          <img src="static/img/musicBox.png" alt>
        </div>
        <div class="mt-2 song-name text-center text-overflow-hidden">{{Title}}</div>
      </div>
      <div class="song-list">
        <i class="mdi mdi-menu-open c-p" @click="$emit('showSpeakerControll')"></i>
      </div>
    </div>
    <div class="music-player">
      <div class="music-player-info">
        <div class="current-time">{{currentTime2}}</div>
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
        <div class="total-time">{{totalTime}}</div>
      </div>
      <div class="music-player-button">
        <div></div>
        <div class="content">
          <div>
            <i
              class="mdi"
              :class="loopMode==0?'mdi-repeat':loopMode==1?'mdi-repeat-once':'mdi-repeat-off'"
              @click="updateLoopMode"
            ></i>
          </div>
          <div>
            <i class="mdi mdi-rewind" @click="previousSong"></i>
          </div>
          <div >
            <i
              class="mdi"
              :class="songStatus=='play'?'mdi-pause-circle-outline':songStatus=='pause'?'mdi-play':'mdi-play'"
              @click="updateSongStatus"
            ></i>
          </div>
          <div>
            <i class="mdi mdi-fast-forward" @click="nextSong"></i>
          </div>
          <div class="volume-slider">
            <i
              class="mdi c-p mr-2"
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
        <div></div>
      </div>
    </div>
  </card>
</template>

<script>
import { DEVICE_TRAIT, PLAY_CONTROL } from "@/plugins/variableConst";

export default {
  name: "music-box",
  data() {
    return {
      speakerName: "",
      Title: "Unknown",
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
      this.curpos2 = this.curpos;
    },
    status
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
      (PlayController && PlayController.value.musicInfo.Title) || "Unknown";
    this.Artist =
      (PlayController && PlayController.value.musicInfo.Title) || "Unknown";
    this.Title =
      (PlayController && PlayController.value.musicInfo.Title) || "Unknown";
    this.mute = Speaker.mute == "0" ? false : true;
    this.volume = Speaker.volume;
    this.songStatus =
      (PlayController && PlayController.value.status) || "pause";
    this.loopMode = Number(LoopMode.loopMode);
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
  if (this.speaker)
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
  if (this.speaker)
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
  if (this.speaker)
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
  if (this.speaker)
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
  if (this.speaker)
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
  if (this.speaker)
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
  if (this.speaker)
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
#musicBox {
  .music-manager {
    display: flex;
    justify-content: space-between;
    i {
      position: relative;
      top: -1rem;
      font-size: 2rem;
    }
    .song-list {
      text-align: right;
      width: 15%;
    }
    .speaker-list,
    .song-list {
      max-width: 15%;
      .speacker-name {
        max-width: 100%;
        position: relative;
        top: -1.5rem;
        line-height: 1rem;
        height: 1rem;
      }
    }
    .center-box {
      width: 70%;
      img {
        width: 100%;
        max-width: 200px;
        height: 90px;
        object-fit: cover;
      }
      .song-name {
        line-height: 1rem;
        height: 1rem;
      }
    }
  }
  .music-player {
    position: relative;
    top: 0.5rem;
    .music-player-info {
      display: flex;
      justify-content: space-between;
      .slider-bar {
        position: relative;
        top: 0.3rem;
        width: 70%;
      }
    }
    .music-player-button {
      display: flex;
      justify-content: space-between;
      .content {
        display: flex;
        justify-content: space-between;
        width: 70%;
        i {
          cursor: pointer;
          font-size: 2rem;
        }
        .volume-slider {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
