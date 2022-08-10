import config from '../../connect/config'
import { METHOD, httpCloud, httpCloudNoAnimation } from '../../connect/http'

let BASE_URL_CLOUD = config.URL_SEVER_API

import {
    DEVICE_TYPE,
    DEVICE_TRAIT,
    CMD_KEY_FROM_HC,
    TYPE_PAYLOAD,
    LIST_CONFIG_HOME,
    LIST_CONFIG_CONTROLL, GROUP_TYPE
} from '../../plugins/variableConst'

import {
    getDevice,
    getDeviceByCameid,
    getControllDevicesByRoomID,
    getDeviceByType,
    getDeviceByTypeInRoom,
    getSpeakerByUuid,
    getDevicesSearch,
    getDeviceInputSearch,
    getDeviceOutputSearch,
    getDevicesConfigSearch,
    getDeviceRemoteSecure,
    getRoomLightSensorData,
    getRoomTemperatureSensorData,
    getRoomHumiditySensorData,
    getOftenUsedSensors,
    getDevicesByGroup,
    updateDevice,
    updateDevices,
    syncDevices,
    removeDevices,
    deleteSelectRemote,
    addDevices,
    changeNameDeivce,
    changeNameRemote,
    addDevicesRemotesInRoom,
    changeIconDevices,
    changeDeviceStatus
} from './homeConfig/devices'

import {
    addSchedule,
    commonConfigSchedule,
} from "./homeConfig/schedules";

import {
    UPDATE_FLOOR_BY_HOMEID,
    addFloors,
    updateFloor,
    deleteFloor,
} from './homeConfig/floors'

import {
    getRoomByID,
    getRoomsByFloorId,
    getFillterRoomsByFloor,
    getFillterRoomsHasDeviceByFloor,
    addRooms,
    updateRoom,
    deleteRoom
} from './homeConfig/rooms'

import {
    getHcsShow,
    SHOW_OFF_DEVICE_HCS
} from "./homeConfig/hcs";

import {
    getRulesByType,
    getAllRulesByType,
    getAllRulesByTypeAndDevid,
    getOftenUsedRulesByType,
    getRulesByTypeAndRoomID,
    createRule,
    updateRule,
    deleteRule
} from './homeConfig/rules'

import {
    getRemote,
    getAllRemoteAndIR,
    updateRemote,
    onAddIR,
    onAddIRv2
} from './homeConfig/remotes'

import {
    getListGroupByType,
    addGroups,
    updateGroup,
    deleteGroup
} from './homeConfig/groups'

import {
    getCameraByID,
    getCameraByDevid,
    getCameraForSlider,
    addCameras,
    updateCamera,
    deleteCamera,
    addCameraLicence
} from './homeConfig/cameras'

import {
    deviceSecureProtected,
    groupSecureProtected,
    deleteSecureProtected,
    addSecureProtected
} from "./homeConfig/secure";

const state = getDefaultState()

const getters = {
    //devices
    getDevice,
    getDeviceByCameid,
    getDevicesSearch,
    getDeviceInputSearch,
    getDeviceOutputSearch,
    getControllDevicesByRoomID,
    getDeviceByType,
    getDeviceByTypeInRoom,
    getSpeakerByUuid,
    getDeviceRemoteSecure,
    getRoomLightSensorData,
    getRoomTemperatureSensorData,
    getRoomHumiditySensorData,
    getDevicesConfigSearch,
    getOftenUsedSensors,
    getDevicesByGroup,
    //floors
    //rooms
    getRoomByID,
    getRoomsByFloorId,
    getFillterRoomsByFloor,
    getFillterRoomsHasDeviceByFloor,
    //rules
    getRulesByType,
    getAllRulesByType,
    getAllRulesByTypeAndDevid,
    getOftenUsedRulesByType,
    getRulesByTypeAndRoomID,
    //remote
    getRemote,
    getAllRemoteAndIR,
    //hcs
    getHcsShow,
    //controll
    getControll,
    getOftenUsedControll,
    getControllInRoom,
    getFillterControllInRoom,
    //group
    getListGroupByType,
    //camera
    getCameraByID,
    getCameraByDevid,
    getCameraForSlider
}

const mutations = {
    UPDATE_HOME_CONFIG_DATA,
    UPDATE_PIN_NULL,
    UPDATE_PIN_NOT_NULL,
    UPDATE_HOME_CONFIG_SOCKET,
    UPDATE_FLOOR_BY_HOMEID,
    SHOW_OFF_DEVICE_HCS,
    UPDATE_CONTROLL_LIST,
    RESET_DATA
}

