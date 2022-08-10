<template>
  <card id="backupRestore" class="overflow-auto">

    <div class="row w-100 header">

      <div class="col-8">
        <div class="float-left icon ">
          <i class="mdi mdi-backup-restore"/>
        </div>
        <div class="float-left backup-restore">
          <span class="title">{{ $t('homeInfo.homeConfig.list_backup') }}</span>
        </div>

      </div>

      <div class="col-4">

        <div v-if="showHomeConfig">
          <base-button @click="showHomeConfig = false; recordValid=true; recordName=''; errorRecordValid='';$store.dispatch('Home/getListBackup') "
                       class=" text-overflow-hidden create-backup float-right "
                       style="width:33% !important  ">
            {{ $t('cancel') }}
          </base-button>

          <base-button @click="backupData " class=" text-overflow-hidden create-backup float-right mr-2"
                       style="width:60% !important">
            {{ $t('homeInfo.button.backup_data') }}
          </base-button>

        </div>
        <span v-else>

          <div v-if="selectBackup.length > 0">
                   <base-button @click="selectBackup = [] "
                                class=" text-overflow-hidden create-backup float-right "
                                style="width:33% !important "
                   >
                  {{ $t('cancel') }}
                </base-button>

                <base-button class=" text-overflow-hidden create-backup float-right mr-2"
                             style="width:33% !important"
                             @click="deleteRecord"
                >
                  {{ $t('delete') }}
                </base-button>
          </div>

          <base-button v-else @click="createBackup " class="create-backup float-right">
            {{ $t('homeInfo.button.crate_backup') }}
          </base-button>
        </span>

      </div>
    </div>

    <div class="row w-100 content ">
      <div v-if="showHomeConfig" class="w-100 ">
        <div class="name-record w-100 " :style=" !recordValid ? 'border: 1px solid red !important;' : '' ">
          {{ $t('homeInfo.homeConfig.input_name_record') }}
          <base-input v-model="recordName"
                      @keyup="checkRecordValid"
                      maxlength="30"
                      @keyup.enter="backupData"
                      :placeholder="$t('homeInfo.homeConfig.name_record')">

          </base-input>
        </div>
        <span v-show="errorRecordValid"> {{ errorRecordValid }}</span>
        <list-home-config
        />
      </div>


      <div v-else class=" w-100">
        <div v-if="listBackups.length > 0 ">
          <div
              v-for="backup in listBackups" :key="backup.id"
              :class="backupRecords.includes(backup.id)?'showRecord': 'notShowRecord' "
              style="position: relative"
          >
            <div class="select-record" @click="selectRecord(backup.id)">

              <icon
                  class="mdi mdi-check-box-outline "
                  v-if="selectBackup.includes(backup.id)"
              />
              <icon
                  class="mdi mdi-checkbox-blank-outline "
                  v-else
              />
            </div>
            <list-backup
                @idRecord="showOrHiddenBackUpRecord"
                :backup="backup"
                :backupRecords="backupRecords"
                :class="selectBackup.includes(backup.id)? 'select-backup' : '' "
                @showPin="showPin = true; myBackup = $event"
            ></list-backup>
          </div>

        </div>
        <p v-else class="notification">{{ $t('homeInfo.not_back_up') }}</p>
      </div>
    </div>

    <backup-modal
        :recordName="recordName"
        :showFormBackup="showFormBackup"
        @closeModal="closeModalBackup "
    />

    <restore-modal
        :showFormRestore="showFormRestore"
        :backup_id="myBackup.id"
        @closeModal="closeModalRestore"
    />

    <pin-modal
        :showPinModal="showPin"
        :backup_id="myBackup.id"
        @update="restoreDevice"
        @closeModal=" showPin = false "
    />


  </card>
</template>

<script>
import RestoreModal from "./Modal/RestoreModal";
import ListHomeConfig from "./Element/ListHomeConfig";
import ListBackup from "./Element/ListBackup";
import i18n from "../../../../lang/i18n";
import BackupModal from "./Element/BackupModal";
import PinModal from "../../../base/custom/PinModal";
export default {
  name: "BackupRestore",
  data() {
    return {
      showHomeConfig: false,
      showPin: false,
      showFormBackup: false,
      showFormRestore: false,
      recordName: '',
      recordValid: true,
      errorRecordValid: '',
      backupRecords: [],
      selectBackup: [],
      myBackup: {},
      showIconListBackup: false
    }
  },
  created() {
    $dispatch('Home/getListBackup')
    $commit('Home/UPDATE_DATA_BACKUP_HC')
  },
  methods: {
    createBackup,
    backupData,
    showOrHiddenBackUpRecord,
    checkRecordValid,
    selectRecord,
    deleteRecord,
    restoreDevice,
    closeModalBackup,
    closeModalRestore
  },

  components: {
    ListHomeConfig,
    ListBackup,
    BackupModal,
    PinModal,
    RestoreModal
  },


  computed: {
    listBackups,
    hcsBackup
  }
}


