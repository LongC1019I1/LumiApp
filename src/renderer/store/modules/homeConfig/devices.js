import { DEVICE_TYPE, DEVICE_TRAIT, CMD_KEY_FROM_HC, GROUP_TYPE } from '../../../plugins/variableConst'
import { getMainTraits } from '../../../plugins/helper'
import { httpCloud, METHOD } from "../../../connect/http";

export {
    //getters
    getDevice,
    getDeviceByCameid,
    getControllDevicesByRoomID,
    getDeviceByType,
    getDeviceByTypeInRoom,
    getSpeakerByUuid,
    getDevicesSearch,
    getDeviceInputSearch,
    getDeviceOutputSearch,
    getRoomLightSensorData,
    getRoomTemperatureSensorData,
    getRoomHumiditySensorData,
    getOftenUsedSensors,
    getDevicesByGroup,
    getDeviceRemoteSecure,
    getDevicesConfigSearch,
    //action
    addDevices,
    addDevicesRemotesInRoom,
    updateDevice,
    updateDevices,
    syncDevices,
    removeDevices,
    deleteSelectRemote,
    changeNameDeivce,
    changeNameRemote,
    changeIconDevices,
    changeDeviceStatus

}

function getDevice(state) {
    return function (devid) {
        if (state.devices || state.remotes && devid)
            return [...state.devices, ...state.remotes].find(device => device.remoteid === devid || device.devid === devid)
        return {}
    }
}

function getDeviceByCameid(state) {
    return function (camid) {
        if (state.devices && camid)
            return state.devices.find(device => device.devid.includes('camid'))
        return {}
    }
}

function getControllDevicesByRoomID(state) {
    return function (roomid) {
        if (state.devices)
            return state.devices.filter(device => device.roomid == roomid && device.type != DEVICE_TYPE.SENSOR)
        return []
    }
}


function getDeviceByType(state) {
    return function (type) {
        if (state.devices)
            return state.devices.filter(device => device.type == type)
        return []
    }
}

function getSpeakerByUuid(state) {
    return function (uuid) {
        if (state.devices)
            return state.devices.find(device => device.type == DEVICE_TYPE.SPEAKER && device.attr.speakerInformation && device.attr.speakerInformation.upnp_uuid == uuid)
        return []
    }
}

function getDeviceByTypeInRoom(state) {
    return function (type, roomid) {
        if (state.devices)
            return state.devices.filter(device => device.roomid == roomid && device.type == type)
        return []
    }
}

function getOftenUsedSensors(state) {
    return function (customerID) {
        if (state.devices)
            return state.devices.filter(device => device.type == DEVICE_TYPE.SENSOR && device.roomid != -1 && device.shortcut_by_user && device.shortcut_by_user[customerID])
        return []
    }
}

function getDeviceRemoteSecure(state) {
    return function (textSearch, type) {

        let deviceList = state.devices.filter(device => device.type !== 'IR' && device.type !== 'IRV2' && device.type !== 'SENSOR'
            && device.type !== DEVICE_TYPE.PEBBLE && device.type !== DEVICE_TYPE.INPUT)
        let groupList = state.groups.filter(group => group.type === 2)
        let deviceRemoteList = [...deviceList, ...groupList]

        let newRoomList = []

        state.rooms.forEach(room => {
            deviceRemoteList.map(device => {
                if (device.roomid === room.roomid) {
                    device.floorid = room.floorid
                }
            })
        })

        state.floors.forEach(floor => {
            let devices = deviceRemoteList.filter(device => device.floorid === floor.floorid)

            if (devices && devices.length > 0) {
                newRoomList.push(...devices)
            }
        })



        let devices = deviceList.filter(dev => !dev.roomid || dev.roomid === -1)
        newRoomList.push(...devices)


        if (type) {
            if (type === 'IR') {
                return newRoomList.filter(device => device.type == 'IR' || device.type == 'IRV2')

            }

            if (type === 'LOCK'){
                return newRoomList.filter(device => device.type === DEVICE_TYPE.DOORLOCK || device.type === DEVICE_TYPE.LMYALELOCK)
            }

            return newRoomList.filter(item => item.type === type)
        }

        if (textSearch) {
            textSearch = String(textSearch).toLowerCase();
            return newRoomList.filter(device =>
                (device.macdev && device.macdev.toLowerCase().includes(textSearch))
                || (device.name && device.name.toLowerCase().includes(textSearch))
            )
        }
        return newRoomList

    }
}

