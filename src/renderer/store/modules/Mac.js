
import config from '../../connect/config'
import { METHOD, httpCloud, httpCloudNoAnimation } from '../../connect/http'
let BASE_URL_CLOUD = config.URL_SEVER_API

const actions = {
  addHCToHome,
  checkHCNetwork
}

//ACTION
function addHCToHome(context, data) {
  let uri = `${BASE_URL_CLOUD}/mac/add-hc-to-home`
  return httpCloud(METHOD.post, uri, {
    body: data
  })
}

function checkHCNetwork(context, { authorized_code, network_session_config }) {
  let uri = `${BASE_URL_CLOUD}/mac/check-hc-network`
  return httpCloudNoAnimation(METHOD.post, uri, {
    body: { authorized_code, network_session_config }
  })
}


export default {
  namespaced: true,
  actions
}