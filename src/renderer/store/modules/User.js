import config from '../../connect/config'
import {METHOD, httpCloud, httpCloudNoAnimation} from '../../connect/http'

let BASE_URL_CLOUD = config.URL_SEVER_API


const state = getDefaultState()

const actions = {
    login,
    registerGetVerifyCode,
    registerConfirm,
    logout,
    refreshToken,
    addPermission,
    roomDeviceUserDevUpdate,
    changeStatusUserPermission,
    updateShareUserDevice,
    pushConfigToThingNoAnimation,
    pushConfigToThing
}

const mutations = {
    UPDATE_USER_CURRENT_PERMISSION,
    UPDATE_ROOM_DEVICE_USER_DEVICE
}

const getters = {}

function getDefaultState() {
    return {
        userPermissionSelect: {},
        roomDeviceUserDev: []
    }
}

//mutations
function UPDATE_USER_CURRENT_PERMISSION(state, {data}) {
    state.userPermissionSelect = data
}

function UPDATE_ROOM_DEVICE_USER_DEVICE(state, {data}) {
    state.roomDeviceUserDev = data
}

//actions
function addPermission({dispatch}, {userid, userType, expire_time, update}) {
    let method = 'post';
    let type = "users"
    let data

    if (update) {
        if (userType === 'admin') {
            data = [
                {
                    userid,
                    "admin": 1,
                    "enable": 1
                }
            ]
        }

        if (userType === 'guest') {
            data = [
                {
                    userid,
                    "admin": 0,
                    "user_type": 1,
                    expire_time
                }
            ]
        }

        if (userType === 'supporter') {
            data = [
                {
                    userid,
                    "admin": 0,
                    "user_type": 2,
                    expire_time
                }
            ]
        }
        if (userType === 'user') {
            data = [
                {
                    userid,
                    "admin": 0,
                    "user_type": 0,
                }
            ]
        }
    } else {
        if (userType === 'admin') {
            data = [
                {
                    userid,
                    "admin": 1,
                    "enable": 1
                }
            ]
        }

        if (userType === 'guest') {
            data = [
                {
                    userid,
                    "admin": 0,
                    "user_type": 1,
                    "enable": 1,
                    "devices": [],
                    expire_time
                }
            ]
        }

        if (userType === 'supporter') {
            data = [
                {
                    userid,
                    "admin": 0,
                    "user_type": 2,
                    "enable": 1,
                    "devices": [],
                    expire_time
                }
            ]
        }
        if (userType === 'user') {
            data = [
                {
                    userid,
                    "admin": 0,
                    "typeUser": 0,
                    "enable": 1,
                    "devices": []
                }
            ]
        }
    }


    return dispatch('pushConfigToThingNoAnimation', {method, type, data})
}

function roomDeviceUserDevUpdate({commit}) {
    let rooms = []


        $state.HomeConfig.devices.forEach(device => {
            let room = $state.HomeConfig.rooms.find(room => room.roomid === device.roomid)
            if (room) {
                let findRoom = rooms.find(myRoom => myRoom.roomid === room.roomid)
                if (!findRoom) {
                    rooms.push(room)
                }
            }
        })

    $state.HomeConfig.remotes.forEach(remote => {
        let room = $state.HomeConfig.rooms.find(room => room.roomid === remote.roomid)
        if (room) {
            let findRoom = rooms.find(myRoom => myRoom.roomid === room.roomid)
            if (!findRoom) {
                rooms.push(room)
            }
        }
    })

//ADD DEVICE - REMOTE - RULE - SENCE TO ROOM

    rooms.forEach(room => {
            let devicesFind = $state.HomeConfig.devices.filter(device => device.roomid === room.roomid)

            if (devicesFind && devicesFind.length > 0) {
                room.devicesList = devicesFind
            } else {
                room.devicesList = []
            }

            let remotesListFind = $state.HomeConfig.remotes.filter(remote => remote.roomid === room.roomid)

            if (remotesListFind && remotesListFind.length > 0) {
                room.remotesList = remotesListFind
            } else {
                room.remotesList = []
            }


        })

    console.log('rooms', rooms)
    commit('UPDATE_ROOM_DEVICE_USER_DEVICE', {data: rooms})
}

function changeStatusUserPermission({dispatch}, {userid, enable}) {
    let method = 'post';
    let type = "users"
    let data = [{
        userid,
        enable
    }]

    return dispatch('pushConfigToThingNoAnimation', {method, type, data})
}

function updateShareUserDevice({state,dispatch}, {devices,remotes,rules}) {
    let method = 'post';
    let type = "users"
    let userid = state.userPermissionSelect.userid
    let data = [{
        userid,
        devices,
        remotes,
        rules
    }]
    return dispatch('pushConfigToThing', {method, type, data})
}

function login(context, data) {
    let uri = `${BASE_URL_CLOUD}/site/login`
    return httpCloud(METHOD.post, uri, {
        body: data,
    })
}

function refreshToken(context, data) {
    let uri = `${BASE_URL_CLOUD}/site/refresh-token`
    return httpCloud(METHOD.post, uri, {
        body: data,
    })
}

function registerGetVerifyCode(context, data) {
    let uri = `${BASE_URL_CLOUD}/site/register`
    return httpCloud(METHOD.post, uri, {
        body: data,
    })
}

function registerConfirm(context, data) {
    let uri = `${BASE_URL_CLOUD}/site/register-confirm`
    return httpCloud(METHOD.post, uri, {
        body: data,
    })
}

function logout(context) {
    let uri = `${BASE_URL_CLOUD}/site/logout`
    localStorage.removeItem("password");
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
    return httpCloud(METHOD.get, uri, {})
}

function pushConfigToThingNoAnimation({rootState}, {method, type, data}) {
    let uri = `${BASE_URL_CLOUD}/home-config/push-config-to-thing`
    let homeid = Number(rootState.Home.currentHome.id);
    return httpCloudNoAnimation(METHOD.post, uri, {
        body: {
            homeid,
            payload: {
                cmd: method,
                reqid: generateReqID(rootState.Customer.customerData.name || rootState.Customer.customerData.phone),
                objects: [{
                    type,
                    data
                }]
            }
        }
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

function generateReqID(username = 'unknow') {
    let flatform = navigator.platform || 'unknow';
    let requestCount = localStorage.getItem('requestCount') || 0;
    localStorage.setItem('requestCount', ++requestCount);
    return `AppDesktop-${flatform}-${username}-${Date.now()}-${requestCount}`
}

export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state
}
