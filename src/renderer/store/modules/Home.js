import config from '../../connect/config'
import { METHOD, httpCloud, httpDefault, httpDefaultNoAnimation, httpCloudNoAnimation } from '../../connect/http'
import Vue from 'vue'
import i18n from "../../lang/i18n";
let BASE_URL_CLOUD = config.URL_SEVER_API

window.timeWait = []

const state = {
    ...getDefaultState(),
    notShowUpdateFirmware: []
}

const getters = {
    getListHomeFilter,
    getHomeByHomeID,
    getDomainByHomeID
}

const mutations = {
    UPDATE_LIST_HOME,
    UPDATE_CURRENT_HOME,
    UPDATE_FIRMWARE,
    UPDATE_LISTBACKUP,
    UPDATE_HOMECONFIG,
    UPDATE_ID_RESTORE,
    UPDATE_DATA_BACKUP_HC,
    UPDATE_DATA_RESTORE_HC,
    UPDATE_STATE_BACKUP_HC,
    UPDATE_STATE_RESTORE_HC,
    UPDATE_BACKUP_STATUS,
    UPDATE_RESTORE_STATUS,
    UPDATE_NAME_RECORD,
    SELECT_HOMEIFO,
    NOT_SHOW_MODAL_FIRMWARE,
    GET_ROOM_ID,
    RESET_DATA,
    GET_DEFAULT_SHOW_FIRMWARE
}

const actions = {
    getListHomeByUserID,
    getMyAddress,
    getNearAddress,
    getListBackup,
    addAndUpdateHome,
    getFirmware,
    deleteHome,
    reBackupData,
    changeStatusOta,
    deleteHomeConfirm,
    removeRecordBackup,
    updateFirmware,
    resetFactory,
    resetFactoryConfirm,
    resetData,
    getHomeConfigInfo,
    backupData,
    restoreData,
    deleteRecordBackup
}


function getDefaultState() {
    return {
        listHome: [],
        currentHome: {},
        roomID: '',
        firmware: [],
        homeConfig: {},
        backupStatus: {},
        restoreStatus: {},
        hcBackup: {
            hcs: [],
            success: -1
        },
        hcRestore: {
            hcs: [],
            success: -1
        },
        recordName: '',
        restoreID: '',
        listBackups: [],
        homeInfoSelect: 0
    }
}

//getters
function getListHomeFilter(state) {
    return function (filterString) {
        filterString = String(filterString).toLowerCase()
        return state.listHome.filter(home => home.domain.toLowerCase().includes(filterString) || home.name.toLowerCase().includes(filterString) || (home.hcs.find(hc => hc.mac.toLowerCase().includes(filterString))))
    }
}


function getHomeByHomeID(state) {
    return function (homeID) {
        return state.listHome.find(home => home.id == homeID)
    }
}

function getDomainByHomeID(state) {
    return function (domain) {
        return state.listHome.find(home => home.domain == domain)
    }
}

//mutations
function UPDATE_LIST_HOME(state, data) {
    if (data && Array.isArray(data))
        Vue.set(state, 'listHome', [...data]);
}

function UPDATE_CURRENT_HOME(state, homeID) {
    console.log('homid', homeID)
    if (homeID)
        state.currentHome = state.listHome.find(item => item.id == homeID) || {}
    else state.currentHome = {}
}

function SELECT_HOMEIFO(state, data) {
    state.homeInfoSelect = data
}

function NOT_SHOW_MODAL_FIRMWARE(state, data) {
    if (data) {
        if (!state.notShowUpdateFirmware.find(value => value === data)) {
            state.notShowUpdateFirmware.push(data)
        }
    }
}

function UPDATE_FIRMWARE(state, data) {

    if (data.id) {
        return state.firmware = data
    }
    return state.firmware = []
}

function UPDATE_LISTBACKUP(state, data) {
    return state.listBackups = data;
}


function UPDATE_BACKUP_STATUS(state, data) {
    return state.backupStatus = data
}

function UPDATE_RESTORE_STATUS(state, data) {
    return state.restoreStatus = data
}

function UPDATE_NAME_RECORD(state, data) {
    return state.recordName = data
}

function UPDATE_ID_RESTORE(state, data) {
    return state.restoreID = data
}

function UPDATE_HOMECONFIG(state, data) {
    if (data) {
        state.homeConfig = data
    }
}

function UPDATE_DATA_BACKUP_HC(state) {
    state.hcBackup.hcs = $state.HomeConfig.hcs.map(hc => {
        return {
            machc: hc.mac,
            is_master: hc.is_master,
            type: 'no'
        }
    })
    state.hcBackup.success = -1
    console.log('hcBackup', state.hcBackup)
}