const actions = {
    getListHomeConfigByHomeID,
    getListHomeConfigByHomeIDNoAnimation,
    pushConfigToThing,
    pushConfigToThingNoAnimation,
    addFloors,
    updateFloor,
    deleteFloor,
    addRooms,
    getHcsShow,
    updateRoom,
    deleteRoom,
    addDevices,
    addDevicesRemotesInRoom,
    updateDevice,
    updateDevices,
    syncDevices,
    removeDevices,
    changeNameDeivce,
    changeIconDevices,
    onAddIR,
    onAddIRv2,
    changeDeviceStatus,
    changeNameRemote,
    //rule
    createRule,
    updateRule,
    deleteRule,
    //remote
    updateRemote,
    deleteSelectRemote,
    //group
    addGroups,
    updateGroup,
    deleteGroup,
    //schedule
    addSchedule,
    commonConfigSchedule,
    //camera
    addCameras,
    updateCamera,
    deleteCamera,
    addCameraLicence,
    //secure
    addSecureProtected,
    deviceSecureProtected,
    groupSecureProtected,
    deleteSecureProtected,
    resetData,
}

function getDefaultState() {
    return {
        versions: {},
        users: [],
        hcs: [],
        floors: [],
        rooms: [],
        groups: [],
        rules: [],
        devices: [],
        cameras: [],
        remotes: [],
        //
        controllList: [],
    }
}

function getControll(state) {
    return function ({ devid, remoteid }) {
        if (remoteid)
            return state.controllList.find(controll => controll.devid === devid && controll.remoteid === remoteid)
        else if (devid)
            return state.controllList.find(controll => controll.devid === devid)
    }
}

function getOftenUsedControll(state) {
    return function (customerID) {
        if (state.controllList)
            return state.controllList.filter(controll => controll.roomid !== -1 && controll.shortcut_by_user && controll.shortcut_by_user[customerID] && controll.type !== DEVICE_TYPE.SENSOR)
        return []
    }
}

function getControllInRoom(state) {
    return function (roomid) {
        if (state.controllList)
            return state.controllList.filter(controll => controll.roomid === roomid && controll.type !== DEVICE_TYPE.SENSOR)
        return []
    }
}

function getFillterControllInRoom(state) {
    if (state.controllList) {
        let filterData = {};
        state.controllList.forEach(controll => {
            if (filterData[controll.roomid]) filterData[controll.roomid].push(controll);
            else filterData[controll.roomid] = [controll]
        });
        return filterData
    }
    return []
}

//mutations
function UPDATE_HOME_CONFIG_DATA(state, { type, data }) {
    if (type == "hcs")
        data.sort((a, b) => {
            if (a.is_master > b.is_master) return -1
            else return 1
        })
    state[type] = data
}

function UPDATE_PIN_NULL(state) {
    state.users.forEach(user => {
        if (user.pin && user.pin_code) {
            user.pin = ''
            user.pin_code = ''
        }
    })
}

function UPDATE_PIN_NOT_NULL(state) {
    state.users.forEach(user => {
        if (user.pin === '' && user.pin_code === '') {
            user.pin = 1111
            user.pin_code = 1111
        }
    })
}

function UPDATE_HOME_CONFIG_SOCKET(state, data) {
    let { cmd, objects } = data.payload
    objects.forEach(typeConfig => {
        let compareKey = TYPE_PAYLOAD[typeConfig.type].compareKey
        switch (cmd) {
            case CMD_KEY_FROM_HC.response:
            case CMD_KEY_FROM_HC.status:
                typeConfig.data.forEach(newData => {
                    let oldData = state[typeConfig.type]
                        .find(item => item[compareKey] === newData[compareKey])
                    if (oldData) oldData = Object.assign(oldData, newData)
                    else state[typeConfig.type].push(newData)
                    if ([TYPE_PAYLOAD.devices.name, TYPE_PAYLOAD.groups.name, TYPE_PAYLOAD.remotes.name, TYPE_PAYLOAD.cameras.name].includes(typeConfig.type))
                        state.controllList = [...state.devices, ...state.remotes, ...state.groups.filter(item => item.type === GROUP_TYPE.lightingGroup)]
                    if (typeConfig.type === TYPE_PAYLOAD.rules.name && newData.ruleid === $state.RuleManager.ruleid)
                        $dispatch($api.RuleManager.setRule, newData)
                })
                break

            case CMD_KEY_FROM_HC.delete:

                // typeConfig.data.forEach(newData => {
                //     let compareKey = TYPE_PAYLOAD[typeConfig.type].compareKey
                //     let oldData = state[typeConfig.type]
                //         .find(item => item[compareKey] == newData[compareKey])
                //     if (oldData)
                //         Object.keys(newData)
                //             .forEach(key => oldData[key] = newData[key]);
                //     else state[typeConfig.type].push(newData)
                // })
                break
            case CMD_KEY_FROM_HC.sync:
                state[typeConfig.type] = typeConfig.data
                if ([TYPE_PAYLOAD.devices.name, TYPE_PAYLOAD.groups.name, TYPE_PAYLOAD.remotes.name, TYPE_PAYLOAD.cameras.name].includes(typeConfig.type))
                    state.controllList = [...state.devices, ...state.remotes, ...state.groups.filter(item => item.type === GROUP_TYPE.lightingGroup)]
                if (typeConfig.type === TYPE_PAYLOAD.rules.name)
                    $dispatch($api.RuleManager.setRule, $state.HomeConfig.rules.find(item => item.ruleid === $state.RuleManager.ruleid))
            default:
                state[typeConfig.type] = typeConfig.data
        }
    })
}

