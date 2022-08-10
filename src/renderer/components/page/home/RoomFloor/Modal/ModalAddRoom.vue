<template>
  <modal
    :show.sync="isShowModalAddRoom"
    :showClose="false"
    modalClasses="modal-input"
    footerClasses="p-0"
    @close="closeModal"
  >
    <h5 class="text-center">{{$t('roomFloor.title.roomInfo')}}</h5>
    <base-checkbox class="my-3" v-model="isAddMultiRoom">{{$t('roomFloor.text.multiRoom')}}</base-checkbox>
    <div v-if="isAddMultiRoom">
      <div v-for="(newRoom,index) in newRooms" :key="index">
        <base-input
          :inputID="'roomNameInput'+index"
          maxlength="30"
          type="text"
          :placeholder="$t('roomFloor.text.enterRoomName')"
          v-model="newRoom.name"
          class="mb-0"
          :inputClasses="newRoom.error?'input-error':''"
          @input="checkInput(newRoom)"
          @onEnter="addRoom"
        />
        <span class="text-error">{{newRoom.error}}&nbsp;</span>
      </div>
      <base-button
        class="container buttonAddRoom"
        @click="newRooms.push({name:'', error:''})"
      >{{$t('roomFloor.text.addRoom')}}</base-button>
    </div>
    <div v-else>
      <base-input
        inputID="roomNameInput"
        maxlength="30"
        type="text"
        :placeholder="$t('roomFloor.text.enterRoomName')"
        v-model="newRooms[0].name"
        class="mb-0"
        @input="checkInput(newRooms[0])"
        :inputClasses="newRooms[0].error?'input-error':''"
        @onEnter="addRoom"
      />
      <span class="text-error">{{newRooms[0].error}}&nbsp;</span>
    </div>
    <template slot="footer">
      <base-button
        @click="addRoom"
      >{{$t('confirm')}}</base-button>
      <base-button class="ml-auto" @click="closeModal">{{$t('cancel')}}</base-button>
    </template>
  </modal>
</template>

<script>
export default {
  name: "modal-add-room",
  props: {
    isShowModalAddRoom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAddMultiRoom: false,
      floorid: "",
      newRooms: [
        {
          name: "",
          error: ""
        },
        {
          name: "",
          error: ""
        },
        {
          name: "",
          error: ""
        },
        {
          name: "",
          error: ""
        },
        {
          name: "",
          error: ""
        }
      ]
    };
  },
  methods: {
    checkInput,
    addRoom,
    closeModal
  },
  watch: {
    isShowModalAddRoom: focusInput,
    isAddMultiRoom: focusInput
  }
};

function checkInput(data) {
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let roomName = data.name.trim();
  // if (!roomName)
  //   data.error = this.newRooms[0].error = this.$t(
  //     "roomFloor.message.pleaseEnterRoomName"
  //   );
  // else
  if (format.test(roomName))
    data.error = this.$t("roomFloor.message.roomNoSpecialCharacter");
  else data.error = "";
}

function addRoom() {
  let roomData = false;
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (this.isAddMultiRoom) {
    let check = true;
    this.newRooms.forEach(item => {
      if (format.test(item.name)) {
        item.error = this.$t("roomFloor.message.roomNoSpecialCharacter");
        check = false;
      } else item.error = "";
    });
    if (check)
      roomData = this.newRooms
        .filter(item => item.name.trim())
        .map(item => {
          return { name: item.name.trim(), floorid: this.floorid };
        });
  } else {
    if (this.newRooms[0].name.trim()) {
      if (format.test(this.newRooms[0].name)) {
        this.newRooms[0].error = this.$t(
          "roomFloor.message.roomNoSpecialCharacter"
        );
        return;
      }
      this.newRooms[0].error = "";
      roomData = [
        { name: this.newRooms[0].name.trim(), floorid: this.floorid }
      ];
    } else {
      this.newRooms[0].error = this.$t("roomFloor.message.pleaseEnterRoomName");
    }
  }
  if (roomData&&roomData.length) {
    $dispatch($api.HomeConfig.addRooms, roomData);
    closeModal.call(this);
  }else{
    this.newRooms[0].error = this.$t(
          "roomFloor.message.pleaseEnterRoomName"
        );
  }
}

function closeModal() {
  this.isAddMultiRoom = false;
  this.newRooms = [
    {
      name: "",
      error: ""
    },
    {
      name: "",
      error: ""
    },
    {
      name: "",
      error: ""
    },
    {
      name: "",
      error: ""
    },
    {
      name: "",
      error: ""
    }
  ];
  this.$emit("closeModal");
}

function focusInput() {
  setTimeout(() => {
    if (this.isAddMultiRoom)
      document.getElementById("roomNameInput0").focus();
    else document.getElementById("roomNameInput").focus();
  }, 300);
}
</script>

<style scoped lang="scss">
</style>
