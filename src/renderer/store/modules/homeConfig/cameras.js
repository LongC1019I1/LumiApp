import config from '@/connect/config'
import { METHOD, httpCloud, httpCloudNoAnimation } from '@/connect/http'

let BASE_URL_CLOUD = config.URL_SEVER_API

export {
    //getters
    getCameraByID,
    getCameraByDevid,
    getCameraForSlider,
    //actions
    addCameras,
    updateCamera,
    deleteCamera,
    addCameraLicence
}

function getCameraByID(state) {
    return function (cameraid) {
        if (state.cameras) {
            return state.cameras.find(camera => camera.camid == cameraid)
        }
        return {}
    }
}

function getCameraByDevid(state) {
    return function (devid) {
        if (state.cameras && devid) {
            console.log(devid);
            return state.cameras.find(camera => devid.includes(camera.camid))
        }
        return {}
    }
}

function getCameraForSlider(state) {
    if (state.cameras) {
        let count = 0
        let chunkCameraList = []
        state.cameras.forEach((item, index) => {
            if (chunkCameraList[count])
                chunkCameraList[count].push(item)
            else chunkCameraList[count] = [item]
            if (index % 4 === 3)
                count++
        });
        return chunkCameraList
    }
    return []
}

function addCameras({ dispatch }, cameraData) {
    let method = 'post';
    let type = "cameras";
    let data = cameraData
    return dispatch('pushConfigToThing', { method, type, data })
}

function updateCamera({ dispatch }, { camid, updateData }) {
    let method = 'post';
    let type = "cameras";
    let data = [{
        camid,
        ...updateData
    }]
    return dispatch('pushConfigToThing', { method, type, data })
}

function deleteCamera({ dispatch }, { cameraid }) {
    let method = 'delete';
    let type = "cameras";
    let data = [
        cameraid
    ]
    return dispatch('pushConfigToThing', { method, type, data })
}

function addCameraLicence({ rootState }, { cam_id, cam_model, serial_number }) {
    let uri = `${BASE_URL_CLOUD}/camera/add`
    let home_id = Number(rootState.Home.currentHome && rootState.Home.currentHome.id);
    return httpCloud(METHOD.post, uri, {
        body: {
            cam_id,
            cam_model,
            serial_number,
            home_id
        }
    })
}


