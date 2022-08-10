import config from '../../../connect/config'
import { httpCloud, METHOD } from "../../../connect/http";

let BASE_URL_CLOUD = config.URL_SEVER_API

export {
    getRemote,
    getAllRemoteAndIR,
    updateRemote,
    onAddIR,
    onAddIRv2

}

function getAllRemoteAndIR(state) {
    let remote = state.remotes
    let ir = state.devices.filter(device => device.type == 'IR')
    return [...ir, ...remote]
}

function getRemote(state) {
    return function (remoteid) {
        if (state.remotes)
            return state.remotes.find(device => device.remoteid == remoteid)
        return {}
    }
}

function updateRemote({ dispatch }, { remoteid, updateData, animation = true }) {
    let method = 'post';
    let type = "remotes";
    let data = [{
        remoteid,
        ...updateData
    }];
    if (animation)
        return dispatch('pushConfigToThing', { method, type, data })
    return dispatch('pushConfigToThingNoAnimation', { method, type, data })
}


function onAddIR({ dispatch }, { device, irtype }) {


    let method = "post";
    let type = "remotes";
    let data = [{ ...device, "irtype": String(irtype) }]


    return dispatch('pushConfigToThing', { method, type, data })
}

function onAddIRv2({ dispatch }, { device, irtype, irData }) {
    let method = "post";
    let type = "remotes";
    let data = [{ ...device, "irtype": irtype, "irData": { ...irData } }]

    return dispatch('pushConfigToThing', { method, type, data })
}
