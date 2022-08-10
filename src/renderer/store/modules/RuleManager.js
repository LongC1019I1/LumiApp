import { getDefaultDeviceExecution, getDefaultInputDeviceState } from "@/plugins/helper"

const state = getDefaultState()

const mutations = {
  SET_DATA,
  RESET_DATA,
  ADD_DEVICES_INPUT,
  ADD_DEVICES_OUTPUT,
  ADD_GROUPS_OUTPUT,
  UPDATE_INPUT_DEVICE_STATUS,
  UPDATE_OUTPUT_DEVICE_STATUS,
  UPDATE_OUTPUT_GROUP_STATUS,
  UPDATE_OUTPUT_SCENE_STATUS,
  DELETE_DEVICE_INPUT,
  DELETE_DEVICE_OUTPUT,
  DELETE_SCENE_OUTPUT,
  DELETE_GROUP_OUTPUT,
  DELETE_ALL_DEVICE_OUTPUT,
  DELETE_ALL_GROUP_OUTPUT,
  DUPLICATE_DEVICE_OUTPUT,
  DUPLICATE_GROUP_OUTPUT,
  UPDATE_NOTIFY_STATUS,
  ADD_SCENESS_OUTPUT,
  DELETE_ALL_DEVICE_INPUT,
  SET_DATA_SECURE
}

const actions = {
  resetData,
  setRule
}

function getDefaultState() {
  return {
    active: 0,
    enable: 1,
    iconkey: "-1",
    in: {
      devices: []
    },
    name: "",
    out: {
      devices: [],
      groups: [],
      scenes: [],
      rules: []
    },
    owner_create: false,
    owner_update: false,
    roomid: null,
    rooms: [],
    ruleid: "",
    shortcut: 0,
    shortcut_by_user: {},
    time_update: {},
    type: 1
  }
}

//mutation

function SET_DATA(state, data) {
  console.log('set data', data)
  Object.assign(state, data)
  if (data.in && data.in.devices && data.in.devices.length) {
    state.in.devices.forEach((device, index) => {
      device.sequence = index
    })
  }
}

function SET_DATA_SECURE(state, data) {
  console.log('set data', data)
  Object.assign(state, data)
}

function ADD_DEVICES_OUTPUT(state, data) {
  state.out.devices = [...state.out.devices || [], ...data.map(creaateOutputDeviceObj)]
}

function ADD_DEVICES_INPUT(state, data) {
  state.in.devices = [...state.in.devices || [], ...data.map(creaateInputDeviceObj)]
}

function ADD_SCENESS_OUTPUT(state, data) {
  state.out.scenes = [...state.out.scenes || [], ...(data || []).map(ruleid => { return { delay: 0, ruleid } })]
}

function ADD_GROUPS_OUTPUT(state, data) {
  state.out.groups = [...state.out.groups || [], ...(data || []).map(creaateOutputGroupObj)]
}

function UPDATE_INPUT_DEVICE_STATUS(state, { index, param, data }) {
  if ((index || index === 0) && param && (data || data === 0) && state.in.devices[index])
    state.in.devices[index][param] = data
}

function UPDATE_OUTPUT_DEVICE_STATUS(state, { index, param, data }) {
  if ((index || index === 0) && param && (data || data === 0) && state.out.devices[index])
    state.out.devices[index][param] = data
}

function UPDATE_OUTPUT_GROUP_STATUS(state, { index, param, data }) {
  if ((index || index === 0) && param && (data || data === 0) && state.out.groups[index])
    state.out.groups[index][param] = data
}

function UPDATE_OUTPUT_SCENE_STATUS(state, { index, param, data }) {
  if ((index || index === 0) && param && (data || data === 0) && state.out.scenes[index])
    state.out.scenes[index][param] = data
}

function UPDATE_NOTIFY_STATUS(state, { param, data }) {
  console.log(data)
  if ((data || data === 0 || data === NaN) && state.out.notify)
    state.out.notify[param] = data
}

function DELETE_DEVICE_INPUT(state, index) {
  state.in.devices.splice(index, 1);
  state.in.devices.forEach((device, index) => {
    device.sequence = index
  })
}

function DELETE_DEVICE_OUTPUT(state, index) {
  state.out.devices.splice(index, 1);
}

function DELETE_SCENE_OUTPUT(state, index) {
  state.out.scenes.splice(index, 1);
}

function DELETE_GROUP_OUTPUT(state, index) {
  state.out.groups.splice(index, 1);
}

function DELETE_ALL_DEVICE_OUTPUT(state, id) {
  state.out.devices = state.out.devices.filter(item => !(item.remoteid ? item.remoteid === id : item.devid === id));
}

function DELETE_ALL_GROUP_OUTPUT(state, id) {
  state.out.groups = state.out.groups.filter(item => item.groupid !== id);
}

function DELETE_ALL_DEVICE_INPUT(state, id) {
  state.in.devices = state.in.devices.filter(item => !(item.remoteid ? item.remoteid === id : item.devid === id));
  state.in.devices.forEach((device, index) => {
    device.sequence = index
  })
}

function DUPLICATE_DEVICE_OUTPUT(state, index) {
  state.out.devices.splice(index + 1, 0, creaateOutputDeviceObj(state.out.devices[index].remoteid || state.out.devices[index].devid))
}

function DUPLICATE_GROUP_OUTPUT(state, index) {
  state.out.groups.splice(index + 1, 0, creaateOutputGroupObj(state.out.groups[index].groupid))
}

function RESET_DATA(state) {
  Object.assign(state, getDefaultState())
}
//actions
function resetData({ commit }) {
  commit('RESET_DATA')
}

function setRule({ commit }, rule) {
  if (rule) {
    commit('SET_DATA', JSON.parse(JSON.stringify(rule)))
  }
  else commit('RESET_DATA')
}

function creaateOutputDeviceObj(devid) {
  let device = $getters['HomeConfig/getDevice'](devid)
  let defautlExecution = getDefaultDeviceExecution(device)
  let newData = {
    devid: device.devid,
    delay: 0,
    transition: 0,
    execution: defautlExecution
  }
  if (device.remoteid) newData.remoteid = device.remoteid
  return newData;
}

function creaateOutputGroupObj(groupid) {
  let newData = {
    groupid,
    delay: 0,
    transition: 0,
    execution: { OnOff: { on: false } }
  }
  return newData;
}

function creaateInputDeviceObj(devid, index) {
  let device = $getters['HomeConfig/getDevice'](devid)
  let defautlStates = getDefaultInputDeviceState(device)
  let newData = {
    cond: 0,
    devid: device.devid,
    sequence: $state.RuleManager.in.devices.length + index,
    states: defautlStates
  }
  if (device.remoteid) newData.remoteid = device.remoteid
  return newData;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
