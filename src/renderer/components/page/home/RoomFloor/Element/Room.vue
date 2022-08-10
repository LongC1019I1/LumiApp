<template>
  <div class="box-room">
    <div v-for="(room, index) in roomList" :key="index">
      <div
        class="room c-p"
        :class="{ active: room.roomid == selectedRoomID }"
      >
        <div
          class="text-overflow-hidden name w-100"
          @dblclick="$emit('showModalEditRoom', room.roomid, room.name)"
          @click="selectRoom(room.roomid)"
        >
          <span class="text-overflow-hidden">{{ room.name }}</span>
        </div>
        <div class="option mr-2">
          <div @click="$emit('showModalEditRoom', room.roomid, room.name)">
            <div class="tooltip-hover">{{ $t("roomFloor.text.editRoom") }}</div>
            <i class="fa fa-edit" />
          </div>
          <div>
            <div class="tooltip-hover uploadImageRoom">
              {{ $t("roomFloor.text.addRoomImage") }}
            </div>
            <label :for="'file-input-' + room.roomid" class="mb-1">
              <i class="fa fa-camera" />
            </label>
            <input
              class="d-none"
              :id="'file-input-' + room.roomid"
              ref="file"
              accept="image/*"
              v-on:change="uploadImage(room.roomid)"
              type="file"
            />
          </div>
          <div @click="deleteRoom(room.roomid)">
            <div class="tooltip-hover">
              {{ $t("roomFloor.text.deleteRoom") }}
            </div>
            <i class="fa fa-trash" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Room",
  methods: {
    deleteRoom,
    uploadImage,
    selectRoom,
  },
  props: ["floorId"],
  computed: {
    roomList,
    selectedRoomID,
  },
};

function roomList() {
  return $getters["HomeConfig/getRoomsByFloorId"](this.floorId);
}
function selectedRoomID() {
  return $state.ContentManager.roomFloor.selectedRoomID;
}

function selectRoom(roomid) {
  $commit("ContentManager/ROOM_FLOOR_SET_SELECTED_ROOMID", roomid);
}

async function deleteRoom(roomid) {
  let confirm = await $alertify.custom({
    title: this.$t("notify.notifyWarninglTitle"),
    text: this.$t("roomFloor.message.confirmDeleteRoom"),
    showCancelButton: true,
    cancelButtonText: this.$t("cancel"),
    confirmButtonText: this.$t("confirm"),
  });

  if (!confirm.isConfirmed) return;

  $dispatch($api.HomeConfig.deleteRoom, {
    roomid,
  });
  if (roomid == this.selectedRoomID)
    $commit("ContentManager/ROOM_FLOOR_SET_SELECTED_ROOMID", "");
}

async function uploadImage(roomId) {
  let files = document.getElementById("file-input" + "-" + roomId).files[0];
  let uploadFileResponse = await $dispatch($api.Media.uploadFile, {
    files,
  });
  if (uploadFileResponse && uploadFileResponse.success) {
    $dispatch($api.HomeConfig.updateRoom, {
      roomid: roomId,
      updateData: {
        image: uploadFileResponse.data.files[0],
      },
    });
  }
}
</script>

<style scoped lang="scss">
.show-roomlist {
  .box-room {
    display: inherit;
    // max-height: 2rem;
  }
}
.box-room {
  padding-left: 2rem;
  // margin-bottom: 1rem;
  position: relative;
  display: none;
  // max-height: 0rem;
  transition: max-height 0.5s;
  // overflow: hidden;
  .room {
    margin: 0.5rem 0;
    border-radius: 2rem;
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-left: 1rem;
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
  & > div {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -1rem;
      top: -1.7rem;
      height: 3rem;
      width: 10%;
      z-index: 0;
      border-bottom: 1px dotted white;
      border-left: 1px dotted white;
    }
  }
}
</style>
