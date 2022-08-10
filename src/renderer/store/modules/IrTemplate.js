import config from "../../connect/config";
import { METHOD, httpCloud } from "../../connect/http";
import { format } from "fecha";

let BASE_URL_CLOUD = config.URL_SEVER_API

const state = {
    listIrAC: [],
    listIrFan: [],
    listIrSTB: [],
    listIrTV: [],
}

const mutations = {
    UPDATE_IR_AC,
    UPDATE_IR_FAN,
    UPDATE_IR_STB,
    UPDATE_IR_TV,

}

const actions = {
    getIrAC,
    getIrFan,
    getIrSTB,
    getIrTV,
}


//action

function getIrAC({ commit }) {
    let uri = `${BASE_URL_CLOUD}/ir-template/list-manufacture?device_type=IR_AC`

    return httpCloud(METHOD.get, uri).then(result => {
        commit("UPDATE_IR_AC", result.data)
    })
}


function getIrFan({ commit }) {
    let uri = `${BASE_URL_CLOUD}/ir-template/list-manufacture?device_type=IR_FAN`

    return httpCloud(METHOD.get, uri).then(result => {
        commit("UPDATE_IR_FAN", result.data)
    })
}

function getIrSTB({ commit }) {
    let uri = `${BASE_URL_CLOUD}/ir-template/list-manufacture?device_type=IR_STB`

    return httpCloud(METHOD.get, uri).then(result => {
        commit("UPDATE_IR_STB", result.data)
    })
}

function getIrTV({ commit }) {
    let uri = `${BASE_URL_CLOUD}/ir-template/list-manufacture?device_type=IR_TV`

    return httpCloud(METHOD.get, uri).then(result => {
        commit("UPDATE_IR_TV", result.data)
    })
}

//mutation

function UPDATE_IR_AC(state, data) {
    state.listIrAC = data
}

function UPDATE_IR_FAN(state, data) {
    state.listIrFan = data
}

function UPDATE_IR_STB(state, data) {
    state.listIrSTB = data
}

function UPDATE_IR_TV(state, data) {
    state.listIrTV = data
}

export default {
    namespaced: true,
    mutations,
    actions
}