function getDeviceInputSearch(state) {
    return function (textSearch, type) {
        let deviceList = state.devices.filter(device => [DEVICE_TYPE.SWITCH, DEVICE_TYPE.CURTAIN, DEVICE_TYPE.FAN, DEVICE_TYPE.LIGHT, DEVICE_TYPE.LIGHTV2, DEVICE_TYPE.SENSOR, DEVICE_TYPE.INPUT, DEVICE_TYPE.LMYALELOCK, DEVICE_TYPE.DOORLOCK, DEVICE_TYPE.CAMERA, DEVICE_TYPE.DAIKIN].includes(device.type))
        if (type) {
            deviceList = deviceList.filter(item => item.type === type)
        }
        if (textSearch) {
            textSearch = String(textSearch).toLowerCase();
            deviceList = deviceList.filter(device =>
                (device.macdev && device.macdev.toLowerCase().includes(textSearch))
                || (device.name && device.name.toLowerCase().includes(textSearch))
            )
        }
        return deviceList
    }
}

function getDeviceOutputSearch(state) {
    return function (textSearch, type) {
        let deviceList = state.devices.filter(device => [DEVICE_TYPE.SWITCH, DEVICE_TYPE.CURTAIN, DEVICE_TYPE.FAN, DEVICE_TYPE.LIGHT, DEVICE_TYPE.LIGHTV2, DEVICE_TYPE.DAIKIN, DEVICE_TYPE.SPEAKER].includes(device.type))
        let remoteList = state.remotes.filter(item => !(item.type === DEVICE_TYPE.IR && (!item.irCommands || !item.irCommands.length)))
        let deviceRemoteList = [...deviceList, ...remoteList]
        if (type) {
            if (type === 'IR') {
                deviceRemoteList = deviceRemoteList.filter(device => device.type === DEVICE_TYPE.IR || device.type === DEVICE_TYPE.IRV2)
            } else deviceRemoteList = deviceRemoteList.filter(item => item.type === type)
        }
        if (textSearch) {
            textSearch = String(textSearch).toLowerCase();
            deviceRemoteList = deviceRemoteList.filter(device =>
                (device.macdev && device.macdev.toLowerCase().includes(textSearch))
                || (device.name && device.name.toLowerCase().includes(textSearch))
            )
        }
        return deviceRemoteList
    }
}

function getDevicesSearch(state) {
    return function (textSearch, type, groupType) {
        let deviceList = state.devices
        if (groupType === GROUP_TYPE.normalGroup) {
            let devicesTypeList = [DEVICE_TYPE.SWITCH, DEVICE_TYPE.LIGHT, DEVICE_TYPE.FAN, DEVICE_TYPE.CURTAIN, DEVICE_TYPE.DAIKIN]
            deviceList = deviceList.filter(item => item.brigde_key === 'zigbee' && devicesTypeList.includes(item.type))
        } else if (groupType === GROUP_TYPE.lightingGroup) {
            deviceList = deviceList.filter(item => item.brigde_key === 'bluetooth')
        }
        if (type)
            deviceList = deviceList.filter(item => item.type === type)
        textSearch = String(textSearch).toLowerCase();
        if (textSearch == 'ir') {
            let remote = state.remotes
            let ir = deviceList.filter(device => device.type == 'IR' || device.type == 'IRV2')
            return [...remote, ...ir]
        } else {
            return deviceList.filter(device =>
                (device.macdev && device.macdev.toLowerCase().includes(textSearch))
                || (device.name && device.name.toLowerCase().includes(textSearch)))
        }
    }
}


