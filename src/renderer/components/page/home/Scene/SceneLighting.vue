<template>
  <card id="sceneLighting" class="bg-transparent" bodyClasses="p-0 m-0">
    <template #header>
      <div class="left-box"></div>
      <div v-if="ruleid" class="right-box">
        <base-button type="secondary" @click="submit">{{$t('save')}}</base-button>
        <base-button type="secondary" @click="removeSelectedScene">{{$t('cancel')}}</base-button>
      </div>
      <div v-else class="right-box">
        <base-button type="secondary" @click="submit">{{$t('scene.addScene')}}</base-button>
      </div>
    </template>
    <div
      class="scene-info-box"
      :class="{'input-error':sceneNameError}"
      @click="$refs.sceneName.focus()"
    >
      <div class="label">{{$t('scene.sceneName')}}</div>
      <div class="info">
        <input
          ref="sceneName"
          type="text"
          maxlength="5"
          class="text-right"
          v-model="currentSceneName"
          @input="sceneNameError=currentSceneName?'':$t('scene.pleaseEnterFloorName')"
        >
      </div>
    </div>
    <span class="text-error">{{sceneNameError}}&nbsp;</span>
    <base-dropdown class="scene-lighting-dropdown w-100" position="right">
      <template #title>
        <div class="scene-info-box">
          <div class="label">{{$t('scene.deviceType')}}</div>
          <div class="info">
            {{curentDeviceType}}
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        v-for="deviceType in TYPE_DEVICE_GROUP_LIGHTING"
        :key="deviceType"
        class="dropdown-item"
        @click="curentDeviceType=deviceType"
      >{{deviceType}}</div>
    </base-dropdown>
    <base-dropdown class="scene-lighting-dropdown w-100 dropdown-icon mt-4" position="right">
      <template #title>
        <div class="scene-info-box">
          <div class="label">{{$t('scene.icon')}}</div>
          <div class="info">
            <i class="scene-icon" :class="'icon-'+currentIconType.icon"></i>
            <span>{{$t('devices.'+currentIconType.icon)}}</span>
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        class="dropdown-item"
        v-for="icon in ICON_LIGHTING"
        :key="icon.id"
        @click="currentIconType=icon"
      >
        <i :class="'icon-'+icon.icon"></i>
        {{$t('devices.'+icon.icon)}}
      </div>
    </base-dropdown>
    <div v-if="ruleid">
      <table id="tableDevice" class="table mt-4">
        <thead>
          <tr>
            <th>STT</th>
            <th>{{ $t("deviceList.text.nameDevice") }}</th>
            <th>{{ $t("room") }}</th>
            <th>Mac</th>
            <th>{{$t("deviceList.text.status")}}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <device-row-lighting :device="$store.state.HomeConfig.devices[0]" :index="1"/>
          <tr>
            <td colspan="6">
              <base-button
                id="addDeviceButton"
                class="pull-right"
                size="md"
                type="secondary"
                @click="$emit('showModalAddDeviceLighting')"
              >{{$t('scene.addDevice')}}</base-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="scene-info-box mt-4" :class="{'input-error':sceneNameError}">
        <div class="label">{{$t('scene.checkScene')}}</div>
        <div class="info">
          <base-slider size="md" class="mb-0"></base-slider>
        </div>
      </div>
      <base-dropdown class="scene-lighting-dropdown w-100 mt-4" position="right">
        <template #title>
          <div class="scene-info-box">
            <div class="label">{{$t('scene.selectRoom')}}</div>
            <div class="info">
              {{floorList.find(item=>item.floorid==currentRoom.floorid)?floorList.find(item=>item.floorid==currentRoom.floorid).name:'???'}} - {{currentRoom.name}}
              <i
                class="dropdown-icon mdi mdi-menu-down"
              ></i>
            </div>
          </div>
        </template>
        <template v-for="floor in listRoombyFloor">
          <div
            v-for="room in floor.roomList"
            :key="room.roomid"
            class="dropdown-item"
            @click="currentRoom=room"
          >{{floorList.find(item=>item.floorid==room.floorid)?floorList.find(item=>item.floorid==room.floorid).name:'???'}} - {{room.name}}</div>
        </template>
      </base-dropdown>
      <div class="scene-info-box mt-4" :class="{'input-error':sceneNameError}">
        <div class="label">{{$t('scene.createShortcut')}}</div>
        <div class="info">
          <base-slider size="md" class="mb-0"></base-slider>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import {
  getDefaultIconDevice,
} from "@/plugins/helper";
import {
  TYPE_DEVICE_GROUP_LIGHTING,
  ICON_LIGHTING,
  GROUP_TYPE
} from "@/plugins/variableConst";
import DeviceRowLighting from "./Element/TableRow/GroupLighting";

