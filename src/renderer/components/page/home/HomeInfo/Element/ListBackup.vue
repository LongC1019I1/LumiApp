<template>
  <div class="w-100 mt-3 " id="homeConfig">

    <div class="title-backup" @click="$emit('idRecord',backup)">
      <div class="float-left">
        <div class="check-record">

        </div>
        {{ backup.name }} {{backup.backup_state === "processing" ?`( ${$t('homeInfo.processing')} )`  : ''}}
      </div>

      <div class="float-right">
        {{ backup.created_at }}

        <i v-if="backupRecords.includes(backup.id)" class="mdi mdi-chevron-up iconHc"></i>
        <i v-else class="mdi mdi-chevron-down iconHc"></i>

      </div>

    </div>

    <div class="record-devices">
      <div class="list-hc-config first-child ">
        <div class="float-left">
          {{ $t('homeInfo.homeConfig.total_hcs') }}
        </div>
        <div class="float-right">
          {{ backup.description.hcs }}
        </div>
      </div>

      <div class="list-hc-config">
        <div class="float-left">
          {{ $t('homeInfo.homeConfig.total_devices') }}
        </div>
        <div class="float-right">
          {{ backup.description.devices }}
        </div>
      </div>

      <div class="list-hc-config">
        <div class="float-left">
          {{ $t('homeInfo.homeConfig.total_floors') }}
        </div>
        <div class="float-right">
          {{ backup.description.floors }}
        </div>
      </div>

      <div class="list-hc-config">
        <div class="float-left">
          {{ $t('homeInfo.homeConfig.total_rooms') }}
        </div>
        <div class="float-right">
          {{ backup.description.rooms }}
        </div>
      </div>

      <div class="list-hc-config">
        <div class="float-left">
          {{ $t('homeInfo.homeConfig.total_rules') }}
        </div>
        <div class="float-right">
          {{ backup.description.rules }}
        </div>
      </div>

      <div class="list-hc-config">
        <div class="float-left">
          {{ $t('homeInfo.homeConfig.total_scenes') }}
        </div>
        <div class="float-right">
          {{ backup.description.scenes }}
        </div>
      </div>

      <div class="list-hc-config">
        <div class="float-left">
          {{ $t('homeInfo.homeConfig.total_schedules') }}
        </div>
        <div class="float-right">
          {{ backup.description.schedules }}
        </div>
      </div>

      <div class="list-hc-config">
        <div class="float-left">
          Tổng số nhóm
        </div>
        <div class="float-right">
          {{ backup.description.groups }}
        </div>
      </div>

      <div class="list-hc-config">
        <div class="float-left">
          Tổng số camera
        </div>
        <div class="float-right">
          {{ backup.description.cameras }}
        </div>
      </div>

      <div class="restore">
     <span>
       {{ $t('homeInfo.homeConfig.select_record_backup') }}
     </span>

        <base-button @click="showPinOrRegister " class=" create-restore ">
          {{ $t('homeInfo.button.restore') }}
        </base-button>
      </div>






    </div>

  </div>


</template>
<script>
import "vue-pay-password/dist/vue-pay-password.css"
import PinModal from "../../../../base/custom/PinModal";
import i18n from "../../../../../lang/i18n";
import RestoreModal from "../Modal/RestoreModal";

export default {
  name: "ListBackup",

  data() {
    return {

      showFormRestore: false
    }
  },
  props: {
    backup: {
      type: Object,
    },
    backupRecords: {
      type: Array
    }
  },
  created() {
    $commit('Home/UPDATE_DATA_RESTORE_HC')
  },
  methods: {
    showPinOrRegister,
    restoreDevice
  },
  computed: {},
  components: {
  }
}

async function showPinOrRegister() {

  console.log('backup',this.backup)
this.$emit('showPin', this.backup)


}

function restoreDevice(){
  this.showPin =  false
  this.showFormRestore = true
  $dispatch('Home/restoreData', {backup_id: this.backup.id})
  $commit('Home/UPDATE_ID_RESTORE', this.backup.id)
}


</script>

<style scoped lang="scss">

#homeConfig {


  .title-backup {
    height: 40px;
    width: 100%;
    background: #393933;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 0 0 0 20px;
    line-height: 40px;

    > .float-left {
      position: relative;

      .check-record {
        position: absolute;
        left: -65px;
        top: -3px;

        .icon {
          font-size: 22px;
        }
      }


    }

    .float-right {
      position: relative;
      padding-right: 50px;

      i {
        font-size: 25px;
        position: absolute;
        top: 0;
        right: 10px;
      }
    }
  }

  .notification {
    color: white !important;
  }

  .list-hc-config {
    width: 100%
  }

  .first-child {
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
  }

  .restore {

    > span {
      display: block;
      padding: 6px 0 12px 0;
      color: #18e16f;
    }


    .create-restore {
      height: 35px;
      line-height: 0;
      background: #18e16f;
      border-radius: 20px;
      text-align: center;
      width: 150px;
      border: none;
      margin-bottom: 10px;
    }
  }
}


#homeInfo {

  .list-hc-config {
    width: 100%
  }


}

</style>
