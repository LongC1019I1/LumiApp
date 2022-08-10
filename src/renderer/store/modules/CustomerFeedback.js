import config from '../../connect/config'
import { METHOD, httpCloud } from '../../connect/http'
let BASE_URL_CLOUD = config.URL_SEVER_API
const state = {
  customerInfo: {},
  feedbackListType1: [],
  feedbackListType2: [],
}

const getters = {
  getFeedbackListByType
}

const mutations = {
  UPDATE_CUSTOMER_INFO,
  UPDATE_FEEDBACK_LIST
}

const actions = {
  getCustomerInfo,
  getFeedbackList,
}
//getters
function getFeedbackListByType(state) {
  return function (type){
    return state[`feedbackListType${type}`]
  }
}
//mutations
function UPDATE_CUSTOMER_INFO(state, data) {
  state.customerInfo = data
}

function UPDATE_FEEDBACK_LIST(state, { type = 1, data = [] } = {}) {
  state[`feedbackListType${type}`] = data
}

//ACTION
function getCustomerInfo({ commit }) {
  let uri = `${BASE_URL_CLOUD}/customer-feedback/get-info`
  return httpCloud(METHOD.get, uri, {
  }).then(result => {
    if (result && result.success)
      commit("UPDATE_CUSTOMER_INFO", result.data)
    else
      commit("UPDATE_CUSTOMER_INFO", {})
    return result
  })
}

function getFeedbackList({ commit }, { customer_id, type = 1, limit = 20 } = {}) {
  if (customer_id&&type) {
    let uri = `${BASE_URL_CLOUD}/customer-feedback/get-feedbacks?customer_id=${customer_id}&type=${type}&limit=${limit}`
    return httpCloud(METHOD.get, uri, {
    }).then(result => {
      if (result && result.success)
        commit("UPDATE_FEEDBACK_LIST", { type, data: result.data })
      return result
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}