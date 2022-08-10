
import config from '../../connect/config'
import { METHOD, httpDefault } from '../../connect/http'

const actions = {
  uploadFile,
}

//ACTION
function uploadFile({ commit }, { files }) {

  let uri = `${config.URL_SEVER_MEDIA}/site/upload`
  return httpDefault(METHOD.post, uri, {
    headers: {
      'X-Lumi-Api-Key': config.API_KEY_WEB,
    },
    body: {
      'UploadForm[files]': [{
        file: files.path,
        name: files.name.replace(/ /gi, '_'),
        content_type: 'image/jpeg'
      }]
    },
    options: { multipart: true }
  })
}

export default {
  namespaced: true,
  actions
}