import config from "../../connect/config";
import { METHOD, httpCloud } from "../../connect/http";
import { format } from "fecha";


let BASE_URL_CLOUD = config.URL_SEVER_API

const state = getDefaultState();


const mutations = {
    UPDATE_IR_AC,
    UPDATE_IR_TV,
    UPDATE_IR_STB,
    UPDATE_IR_FAN,
    RESET_DATA,
    UPDATE_CURRENT_CHANNEL
}

const actions = {
    getRemote,
    resetData,
}



function getDefaultState() {
    return {
        airRemote: [],
        tvRemote: [],
        fanRemote: [],
        stbRemote: [],
        currentChannel: {}
    }
}

//getter

function getCurrentChannel(channel) {
    return channel
}


//action
function getRemote({ commit }, { data_type, manufacture }) {
    let uri = `${BASE_URL_CLOUD}/ir-template/get-ir-data-by-keys?device_type=${data_type}&manufacture=${manufacture}`
    return httpCloud(METHOD.get, uri
    ).then(result => {
        if (data_type == 'IR_AC') {
            commit("UPDATE_IR_AC", result.data)
        }

        if (data_type == 'IR_TV') {
            commit("UPDATE_IR_TV", result.data)
        }

        if (data_type == 'IR_STB') {
            commit("UPDATE_IR_STB", result.data)
        }

        if (data_type == 'IR_FAN') {
            commit("UPDATE_IR_FAN", result.data)
        }
    })
}

function resetData({ commit }) {
    commit('RESET_DATA')
}



//mutation

function UPDATE_IR_AC(state, data) {
    state.airRemote = data
}

function UPDATE_IR_TV(state, data) {
    state.tvRemote = data
}

function UPDATE_IR_STB(state, data) {
    state.stbRemote = data
}

function UPDATE_IR_FAN(state, data) {
    state.fanRemote = data
}

function UPDATE_CURRENT_CHANNEL(state, data) {
    console.log('current REmote', data)
    state.currentChannel = data
}

function RESET_DATA(state) {
    Object.assign(state, getDefaultState())
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
}

