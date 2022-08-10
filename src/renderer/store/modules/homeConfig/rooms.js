export {
    //getters
    getRoomByID,
    getRoomsByFloorId,
    getFillterRoomsByFloor,
    getFillterRoomsHasDeviceByFloor,
    //actions
    addRooms,
    updateRoom,
    deleteRoom,
}

function getRoomByID(state) {
    return function (roomid) {
        if (state.rooms) {
            return state.rooms.find(room => room.roomid == roomid)
        }
        return {}
    }
}

function getRoomsByFloorId(state) {
    return function (floorId) {
        if (state.rooms) {
            return state.rooms.filter(room => room.floorid == floorId)
        }
        return []
    }
}

function getFillterRoomsByFloor(state) {
    if (state.floors) {
        return state.floors.map(floor => {
            return {
                floorid: floor.floorid,
                floorName: floor.name,
                roomList: state.rooms.filter(room => room.floorid == floor.floorid)
            }
        })
    }
    return []
}

function getFillterRoomsHasDeviceByFloor(state) {
    if (state.floors) {
        return state.floors.map(floor => {
            return {
                floorid: floor.floorid,
                name: floor.name,
                roomList: state.rooms.filter(room => room.floorid == floor.floorid&&state.controllList.find(item=>item.roomid===room.roomid))
            }
        })
    }
    return []
}
//Room

function addRooms({ dispatch }, roomData) {
    let method = 'post';
    let type = "rooms";
    let data = roomData
    return dispatch('pushConfigToThing', { method, type, data })
}

function updateRoom({ dispatch }, { roomid, updateData }) {
    let method = 'post';
    let type = "rooms";
    let data = [{
        roomid,
        ...updateData
    }]
    return dispatch('pushConfigToThing', { method, type, data })
}

function deleteRoom({ dispatch }, { roomid }) {


    let method = 'delete';
    let type = "rooms";
    let data = [
        roomid
    ]
    return dispatch('pushConfigToThing', { method, type, data })
}


