import config from '../../connect/config'
import { METHOD, httpCloud, httpCloudNoAnimation } from '../../connect/http'

let BASE_URL_CLOUD = config.URL_SEVER_API

import { TYPE_RULE, CMD_KEY_FROM_HC, TYPE_PAYLOAD } from '../../plugins/variableConst'
import { } from "@/plugins/helper";
import i18n from '../../lang/i18n'
const state = getDefaultState()

const getters = {
    getDeviceStatusByDeviceID,
    getGroupStatusByGroupID,
    getListDeviceStatus
}

const mutations = {
    UPDATE_LIST_DEVICES_STATUS,
    UPDATE_CONTROLL_STATUS,
    UPDATE_LIST_GROUPS_STATUS,
    RESET_DATA
}

const actions = {
    pushControllToThing,
    getListDevicesStatus,
    controllDevice,
    controllRule,
    controllGroup,
    wakeupDevices,
    pushControllToThingNoAnimation,
    resetData,
}

function getDefaultState() {
    return {
        listDeviceStatus: [],
        listGroupStatus: [],
        deviceJoin: {}
    }
}

//getters
function getDeviceStatusByDeviceID(state) {
    return function (deviceID) {
        if (state.listDeviceStatus)
            return state.listDeviceStatus.find(item => item.devid == deviceID)
        return {}
    }
}

function getGroupStatusByGroupID(state) {
    return function (groupid) {
        if (state.listGroupStatus)
            return state.listGroupStatus.find(item => item.groupid == groupid)
        return {}
    }
}

function getListDeviceStatus(state) {
    return function (deviceids) {
        if (state.listDeviceStatus)
            return state.listDeviceStatus.filter(item => deviceids.includes(item.devid))
        return []
    }
}

//mutations
function UPDATE_LIST_DEVICES_STATUS(state, devicesStatus) {
    state.listDeviceStatus = devicesStatus
}

function UPDATE_LIST_GROUPS_STATUS(state, devicesStatus) {
    state.listGroupStatus = devicesStatus
}

function RESET_DATA(state) {
    Object.assign(state, getDefaultState())
}

function UPDATE_CONTROLL_STATUS(state, data) {
    let { cmd, objects } = data.payload;
    objects.forEach(typeConfig => {
        switch (typeConfig.type) {
            case TYPE_PAYLOAD.devices.name:
                switch (cmd) {
                    case CMD_KEY_FROM_HC.status:
                        typeConfig.data.forEach(newData => {
                            let oldData = state.listDeviceStatus.find(item => item.devid === newData.devid)
                            if (oldData && oldData.states && newData.states) {
                                Object.assign(oldData.states, newData.states)
                                oldData.status = newData.status
                            }
                            else state.listDeviceStatus.push(newData)
                        })
                        break;
                }
                break;
            case TYPE_PAYLOAD.rules.name:
                switch (cmd) {
                    case CMD_KEY_FROM_HC.status:
                        typeConfig.data.forEach(responseRule => {
                            let type = "rule"
                            let rule = $state.HomeConfig.rules.find(item => item.ruleid === responseRule.ruleid)
                            console.log(responseRule);
                            if (rule.type === TYPE_RULE.scene || rule.type === TYPE_RULE.scene_lighting)
                                type = "scene"
                            if (rule.type === TYPE_RULE.schedule)
                                type = "schedule"
                            if (responseRule.status)
                                $alertify.success(`${i18n.t('rule.' + type)} ${rule.name} ${i18n.t('rule.activated')} ${i18n.t('rule.success')}`)
                            else
                                $alertify.error(`${i18n.t('rule.' + type)} ${rule.name} ${i18n.t('rule.activated')} ${i18n.t('rule.notSuccess')}`)
                        })
                        break;
                }
                break;
            case TYPE_PAYLOAD.groups.name:
                switch (cmd) {
                    case CMD_KEY_FROM_HC.status:
                        typeConfig.data.forEach(newData => {
                            let oldData = state.listGroupStatus.find(item => item.devid === newData.devid)
                            if (oldData) oldData = Object.assign(oldData, newData)
                            else state.listGroupStatus.push(newData)
                        })
                        break;
                }
                break;
            case TYPE_PAYLOAD.devices_join.name:
                switch (cmd) {
                    case CMD_KEY_FROM_HC.status:
                        typeConfig.data.forEach(newData => {
                            if (newData.bridgeKey == undefined) {
                                newData.bridgeKey = 'zigbee'
                            }
                            state.deviceJoin = newData

                            if (newData.bridgeKey == 'speaker') {
                                setTimeout(function () {
                                    newData.status = 0
                                }, newData.duration)

                                state.deviceJoin = newData
                            }
                            // let oldData = state.deviceJoin.find(item => item.machc == newData.machc&&item.bridgeKey==newData.bridgeKey)
                            // if (oldData) oldData = Object.assign(oldData, newData)
                            // else state.deviceJoin.push(newData)
                        })
                        break;
                }
                break;
        }
    })
}