function getDevicesConfigSearch(state) {
    return function (textSearch, type, groupType) {
        let deivces = state.devices.filter(device => device.type !== 'IR' && device.type !== 'IRV2')
        let deviceIrAndRemote = []
        let devicesIr = state.devices.filter(device => device.type === 'IR' || device.type === 'IRV2')
        devicesIr.forEach(device => {
            let remotes = state.remotes.filter(remote => remote.devid === device.devid)
            let devicePush = [...remotes, device]
            deviceIrAndRemote.push(...devicePush)
        })

        let deviceList = [...deivces, ...deviceIrAndRemote]
        if (groupType === GROUP_TYPE.normalGroup) {
            let devicesTypeList = [DEVICE_TYPE.SWITCH, DEVICE_TYPE.LIGHT, DEVICE_TYPE.FAN, DEVICE_TYPE.CURTAIN, DEVICE_TYPE.DAIKIN]
            deviceList = deviceList.filter(item => item.brigde_key === 'zigbee' && devicesTypeList.includes(item.type))
        } else if (groupType === GROUP_TYPE.lightingGroup) {
            deviceList = deviceList.filter(item => item.brigde_key === 'bluetooth')
        }
        if (type) {

            if (type === 'IR') {
                let remote = state.remotes
                let ir = deviceList.filter(device => device.type == 'IR' || device.type == 'IRV2')
                console.log('123123')
                deviceList = [...ir]
            }

            else if (type === 'LOCK'){
                deviceList = deviceList.filter(item => item.type === DEVICE_TYPE.DOORLOCK || item.type === DEVICE_TYPE.LMYALELOCK )
            }
            else {
                deviceList = deviceList.filter(item => item.type === type)
            }
        }

        textSearch = String(textSearch).toLowerCase();
        if (textSearch == 'ir') {
            let remote = state.remotes
            let ir = deviceList.filter(device => device.type == 'IR' || device.type == 'IRV2')
            console.log('123123')
            return [...remote, ...ir]
        } else {
            return deviceList.filter(device =>
                (device.macdev && device.macdev.toLowerCase().includes(textSearch))
                || (device.name && device.name.toLowerCase().includes(textSearch))
                || (device.devid && device.devid.toLowerCase().includes(textSearch)))
        }

    }
}


function getDevicesByGroup(state) {
    return function (groupid) {
        if (state.devices) {
            return state.devices.filter(device => device.groupid === groupid)
        }
        return []
    }
}

function getRoomLightSensorData(state) {
    return function (roomid) {
        if (state.devices) {
            return state.devices.filter(device => device.roomid == roomid && device.type == DEVICE_TYPE.SENSOR && getMainTraits(device) == DEVICE_TRAIT.Luminance)
        }
        return false
    }
}

function getRoomTemperatureSensorData(state) {
    return function (roomid) {
        if (state.devices) {
            return state.devices.filter(device => device.roomid == roomid && device.type == DEVICE_TYPE.SENSOR && getMainTraits(device) == DEVICE_TRAIT.Temperature)
        }
        return false
    }
}

function getRoomHumiditySensorData(state) {
    return function (roomid) {
        if (state.devices) {
            return state.devices.filter(device => device.roomid == roomid && device.type == DEVICE_TYPE.SENSOR && getMainTraits(device) == DEVICE_TRAIT.Humidity)
        }
        return false
    }
}


function addDevices({ dispatch }, { action, brigde_key, machc, ip }) {
    let method = 'set';
    let type = "join";
    let data;

    if (brigde_key == 'virtual')

        type = "add_virtual"
    data = [{
        "action": action,
        "brigde_key": brigde_key,
        "machc": machc,
        "param": [{
            "action": "add",
            "data": { "ip": ip }
        }]
    }]

    if (brigde_key == 'coolmaster')
        data = [{
            "action": action,
            "brigde_key": brigde_key,
            "machc": machc,
            "param": [{
                "action": "add",
                "data": { "ip": ip }
            }]
        }]
    else
        data = [{
            "action": action,
            "brigde_key": brigde_key,
            "machc": machc
        }]

    return dispatch('pushConfigToThingNoAnimation', { method, type, data })

}

