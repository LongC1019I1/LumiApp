
import config from '../../connect/config'
import { METHOD, httpDefault } from '../../connect/http'
import { DEVICE_TRAIT, SPEAKER_CONFIG_CMD } from '../../plugins/variableConst';
const BASE_URL_ZING = config.URL_SEVER_ZINGMP3

const state = { loveSong: {}, ...getDefaultState() }

const getters = {
  getMylistLoveSong
};

const mutations = {
  UPDATE_LOCAL_DATA,
  UPDATE_ONLINE_TOP_SONG,
  UPDATE_LOVE_SONG,
  UPDATE_CURENT_ONLINE_SONG,
  RESET_DATA
}


const actions = {
  getPlayListUSB,
  playUsbDisk,
  getTopPlayListOnline,
  getOnlineMusicSearch,
  getOnlineSongInfo,
  getRealKey,
  resetData
};

function getMylistLoveSong(state) {
  return function (userid) {
    if (!userid) return []
    if (!state.loveSong[userid]) state.loveSong[userid] = []
    return state.loveSong[userid]
  }
}

function getDefaultState() {
  return {
    currentOnlineSong: false,
    playListUSB: [],
    onlineTopSong: [],
  }
}

//mutations
function UPDATE_LOCAL_DATA(state, data) {
  state.localData = data
}

function UPDATE_ONLINE_TOP_SONG(state, data) {
  state.onlineTopSong = data
}

function UPDATE_CURENT_ONLINE_SONG(state, data) {
  state.currentOnlineSong = data
}

function UPDATE_LOVE_SONG(state, { customerID, songid }) {
  console.log(customerID, songid)
  if (!state.loveSong[customerID]) state.loveSong[customerID] = [songid]
  let index = state.loveSong[customerID].indexOf(songid)
  if (index !== -1) {
    state.loveSong[customerID].splice(index, 1);
  }
  else state.loveSong[customerID].push(songid)
}

function RESET_DATA(state) {
  Object.assign(state, getDefaultState())
}

//action
function getPlayListUSB({ commit, dispatch, rootState }, devid) {
  let deviceID = rootState.ContentManager.currentSpeaker
  let execution = {
    command: DEVICE_TRAIT.ConfigSpeaker,
    params: { configCmd: SPEAKER_CONFIG_CMD.GET_PLAY_USB }
  };
  return dispatch('HomeControll/controllDevice', { devid: devid || deviceID, execution }, { root: true })
}


function getTopPlayListOnline({ commit }) {
  const uri = `${BASE_URL_ZING}/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1`
  return httpDefault(METHOD.get, uri, {}).then(result => {
    result = JSON.parse(result)
    if (result && !result.err)
      commit("UPDATE_ONLINE_TOP_SONG", result.data.song)
  })
}

async function getOnlineMusicSearch(context, key) {
  const uri = `https://ac.mp3.zing.vn/complete?type=song&num=20&query=${key}`
  const uri_topSearch = `https://ac.zingmp3.vn/v1/web/top-search?num=5&query=${key}`
  let topSearch = await httpDefault(METHOD.get, uri_topSearch, {})
  let listSearch = await httpDefault(METHOD.get, uri, {})
  return {
    topSearch,
    listSearch
  }
}

function getRealKey(context, songid) {
  const uri = `${BASE_URL_ZING}/bai-hat/music/${songid}.html`
  return httpDefault(METHOD.get, uri, {}).then(result => {
    result = result.toString()
    const regex1 = /<div.+id=\"zplayerjs-wrapper\".*/g;
    const regex2 = /data-xml=(\s+|)\"(.+)key=(.*?)\"/g;
    const stringTag = result.match(regex1);
    stringTag[0].match(regex2);
    const realKey = RegExp.$3;
    return realKey
    // return httpDefault(METHOD.get, `${BASE_URL_ZING}/xhr${url}`, {})
  })
}

function getOnlineSongInfo(context, realKey) {
  return httpDefault(METHOD.get, `${BASE_URL_ZING}/xhr/media/get-source?type=audio&key=${realKey}`, {})
}

function playUsbDisk({ dispatch, rootState }, index) {

  let devid = rootState.ContentManager.currentSpeaker
  const execution = {
    command: DEVICE_TRAIT.ConfigSpeaker,
    params: { configCmd: SPEAKER_CONFIG_CMD.PLAY_USB_DISK, value: index }
  };
  return dispatch('HomeControll/controllDevice', { devid, execution }, { root: true })
}

function playUrl(devid, url, forRule) {
  const execution = { command: DEVICE_TRAIT.ConfigSpeaker, params: { configCmd: SPEAKER_CONFIG_CMD.PLAY_URL, value: { url } } };

  if (forRule) return execution;

  return window.connection.controlDevices(devid, execution);
}

function resetData({ commit }) {
  commit('RESET_DATA')
}

export default {
  state,
  namespaced: true,
  getters,
  mutations,
  actions
}
