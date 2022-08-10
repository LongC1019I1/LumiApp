import config from "../../connect/config";
import { METHOD, httpCloud } from "../../connect/http";
import { format } from "fecha"

let BASE_URL_CLOUD = config.URL_SEVER_API

const state = getDefaultState()

const getters = {
    getLogDevicesByDate,
}

const mutations = {
    UPDATE_LOGDEVICE,
    UPDATE_LOGDEVICES,
    RESET_DATA
}

const actions = {
    getLogDevice,
    resetData
};

function getDefaultState() {
    return {
        logDevices: [],
        logDevice: [],
    }
}
//getter

function getLogDevicesByDate(state) {
    let filterDate = {};
    state.logDevices.forEach(notify => {
        let notifyDate = format(notify.time * 1000, 'DD-MM-YYYY')
        notify.day = format(notify.time * 1000, 'DD-MM-YYYY')
        let time = format(notify.time * 1000, 'h:mm A')
        let timer
        if (time.includes('AM')) {
            timer = time.replace('AM', 'SA')
        }
        if (time.includes('PM')) {
            timer = time.replace('PM', 'CH')
        }
        notify.timer = timer
        if (filterDate[notifyDate]) filterDate[notifyDate].push(notify)
        else filterDate[notifyDate] = [notify]
    })
    return filterDate
}

//action
function getLogDevice({ commit, rootState }, { device_id, page = 1, page_size = 30, date }) {
    let uri = `${BASE_URL_CLOUD}/log/log-device`
    let home_id = Number(rootState.Home.currentHome.id);
    let body = {
        page,
        page_size,
        home_id,
    }
    if (device_id) body.device_id = device_id
    if (date) body.date = date
    return httpCloud(METHOD.post, uri, {
        body
    }).then(result => {
        if (device_id)
            commit("UPDATE_LOGDEVICE", result.data.data)
        else
            commit("UPDATE_LOGDEVICES", result.data.data)
        return result
    })
}

function resetData({ commit }) {
    commit('RESET_DATA')
}
//mutation

function UPDATE_LOGDEVICE(state, data) {
    state.logDevice = data
}

function UPDATE_LOGDEVICES(state, data) {
    state.logDevices = data
}


function RESET_DATA(state) {
    Object.assign(state, getDefaultState())
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
