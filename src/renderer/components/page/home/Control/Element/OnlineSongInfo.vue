<template>
  <div class="song-item m-0 p-2 mb-2 row c-p" @click.prevent="PlaySong" :class="{active:currentOnlineSong==realKey}">
    <div class="col-7 px-2 text-overflow-hidden">
      <span>{{index+1}}</span>
      <img
        class="mx-3"
        :src="song&&song.thumb?'https://photo-resize-zmp3.zadn.vn/'+song.thumb:'static/img/base-music.jpg'"
      >
      <span>{{song&&song.name||song.title}}</span>
    </div>
    <div class="col text-overflow-hidden">
      <span>{{song&&song.artist||'Unknown'}}</span>
    </div>
    <div class="col action pr-2">
      <span class="pull-right">
        <i
          class="mdi mdi-heart"
          :class="{'text-danger':listLoveSong.includes(this.realKey)}"
          @click.prevent.stop="updateLoveSong"
        ></i>
        <i class="mdi" :class="currentOnlineSong==realKey?'mdi-pause':'mdi-play'"></i>
      </span>
    </div>
  </div>
</template>

<script>
import {
  SPEAKER_CONFIG_CMD,
  DEVICE_TRAIT
} from "@/plugins/variableConst";
export default {
  name: "online-song-info",
  props: {
    song: Object,
    index: Number,
  },
  data() {
    return {
      realKey: "",
    };
  },
  computed:{
    currentOnlineSong,
    listLoveSong
  },
  methods: {
    updateLoveSong,
    PlaySong
  },
  mounted() {
    $dispatch($api.HCMusic.getRealKey, this.song.id).then(
      realKey => (this.realKey = realKey)
    );
  }
};

function listLoveSong() {
  return $getters['HCMusic/getMylistLoveSong']($state.Customer.customerData.id)
}

function currentOnlineSong(){
  return $state.HCMusic.currentOnlineSong
}

async function updateLoveSong() {
  let customerID = $state.Customer.customerData.id;
  // let realkey = await $dispatch($api.HCMusic.getRealKey, this.song.id);
  $commit("HCMusic/UPDATE_LOVE_SONG", { customerID, songid: this.realKey });
  return;
}

function PlaySong() {
  let devid = $state.ContentManager.currentSpeaker;
  if (!devid)
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("dashboard.text.chooseSpeaker")
    });
  $commit('HCMusic/UPDATE_CURENT_ONLINE_SONG', this.realKey)
  $dispatch($api.HomeControll.controllDevice, {
    devid,
    execution: {
      command: DEVICE_TRAIT.ConfigSpeaker,
      params: {
        configCmd: SPEAKER_CONFIG_CMD.PLAY_URL,
        value: {
          url: `http://api.mp3.zing.vn/api/streaming/audio/${this.song.id}/128`,
          title: this.song&&this.song.name
        }
      }
    }
  });
  return;
}
</script>

<style lang="scss">
#speakerControll {
  .online-song-list {
    .meta-list {
      .song-item,
      .song-item > div {
        display: flex;
        border-radius: 0.5rem;
        align-items: center;
        img {
          width: 2rem;
          height: 2rem;
          min-width: 2rem;
          min-height: 2rem;
          border-radius: 0.3rem;
        }
        .action {
          max-width: max-content;
        }
      }
    }
  }
}
</style>