//actions
function pushControllToThing({ rootState }, { method, type, data, execution }) {
    let uri = `${BASE_URL_CLOUD}/home-control/push-control-to-thing`
    let homeid = Number(rootState.Home.currentHome.id);
    let reqid = generateReqID(rootState.Customer.customerData.name || rootState.Customer.customerData.phone);
    return httpCloud(METHOD.post, uri, {
        body: {
            homeid,
            payload: {
                cmd: method,
                reqid,
                objects: [{
                    type,
                    data,
                    execution
                }]
            }
        }
    }, { reqid })
}

function pushControllToThingNoAnimation({ rootState }, { method, type, data, execution }) {
    let uri = `${BASE_URL_CLOUD}/home-control/push-control-to-thing`
    let homeid = Number(rootState.Home.currentHome.id);
    let reqid = generateReqID(rootState.Customer.customerData.name || rootState.Customer.customerData.phone);
    return httpCloudNoAnimation(METHOD.post, uri, {
        body: {
            homeid,
            payload: {
                cmd: method,
                reqid,
                objects: [{
                    type,
                    data,
                    execution
                }]
            }
        }
    }, { reqid })
}


function getListDevicesStatus({ rootState, commit, dispatch }) {
    let uri = `${BASE_URL_CLOUD}/device/get-status-devices`
    let homeid = Number(rootState.Home.currentHome && rootState.Home.currentHome.id);
    return httpCloudNoAnimation(METHOD.post, uri, {
        body: {
            homeid,
            payload: {
                cmd: CMD_KEY_FROM_HC.get,
                reqid: generateReqID(rootState.Customer.customerData.name || rootState.Customer.customerData.phone),
                objects: [
                    {
                        type: TYPE_PAYLOAD.devices.name,
                        data: []
                    }
                ]
            }
        }
    }).then(result => {
        commit("UPDATE_LIST_DEVICES_STATUS", result.data)
        return result
    }).catch(error => {
        dispatch('getListDevicesStatus')
    })
}

function controllDevice({ dispatch }, { devid, execution, animation = false }) {
    let method = CMD_KEY_FROM_HC.set;
    let type = TYPE_PAYLOAD.devices.name;
    let data = []
    if (Array.isArray(devid))
        data = Object.assign(data, devid)
    else data = Object.assign(data, [devid])
    if (animation)
        return dispatch('pushControllToThing', { method, type, data, execution })
    return dispatch('pushControllToThingNoAnimation', { method, type, data, execution })
}

function controllRule({ dispatch }, { ruleid, execution, animation = false }) {
    let method = CMD_KEY_FROM_HC.set;
    let type = TYPE_PAYLOAD.rules.name;
    let data = []
    if (Array.isArray(ruleid))
        data = Object.assign(data, ruleid)
    else data = Object.assign(data, [ruleid])
    if (animation)
        return dispatch('pushControllToThing', { method, type, data, execution })
    return dispatch('pushControllToThingNoAnimation', { method, type, data, execution })
}

function controllGroup({ dispatch }, { groupid, execution, animation = false }) {
    let method = CMD_KEY_FROM_HC.set;
    let type = TYPE_PAYLOAD.groups.name;
    let data = []
    if (Array.isArray(groupid))
        data = Object.assign(data, groupid)
    else data = Object.assign(data, [groupid])
    if (animation)
        return dispatch('pushControllToThing', { method, type, data, execution })
    return dispatch('pushControllToThingNoAnimation', { method, type, data, execution })
}

function wakeupDevices({ dispatch }, devid) {
    let method = CMD_KEY_FROM_HC.set;
    let type = TYPE_PAYLOAD.devices_wakeup.name;
    let data = []
    if (Array.isArray(devid))
        data = Object.assign(data, devid)
    else data = Object.assign(data, [devid])
    return dispatch('pushControllToThingNoAnimation', { method, type, data })
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