function hcsBackup() {
  return $state.Home.hcBackup
}

function deleteRecord() {
  if (this.selectBackup.length > 0) {
    let arrRecord = [];
    this.selectBackup.forEach(recordID => {
      $dispatch('Home/removeRecordBackup', recordID)
    })
    this.selectBackup = []
  }
}

function closeModalBackup() {
  this.showFormBackup = false;

  this.showHomeConfig = false;

  this.recordName=''

  $commit('Home/UPDATE_DATA_BACKUP_HC');

  $dispatch('Home/getListBackup');

  console.log('this is windown',window.timeWait)


  if ( window.timeWait){

    window.timeWait.forEach( clearTimeout )

    console.log('this is windown 2',window.timeWait)
    window.timeWait = []
    console.log('this is windown 3',window.timeWait)
  }
}

function closeModalRestore() {

  this.showFormRestore = false;

  $commit('Home/UPDATE_DATA_RESTORE_HC')

  if ( window.timeWait){

    window.timeWait.forEach( clearTimeout )

    console.log('this is windown 2',window.timeWait)
    window.timeWait = []
    console.log('this is windown 3',window.timeWait)
  }

}
function checkRecordValid() {

  let recordName = this.recordName.trim();
  if (recordName === '') {
    this.recordValid = false
    this.errorRecordValid = this.$t('homeInfo.record.no-empty')
  } else {
    this.recordValid = true
    this.errorRecordValid = ''
  }

  if (recordName.length == 30){
    this.recordValid = false
    this.errorRecordValid =  this.$t('homeInfo.record.no-longer-30-character')
  }
}

function selectRecord(id) {
  console.log(this.selectBackup)
  let CheckBackupRecord = this.selectBackup.includes(id)

  if (CheckBackupRecord === false) {
    this.selectBackup.push(id)
  } else {
    this.selectBackup = this.selectBackup.filter(record => record !== id)
  }
}

function showOrHiddenBackUpRecord(backup) {

  console.log('backup',backup)
  if (backup.backup_state === "success"){
    let CheckBackupRecord = this.backupRecords.includes(backup.id)

    if (CheckBackupRecord === false) {
      this.backupRecords.push(backup.id)
    } else {
      this.backupRecords = this.backupRecords.filter(record => record !== backup.id)
    }
  }

  if (backup.backup_state === "processing"){
    $dispatch('Home/reBackupData', {backup_id: backup.id})
  this.showFormBackup = true
  }


}

function createBackup() {

  $dispatch('Home/getHomeConfigInfo')
  this.showHomeConfig = true


}

function restoreDevice(){
  this.showPin =  false
  this.showFormRestore = true
  $dispatch('Home/restoreData', {backup_id: this.myBackup.id})
  $commit('Home/UPDATE_ID_RESTORE', this.myBackup.id)
}

async function backupData() {
  if (this.recordName !== '') {
    let desciption = $state.Home.homeConfig;
    this.recordName = this.recordName.trim()
    $commit('Home/UPDATE_NAME_RECORD', this.recordName)
    $dispatch('Home/backupData', {name: this.recordName, desc: desciption})

    // $alertify.confirm({
    //   title: i18n.tc("homeInfo.button.backup_data"),
    //   html: " <div >" +
    //       "{{$store.state.Home.hcBackup}}" +
    //       "</div> ",
    //   confirmButtonText: '<div class="loading-backup">\n' +
    //       '<div class="float-left wait" >' +
    //       'Đang xử lý' +
    //       '</div>\n' +
    //       '<div class="float-left loading-dots">\n                ' +
    //       '<div class="loading-dots--dot"></div>\n                ' +
    //       '<div class="loading-dots--dot"></div>\n                ' +
    //       '<div class="loading-dots--dot"></div>\n               ' +
    //       '<div class="loading-dots--dot"></div>\n              ' +
    //       '</div>\n' +
    //       ' </div>'
    // });

    this.showFormBackup = true;
    // this.recordName = '';
  } else {
    this.errorRecordValid = 'Tên bản ghi không được để trống';
    this.recordValid = false
  }
}

function listBackups() {
  return $state.Home.listBackups
}
</script>

<style lang="scss">

.notShowRecord {

  height: 30px;

  .record-devices {
    display: none !important;
  }

}


.showRecord {

  height: auto;

  //#homeConfig {
  //  .list-hc-config {
  //    display: block;
  //  }
  //}
}
</style>
