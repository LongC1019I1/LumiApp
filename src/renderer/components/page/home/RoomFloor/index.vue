
<template>
  <div class="main-layout" id="roomFloor">
    <div class="floor-box">
      <floor-manager
        @showModalAddFloor="isShowModalAddFloor=true"
        @showModalAddRoom="showModalAddRoom"
        @showModalEditFloor="showModalEditFloor"
        @showModalEditRoom="showModalEditRoom"
      />
    </div>
    <div class="room-box">
      <room-manager
        v-if="homeinfo_floors.length&&selectedRoomID"
        :selectedRoomID="selectedRoomID"
        @openModalChooseScene="isShowModalChooseScene=true"
        @showModalEditRoom="showModalEditRoom"
      />
      <card v-else>
        <div class="justify-content-center tutorial-box">
          <div class="mb-3">
            <span>{{$t('roomFloor.text.noFloorText1')}}</span>
            <button class="demo-button">{{$t('roomFloor.text.addFloor')}}</button>
            <span>{{$t('roomFloor.text.noFloorText2')}}</span>
          </div>
          <div v-if="homeinfo_floors.length">
            <span>{{$t('roomFloor.text.noSelectRoomText1')}}</span>
            <button class="demo-button icon">
              <i class="fa fa-plus"></i>
            </button>
            <span>{{$t('roomFloor.text.noSelectRoomText2')}}</span>
          </div>
        </div>
      </card>
    </div>
    <modal-add-floor
      :isShowModalAddFloor="isShowModalAddFloor"
      @closeModal="isShowModalAddFloor=false"
    />
    <modal-add-room
      ref="addRoomModal"
      :isShowModalAddRoom="isShowModalAddRoom"
      @closeModal="isShowModalAddRoom=false"
    />
    <modal-edit-room
      ref="editRoomModal"
      :isShowModalEditRoom="isShowModalEditRoom"
      @closeModal="isShowModalEditRoom=false"
    />
    <modal-edit-floor
      ref="editFloorModal"
      :isShowModalEditFloor="isShowModalEditFloor"
      @closeModal="isShowModalEditFloor=false"
    />
    <modal-choose-sensor :roomid="selectedRoomID"/>
    <modal-choose-scene
      :roomid="selectedRoomID"
      :isShowModal="isShowModalChooseScene"
      @closeModal="isShowModalChooseScene=false"
    />
  </div>
</template>

<script>
import FloorManager from "./FloorManager";
import RoomManager from "./RoomManager";
//model
import ModalAddFloor from "./Modal/ModalAddFloor";
import ModalAddRoom from "./Modal/ModalAddRoom";
import ModalEditRoom from "./Modal/ModalEditRoom";
import ModalEditFloor from "./Modal/ModalEditFloor";
import ModalChooseSensor from "./Modal/ModalChooseSensor";
import ModalChooseScene from "./Modal/ModalChooseScene";

export default {
  name: "AddHome",
  data() {
    return {
      isShowModalAddFloor: false,
      isShowModalAddRoom: false,
      isShowModalEditFloor: false,
      isShowModalEditRoom: false,
      isShowModalChooseScene: false
    };
  },
  computed: {
    homeinfo_floors,
    selectedRoomID
  },
  components: {
    FloorManager,
    RoomManager,
    ModalAddFloor,
    ModalAddRoom,
    ModalEditRoom,
    ModalEditFloor,
    ModalChooseSensor,
    ModalChooseScene
  },
  methods: {
    showModalAddRoom,
    showModalEditRoom,
    showModalEditFloor
  },
  destroyed
};

function destroyed() {
  $commit("ContentManager/ROOM_FLOOR_SET_SELECTED_ROOMID", "");
}
function homeinfo_floors() {
  return $state.HomeConfig.floors || [];
}
function showModalAddRoom(floorid) {
  this.$refs.addRoomModal.floorid = floorid;
  this.isShowModalAddRoom = true;
}

function showModalEditRoom(roomid, name) {
  this.isShowModalEditRoom = true;
  this.$refs.editRoomModal.roomid = roomid;
  this.$refs.editRoomModal.roomName = name;
}

function showModalEditFloor(floorid, name) {
  this.isShowModalEditFloor = true;
  this.$refs.editFloorModal.floorid = floorid;
  this.$refs.editFloorModal.floorName = name;
}

function selectedRoomID() {
  return $state.ContentManager.roomFloor.selectedRoomID;
}
</script>

<style lang="scss" scoped>
#roomFloor {
  display: flex;
  .floor-box {
    width: 300px;
    max-width: 300px;
  }
  .room-box {
    padding-left: 1rem;
    width: calc(100% - 300px);
    .tutorial-box {
      width: fit-content;
      .demo-button {
        margin: 0 0.5rem;
        width: 250px;
        height: 2rem;
        border-radius: 1rem;
        text-transform: uppercase;
        &.icon {
          width: 2rem;
          i {
            font-size: 1rem;
          }
        }
      }
    }
  }
}
</style>
