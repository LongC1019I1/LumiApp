import config from '../../connect/config'
import io from 'socket.io-client';
import i18n from "../../lang/i18n";


let socket = {}

const state = {
    connectStatus: 0,
    joinroomStatus: 0
}

const actions = {
    connect,
    disconnect,
    joinRoom,
    leavingRoom,
    listenError,
    listenErrorSys,
    listenSystem,
    listenStatus,
    listenConfig,
    listenOta,
    listenBackup,
    listenRestore
}

const mutations = {
    UPDATE_STATUS_CONNECT,
    UPDATE_STATUS_JOINROOM,
}

//mutations
function UPDATE_STATUS_CONNECT(state, data) {
    // 0 chưa kết nối
    // 1 đang kết nối
    // 2 kết nối thành công
    state.connectStatus = data
}

function UPDATE_STATUS_JOINROOM(state, data) {
    state.joinroomStatus = data
}

function connect({ commit, dispatch }) {
    let access_token = sessionStorage.getItem('access_token')
    if (access_token) {
        socket = io(`${config.URL_SEVER_SOCKET}:${config.PORT_SEVER_SOCKET}`, {
            query: `auth_token=${access_token}`,
            transports: ['websocket']
        });
        commit('UPDATE_STATUS_CONNECT', 1)
        socket.on('connected', (data) => {
            console.log('%csocket-connected', 'color:Indigo')
            commit('UPDATE_STATUS_CONNECT', 2)
            if (!socket.onConfig) dispatch('listenConfig')
            if (!socket.onStatus) dispatch('listenStatus')
            if (!socket.onSystem) dispatch('listenSystem')
            if (!socket.onError) dispatch('listenError')
            if (!socket.onErrorSys) dispatch('listenErrorSys')
            if (!socket.onBackup) dispatch('listenBackup')
            if (!socket.onRestore) dispatch('listenRestore')
            if (!socket.onOta) dispatch('listenOta')
        });
        socket.on('disconnect', (data) => {
            console.log('%csocket-disconnected', 'color:red', data)
            if (data == 'io server disconnect')
                socket.connect()
            commit('UPDATE_STATUS_CONNECT', 0)
        });
    }
}

function disconnect({ commit, dispatch }) {
    if ($state.Home.currentHome.id) {
        $commit("Home/UPDATE_CURRENT_HOME", false);
        dispatch('leavingRoom', [homeID]);
    }
    socket.close()
}

function joinRoom({ commit }, homeIDs) {
    socket.emit('joinRoom', homeIDs)
    if (!socket.onJoinroom) socket.onJoinroom = socket.on('joinRoom', (data) => {
        console.log('%csocket-joinRoom', "color:Indigo", data)
        commit('UPDATE_STATUS_JOINROOM', 1)
    });

}

function leavingRoom({ commit }, homeIDs) {
    socket.emit('leavingRoom', homeIDs)
    if (!socket.onLeavingRoom) socket.onLeavingRoom = socket.on('leavingRoom', (data) => {
        console.log('%csocket-leavingRoom', "color:Indigo", data)
        commit('UPDATE_STATUS_JOINROOM', 0)
    });
}

function listenConfig({ rootState, commit }) {
    socket.onConfig = socket.on('config', (data) => {
        console.groupCollapsed('%cconfig-socket', 'color:Indigo', data.payload.reqid)
        console.log(data)
        console.groupEnd()
        commit("HomeConfig/UPDATE_HOME_CONFIG_SOCKET", data, { root: true })
        if (data.payload.reqid == rootState.ContentManager.isLoading)
            commit("ContentManager/SET_PAGE_LOADING", false, { root: true })
        if ($apiStack[data.payload.reqid]) {
            $apiStack[data.payload.reqid](data)
            delete $apiStack[data.payload.reqid]
        }
    })
}

function listenStatus({ rootState, commit }) {
    socket.onStatus = socket.on('status', (data) => {
        console.groupCollapsed('%cstatus-socket', 'color:Indigo', data.payload.reqid)
        console.log(data)
        console.groupEnd()
        if (data.payload.objects[0].data[0].content !== undefined && data.payload.objects[0].data[0] !== undefined) {
            if (data.payload.objects[0].data[0].content.includes('CoolMaster')) {
                $alertify.confirmHome({
                    text: data.payload.objects[0].data[0].content
                });
            }
        }
        commit("HomeControll/UPDATE_CONTROLL_STATUS", data, { root: true })
        if (data.payload.reqid == rootState.ContentManager.isLoading)
            commit("ContentManager/SET_PAGE_LOADING", false, { root: true })
        if ($apiStack[data.payload.reqid]) {
            $apiStack[data.payload.reqid](data)
            delete $apiStack[data.payload.reqid]
        }
    })
}

function listenSystem({ commit }) {
    socket.onSystem = socket.on('system', (data) => {
        console.error('socket-system', data)
    });
}



function listenBackup({ commit, state }) {
    socket.onBackup = socket.on('backup', (data) => {
        console.error('socket-backup', data)
        $commit("Home/UPDATE_STATE_BACKUP_HC", data)
    });


}


function listenRestore({ commit, state }) {
    socket.onRestore = socket.on('restore', (data) => {
        console.error('socket-restore', data)
        $commit("Home/UPDATE_STATE_RESTORE_HC", data)
    });


}

function listenOta({ commit }) {

    let downFirmware = i18n.tc('homeInfo.down-firmware')
    let downSuccess = i18n.tc('homeInfo.update-firmware-success')
    let downFail = i18n.tc('homeInfo.update-firmware-fail')

    socket.onOta = socket.on('ota', (data) => {
        console.error('socket-ota', data)

        let hc = $state.HomeConfig.hcs.find(hc => hc.mac === data.machc)
        let hc_name = (hc.is_master ? 'HC' : 'LC') + ' ' + hc.mac + ' '

        if (hc && hc_name) {
            if (data.state === 1) {
                setTimeout(() => {
                    $alertify.success(hc_name + downFirmware)
                }, 2000)
            }

            if (data.state === 2) {
                setTimeout(() => {
                    $alertify.success(hc_name + downSuccess)
                }, 2000)
            }

            if (data.state === 3) {
                setTimeout(() => {
                    $alertify.error(hc_name + downFail)
                }, 2000)
            }
            $dispatch('Home/getFirmware')
        }

    })
}

function listenError({ commit }) {
    socket.onError = socket.on('error', (data) => {
        console.error('socket-error', data)
    });
}

function listenErrorSys({ commit }) {
    socket.onErrorSys = socket.on('errorSys', (data) => {
        console.error('socket-errorSys', data)
    });
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
