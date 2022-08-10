<template>
  <card id="floorManager" header-classes="p-0">
    <h5 slot="header">
      <icon class="mdi mdi-office-building-outline"></icon>
      <span>{{
        $store.state.Home.currentHome && $store.state.Home.currentHome.name
      }}</span>
    </h5>
    <div
      v-for="floor in homeinfo_floors"
      :key="floor.floorid"
      class="mb-3"
      :ref="'floor' + floor.floorid"
    >
      <!-- <div @dblclick="editFloor(floor.floorid, floor.name)" class="floor pr-2"> -->
      <div class="floor pr-2">
        <div
          class="name text-overflow-hidden w-100"
          @click="toggleShowRoom(floor.floorid)"
          @dblclick="$emit('showModalEditFloor', floor.floorid, floor.name)"
        >
          <i class="mdi mdi-layers px-2 c-p"></i>
          <span class="text-overflow-hidden">{{ floor.name }}</span>
        </div>
        <div class="option">
          <div @click="$emit('showModalAddRoom', floor.floorid)">
            <div class="tooltip-hover">{{ $t("roomFloor.text.addRoom") }}</div>
            <i class="fa fa-plus-circle" />
          </div>
          <div
            @click="$emit('showModalEditFloor', floor.floorid, floor.name)"
          >
            <div class="tooltip-hover">
              {{ $t("roomFloor.text.editFloor") }}
            </div>
            <i class="fa fa-edit" />
          </div>
          <div @click="delFloor(floor.floorid)">
            <div class="tooltip-hover">
              {{ $t("roomFloor.text.deleteFloor") }}
            </div>
            <i class="fa fa-trash" />
          </div>
        </div>
      </div>
      <Room :floorId="floor.floorid" @showModalEditRoom="showModalEditRoom" />
    </div>
    <base-button class="buttonAddFloor" @click="$emit('showModalAddFloor')">{{
      $t("roomFloor.text.addFloor")
    }}</base-button>
  </card>
</template>

<script>
import Room from "./Element/Room";
export default {
  name: "floorManager",
  computed: {
    homeinfo_floors,
  },
  methods: {
    delFloor,
    toggleShowRoom,
    showModalEditRoom,
  },
  components: {
    Room,
  },
};

function homeinfo_floors() {
  return $state.HomeConfig.floors;
}

async function delFloor(floorid) {
  let room = $getters["HomeConfig/getRoomsByFloorId"](floorid);
  if (room.length !== 0) {
    return $alertify.confirm({
      text: this.$t("roomFloor.message.errorDeleteFloor1"),
      title: this.$t("notify.notifyDefautlTitle"),
    });
  }

  let confirm = await $alertify.custom({
    title: this.$t("notify.notifyWarninglTitle"),
    text: this.$t("roomFloor.message.confirmDeleteFloor"),
    showCancelButton: true,
    cancelButtonText: this.$t("cancel"),
    confirmButtonText: this.$t("confirm"),
  });
  if (!confirm.isConfirmed) return;
  $dispatch($api.HomeConfig.deleteFloor, {
    floorid: floorid,
  });
}

function toggleShowRoom(e) {
  this.$refs[`floor${e}`][0].classList.toggle("show-roomlist");
  return;
}

function showModalEditRoom(roomid, name) {
  this.$emit("showModalEditRoom", roomid, name);
}
</script>

<style lang="scss">
#floorManager {
  .floor {
    border-radius: 2rem;
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    .name {
      display: flex;
      align-items: baseline;
      align-items: center;
      i {
        font-size: 1.5rem;
      }
    }
    .option {
      transition: min-width 0.5s;
      width: 0rem;
      min-width: 0rem;
      display: flex;
      align-items: center;
      overflow: hidden;
      & > div {
        // position: relative;
        min-width: 1.5rem;
        min-height: 1.5rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-color: #4a4a44 !important;
          .tooltip-hover {
            display: block;
          }
        }
        .tooltip-hover {
          clear: both;
          position: absolute;
          top: 2rem;
          right: 5%;
          height: 22px;
          width: max-content;
          padding: 0 5px;
          box-sizing: border-box;
          text-align: center;
          font-size: 11.5px;
          border-radius: 6px;
          line-height: 22px;
          display: none;
          z-index: 1000;
        }
      }
    }
    &:hover {
      .option {
        min-width: 4.5rem;
      }
    }
  }
  .buttonAddFloor {
    height: 2.5rem;
    width: 100%;
    border-radius: 1.25rem;
  }
}
</style>
