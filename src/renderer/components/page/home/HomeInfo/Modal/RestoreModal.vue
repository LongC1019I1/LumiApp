<template>
  <modal-icon
      :show.sync="showFormRestore"
      :showClose="false"
      modalClasses="modal-confirm"
      :footerClasses="hcRestore.success === 0 ? 'tryAgain' : '' "
      id="BackupModal"
  >
    <h3 class="text-center mb-4">{{ $t('homeInfo.button.restore') }}</h3>

    <div v-if="hcRestore.success === 0 " class="m-3">
      <div class="text-center">
        {{ $t('homeInfo.backupAndRestore.restore-fail') }}
      </div>
    </div>


    <div v-else class="mb-3" style=" min-width: 200px !important;
    margin: auto !important;">
      <div class="container">
        <div class="item2">
          <div class="hcBR " v-for="(hc,index) in hcRestore.hcs" :key="index">
            {{ hc.is_master ? 'HC' : 'LC' }} {{ hc.machc + ' ' + $t('homeInfo.backupAndRestore.' + hc.type) }}
          </div>

          <div class="text-center mt-2" v-show="hcRestore.success === 1 ">
            {{ $t('homeInfo.backupAndRestore.restore-record-success') }}
          </div>
        </div>

      </div>
    </div>

    <template slot="footer">

      <div v-if="hcRestore.success === -1 " class=" mybackup p-4 text-center mx-auto">
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

      <div v-if="hcRestore.success === 1 " @click="$emit('closeModal')"
           class=" mybackup p-4 text-center mx-auto w-100">
        OK
      </div>

      <div v-if="hcRestore.success === 0 " class=" m-0 p-0 row w-100 try-backup">
        <div class="float-left w-50 try" @click="tryRestore">
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
  name: "RestoreModal",
  props: {
    showFormRestore: {
      type: Boolean,
      default: false
    },
    backup_id: {
      type: String
    }
  },
  components: {ModalIcon},
  computed: {
    hcRestore
  },
  methods: {
    tryRestore
  }

}

function hcRestore() {
  return $state.Home.hcRestore && $state.Home.hcRestore
}


function tryRestore() {
  $commit('Home/UPDATE_DATA_RESTORE_HC')
  $dispatch('Home/restoreData', {backup_id: this.backup_id})
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
    font-size: 18px;
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
