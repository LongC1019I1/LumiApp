export {
    getListGroupByType,
    //action
    addGroups,
    updateGroup,
    deleteGroup
}

function getListGroupByType(state) {
    return function (groupType) {
        if (state.groups)
            return state.groups.filter(group => group.type === groupType)
        return []
    }
}


function addGroups({ dispatch }, groupData) {
    let method = 'post';
    let type = "groups";
    let data = groupData
    return dispatch('pushConfigToThing', { method, type, data })
}

function updateGroup({ dispatch }, { groupid, updateData }) {
    let method = 'post';
    let type = "groups";
    let data = [{
        groupid,
        ...updateData
    }]
    return dispatch('pushConfigToThing', { method, type, data })
}

function deleteGroup({ dispatch }, { groupid }) {
    let method = 'delete';
    let type = "groups";
    let data = [
        groupid
    ]
    return dispatch('pushConfigToThing', { method, type, data })
}