function UPDATE_CONTROLL_LIST(state, data) {
    state.controllList = data
}

function RESET_DATA(state) {
    Object.assign(state, getDefaultState())
}

//actions
function getListHomeConfigByHomeID({ rootState, commit, dispatch, state }, { homeid }) {
    let uri = `${BASE_URL_CLOUD}/home-config/get-list-config-by-home`
    return httpCloud(METHOD.post, uri, {
        body: {
            homeid,
            payload: {
                cmd: "get",
                reqid: generateReqID(rootState.Customer.customerData.name || rootState.Customer.customerData.phone),
                objects: LIST_CONFIG_HOME.map(item => {
                    return { type: item, data: [] }
                })
            }
        }
    }).then(async result => {
        result.data.forEach(item => commit('UPDATE_HOME_CONFIG_DATA', item))
        commit("UPDATE_CONTROLL_LIST", [...state.devices, ...state.remotes, ...state.groups.filter(item => item.type === GROUP_TYPE.lightingGroup)])
        dispatch("HomeControll/getListDevicesStatus", null, { root: true });
        return result
    })
}


function getListHomeConfigByHomeIDNoAnimation({ rootState, commit, dispatch, state }, { homeid }) {
    let uri = `${BASE_URL_CLOUD}/home-config/get-list-config-by-home`
    return httpCloudNoAnimation(METHOD.post, uri, {
        body: {
            homeid,
            payload: {
                cmd: "get",
                reqid: generateReqID(rootState.Customer.customerData.name || rootState.Customer.customerData.phone),
                objects: LIST_CONFIG_HOME.map(item => {
                    return { type: item, data: [] }
                })
            }
        }
    }).then(async result => {
        result.data.forEach(item => commit('UPDATE_HOME_CONFIG_DATA', item))
        commit("UPDATE_CONTROLL_LIST", [...state.devices, ...state.remotes, ...state.groups.filter(item => item.type === GROUP_TYPE.lightingGroup)])
        dispatch("HomeControll/getListDevicesStatus", null, { root: true });
        return result
    })
}

function pushConfigToThing({ rootState }, { method, type, data }) {
    let uri = `${BASE_URL_CLOUD}/home-config/push-config-to-thing`
    let homeid = Number(rootState.Home.currentHome.id);
    let reqid = generateReqID(rootState.Customer.customerData.name || rootState.Customer.customerData.phone)
    return httpCloud(METHOD.post, uri, {
        body: {
            homeid,
            payload: {
                cmd: method,
                reqid,
                objects: [{
                    type,
                    data
                }]
            }
        }
    }, { reqid })
}

function pushConfigToThingNoAnimation({ rootState }, { method, type, data }) {
    let uri = `${BASE_URL_CLOUD}/home-config/push-config-to-thing`
    let homeid = Number(rootState.Home.currentHome.id);
    let reqid = generateReqID(rootState.Customer.customerData.name || rootState.Customer.customerData.phone)
    return httpCloudNoAnimation(METHOD.post, uri, {
        body: {
            homeid,
            payload: {
                cmd: method,
                reqid,
                objects: [{
                    type,
                    data
                }]
            }
        }
    }, { reqid })
}

function generateReqID(username = 'unknow') {
    let flatform = navigator.platform || 'unknow';
    let requestCount = localStorage.getItem('requestCount') || 0;
    localStorage.setItem('requestCount', ++requestCount);
    return `AppDesktop-${flatform}-${username}-${Date.now()}-${requestCount}`
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
