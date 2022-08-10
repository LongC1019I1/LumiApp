import { TYPE_RULE } from '@/plugins/variableConst'
export {
    //getters
    getRulesByType,
    getAllRulesByType,
    getOftenUsedRulesByType,
    getRulesByTypeAndRoomID,
    getAllRulesByTypeAndDevid,
    //action
    createRule,
    updateRule,
    deleteRule
}

function getRulesByType(state) {
    return function (type) {
        if (state.rules)
            return state.rules.filter(item => type.includes(item.type) && item.enable && !(item.type === TYPE_RULE.rule_security && item.security))
        return []
    }
}

function getAllRulesByTypeAndDevid(state) {
    return function (type, devid) {
        if (state.rules)
            return state.rules.filter(item =>
                type.includes(item.type) &&
                !(item.type === TYPE_RULE.rule_security && item.security) &&
                (item.in.devices && item.in.devices.find(device => device.devid === devid)||
                (item.out.devices && item.out.devices.find(device => device.devid === devid))))
        return []
    }
}

function getAllRulesByType(state) {
    return function (type) {
        if (state.rules)
            return state.rules.filter(item => type.includes(item.type) && !(item.type === TYPE_RULE.rule_security && item.security))
        return []
    }
}

function getOftenUsedRulesByType(state) {
    return function ({ type, customerID }) {
        if (state.rules)
            return state.rules.filter(item => type.includes(item.type) && item.enable && item.shortcut_by_user && item.shortcut_by_user[customerID])
        return []
    }
}

function getRulesByTypeAndRoomID(state) {
    return function ({ type, roomid }) {
        if (state.rules)
            return state.rules.filter(item => type.includes(item.type) && item.enable && item.rooms && item.rooms.includes(roomid))
        return []
    }
}

function createRule({ dispatch }, { data, animation = true }) {
    let method = 'post';
    let type = "rules";
    if (animation)
        return dispatch('pushConfigToThing', { method, type, data })
    return dispatch('pushConfigToThingNoAnimation', { method, type, data })
}
function updateRule({ dispatch }, { ruleid, updateData, animation = true }) {
    let method = 'post';
    let type = "rules";
    let data = [{
        ruleid,
        ...updateData
    }]
    if (animation)
        return dispatch('pushConfigToThing', { method, type, data })
    return dispatch('pushConfigToThingNoAnimation', { method, type, data })
}

function deleteRule({ dispatch }, { ruleid }) {
    let method = 'delete';
    let type = "rules";
    let data = ruleid

    console.log('data',ruleid)
    return dispatch('pushConfigToThing', { method, type, data })
}
