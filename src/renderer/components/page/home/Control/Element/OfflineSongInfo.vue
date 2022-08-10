<template>
  <div class="song-item m-0 p-2 mb-2 row c-p" :class="{active: isActive}" @click="playMusic">
    <div class="col-8 px-2 text-overflow-hidden">
      <span>{{index+1}}</span>
      <span class="mx-2">
        <i class="mdi mdi-music-box-outline"></i>
      </span>
      <span>{{song.Title}}</span>
    </div>
    <div class="col-3">
      <span>{{song.Artist}}</span>
    </div>
    <div class="col-1 pr-2">
      <span class="pull-right">
        <i class="mdi" :class="isActive?'mdi-pause':'mdi-play'"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "offline-song-info",
  props: {
    index: Number,
    song: Object,
    isActive: Boolean
  },
  methods: {
    playMusic
  }
};

function playMusic() {
  $dispatch($api.HCMusic.playUsbDisk, this.index+1);
}
</script>

<style lang="scss">
#speakerControll {
  .offline-song-list {
    .song-item {
      border-radius: 0.5rem;
      justify-content: center;
    }
  }
}
</style>