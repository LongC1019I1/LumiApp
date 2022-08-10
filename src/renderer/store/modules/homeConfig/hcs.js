import config from "../../../connect/config";
import {httpCloud, METHOD} from "../../../connect/http";

let BASE_URL_CLOUD = config.URL_SEVER_API

export {
    //getter
    getHcsShow,

    //mutation
    SHOW_OFF_DEVICE_HCS,
}

function getHcsShow(state) {
    var hcs = state.hcs.map(
        hc => {
            hc.show = false
            return hc
        }
    )
    return state.hcs = hcs
}

function SHOW_OFF_DEVICE_HCS(state, index) {
    let hcs = state.hcs;
     hcs[index].show =! hcs[index].show;
}