let deviceTypeSelectOption = [];
let deviceIconSelectOption = [];
export default {
  name: "scene-lighting",
  props: {
    ruleid: [Boolean, String]
  },
  data() {
    return {
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator"
      },
      roomList: $state.HomeConfig.rooms,
      floorList: $state.HomeConfig.floors,
      deviceTypeSelectOption,
      deviceIconSelectOption,
      currentSceneName: "",
      sceneNameError: "",
      curentDeviceType: TYPE_DEVICE_GROUP_LIGHTING[0],
      currentIconType: ICON_LIGHTING[0],
      currentRoom: $state.HomeConfig.rooms[0],
      TYPE_DEVICE_GROUP_LIGHTING,
      ICON_LIGHTING
    };
  },
  components: {
    DeviceRowLighting
  },
  computed: {
    listRoombyFloor
  },
  watch: {
    ruleid
  },
  methods: {
    submit,
    removeSelectedScene
  }
};
function ruleid() {
  let scene = $state.HomeConfig.scenes.find(
    item => item.ruleid === this.ruleid
  );
  this.sceneNameError = "";
}

function listRoombyFloor() {
  return $getters["HomeConfig/getFillterRoomsByFloor"];
}

function submit() {
  if (!this.currentSceneName) {
    this.sceneNameError = this.$t("scene.pleaseEnterFloorName");
    return;
  }
  let { deviceType, traits } = getSceneTraitByType(this.curentDeviceType.id);

  let newScene = {
    name: this.currentSceneName,
    enable: 1,
    deviceType,
    traits,
    type: GROUP_TYPE.lightingScene,
    iconkey: this.currentIconType.icon
  };
  $dispatch($api.HomeConfig.addScenes, [newScene]);
}

function removeSelectedScene() {
  this.$emit("removeSelectedScene");
}
</script>

<style lang="scss">
#sceneLighting {
  .card-header {
    display: flex;
    justify-content: space-between;
    padding: 0 0 1rem 0;
    & > div {
      display: flex;
      width: 50%;
    }
    .left-box {
      justify-content: flex-start;
      #selectScene {
        max-width: 400px;
        width: 70%;
      }
    }
    button {
      z-index: 20;
      border-radius: 20px !important;
      text-align: left !important;
      text-transform: none;
      font-weight: 100;
      border: none;
      height: 2.5rem;
      margin-left: 1rem;
    }
    .right-box {
      justify-content: flex-end;
      .search {
        position: relative;
        max-width: 400px;
        width: 50%;
        margin-right: 3rem;
        .form-scene {
          float: left;
          margin-left: 5%;
          width: 95%;
          input {
            border-radius: 20px;
            border: none;
            padding-left: 3.5em;
            color: white;
            height: 43px;
          }
        }
        i {
          position: absolute;
          left: 4%;
          top: 0;
          font-size: 28px;
          margin-left: 15px;
        }
      }
    }
  }
  .card-body {
    .scene-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      .label {
        margin: 0.5rem;
      }
      .info {
        position: relative;
        padding-right: 1rem;
        input {
          text-align: right;
          border: none;
          outline: none;
        }
        .dropdown-icon {
          font-size: 1.5rem;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -1rem;
        }
        .switch {
          vertical-align: middle;
        }
      }
    }
    #tableDevice {
      border-collapse: collapse;
      border-radius: 0.5rem;
      overflow: hidden;
      th,
      td {
        text-align: center;
      }
      button {
        border-radius: 1rem;
        font-size: 1rem;
        font-weight: 100;
        padding: 0.1rem 1rem;
        margin-right: 1rem;
        &#addDeviceButton {
          padding: 0.1 1rem;
          height: 2.5rem;
          border-radius: 1.25rem;
        }
      }
    }
  }
}
</style>
