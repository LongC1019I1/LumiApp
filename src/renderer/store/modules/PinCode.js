import config from '../../connect/config'
import {METHOD, httpCloud} from '../../connect/http'

let BASE_URL_CLOUD = config.URL_SEVER_API

const actions = {
    updatePinCode,
    updateNewPinCode,
    forgotPin
}

function updatePinCode({dispatch, state}, {is, pin}) {

    let uri = `${BASE_URL_CLOUD}/customer/update-pin-code`;
    return httpCloud(METHOD.post, uri, {
        body: {
            "is_new": is,
            "new_pin_code": pin
        }
    })
}


function updateNewPinCode({dispatch, state}, {is, newpin, oldpin}) {

    let uri = `${BASE_URL_CLOUD}/customer/update-pin-code`;
    return httpCloud(METHOD.post, uri, {
        body: {
            "is_new": is,
            "new_pin_code": newpin,
            "old_pin_code": oldpin,
        }
    })
}

function forgotPin({dispatch, state}) {
    let uri = `${BASE_URL_CLOUD}/customer/forgot-pin-code`;
    return httpCloud(METHOD.get, uri)
}

export default {
    namespaced: true,
    actions
}
