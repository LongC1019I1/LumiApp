<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-input modal-width-md modal-list-room modal-full-height"
    bodyClasses="px-5 pt-3"
    :backdropClick="false"
    @close="$emit('closeModal')"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{ $t("scene.chooseRoom") }}</span>
      <i
        class="pull-right c-p mdi mdi-window-close pull-right"
        @click="$emit('closeModal')"
      ></i>
    </div>
    <template v-for="floor in listRoombyFloor">
      <div
        class="room px-2 py-1 border-radius-1 mb-2 c-p"
        v-for="room in floor.roomList"
        :key="room.roomid"
        @click="toggleRoom(room.roomid)"
        :class="{ active: selectedRoom.includes(room.roomid) }"
      >
        <div>{{ floor.floorName }} - {{ room.name }}</div>
        <div class="w-max">
          <i
            class="mdi"
            :class="
              selectedRoom.includes(room.roomid)
                ? 'mdi-checkbox-marked'
                : 'mdi-checkbox-blank-outline'
            "
          ></i>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import { GROUP_TYPE } from "@/plugins/variableConst";
export default {
  name: "modal-add-deivce",
  props: {
    isShowModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    listRoombyFloor,
    selectedRoom,
  },
  methods: {
    toggleRoom,
  },
};

function listRoombyFloor() {
  return $getters["HomeConfig/getFillterRoomsByFloor"];
}

function selectedRoom() {
  return $state.RuleManager.rooms;
}

function toggleRoom(roomid) {
  let currentSelectedRoom = [...this.selectedRoom];
  let index = currentSelectedRoom.findIndex((item) => item === roomid);
  if (index != -1) currentSelectedRoom.splice(index, 1);
  else currentSelectedRoom.push(roomid);
  $commit("RuleManager/SET_DATA", { rooms: currentSelectedRoom });
}
</script>

<style lang="scss"></style>
