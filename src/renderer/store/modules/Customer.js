import config from '../../connect/config'
import {httpCloud, METHOD} from '../../connect/http'
import alertify from "../../plugins/alertify";

let BASE_URL_CLOUD = config.URL_SEVER_API

const state = getDefaultState()

const mutations = {
    GET_CUSTOMER_DATA,
    UPDATE_CUSTOMER_DATA,
    RESET_DATA,
    CUSTOMER_IS_ADMIN
}

const actions = {
    forgotPassbyEmail,
    info,
    updateProfile,
    updateProfileConfirm,
    getUserId,
    changePass,
    forgotPassbyPhone,
    forgotPassConfirmbyEmail,
    forgotPassConfirmbyPhone,
    resetPass,
    resetData,
}

function getDefaultState() {
    return {
        customerData: {}
    }
}

//mutations
function GET_CUSTOMER_DATA(state, data) {
    state.customerData = data
}

function UPDATE_CUSTOMER_DATA(state, {name, phone, avatar, email}) {
    if (name)
        state.customerData.name = name
    if (avatar)
        state.customerData.avatar = avatar
    if (phone) {
        state.customerData.verify_phone = true
        state.customerData.phone = phone
    }
    if (email) {
        state.customerData.verify_email = true
        state.customerData.email = email
    }
}

function RESET_DATA(state) {
    Object.assign(state, getDefaultState())
}

//ACTION
function info({commit, dispatch}) {
    let uri = `${BASE_URL_CLOUD}/customer/info`
    return httpCloud(METHOD.get, uri, {}).then(result => {
        commit("GET_CUSTOMER_DATA", result.data)
        return result
    }).catch(error => {
        dispatch('info')
    })
}

function updateProfile({commit}, data) {
    let uri = `${BASE_URL_CLOUD}/customer/update-profile`
    return httpCloud(METHOD.post, uri, {
        body: data
    }).then(result => {
        let {name, avatar} = data
        commit("UPDATE_CUSTOMER_DATA", {name, avatar})
        return result
    })
}

function updateProfileConfirm({commit}, data) {
    let uri = `${BASE_URL_CLOUD}/customer/update-profile-confirm`
    return httpCloud(METHOD.post, uri, {
        body: data
    }).then(result => {
        let {phone, email} = data
        commit("UPDATE_CUSTOMER_DATA", {phone, email})
        return result
    })
}

function changePass(context, data) {
    let uri = `${BASE_URL_CLOUD}/customer/change-pass`
    return httpCloud(METHOD.post, uri, {
        body: data
    })
}

async function getUserId({commit}, {email, phone}) {
    let userid;
    if (email) {
        let uri = `${BASE_URL_CLOUD}/customer/check-info?email=${email}`
        await httpCloud(METHOD.get, uri, {}).then(result => {
            if (result && result.success) {
                userid = result.data.userid
            }
            if (result && !result.success) {
                console.log(result.message)
                alertify.confirm({html: "Tài khoản chưa được kích hoạt. <br/> Vui lòng kiểm tra lại"})
            }
        })
    }
    if (phone) {
        let uri = `${BASE_URL_CLOUD}/customer/check-info?phone=${phone}`
        await httpCloud(METHOD.get, uri, {}).then(result => {
            if (result && result.success) {
                userid = result.data.userid
            }

            if (result && !result.success) {
                console.log(result.message)
                alertify.confirm({html: "Tài khoản chưa được kích hoạt. <br/> Vui lòng kiểm tra lại"})
            }
        })
    }

    console.log({2: userid})

    return userid

}

function forgotPassbyEmail(context, data) {
    let uri = `${BASE_URL_CLOUD}/customer/forgot-pass-by-email?email=${data.email}`
    return httpCloud(METHOD.get, uri, {})
}

function forgotPassbyPhone(context, data) {
    let uri = `${BASE_URL_CLOUD}/customer/forgot-pass-by-phone?phonenumber=${data.phonenumber}`
    return httpCloud(METHOD.get, uri, {})
}

function forgotPassConfirmbyEmail(context, {verify_code, email}) {
    let uri = `${BASE_URL_CLOUD}/customer/forgot-pass-confirm-by-email`
    return httpCloud(METHOD.post, uri, {
        body: {verify_code, email},
    })
}

function forgotPassConfirmbyPhone(context, data) {
    let uri = `${BASE_URL_CLOUD}/customer/forgot-pass-confirm-by-phone`
    return httpCloud(METHOD.post, uri, {
        body: data,
    })
}

function resetPass(context, {verify_code, customer_id, password, password_confirm}) {
    let uri = `${BASE_URL_CLOUD}/customer/reset-pass`
    return httpCloud(METHOD.post, uri, {
        body: {verify_code, customer_id, password, password_confirm},
    })
}

function resetData({commit}) {
    commit('RESET_DATA')
}

function CUSTOMER_IS_ADMIN(state) {
    state.customerData.admin = $state.HomeConfig.users.find(user => user.email ? user.email === $state.Customer.customerData.email :
        user.phone ? user.phone === $state.Customer.customerData.phone : ''
    ).admin
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