function addDevicesRemotesInRoom({ dispatch }, { deviceRemoteInRoom, typeDR }) {
    let method = 'post';
    let type = typeDR;
    let data = deviceRemoteInRoom;
    return dispatch('pushConfigToThing', { method, type, data })
}

function deleteSelectRemote({ dispatch }, { deviceRemoteOut, typeDR }) {
    let method = 'delete';
    let type = typeDR;
    let data = deviceRemoteOut;
    return dispatch('pushConfigToThing', { method, type, data })
}

function updateDevice({ dispatch }, { devid, updateData, method = CMD_KEY_FROM_HC.post, animation = true }) {
    let type = "devices";
    let data = [{
        "devid": devid,
        ...updateData
    }];
    if (animation)
        return dispatch('pushConfigToThing', { method, type, data })
    return dispatch('pushConfigToThingNoAnimation', { method, type, data })
}

function updateDevices({ dispatch }, data) {
    let method = 'post';
    let type = "devices";
    return dispatch('pushConfigToThing', { method, type, data })
}

function syncDevices({ dispatch }, { brigde_key, machc }) {
    let method = "set";
    let type = "join";
    let data = [{
        "brigde_key": brigde_key,
        "action": 1,
        "machc": machc,
        "param": [
            {
                "action": "sync",
                "data": {}
            }
        ]
    }]
    return dispatch('pushConfigToThingNoAnimation', { method, type, data })

}

function removeDevices({ dispatch }, { brigde_key, machc }) {

    let method = 'set';
    let type = "reset_brigde";
    let data

    if (brigde_key == 'virtual' || brigde_key == 'speaker' || brigde_key == 'zigbee' || brigde_key == 'coolmaster' || brigde_key == 'zwave') {
        data = [{
            "brigde_key": brigde_key,
            "machc": machc
        }];
    } else {
        type = 'left';
        data = [{
            "brigde_key": brigde_key,
            "action": 1,
            "machc": machc
        }]
    }
    return dispatch('pushConfigToThingNoAnimation', { method, type, data })
}


function changeDeviceStatus({ dispath }, { device_status }) {

    console.log('devicestatus', device_status);
    let execution
    if (device_status.states && device_status.states.OnOff) {
        execution = {
            "command": DEVICE_TRAIT.OnOff,
            "params": {
                "on": !(device_status.states && device_status.states.OnOff && device_status.states.OnOff.on)
            }
        }
    }

    if (device_status && device_status.states.OpenClose) {
        execution = {
            "command": DEVICE_TRAIT.OpenClose,
            "params": {
                "open": !(device_status.states && device_status.states.OpenClose && device_status.states.OpenClose.open)
            }
        }
    }

    console.log('execution', execution);
    return $dispatch($api.HomeControll.controllDevice, {
        devid: device_status.devid,
        execution
    });
}

function changeIconDevices({ dispatch }, { devid, iconkey, real_type }) {
    let method = 'post';
    let type = "devices";
    let data = [{
        "devid": devid,
        "iconkey": iconkey,
        "real_type": real_type
    }]
    return dispatch('pushConfigToThing', { method, type, data })
}

function changeNameDeivce({ dispatch }, { devid, name }) {
    let method = 'post';
    let type = "devices";
    let data = [{
        "devid": devid, "name": name
    }]
    return dispatch('pushConfigToThing', { method, type, data })
}

function changeNameRemote({ dispatch }, { remoteid, name }) {

    let method = "post";
    let type = "remotes"
    let data = [{
        "remoteid": remoteid,
        "name": name
    }]
    return dispatch('pushConfigToThing', { method, type, data })
}


