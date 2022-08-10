<template>
  <card id="cameraList" headerClasses="p-0 mb-3" class="border-radius-3 h-100">
    <div slot="header" class="row menu-header m-0">
      <div
        @click="
          $emit(
            'updateViewName',
            $store.state.HomeConfig.cameras.length
              ? 'camera-view'
              : 'camera-form'
          );
          $emit('updateSelectedCamera', $store.state.HomeConfig.cameras.length?$store.state.HomeConfig.cameras[0].camid:false);
        "
        class="col-6 c-p"
        :class="{ active: viewName !== 'camera-licence' }"
      >
        {{ $t("secure.camera") }}
      </div>
      <div
        @click="
          $emit('updateViewName', 'camera-licence');
          $emit('updateSelectedCamera', false);
        "
        class="col-6 c-p"
        :class="{ active: viewName === 'camera-licence' }"
      >
        {{ $t("secure.license") }}
      </div>
    </div>
    <template v-if="viewName === 'camera-licence'">
      <div
        v-for="camera in listCameraHasLicence"
        :key="camera.camid"
        class="camera px-2 mb-3 c-p"
        :class="{
          active: selectedCamera === camera.camid,
          disabled: !camera.serialNumber,
        }"
      >
        <div
          class="name text-overflow-hidden px-2"
          @click="camera.serialNumber?$emit('updateSelectedCamera', camera.camid):''"
        >
          <div class="w-50 text-overflow-hidden">{{ camera.name }}</div>
          <div class="w-50 text-overflow-hidden text-right">
            {{
              camera.serialNumber
                ? camera.active === 1
                  ? $t("secure.activated")
                  : $t("secure.notActive")
                : $t("secure.notConected")
            }}
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        v-if="listCamera && listCamera.length"
        class="camera px-2 mb-4 c-p"
        :class="{
          active: !selectedCamera && viewName === 'camera-view',
        }"
        @click="$emit('updateSelectedCamera', false)"
      >
        <div class="name w-100 px-2 justify-between">
          <span>{{ $t("secure.viewAllCamera") }}</span>
          <span class="font-20 view-all-icon">
            <i class="mdi mdi-video"></i>
          </span>
        </div>
      </div>
      <div
        v-for="camera in listCamera"
        :key="camera.camid"
        class="camera px-2 mb-3 c-p"
        :class="{
          active: selectedCamera === camera.camid,
        }"
      >
        <div
          class="name text-overflow-hidden px-2"
          @click="$emit('updateSelectedCamera', camera.camid)"
        >
          <span class="text-overflow-hidden">{{ camera.name }}</span>
        </div>
        <div class="option c-p"></div>
      </div>
      <base-button
        class="buttonAddCamera"
        @click="
          $emit('updateSelectedCamera', false);
          $emit('updateViewName', 'camera-form');
        "
        >{{ $t("secure.addCamera") }}</base-button
      >
    </template>
  </card>
</template>

<script>
export default {
  name: "camera-list",
  props: {
    viewName: [String, Boolean],
    selectedCamera: [String, Boolean],
  },
  computed: {
    listCamera,
    listCameraHasLicence,
  },
};

function listCamera() {
  return $state.HomeConfig.cameras;
}

function listCameraHasLicence() {
  return $state.HomeConfig.cameras.filter((item) => item.type == 2);
}
</script>

<style lang="scss">
</style>
