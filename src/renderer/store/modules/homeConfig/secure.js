import {DEVICE_TYPE, DEVICE_TRAIT, CMD_KEY_FROM_HC, GROUP_TYPE} from '../../../plugins/variableConst'
import {getMainTraits} from '../../../plugins/helper'
import {httpCloud, METHOD} from "../../../connect/http";

export {
    deviceSecureProtected,
    groupSecureProtected,
    deleteSecureProtected,
    addSecureProtected
}

function deviceSecureProtected({dispatch}, {device}) {
    let method = 'post';
    let type = "devices";
    let data

    console.log('devicesss', device)

    if (device.protected === 1) {
        data = [{
            "devid": device.devid,
            protected: 0
        }]

    } else {
        data = [{
            "devid": device.devid,
            protected: 1
        }]
    }
    return dispatch('pushConfigToThingNoAnimation', {method, type, data})
}

function groupSecureProtected({dispatch}, {group}) {
    let method = 'post';
    let type = "groups";
    let data

    console.log('devicesss', group)

    if (group.protected === 1) {
        data = [{
            "groupid": group.groupid,
            protected: 0
        }]

    } else {
        data = [{
            "groupid": group.groupid,
            protected: 1
        }]
    }
    return dispatch('pushConfigToThingNoAnimation', {method, type, data})
}

function deleteSecureProtected({dispatch}, {device}) {
    let method = 'post';
    let type
    let data


    if (device.remoteid) {
        type = 'remotes'
        data = [{
            "remoteid": device.remoteid,
            protected: -1
        }]
    }

   else if (device.devid) {

        type = 'devices'
        data = [{
            "devid": device.devid,
            protected: -1
        }]

    }
   else if (device.groupid) {
        type = 'groups'
        data = [{
            "groupid": device.groupid,
            protected: -1
        }]
    }
    return dispatch('pushConfigToThing', {method, type, data})
}


function addSecureProtected({dispatch}, {devices}) {
    let method = 'post';
    let type
    let data
    let arrDeviceUpdate = []
    let arrGroupUpdate = []

    devices.forEach( device => {
        let devicePush
        let groupPush

        if (device.devid) {



             devicePush = {
                "devid": device.devid,
                protected: 1,
                alarm: false
            }

            arrDeviceUpdate.push(devicePush)

        }

        else if (device.groupid){
            // type = 'groups'
            // data = [{
            //     "groupid": device.groupid,
            //     protected: 1,
            //     alarm: false
            // }]

            groupPush = {
                    "groupid": device.groupid,
                    protected: 1,
                    alarm: false
                }
            arrGroupUpdate.push(groupPush)
        }
    })

    console.log('arrGroupUpdate',arrGroupUpdate)
    console.log('arrDeviceUpdate',arrDeviceUpdate)

    if ( arrDeviceUpdate.length > 0 ){

        type = 'devices'
        data = arrDeviceUpdate

        dispatch('pushConfigToThingNoAnimation', {method, type, data})
    }

    if ( arrGroupUpdate.length > 0 ){

        type = 'groups'
        data = arrGroupUpdate

        dispatch('pushConfigToThingNoAnimation', {method, type, data})
    }
}
