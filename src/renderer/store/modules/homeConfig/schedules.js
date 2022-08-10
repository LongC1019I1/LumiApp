import {getIrDataCommand} from "@/plugins/helper";
import {getIrAcDataCommand} from "@/plugins/helper";
import {IRV2_ID_FAN, IRV2_ID_TV, MODE_IRV2_AC} from "@/plugins/variableConst";

export {
    //getter
    //action
    addSchedule,
    commonConfigSchedule
}


function commonConfigSchedule({dispatch}, {devices}) {
    let method = 'post';
    let type = 'rules'
    let d = new Date();
    let Hm = d.getHours() + ':' + d.getMinutes();
    let data

    data = [
        {
            "name": "",
            "shortcut": 0,
            "active": 0,
            "iconkey": "-1",
            "type": 3,
            "in": {
                "schedule": {
                    "starttime": Hm,
                    "endtime": Hm
                }
            },
            "out": {
                "devices": devices,
                "groups": []
            },
            "enable": 1
        }
    ]

    return dispatch('pushConfigToThing', {method, type, data})
}

function addSchedule({dispatch}, {deviceRemoteid}) {
    let deviceRemoteStatus = $state.HomeControll.listDeviceStatus.find(device => device.devid === deviceRemoteid)
    let devices

    if (!deviceRemoteStatus) {
        deviceRemoteStatus = $state.HomeConfig.remotes.find(device => device.remoteid === deviceRemoteid)
        let buttonid;
        let irActiveV2;
        let devid = deviceRemoteStatus.devid
        let remoteid = deviceRemoteStatus.remoteid

        if (deviceRemoteStatus.type === 'IRV2') {

            console.log('devicestatus', deviceRemoteStatus)

            if (deviceRemoteStatus.irtype === "IR_FAN") {
                irActiveV2 = getIrDataCommand(
                    deviceRemoteStatus.irtype,
                    deviceRemoteStatus.irData,
                    deviceRemoteStatus.irData.ir_code[IRV2_ID_FAN.on_off],
                );
                buttonid = IRV2_ID_FAN.on_off
            }

            if (deviceRemoteStatus.irtype == "IR_TV" || deviceRemoteStatus.irtype == "IR_STB") {
                irActiveV2 = getIrDataCommand(
                    deviceRemoteStatus.irtype,
                    deviceRemoteStatus.irData,
                    deviceRemoteStatus.irData.ir_code[IRV2_ID_TV.power],
                );
                buttonid = IRV2_ID_TV.power
            }

            if (deviceRemoteStatus.irtype === "IR_AC") {
                console.log(123123)
                irActiveV2 = getIrAcDataCommand(deviceRemoteStatus.irData.cmd_rule, {
                    'power': 0,
                    'mode': MODE_IRV2_AC[0].mode,
                    'temp': 15,
                    'swing': 0
                })
                buttonid = IRV2_ID_FAN.on_off
            }



            devices = [
                {
                    "devid": devid,
                    "remoteid": remoteid,
                    "delay": 0,
                    "execution": {
                        "command": "IrActiveV2",
                        "arrIr": {
                            "buttonid": buttonid
                        },
                        "params": {
                            "irActiveV2": irActiveV2
                        }
                    }
                }
            ]

        }

        if (deviceRemoteStatus.type === 'IR') {

            devices =  [
                {
                    "devid": devid,
                    "remoteid": remoteid,
                    "delay": 0,
                    "execution": {
                        "command": "OnOff",
                        "params": {
                            "on": true
                        }
                    }
                }
            ]

        }

    } else {

        let commands = Object.keys(deviceRemoteStatus.states)[0]
        let params = deviceRemoteStatus.states[commands]
        let devid = deviceRemoteStatus.devid;

        devices = [
            {
                "devid": devid,
                "delay": 0,
                "execution": {
                    "command": commands,
                    "params": params
                }
            }
        ]
    }
    return dispatch('commonConfigSchedule', {devices})
}

