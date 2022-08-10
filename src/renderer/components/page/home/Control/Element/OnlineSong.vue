<template>
  <div class="online-song-list col-8 h-100 pr-4">
    <div class="box-search">
      <i class="mdi mdi-magnify px-3"></i>
      <input
        type="text"
        :placeholder="$t('dashboard.title.searchSong')"
        v-model="inputSearch"
        @keyup.enter="searchSong"
      >
    </div>


    <h5>
      <i class="mdi mdi-playlist-music"></i>
      <span class="ml-1">{{$t('dashboard.title.topSong')}}</span>
    </h5>
    <div class="top-song-carousel">
      <span class="go-left c-p" @click="scrollListTopSong(-200)">
        <i class="mdi mdi-chevron-left"></i>
      </span>
      <horizontal-scroll
        ref="topListSong"
        v-dragscroll
        class="overflow-x-auto hidden-scroll pr-3 list-online-top-song"
      >
        <div
          v-for="song in onlineTopSong"
          :key="song.id"
          class="song-item c-p"
          @click="playSong(song)"
        >
          <img :src="song.thumbnail||'static/img/base-music.jpg'">
          <i class="mdi mdi-play"></i>
        </div>
      </horizontal-scroll>
      <span class="go-right c-p" @click="scrollListTopSong(200)">
        <i class="mdi mdi-chevron-right"></i>
      </span>
    </div>
    <div class="meta-list overflow-y-auto mt-2 pr-3">
      <div class="top-search" v-if="searchTopSongList.length">
        <h5>
          <i class="mdi mdi-playlist-play"></i>
          <span class="ml-1">{{$t('dashboard.title.topSearch')}}</span>
        </h5>
        <online-song-info
          v-for="(song, index) in searchTopSongList"
          :index="index"
          :key="song.id"
          :song="song"
          :isLoveSong="listLoveSong.includes(song.id)"
        />
      </div>
      <div>
        <h5>
          <i class="mdi mdi-playlist-plus"></i>
          <span class="ml-1">{{$t('dashboard.title.playSong')}}</span>
        </h5>
        <template v-if="searchSongList.length">
          <online-song-info
            v-for="(song, index) in searchSongList"
            :index="index"
            :key="song.id"
            :song="song"
            :isLoveSong="listLoveSong.includes(song.id)"
          />
        </template>
        <h5 v-else class="text-center text-blur">{{$t('dashboard.text.searchSong')}}</h5>
      </div>
      <div class="love-song">
        <h5>
          <i class="mdi mdi-heart-outline"></i>
          <span class="ml-1">{{$t('dashboard.title.loveSong')}}</span>
        </h5>
        <template v-if="listLoveSong.length">
          <online-love-song-info
            v-for="(songid, index) in listLoveSong"
            :index="index"
            :key="songid"
            :songid="songid"
          />
        </template>
        <h5 v-else class="text-center text-blur">{{$t('dashboard.text.lovePlaylist')}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import OnlineSongInfo from "./OnlineSongInfo";
import OnlineLoveSongInfo from "./OnlineLoveSongInfo";
import {
  DEVICE_TRAIT,
  PLAY_CONTROL,
  SPEAKER_CONFIG_CMD
} from "@/plugins/variableConst";
export default {
  name: "online-song",
  data() {
    return {
      inputSearch: "",
      // onlineTopSong: $state.HCMusic.onlineTopSong,
      searchSongList: [],
      searchTopSongList: []
    };
  },
  computed: {
    onlineTopSong,
    listLoveSong
  },
  components: {
    OnlineSongInfo,
    OnlineLoveSongInfo
  },
  methods: {
    searchSong,
    playSong,
    scrollListTopSong
  },
  beforeMount() {
    $dispatch($api.HCMusic.getTopPlayListOnline);
  },
  beforeDestroy() {
    $commit("HCMusic/UPDATE_CURENT_ONLINE_SONG", false);
  }
};

function onlineTopSong() {
  return $state.HCMusic.onlineTopSong;
}

function listLoveSong() {
  return $getters['HCMusic/getMylistLoveSong']($state.Customer.customerData.id)
}

function searchSong() {
  $dispatch(
    $api.HCMusic.getOnlineMusicSearch,
    encodeURI(this.inputSearch)
  ).then(result => {
    if (result.listSearch && result.listSearch.data)
      this.searchSongList = result.listSearch.data[0].song;
    if (
      result.topSearch &&
      result.topSearch.data &&
      result.topSearch.data.top &&
      result.topSearch.data.top.length
    )
      this.searchTopSongList = result.topSearch.data.top.filter(
        item => item.type == 1
      );
  });
}

function playSong(song) {
  let devid = $state.ContentManager.currentSpeaker;
  if (!devid)
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("dashboard.text.chooseSpeaker")
    });

  $commit("HCMusic/UPDATE_CURENT_ONLINE_SONG", song.code);
  $dispatch($api.HomeControll.controllDevice, {
    devid,
    execution: {
      command: DEVICE_TRAIT.ConfigSpeaker,
      params: {
        configCmd: SPEAKER_CONFIG_CMD.PLAY_URL,
        value: {
          url: `http://api.mp3.zing.vn/api/streaming/audio/${song.id}/128`,
          title: song.title,
          artist: song.artist
            ? song.artist.name
            : song.artists[0]
            ? song.artists[0].name
            : "Unkown",
          album: (song.album && song.album.name) || "Unknown"
        }
      }
    }
  });
}

function scrollListTopSong(x) {
  this.$refs.topListSong.$el.scrollLeft += x;
}
</script>

<style lang="scss">
#speakerControll {
  .online-song-list {
    padding-left: 3rem;
    position: relative;
    .box-search {
      display: flex;
      height: 2.5rem;
      width: 300px;
      border-radius: 1.25rem;
      i {
        font-size: 1.5rem;
      }
    }
    .top-song-carousel {
      margin-right: 1.5rem;
      position: relative;
      & > div {
        display: flex;
      }
      .list-online-top-song {
        min-height: 120px;
        .song-item {
          position: relative;
          height: 120px;
          width: 120px;
          min-height: 120px;
          min-width: 120px;
          margin-right: 1rem;
          img {
            border-radius: 1rem;
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
          }
        }
      }
      .go-right,
      .go-left {
        font-size: 3rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .go-left {
        left: -2.5rem;
      }
      .go-right {
        right: -2.5rem;
      }
    }
    h5 i {
      font-size: 1.5rem;
    }

    .meta-list {
      max-height: calc(100% - 213px - 2rem);
    }
  }
}
</style>
