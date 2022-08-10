
import config from '../../connect/config'
import { METHOD, httpDefault } from '../../connect/http'
const BASE_URL_WHEATHER = config.URL_WHEATHER_API
const WEATHER_API_KEY = config.WEATHER_API_KEY

const state = getDefaultState()

const mutations = {
  UPDATE_LOCAL_DATA,
  RESET_DATA
}

const actions = {
  getWeatherFromLocation,
  resetData
};

function getDefaultState() {
  return {
    localData: {}
  }
}
//mutations
function UPDATE_LOCAL_DATA(state, data) {
  state.localData = data
}

function RESET_DATA(state) {
  Object.assign(state, getDefaultState())
}

//action
function getWeatherFromLocation({ commit }, { location, language = "en" } = {}) {
  let uri = `${BASE_URL_WHEATHER}?lat=${location.lat}&lon=${location.lng}&APPID=${WEATHER_API_KEY}&lang=${language}&units=metric`
  return httpDefault(METHOD.get, uri, {
  }).then(result => {
    commit("UPDATE_LOCAL_DATA", result)
    return result
  })
}

function resetData({ commit }) {
  commit('RESET_DATA')
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
