import config from '../../../connect/config'
import { METHOD, httpCloud } from '../../../connect/http'
let BASE_URL_CLOUD = config.URL_SEVER_API

export {
    //mutations
    UPDATE_FLOOR_BY_HOMEID,
    //actions
    addFloors,
    updateFloor,
    deleteFloor,
}
function UPDATE_FLOOR_BY_HOMEID(state, data) {
    state.floor = data[0].data
}
//Floor
function updateFloor({ dispatch }, { floorid, name, animation = true }) {
    let method = 'post';
    let type = "floors";
    let data = [{
        "floorid": floorid,
        "name": name
    }]
    if (animation)
        return dispatch('pushConfigToThing', { method, type, data })
    return dispatch('pushConfigToThingNoanimation', { method, type, data })
}

function deleteFloor({ dispatch }, { floorid }) {
    let method = 'delete';
    let type = "floors";
    let data = [floorid]
    return dispatch('pushConfigToThing', { method, type, data })
}



function addFloors({ dispatch }, floorData) {
    let method = 'post';
    let type = "floors";
    let data = floorData
    return dispatch('pushConfigToThing', { method, type, data })
}