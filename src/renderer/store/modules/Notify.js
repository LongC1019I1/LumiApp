import config from '../../connect/config'
import { METHOD, httpCloud, httpCloudNoAnimation } from '../../connect/http'
let BASE_URL_CLOUD = config.URL_SEVER_API
import { format } from "fecha"
const state = getDefaultState()

const getters = {
  getNotifiesListFilterByDate,
  isHasNotifyNotRead
};

const mutations = {
  UPDATE_NOTIFYLIST,
  TOGGLE_SHOW_HIDE,
  READ_NOTIFY,
  READ_ALL_NOTIFY,
  RESET_DATA
}


const actions = {
  getNotifyList,
  readNotify,
  readAllNotify,
  resetData
};

function getDefaultState() {
  return {
    notifiesListType1: [],
    notifiesListType2: [],
    notifiesListType3: [],
  }
}

//getters
function getNotifiesListFilterByDate(state) {
  return function (type) {
    let filterDate = {}
    if (state[`notifiesListType${type}`])
      state[`notifiesListType${type}`].forEach(notify => {
        let notifyDate = format(notify.created_at * 1000, 'DD-MM-YYYY')
        notify.timer = format(notify.created_at * 1000, 'h:mm A')
        if (filterDate[notifyDate]) filterDate[notifyDate].push(notify)
        else filterDate[notifyDate] = [notify]
      })
    return filterDate
  }
}
function isHasNotifyNotRead(state) {
  return function (type) {
    if (state[`notifiesListType${type}`])
      return state[`notifiesListType${type}`].some(notify =>
        notify.is_read == 0
      )
    return false
  }
}
//mutations
function UPDATE_NOTIFYLIST(state, { type, data }) {
  data.forEach(item => item.isShow = false)
  state[`notifiesListType${type}`] = data
}
function TOGGLE_SHOW_HIDE(state, notify) {
  notify.isShow = !notify.isShow;
}
function READ_NOTIFY(state, notify) {
  notify.is_read = 1;
}
function READ_ALL_NOTIFY(state, type) {
  state[`notifiesListType${type}`].forEach(item => item.is_read = 1)
}

function RESET_DATA(state) {
  Object.assign(state, getDefaultState())
}
//action
function getNotifyList({ commit }, { page = 1, size = 15, is_read = null, type = 1 } = {}) {
  let uri = `${BASE_URL_CLOUD}/notify/list?page=${page}&size=${size}&type=${type}`
  if (type == 1 || is_read != null) uri += `&is_read=${is_read}`
  return httpCloud(METHOD.get, uri, {
  }).then(result => {
    commit("UPDATE_NOTIFYLIST", { type, data: result.data.content })
    return result
  })
}
function readNotify({ commit }, notify) {
  let uri = `${BASE_URL_CLOUD}/notify/is-read`
  return httpCloudNoAnimation(METHOD.put, uri, {
    body: {
      is_read: 1,
      ids: [notify.id]
    }
  }).then(result => {
    commit('READ_NOTIFY', notify)
    return result
  })
}
function readAllNotify({ commit }, { type = 1 }) {
  let uri = `${BASE_URL_CLOUD}/notify/is-read`
  return httpCloudNoAnimation(METHOD.put, uri, {
    body: {
      is_read: 1,
      ids: []
    }
  }).then(result => {
    commit('READ_ALL_NOTIFY', type)
    return result
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