function UPDATE_DATA_RESTORE_HC(state) {
    state.hcRestore.hcs = $state.HomeConfig.hcs.map(hc => {
        return {
            machc: hc.mac,
            is_master: hc.is_master,
            type: 'no'
        }
    })
    state.hcRestore.success = -1
    console.log('hcRestore', state.hcRestore)
}

function UPDATE_STATE_BACKUP_HC(state, data) {

    state.hcBackup.hcs.forEach(hc => {
        if (hc.machc === data.machc) {
            hc.type = data.type
        }
    })

    if (data.success && data.type === 'complete') {
        state.hcBackup.hcs.forEach(hc => {
            hc.type = data.type
        })
        state.hcBackup.success = 1
    }

    if (!data.success && data.type === 'complete') {
        state.hcBackup.hcs.forEach(hc => {
            hc.type = 'fail'
        })
        state.hcBackup.success = 0
    }


    let timeWait = setTimeout(() => {
        if (state.hcBackup.success === -1) {
            state.hcBackup.success = 0
        }
    }, 30000)

    window.timeWait.push(timeWait)

}

function UPDATE_STATE_RESTORE_HC(state, data) {

    state.hcRestore.hcs.forEach(hc => {
        if (hc.machc === data.machc) {
            hc.type = data.type
        }
    })

    if (data.success && data.type === 'complete') {
        state.hcRestore.hcs.forEach(hc => {
            hc.type = data.type
        })
        state.hcRestore.success = 1
    }

    if (!data.success && data.type === 'complete') {
        state.hcRestore.hcs.forEach(hc => {
            hc.type = 'fail'
        })
        state.hcRestore.success = 0
    }

    setTimeout(() => {

        if (state.hcRestore.success === -1) {
            state.hcRestore.success = 0
        }
    }, 30000)
}


function GET_ROOM_ID(state, roomid) {
    state.roomID = roomid

}

function RESET_DATA(state) {
    Object.assign(state, getDefaultState())
}

function GET_DEFAULT_SHOW_FIRMWARE(state) {

    let machc = (state.currentHome.hcs && state.currentHome.hcs.find(item => item.is_connect && item.is_master) || {}).mac || '';
    let indexEmail = state.notShowUpdateFirmware.findIndex(item => item === localStorage.getItem('email'))

    if (indexEmail !== -1) {
        state.notShowUpdateFirmware.splice(indexEmail, 1)
    }

    let indexPhone = state.notShowUpdateFirmware.findIndex(item => item === localStorage.getItem('phone'))

    if (indexPhone !== -1) {
        state.notShowUpdateFirmware.splice(indexPhone, 1)
    }

    let indexMacHc = state.notShowUpdateFirmware.findIndex(item => item === machc)

    if (indexMacHc !== -1) {
        state.notShowUpdateFirmware.splice(indexMacHc, 1)
    }

    let indexFirmwareId = state.notShowUpdateFirmware.findIndex(item => item === state.firmware.id)

    if (indexFirmwareId !== -1) {
        state.notShowUpdateFirmware.splice(indexFirmwareId, 1)
    }

}

//actions

function getHomeConfigInfo({ commit, state }) {
    let uri = `${BASE_URL_CLOUD}/home-config/home-config-info?home_id=${state.currentHome.id}`;
    return httpCloud(METHOD.get, uri).then(result => {
        commit("UPDATE_HOMECONFIG", result.data)
    })
}

function getListBackup({ commit, state }) {
    let uri = `${BASE_URL_CLOUD}/home-config/list-backups?home_id=${state.currentHome.id}`;
    return httpCloud(METHOD.get, uri).then(result => {
        commit("UPDATE_LISTBACKUP", result.data)
    })

}

function backupData({ commit, state }, { name, desc }) {
    let uri = `${BASE_URL_CLOUD}/home-config/backup`;
    let home_id = state.currentHome.id
    return httpCloudNoAnimation(METHOD.post, uri, {
        body: {
            "home_id": home_id,
            "name": name,
            "description": desc
        }
    }).then(result => {
        if (result) {
            commit('UPDATE_STATE_BACKUP_HC', '')
        }
    })
}

function reBackupData({ commit, state }, { backup_id }) {
    let uri = `${BASE_URL_CLOUD}/home-config/backup`;
    return httpCloudNoAnimation(METHOD.post, uri, {
        body: {
            "backup_id": backup_id,
        }
    }).then(result => {
        if (result) {
            commit('UPDATE_STATE_BACKUP_HC', '')
        }
    })
}

function restoreData({ commit, state }, { backup_id }) {
    let uri = `${BASE_URL_CLOUD}/home-config/restore`
    let home_id = state.currentHome.id

    return httpCloud(METHOD.post, uri, {
        body: {
            "home_id": home_id,
            "backup_id": backup_id
        }
    }).then(result => {
        if (result) {
            commit('UPDATE_STATE_RESTORE_HC', '')
        }
    })

}

