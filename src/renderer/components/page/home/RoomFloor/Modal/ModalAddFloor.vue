<template>
  <modal
    :show.sync="isShowModalAddFloor"
    :showClose="false"
    modalClasses="modal-input"
    footerClasses="p-0"
    @close="closeModal"
  >
    <h5 class="text-center">{{$t('roomFloor.title.floorInfo')}}</h5>
    <base-checkbox class="my-3" v-model="isAddMultiFloor">{{$t('roomFloor.text.multiFloor')}}</base-checkbox>
    <div v-if="isAddMultiFloor">
      <div v-for="(newFloor,index) in newFloors" :key="index">
        <base-input
          :inputID="'floorNameInput'+index"
          maxlength="30"
          type="text"
          :inputClasses="newFloor.error?'input-error':''"
          :placeholder="$t('roomFloor.text.enterFloorName')"
          v-model="newFloor.name"
          class="mb-0"
          @input="checkInput(newFloor)"
          @onEnter="addFloor"
        />
        <span class="text-error">{{newFloor.error}}&nbsp;</span>
      </div>
      <base-button
        class="container buttonAddFloor"
        @click="newFloors.push({name:'', error:''})"
      >{{$t('roomFloor.text.addFloor')}}</base-button>
    </div>
    <div v-else>
      <base-input
        inputID="floorNameInput"
        maxlength="30"
        type="text"
        :placeholder="$t('roomFloor.text.enterFloorName')"
        v-model="newFloors[0].name"
        class="mb-0"
        @input="checkInput(newFloors[0])"
        :inputClasses="newFloors[0].error?'input-error':''"
        @onEnter="addFloor"
      />
      <span class="text-error">{{newFloors[0].error}}&nbsp;</span>
    </div>
    <template slot="footer">
      <base-button @click="addFloor">{{$t('confirm')}}</base-button>
      <base-button class="ml-auto" @click="closeModal">{{$t('cancel')}}</base-button>
    </template>
  </modal>
</template>

<script>
export default {
  name: "modal-add-floor",
  props: {
    isShowModalAddFloor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAddMultiFloor: false,
      newFloors: [
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
    addFloor,
    closeModal
  },
  watch: {
    isShowModalAddFloor: focusInput,
    isAddMultiFloor: focusInput
  }
};

function checkInput(data) {
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let floorName = data.name.trim();
  // if (!roomName)
  //   data.error = this.newRooms[0].error = this.$t(
  //     "roomFloor.message.pleaseEnterRoomName"
  //   );
  // else
  if (format.test(floorName))
    data.error = this.$t("roomFloor.message.floorNoSpecialCharacter");
  else data.error = "";
}

function addFloor() {
  let floorData = false;
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (this.isAddMultiFloor) {
    let check = true;
    this.newFloors.forEach(item => {
      if (format.test(item.name)) {
        item.error = this.$t("roomFloor.message.floorNoSpecialCharacter");
        check = false;
      } else item.error = "";
    });
    if (check)
      floorData = this.newFloors
        .filter(item => item.name.trim())
        .map(item => {
          return { name: item.name.trim() };
        });
  } else {
    if (this.newFloors[0].name.trim()) {
      if (format.test(this.newFloors[0].name)) {
        this.newFloors[0].error = this.$t(
          "roomFloor.message.floorNoSpecialCharacter"
        );
        return;
      }
      this.newFloors[0].error = "";
      floorData = [{ name: this.newFloors[0].name.trim() }];
    } else {
      this.newFloors[0].error = this.$t(
        "roomFloor.message.pleaseEnterFloorName"
      );
    }
  }

  if (floorData && floorData.length) {
    $dispatch($api.HomeConfig.addFloors, floorData);
    closeModal.call(this);
  } else {
    this.newFloors[0].error = this.$t("roomFloor.message.pleaseEnterFloorName");
    return;
  }
}

function closeModal() {
  this.isAddMultiFloor = false;
  this.newFloors = [
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
    if (this.isAddMultiFloor)
      document.getElementById("floorNameInput0").focus();
    else document.getElementById("floorNameInput").focus();
  }, 300);
}
</script>

<style scoped lang="scss">
</style>
