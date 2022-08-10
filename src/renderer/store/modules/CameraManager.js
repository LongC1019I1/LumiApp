import digest from '@/plugins/http-digest-client'
import { getStreamUrl, deleteFile } from "@/plugins/playCamera";
import { parseUrlCamera } from "@/plugins/helper";
import app from "electron";
import path from "path";

const state = getDefaultState()

const getters = {
  getStreamInfo,
}

const mutations = {
  ADD_CAMERA_STREAM,
  GO_ONLINE_STREAM,
  STOP_CAMERA_STREAM,
  DELETE_CAMERA_STREAM,
  HISTORY_CAMERA_STREAM,
  RESET_DATA,
}

const actions = {
  resetData,
  addCameraStream,
  goOnlineStream,
  stopCameraStream,
  deleteCameraStream,
  historyCameraStream,
  getSnapShot
}

function getDefaultState() {
  return {
    cameraList: {}
  }
}

//getters
function getStreamInfo(state) {
  return function (camid) {
    if (camid && !state.cameraList[camid])
      state.cameraList[camid] = {
        camid,
        staticPath: '',
        processID: false,
        isStream: false,
        time: 0,
        currentTime: 0
      }
    return state.cameraList[camid]
  }
}

//mutation
function RESET_DATA(state) {
  Object.assign(state, getDefaultState())
}

function ADD_CAMERA_STREAM(state, data) {
  let newData = {}
  newData[data.camid] = data
  state.cameraList = {...state.cameraList, ...newData}
}

function GO_ONLINE_STREAM(state, camid) {
  state.cameraList[camid].time = 0
  state.cameraList[camid].currentTime = 0
}

function STOP_CAMERA_STREAM(state, camid) {
  state.cameraList[camid].isStream = false
}

function DELETE_CAMERA_STREAM(state, camid) {
  state.cameraList[camid].isStream = false
  state.cameraList[camid].time = 0
  state.cameraList[camid].currentTime = 0
  // state[camid].time = 0
  // state[camid].currentTime = 0
  // delete state[camid]
}

function HISTORY_CAMERA_STREAM(state, { camid, value }) {
  state.cameraList[camid].isHistory = value
}
//actions
function addCameraStream({ commit, state }, { camera, time, currentTime }) {
  let { camid } = camera
  let staticPath = path.join(
    app.remote.app.getAppPath(),
    "../static/streamCamera",
    `${camid}.m3u8`
  );
  //dev
  if (process.env.APP_DEV)
    staticPath = `static/streamCamera/${camid}.m3u8`;

  let streamProcess = getStreamUrl(
    parseUrlCamera(camera, currentTime),
    `${camid}.m3u8`
  );
  // state[camid] = { camid, staticPath, streamProcess }
  commit('ADD_CAMERA_STREAM', { camid, staticPath, processID: streamProcess.pid, isStream: true, time, currentTime })
}

function goOnlineStream({ commit, state }, camid) {
  if (state.cameraList[camid])
    commit('GO_ONLINE_STREAM', camid)
}

function stopCameraStream({ commit, state }, camid) {
  let cameraStream = state.cameraList[camid]
  if (cameraStream && cameraStream.processID)
    try {
      $os.killProcess(cameraStream.processID);
    } finally {
      commit('STOP_CAMERA_STREAM', camid)
    }
}

function deleteCameraStream({ commit, state }, camid) {
  let cameraStream = state.cameraList[camid]
  if (cameraStream && cameraStream.processID)
    return new Promise((resolve) => {
      try {
        $os.killProcess(cameraStream.processID);
      } finally {
        commit('DELETE_CAMERA_STREAM', camid)
        resolve(deleteFile(camid))
      }
    });
}

function historyCameraStream({ commit, state }, data) {
  commit('HISTORY_CAMERA_STREAM', data)
}

function getSnapShot(context, { ip, username, password }) {
  let request = digest(username, password);
  return new Promise((resolve, reject) => {
    request.request({
      host: ip,
      path: `/ISAPI/Streaming/Channels/101/picture`,
      port: 80,
      method: 'GET',
      headers: { "content-type": "image/jpeg" } // Set any headers you want
    }, function (res, a) {
      let fullData;
      res.on('data', function (data) {
        if (!fullData) fullData = data
        else fullData = Buffer.concat([fullData, data])
      });
      res.on('error', function (err) {
        reject(err)
      });
      res.on('end', function (err) {
        resolve(fullData)
      });
    });
  })
}

function resetData({ commit }) {
  commit('RESET_DATA')
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
