<template>
  <modal-icon
      :show.sync="showFormBackup"
      :showClose="false"
      modalClasses="modal-confirm"
      :footerClasses="hcsBackup.success === 0 ? 'tryAgain' : '' "
      id="BackupModal"
  >
    <h3 class="text-center mb-4">{{ $t('homeInfo.button.backup_data') }}</h3>

    <div v-if="hcsBackup.success === 0 " class="m-3">

      <div class="text-center">
        {{ $t('homeInfo.backupAndRestore.create-record-fail') }}
      </div>
    </div>

    <div v-else class="mb-3" style=" min-width: 200px;
    margin: auto !important;">

      <div class="container">
        <div class="item2">
          <div class="hcBR" v-for="(hc,index) in hcsBackup.hcs" :key="index">
            {{ hc.is_master ? 'HC' : 'LC' }} {{ hc.machc + ' ' + $t('homeInfo.backupAndRestore.' + hc.type) }}
          </div>

          <div class="text-center mt-2" v-show="hcsBackup.success === 1 ">
            {{ $t('homeInfo.backupAndRestore.create-record-success') }}
          </div>
        </div>
      </div>
    </div>


    <template slot="footer">

      <div v-if="stateHcsBackup === -1 " class=" mybackup p-4 text-center mx-auto">
        <div class="float-left mr-1">
          {{ $t('homeInfo.processing') }}
        </div>

        <div class="loading-dots float-left">
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
        </div>
      </div>

      <div v-if="stateHcsBackup === 1 " @click="$emit('closeModal')"
           class=" mybackup p-4 text-center mx-auto w-100">
        OK
      </div>

      <div v-if="stateHcsBackup === 0" class=" m-0 p-0 row w-100 try-backup">
        <div class="float-left w-50 try " @click="tryBackup">
          {{ $t('homeInfo.try') }}
        </div>

        <div @click="$emit('closeModal')" class="float-left w-50 try-2">
          {{ $t('homeInfo.cancel') }}
        </div>
      </div>


    </template>


  </modal-icon>
</template>

<script>
import ModalIcon from "../../../../base/element/ModalIcon";

export default {
  name: "BackupModal",
  props: {
    showFormBackup: {
      type: Boolean,
      default: false
    },
    recordName: {
      type: String
    }
  },
  components: {ModalIcon},
  computed: {
    hcsBackup,
    stateHcsBackup
  },
  methods: {
    tryBackup
  }
}

function hcsBackup() {
  return $state.Home.hcBackup
}

function stateHcsBackup() {
  return $state.Home.hcBackup && $state.Home.hcBackup.success
}


async function tryBackup() {
  $commit('Home/UPDATE_DATA_BACKUP_HC')

  await $dispatch('Home/getListBackup')

  let backup = $state.Home.listBackups.find(backup => backup.name === this.recordName)

  if (backup) {
    return $dispatch('Home/reBackupData', {backup_id: backup.id})
  } else {
    return $dispatch('Home/backupData', {name: this.recordName, desc: $state.Home.homeConfig})
  }


}
</script>

<style lang="scss">

#BackupModal {
  h3 {
    font-size: 20px !important;
  }

  .hcBR{
    font-size: 18px;
    margin-bottom: 5px;
  }

  .container {
    display: flex;
    justify-content: center;
  }

  .modal-content {
    width: 480px !important;
    height: auto !important;
    position: absolute !important;
    left: 0;
  }

  .modal-footer {
    height: 52px !important;
  }

  .modal-footer:hover {
    background: #96969e !important;;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

  }

  .text-center {
    font-size: 17px;
  }

  .try-backup {
    .try {
      border-right: 1px solid white;
      height: 50px;
      border-bottom-left-radius: 16px;
      text-align: center;
    }

    .try-2 {
      border-bottom-right-radius: 16px;
      text-align: center;
    }

    > .float-left:hover {
      background: #96969e !important;


    }

    line-height: 50px;
  }

  .tryAgain {
    padding: 0 !important;
  }

  .tryAgain:hover {
    background: #5d656b !important;
  }
}
</style>
