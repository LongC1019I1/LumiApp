<template>
  <div class="device-item col" :class="{'shortcut':isShortcut}">
    <div class="fake-box c-p wave" @click="updateShortCut">
      <div class="content">
        <div class="icon">
          <i :class="'icon-'+icon"></i>
        </div>
        <div class="status">
          <div v-if="isShortcut">
            <i class="mdi mdi-check-bold"></i>
          </div>
          <div v-else></div>
        </div>
        <div class="name p-2">
          <div>{{device.name||"Thiết bị"}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDefaultIconDevice,
  getStatusDeviceFromVal
} from "@/plugins/helper";

export default {
  name: "base-device",
  props: {
    device: {
      type: Object
    }
  },
  data() {
    return {
      icon: "",
      isShortcut:
        this.device.shortcut_by_user &&
        this.device.shortcut_by_user[$state.Customer.customerData.id]
    };
  },
  methods: {
    updateShortCut
  },
  computed: {
    status
  },
  watch: {
    status,
    device: {
      handler(device) {
        let customer_id = $state.Customer.customerData.id;
        this.isShortcut =
          device.shortcut_by_user && device.shortcut_by_user[customer_id];
      },
      deep: true
    }
  }
};

function status() {
  status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.device.devid
  );
  if (status) {
    this.icon = getDefaultIconDevice(this.device, status.states);
  }
  return status;
}

function updateShortCut() {
  let customer_id = $state.Customer.customerData.id;
  let updateData = { shortcut_by_user: {} };
  if (
    this.device.shortcut_by_user &&
    this.device.shortcut_by_user[customer_id] == 1
  )
    updateData.shortcut_by_user[customer_id] = 0;
  else updateData.shortcut_by_user[customer_id] = 1;
  if (this.device.remoteid)
    $dispatch($api.HomeConfig.updateRemote, {
      remoteid: this.device.remoteid,
      updateData,
      animation:false
    });
  else
    $dispatch($api.HomeConfig.updateDevice, {
      devid: this.device.devid,
      updateData,
      animation:false
    });
}
</script>
<style scoped lang="scss">
.device-item {
  padding: 0 1rem 1rem 0;
  .fake-box {
    border-radius: 1rem;
    &.wave>.content{
      height: 100%;
      width: 100%;
    }
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      height: calc(100% - 1rem);
      width: calc(100% - 1rem);
      & > div {
        height: 50%;
        min-height: 50%;
        min-width: 50%;
        display: flex;
        align-items: center;
      }
      .icon {
        justify-content: center;
        max-width: 50%;
        i {
          font-size: 3rem;
          margin: 0.5rem;
        }
      }
      .status {
        max-width: 50%;
        justify-content: center;
        & > div {
          position: relative;
          height: 2rem;
          width: 2rem;
          border-radius: 50%;
          border: solid 1px;
          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
          }
        }
      }
      .name {
        max-width: 100%;
        align-items: flex-end;
        & > div {
          line-height: 1.5rem;
          max-height: 3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
