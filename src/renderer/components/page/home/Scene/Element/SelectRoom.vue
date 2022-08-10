<template>
  <div :rooms="rooms">
    <div class="scene-info-box mb-3 c-p" @click="isShowChooseRoomModal = true">
      <div class="label">{{ $t("scene.selectRoom") }}</div>
      <div class="info">{{ roomInfo }}</div>
    </div>
    <modal-choose-room
      :isShowModal="isShowChooseRoomModal"
      @closeModal="isShowChooseRoomModal = false"
    />
  </div>
</template>

<script>
import ModalChooseRoom from "../Modal/ChooseRoom";
import { ICON_SCENE } from "@/plugins/variableConst";

export default {
  name: "select-scene-room",
  props: {},
  data() {
    return {
      roomInfo: "",
      isShowChooseRoomModal: false,
    };
  },
  components: {
    ModalChooseRoom,
  },
  computed: { listRoombyFloor, rooms },
};
function rooms() {
  let rooms = $state.RuleManager.rooms;
  if (rooms.length === 1) {
    let currentRoom = $state.HomeConfig.rooms.find(
      (item) => item.roomid == rooms[0]
    );
    this.roomInfo = `${
      (
        $state.HomeConfig.floors.find(
          (item) => item.floorid == currentRoom.floorid
        ) || {}
      ).name
    } - ${currentRoom.name}`;
  } else
    this.roomInfo = `${this.$t("scene.numberRoomSelected", {
      number: rooms.length || 0,
    })}`;
  return rooms;
}
function listRoombyFloor() {
  return $getters["HomeConfig/getFillterRoomsByFloor"];
}
</script>

<style lang="scss">
</style>
 