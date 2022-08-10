import i18n from '../../lang/i18n'

const state = getDefaultState()

const mutations = {
  SET_LANG,
  SET_PAGE_LOADING,
  ROOM_FLOOR_SET_SELECTED_ROOMID,
  SET_CURRENT_SPEAKER,
  UPDATE_MODAL_STATUS,
  RESET_DATA
}

const actions = {
  setPageLoading,
  setCurrentSpeaker,
  resetData
}

function getDefaultState() {
  return {
    language: 'VN',
    isLoading: false,
    currentSpeaker: false,
    modal: {
      modalChooseSensor: false,
      modalControllFan: false,
      modalControllDimmer: false,
      modalControllSwitchWithCamera: false,
      modalControllCurtain: false,
      modalControllDaikin: false,
      modalControllRemoteAirV1: false,
      modalControllRemoteAirV2: false,
      modalControllRemoteFanV1: false,
      modalControllRemoteFanV2: false,
      modalControllRemoteTvV1: false,
      modalControllRemoteTvV2: false,
      modalControllRemoteStbV2: false,
      modalDeviceInfo: false,
      modalDeviceHistory: false,
      modalFullCamera: false,
      modalFixedCamera: false,
    },
    roomFloor: {
      selectedRoomID: ''
    }
  }
}

//mutation
function SET_LANG(state, lang) {
  localStorage.setItem('lang', lang)
  state.language = lang
  i18n.locale = lang
}

function SET_PAGE_LOADING(state, data) {
  state.isLoading = data
}

function SET_CURRENT_SPEAKER(state, data) {
  state.currentSpeaker = data
}

function ROOM_FLOOR_SET_SELECTED_ROOMID(state, data) {
  state.roomFloor.selectedRoomID = data
}

function UPDATE_MODAL_STATUS(state, { modal, data }) {
  state.modal[modal] = data
}

function RESET_DATA(state) {
  Object.assign(state, getDefaultState())
}
//actions
function setPageLoading({ commit, state }, value) {
  commit('SET_PAGE_LOADING', value)
  if (value)
    setTimeout(() => {
      if (state.isLoading === false || state.isLoading === true)
        return
      if (state.isLoading === value) {
        commit('SET_PAGE_LOADING', false)
        $alertify.confirm({
          title: i18n.t('notify.notifyDefautlTitle'),
          text: i18n.t('notify.timeout')
        })
      }
    }, 20000)
}

function setCurrentSpeaker({ getters, commit, dispatch }, data) {
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    data
  );
  if (status && status.status && status.status !== "ERROR")
    dispatch('HCMusic/getPlayListUSB', data, { root: true })
  commit("SET_CURRENT_SPEAKER", data)
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
