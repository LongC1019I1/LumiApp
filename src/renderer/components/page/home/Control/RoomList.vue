<template>
  <card id="floorControll">
    <horizontal-scroll ref="scrollHeader" slot="header" v-dragscroll class="overflow-hidden list-floor">
      <template v-for="floor in listFloors">
        <span
          :ref="floor.floorid"
          v-if="floor.roomList&&floor.roomList.length"
          class="mr-3 c-p"
          :class="{'active':floor&&floor.floorid == floorid}"
          v-on:click="floorid = floor.floorid"
          :key="floor.floorid"
        >{{ floor.name }}</span>
      </template>
    </horizontal-scroll>

    <div slot="header" class="dropdown floor-list-dropdown ml-2">
      <i class="mdi mdi-dots-horizontal c-p"></i>
      <div class="dropdown-content py-3">
        <div class="h-100 overflow-y-auto">
          <template v-for="floor in listFloors">
            <a
              v-if="floor.roomList&&floor.roomList.length"
              class="dropdown-item c-p"
              v-on:click="selectFloor(floor.floorid)"
              :key="floor.floorid"
            >{{ floor.name }}</a>
          </template>
        </div>
      </div>
    </div>

    <div class="room h-100">
      <room
        v-for="(room,index) in listRooms"
        :key="index"
        :room="room"
        @click.native="selectRoom(room.roomid)"
      ></room>
    </div>
  </card>
</template>

<script>
import Room from "./Element/Room";
export default {
  name: "music-box",

  data() {
    return {
      floorid: ""
    };
  },
  components: {
    Room
  },
  methods: {
    selectRoom,
    selectFloor
  },
  computed: {
    listFloors,
    listRooms
  },
  watch: {
    listFloors:mounted
  },
  mounted
};
function mounted() {
  this.floorid = this.listFloors[0] && this.listFloors[0].floorid;
}
//computed
function listFloors() {
  let listFloors = $getters["HomeConfig/getFillterRoomsHasDeviceByFloor"];
  return $getters["HomeConfig/getFillterRoomsHasDeviceByFloor"];
}

function listRooms() {
  let currentFloor = this.listFloors.find(
    item => item.floorid === this.floorid
  );
  if (currentFloor) return currentFloor.roomList;
  else return [];
}

function selectRoom(roomid) {
  $commit("ContentManager/ROOM_FLOOR_SET_SELECTED_ROOMID", roomid);
  $router.push({ name: "home-roomFloor" });
}

function selectFloor(floorid) {
  this.floorid = floorid
  this.$refs.scrollHeader.$el.scrollLeft = this.$refs[floorid][0].offsetLeft - this.$refs[floorid][0].offsetWidth
}
</script>

<style lang="scss">
#floorControll {
  .card-header {
    display: flex;
    justify-content: space-between;

    .list-floor {
      height: 1.5rem;
    }
  }
  .room {
    .boxRoom {
      height: 90px;
      background-position: center;
      background-size: cover;
      background-blend-mode: soft-light;
      border-radius: 1rem;
      & > div {
        border-radius: 1rem;
        background-color: rgba($color: #000000, $alpha: 0.3);
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // -webkit-filter: blur(8px);
        // backdrop-filter: blur(8px);
        .boxSwitch {
          display: flex;
          margin-right: 1rem;

          .switch {
            margin: 0.5rem;
            opacity: 0.95;
            text-align: center;
            vertical-align: middle;
            height: 45px;
            width: 45px;
            line-height: 45px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}

/* The container <div> - needed to position the dropdown content */
</style>