function deleteRecordBackup({ commit, state }, record) {
    let uri = `${BASE_URL_CLOUD}/home-config/delete-backup`

    return httpCloud(METHOD.post, uri, {
        body: [
            ...record
        ]
    })
}

function removeRecordBackup({ commit, state, dispatch }, id) {
    let uri = `${BASE_URL_CLOUD}/home-config/delete-backup`
    httpCloud(METHOD.post, uri, {
        body: {
            backup_id: id
        }
    }).then(result => {
        dispatch('getListBackup')
    })


}

function getListHomeByUserID({ commit, dispatch, state }) {
    let uri = `${BASE_URL_CLOUD}/home/list-by-user`
    return httpCloud(METHOD.get, uri).then(result => {
        commit("UPDATE_LIST_HOME", result.data)
        commit("UPDATE_CURRENT_HOME", state.currentHome.id)
        return result
    }).catch(error => {
        dispatch('getListHomeByUserID')
    })
}

function getFirmware({ commit, state }) {
    let home_id = state.currentHome.id
    let uri = `${BASE_URL_CLOUD}/mac/get-latest-firmware-version?home_id=${home_id}`

    return httpCloud(METHOD.get, uri).then(result => {
        commit("UPDATE_FIRMWARE", result.data)
    })
}

function updateFirmware({ commit }, { home_id, firmware_id }) {

    let uri = `${BASE_URL_CLOUD}/mac/force-update-ota`
    return httpCloud(METHOD.post, uri, {
        body: {
            "home_id": home_id,
            "firmware_id": firmware_id
        }
    }).then(result => {
        $alertify.success(i18n.tc('homeInfo.request-success'))
    })

}

function changeStatusOta({ commit, dispatch, state }, { home_id, ota_status }) {
    let uri = `${BASE_URL_CLOUD}/home/set-hc-auto-ota`
    return httpCloudNoAnimation(METHOD.post, uri, {
        body: {
            "home_id": home_id,
            "hc_auto_ota": ota_status
        }
    }).then(result => {
        dispatch("getListHomeByUserID");
    })
}

function addAndUpdateHome(context, { home_id, name, domain, avatar, lat, lng }) {

    if (home_id == undefined) {
        return httpCloud(METHOD.post, `${BASE_URL_CLOUD}/home/add-home`, {
            body: {
                "name": name,
                "domain": domain,
                "avatar": avatar || '',
                "type": "1",
                "timezone": "Asia/Ho_Chi_Minh",
                "address_info": {
                    "geometry": {
                        "location": {
                            "lat": lat,
                            "lng": lng
                        }
                    },
                }
            }
        })

    } else {

        return httpCloud(METHOD.post, `${BASE_URL_CLOUD}/home/edit-home`, {
            body: {
                "home_id": home_id,
                "name": name,
                "domain": domain,
                "avatar": avatar || "",
                "type": "1",
                "timezone": "Asia/Ho_Chi_Minh",
                "address_info": {
                    "geometry": {
                        "location": {
                            "lat": lat,
                            "lng": lng
                        }
                    },
                }
            }
        })
    }


}

function getMyAddress(context, { lat, long }) {
    return httpDefaultNoAnimation(METHOD.get, "https://maps.googleapis.com/maps/api/geocode/json?latlng="
        + lat
        + ","
        + long
        + "&key=AIzaSyBusVGWDRTeG2SxnREmNe1WkgfYhEQu7MI")
}

function getNearAddress({ commit }, { lat, long }) {
    return httpDefaultNoAnimation(METHOD.get, "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        lat +
        "," +
        long +
        "&radius=100" +
        "&key=AIzaSyBusVGWDRTeG2SxnREmNe1WkgfYhEQu7MI"
    )
}

function deleteHome(context, data) {
    let uri = `${BASE_URL_CLOUD}/home/delete-home`
    return httpCloud(METHOD.post, uri, {
        body: data
    })
}

function deleteHomeConfirm(context, data) {
    let uri = `${BASE_URL_CLOUD}/home/delete-home-confirm`
    return httpCloud(METHOD.post, uri, {
        body: data
    })
}

function resetFactory(context, data) {
    let uri = `${BASE_URL_CLOUD}/home/reset-factory`
    return httpCloud(METHOD.post, uri, {
        body: data
    })
}

function resetFactoryConfirm(context, data) {
    let uri = `${BASE_URL_CLOUD}/home/reset-factory-confirm`
    return httpCloud(METHOD.post, uri, {
        body: data
    })
}

function resetData({ commit }) {
    commit('RESET_DATA')
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
