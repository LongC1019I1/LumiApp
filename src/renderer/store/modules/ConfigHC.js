import config from '../../connect/config'
import { METHOD, httpHCNoAnimation, httpHC } from '../../connect/http'
import fs from 'fs'
let BASE_URL_HC = config.URL_SEVER_HC
const state = getDefaultState()

const mutations = {
  UPDATE_DATA,
  UPDATE_TIMEZONE,
  RESET_DATA,
  UPDATE_CURRENT_HC_SETTING
}

const actions = {
  loginHC,
  getInfo,
  getWifiList,
  configWifi,
  configLAN,
  firmwareUpdate,
  reboot,
  reset,
  configTimezone,
  resetData,
};

function getDefaultState() {
  return {
    isConnected: false,
    currentHcIp: '',
    currentHcMac: '',
    hcData: { mac: '', timezone: '', token: '', firmware: {}, network: {}, time: {} },
  }
}

//mutations
function UPDATE_DATA(state, data) {
  if (data) {
    let { mac, timezone, token, firmware, network, time } = data
    if (mac) state.hcData.mac = mac
    if (timezone) state.hcData.timezone = timezone
    if (token) state.hcData.token = token
    if (firmware) state.hcData.firmware = firmware
    if (network) state.hcData.network = network
    if (time) {
      time.updateTime = Date.now()
      state.hcData.time = time
    }
    state.isConnected = data.isConnected
  } else {
    state.isConnected = false
  }
}

function UPDATE_TIMEZONE(state, { gmt, zone }) {
  state.hcData.time.timezoneUTC = gmt
  state.hcData.time.timezone = zone
}

function UPDATE_CURRENT_HC_SETTING(state, { ip, mac }) {
  state.currentHcIp = ip
  state.currentHcMac = mac
}

function RESET_DATA(state) {
  Object.assign(state, getDefaultState())
}

//action
function loginHC({ commit, dispatch, state }) {
  let uri = `${BASE_URL_HC}/user/login`
  return httpHCNoAnimation(METHOD.post, uri, {
    body: {
      username: config.USERNAME_HC,
      password: config.PASSWORD_HC
    }
  }).then(async result => {
    if (!(result && result.success)) return result
    if (state.currentHcMac && result.data.mac !== state.currentHcMac) {
      console.error('bắt nhầm wifi hc khác')
      return false
    }
    commit('UPDATE_DATA', result.data)
    await dispatch('getInfo')
    commit('UPDATE_DATA', { isConnected: true })
    return result
  }).catch(error => {
    if (BASE_URL_HC === config.URL_SEVER_HC && state.currentHcIp)
      BASE_URL_HC = `https://${state.currentHcIp}:3001`
    else BASE_URL_HC = config.URL_SEVER_HC
    return error
  })
}

function getInfo({ state, commit }) {
  let uri = `${BASE_URL_HC}/device/info`
  return httpHCNoAnimation(METHOD.get, uri, {
    headers: {
      token: state.hcData.token
    }
  }).then(result => {
    if (result && result.success)
      commit('UPDATE_DATA', result.data)
    return result
  })
}

function getWifiList({ state }) {
  let uri = `${BASE_URL_HC}/wifi/list`
  return httpHC(METHOD.get, uri, {
    headers: {
      token: state.hcData.token
    }
  })
}

function configWifi({ state }, data) {
  let uri = `${BASE_URL_HC}/wifi/config`
  return httpHC(METHOD.post, uri, {
    headers: {
      token: state.hcData.token
    },
    body: data
  })
}

function configLAN({ state }, data) {
  let uri = `${BASE_URL_HC}/device/config-lan`
  return httpHC(METHOD.post, uri, {
    headers: {
      token: state.hcData.token
    },
    body: data
  })
}

function firmwareUpdate({ state }, { file }) {
  let data = fs.readFileSync(file.path)
  let uri = `${BASE_URL_HC}/device/update-fw`
  return httpHCNoAnimation(METHOD.post, uri, {
    headers: {
      token: state.hcData.token,
      'Content-Type': 'application/octet-stream'
    },
    body: data
  })
}
function reboot({ state }) {
  let uri = `${BASE_URL_HC}/device/reboot`
  return httpHC(METHOD.put, uri, {
    headers: {
      token: state.hcData.token,
    },
  })
}
function reset({ state }) {
  let uri = `${BASE_URL_HC}/device/reset`
  return httpHC(METHOD.put, uri, {
    headers: {
      token: state.hcData.token,
    },
  })
}

function configTimezone({ state }, { gmt, zone }) {
  let uri = `${BASE_URL_HC}/device/config-timezone`
  return httpHC(METHOD.post, uri, {
    headers: {
      token: state.hcData.token,
    },
    body: {
      timezoneUTC: gmt,
      timezone: zone
    }
  })
}

function resetData({ commit }) {
  BASE_URL_HC = config.URL_SEVER_HC
  commit('RESET_DATA')
}

export default {
  namespaced: true,
  mutations,
  state,
  actions
}
