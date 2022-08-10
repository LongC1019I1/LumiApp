<template>
  <div
    class="song-item m-0 p-2 mb-2 row c-p"
    @click.prevent="PlaySong"
    :class="{active:currentOnlineSong==songid}"
  >
    <div class="col-7 px-2 text-overflow-hidden">
      <span>{{index+1}}</span>
      <img class="mx-3" :src="song.thumb?song.thumb:'static/img/base-music.jpg'">
      <span>{{song.name||'Unknown'}}</span>
    </div>
    <div class="col text-overflow-hidden">
      <span>{{song.artist||'Unknown'}}</span>
    </div>
    <div class="col action pr-2">
      <span class="pull-right">
        <i class="mdi mdi-heart text-danger" @click.prevent.stop="updateLoveSong"></i>
        <i class="mdi" :class="currentOnlineSong==songid?'mdi-pause':'mdi-play'"></i>
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
    songid: String,
    index: Number
  },
  data() {
    return {
      song: {
        thumb: "",
        name: "",
        artist: "",
        id: ""
      },
    };
  },
  computed: {
    currentOnlineSong,
    listLoveSong
  },
  methods: {
    updateLoveSong,
    PlaySong
  },
  mounted() {
    $dispatch($api.HCMusic.getOnlineSongInfo, this.songid).then(result => {
      result = JSON.parse(result);
      if (result.err && !result.data) return;
      console.log(result);
      this.song.thumb = result.data.thumbnail;
      this.song.name = result.data.title;
      this.song.artist = result.data.artist.name;
      this.song.id = result.data.id;
    });
  }
};

function listLoveSong() {
  return $getters['HCMusic/getMylistLoveSong']($state.Customer.customerData.id)
}

function currentOnlineSong() {
  return $state.HCMusic.currentOnlineSong;
}

function updateLoveSong() {
  let customerID = $state.Customer.customerData.id;
  $commit("HCMusic/UPDATE_LOVE_SONG", { customerID, songid: this.songid });
  return;
}

function PlaySong() {
  let devid = $state.ContentManager.currentSpeaker;
  if (!devid)
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("dashboard.text.chooseSpeaker")
    });
  $commit("HCMusic/UPDATE_CURENT_ONLINE_SONG", this.songid);
  $dispatch($api.HomeControll.controllDevice, {
    devid,
    execution: {
      command: DEVICE_TRAIT.ConfigSpeaker,
      params: {
        configCmd: SPEAKER_CONFIG_CMD.PLAY_URL,
        value: {
          url: `http://api.mp3.zing.vn/api/streaming/audio/${this.song.id}/128`,
          title: this.song.name,
          artist: this.song.artist
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