import {format} from "fecha";

export {
    getDefaultIconDevice,
    getStatusDeviceFromVal,
    getActiveDeviceFromVal,
    getIconByTypeForSetting,
    getOptionActionSheet,
    getIconScene,
    hasTraitOnOff,
    getMainTraits,
    getIrDataCommand,
    getIrAcDataCommand,
    getGroupTraitByType,
    getStatusDeviceFromExecution,
    getActiveDeviceFromExecution,
    getDefaultDeviceExecution,
    getDefaultDeviceState,
    getDefaultInputDeviceState,
    calcTimestamp,
    getTypeDeviceName,
    parseUrlCamera,
    deviceStates,
    controllDeviceDefault,
    getRoleUser,
    getDayMonthYear
}

import {
    DEVICE_TYPE,
    DEVICE_TRAIT,
    IR_TYPE, IRV2_ALL_TYPE,
    CURTAIN_MAX_LEVEL,
    TYPE_DEVICE_GROUP_LIGHTING,
    ICON_SCENE, IRV2_ID_TV, IRV2_ID_FAN, IRV2_ID_STB, PLAY_CONTROL, MODE_DAIKIN, TEMP_DAIKIN, SPEED_DAIKIN,
    DEVICE_TYPE_CAN_CONTROLL_DEFAULT,
    ROLE,
    USER_TYPE
} from './variableConst'

function getRoleUser(user){
    return user.admin === ROLE.ADMIN ? this.$t('permission.role.admin') :
        user.user_type === USER_TYPE.GUEST ? this.$t('permission.role.guest'):
            user.user_type === USER_TYPE.SUPPORTER ? this.$t('permission.role.supporter') : this.$t('permission.role.user')
}

function getDayMonthYear(time){
    return time? format(time * 1000,'DD/MM/YYYY') : ''
}

function deviceStates(dev) {
    let myDevice = {}
    if (dev.type === DEVICE_TYPE.SWITCH || dev.type === DEVICE_TYPE.INPUT || dev.type === DEVICE_TYPE.DAIKIN) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                OnOff:
                    { on: true }
            }
        }
    }

    if (dev.type === DEVICE_TYPE.CURTAIN) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                Level: { level: 50 },
            }
        }
    }

    if (dev.type === DEVICE_TYPE.LIGHT) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                Brightness: { brightness: 50 },
            }
        }
    }

    if (dev.type === DEVICE_TYPE.CURTAIN) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                Level: { level: 50 },
            }
        }
    }

    if (dev.type === DEVICE_TYPE.LIGHT) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                Brightness: { brightness: 50 },
            }
        }
    }

    if (dev.type === DEVICE_TYPE.FAN) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                Speed:
                    { speed: 1 }
            }
        }
    }

    if (dev.type === DEVICE_TYPE.SENSOR && dev.traits.find(item => item.name === DEVICE_TRAIT.Pir)) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                PirAlarm:
                    { pirAlarm: true }
            }
        }
    }

    if (dev.type === DEVICE_TYPE.SENSOR && dev.traits.find(item => item.name === DEVICE_TRAIT.Humidity)) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                Humidity:
                    { humidity: 50 }
            }
        }
    }

    if (dev.type === DEVICE_TYPE.SENSOR && dev.traits.find(item => item.name === DEVICE_TRAIT.Luminance)) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                Luminance:
                    { lux: 1000 }
            }
        }
    }

    if (dev.type === DEVICE_TYPE.SENSOR && dev.traits.find(item => item.name === DEVICE_TRAIT.Temperature)) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                Temperature:
                    { temperature: 500 }
            }
        }
    }

    if (dev.type === DEVICE_TYPE.SENSOR && dev.traits.find(item => item.name === DEVICE_TRAIT.Battery)) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                Battery:
                    { battery: 500 }
            }
        }
    }

    if (dev.type === DEVICE_TYPE.SENSOR && dev.traits.find(item => item.name === DEVICE_TRAIT.ContactSensor)) {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                ContactAlarm:
                    { csAlarm: true }
            }
        }
    }

    else {
        myDevice = {
            cond: 0,
            devid: dev.devid,
            states: {
                OnOff:
                    { on: true }
            }
        }
    }

    return myDevice
}

function getDefaultIconDevice(device, states) {
    if (!device) return;

    try {
        const { type, traits } = device;

        if (device.iconkey == '-1') {
            device.iconkey = undefined;
        }

        if (type == DEVICE_TYPE.CURTAIN) {
            return getIconCurtain(device, states);
        }

        if (type == DEVICE_TYPE.SPEAKER) {
            return 'ic-zw-speaker';
        }

        if (type == DEVICE_TYPE.CAMERA) {
            return 'ic-zw-camera';
        }

        if (type == DEVICE_TYPE.COOKER) {
            return 'induction_cooker';
        }

        if (type == DEVICE_TYPE.VIRTUAL) {
            return 'icon-ir-tv-smart-hub';
        }

        if (type == DEVICE_TYPE.IR) {
            if (device.irtype == IR_TYPE.REMOTE_FAN) {
                return 'ic-zw-fan';
            }
            if (device.irtype == IR_TYPE.REMOTE_TV) {
                return 'ic-zw-tv';
            }
            if (device.irtype == IR_TYPE.REMOTE_AIR) {
                return 'ic-zw-thermostat';
            }

            return 'settings_remote';
        }

        if (type == DEVICE_TYPE.IRV2) {
            if (device.irtype == IRV2_ALL_TYPE.IR_FAN) {
                return 'icon-ir2-fan';
            }
            if (device.irtype == IRV2_ALL_TYPE.IR_TV) {
                return 'icon-ir2-tv';
            }
            if (device.irtype == IRV2_ALL_TYPE.IR_STB) {
                return 'icon-ir2-box';
            }
            if (device.irtype == IRV2_ALL_TYPE.IR_AC) {
                return 'icon-ir2-ac';
            }
            if (device.irtype == IRV2_ALL_TYPE.IR_BOX) {
                return 'icon-ir2-box';
            }
            if (device.irtype == IRV2_ALL_TYPE.IR_CAMERA) {
                return 'icon-ir2-camera';
            }
            if (device.irtype == IRV2_ALL_TYPE.IR_DVD) {
                return 'icon-ir2-av';
            }
            if (device.irtype == IRV2_ALL_TYPE.IR_SPEAKER) {
                return 'icon-ir2-speaker';
            }

            return 'icon-remote';
        }

        if (type == DEVICE_TYPE.INPUT) {
            if (device.iconkey) {
                return device.iconkey;
            }

            return 'settings_input_composite';
        }

        if (states) {
            const mainTrait = traits.find((t) => t.is_main);
            if (mainTrait) {
                const name = getIconStateByTrait(mainTrait.name, states[mainTrait.name]);
                if (name !== undefined)
                    return name;
            }
        }

        if (device.iconkey) {
            return device.iconkey;
        }

        switch (type) {
            case DEVICE_TYPE.SWITCH:
                return 'ic-zw-light-bulb';
            case DEVICE_TYPE.LIGHT: {
                if (traits.find((t) => t.name == DEVICE_TRAIT.ColorSpectrum))
                    return 'color-lens';
                return 'ic-zw-overhead-light';
            }
            case DEVICE_TYPE.LIGHTV2:
                if (traits.find((t) => t.name === DEVICE_TRAIT.ColorSpectrum)) {
                    return 'color-lens';
                }
                return 'color-lens';
            // return 'settings_brightness'
            case DEVICE_TYPE.FAN:
                return 'ic-zw-fan';
            case DEVICE_TYPE.CURTAIN:
                return 'device-curtain-horizontal-0';
            case DEVICE_TYPE.DAIKIN:
                return 'ic-zw-thermostat';
            case DEVICE_TYPE.DOORLOCK:
            case DEVICE_TYPE.LMYALELOCK:
                return 'ic-zw-door-lock-keypad';
            case DEVICE_TYPE.SENSOR:
            case DEVICE_TYPE.BATTERY: {
                const mainTrait = traits.find((t) => t.is_main);
                if (mainTrait.name === DEVICE_TRAIT.Battery)
                    return 'ic-zw-power-management-100';
                if (mainTrait.name === DEVICE_TRAIT.Luminance)
                    return 'ic-zw-luminace';
                if (mainTrait.name === DEVICE_TRAIT.Humidity)
                    return 'ic-zw-humidity';
                if (mainTrait.name === DEVICE_TRAIT.Temperature)
                    return 'ic-zw-heat-alarm';
                if (mainTrait.name === DEVICE_TRAIT.Power)
                    return 'ic-zw-metter';
                if (mainTrait.name === DEVICE_TRAIT.Voltage)
                    return 'ic-zw-metter';
                if (mainTrait.name === DEVICE_TRAIT.Ampe)
                    return 'ic-zw-metter';
                if (mainTrait.name === DEVICE_TRAIT.ContactSensor)
                    return 'ic-zw-security-door';
                if (mainTrait.name === DEVICE_TRAIT.Pir)
                    return 'ic-zw-sencer-motion';
                if (mainTrait.name === DEVICE_TRAIT.COAlarm)
                    return 'ic-zw-co-alarm';
                if (mainTrait.name === DEVICE_TRAIT.SmokeAlarm)
                    return 'ic-zw-smoke-alarm';
                if (mainTrait.name === DEVICE_TRAIT.WaterAlarm)
                    return 'ic-zw-water-alarm';
                if (mainTrait.name === DEVICE_TRAIT.GasAlarm)
                    return 'ic-zw-gas-alarm';
                if (mainTrait.name === DEVICE_TRAIT.ShockAlarm)
                    return 'vibration';
                if (mainTrait.name === DEVICE_TRAIT.HeatAlarm)
                    return 'ic-zw-heat-alarm';
                return 'device-unknown';
            }
            case DEVICE_TYPE.PEBBLE:
                return 'device-peppe-normal';
            default:
                return 'device-unknown';
        }
    } catch (error) {
        return 'device-unknown';
    }
};

function getIconCurtain(device, states) {
    if (!states) {
        return device.iconkey || 'device-curtain-horizontal-0';
    }

    const value = states[DEVICE_TRAIT.Level].level;
    let maxLevel = CURTAIN_MAX_LEVEL;
    if (!!device.traits.find(t => t.name === DEVICE_TRAIT.Level)) {
        maxLevel = device.traits.find(t => t.name === DEVICE_TRAIT.Level).max || maxLevel;
    }
    const array = [0, 17, 33, 50, 67, 83, maxLevel];
    const levelCurtain = 6 - getLevelFromValue(value, array);

    if (!device.iconkey) {
        return getArrayIcon('horizontal')[levelCurtain];
    }

    if (device.iconkey == 'device-curtain-horizontal-0') {
        return getArrayIcon('horizontal')[levelCurtain];
    }

    if (device.iconkey == 'cutain-vertical-0') {
        return getArrayIcon('vertical')[levelCurtain];
    }

    if (device.iconkey == 'cutain-screen-0') {
        return getArrayIcon('screen')[levelCurtain];
    }
};


function getArrayIcon(type) {
    if (type == 'vertical') {
        return ['cutain-vertical-0', 'cutain-vertical-1', 'cutain-vertical-2', 'cutain-vertical-3', 'cutain-vertical-4', 'cutain-vertical-5', 'cutain-vertical-6'];
    }
    if (type == 'screen') {
        return ['cutain-screen-0', 'cutain-screen-1', 'cutain-screen-2', 'cutain-screen-3', 'cutain-screen-4', 'cutain-screen-5', 'cutain-screen-6'];
    }

    return ['device-curtain-horizontal-0', 'device-curtain-horizontal-1', 'device-curtain-horizontal-2', 'device-curtain-horizontal-3', 'device-curtain-horizontal-4', 'device-curtain-horizontal-5', 'device-curtain-horizontal-6'];
};

function getIconStateByTrait(trait, state) {
    if (!state) return undefined;

    switch (trait) {
        case DEVICE_TRAIT.Battery: {
            if (state.battery == 0) return 'ic-zw-power-management-00';
            if (state.battery <= 10) return 'ic-zw-power-management-10';
            if (state.battery <= 20) return 'ic-zw-power-management-20';
            if (state.battery <= 30) return 'ic-zw-power-management-30';
            if (state.battery <= 40) return 'ic-zw-power-management-40';
            if (state.battery <= 50) return 'ic-zw-power-management-50';
            if (state.battery <= 60) return 'ic-zw-power-management-60';
            if (state.battery <= 70) return 'ic-zw-power-management-70';
            if (state.battery <= 80) return 'ic-zw-power-management-80';
            if (state.battery <= 90) return 'ic-zw-power-management-90';
            return 'ic-zw-power-management-100';
        }
        case DEVICE_TRAIT.GasAlarm:
            return state.gasAlarm ? 'ic-zw-ga-alarm-active' : 'ic-zw-gas-alarm';
        case DEVICE_TRAIT.Act:
            if (state.act == 0) return 'device-peppe-normal';
            if (state.act == 1) return 'device-peppe-swipe-right';
            if (state.act == 2) return 'device-peppe-swipe-left';
            if (state.act == 3) return 'device-peppe-up';
            if (state.act == 4) return 'device-peppe-down';
            if (state.act == 5) return 'device-peppe-left';
            if (state.act == 6) return 'device-peppe-right';
            if (state.act == 7) return 'device-peppe-hold';
            if (state.act == 8) return 'device-peppe-1-touch';
            if (state.act == 9) return 'device-peppe-2-touch';
            if (state.act == 10) return 'device-peppe-3-touch';
            if (state.act == 11) return 'device-peppe-4-touch';
            if (state.act == 12) return 'device-peppe-5-touch';
            // Pepper v2
            if (state.act == 21) return 'device-peppe-1-touch-1';
            if (state.act == 22) return 'device-peppe-2-touch1';
            if (state.act == 23) return 'device-peppe-hold-1';
            if (state.act == 24) return 'device-peppe-1-touch-2';
            if (state.act == 25) return 'device-peppe-2-touch-2';
            if (state.act == 26) return 'device-peppe-hold-2';
            if (state.act == 27) return 'device-peppe-1-touch-3';
            if (state.act == 28) return 'device-peppe-2-touch-3';
            if (state.act == 29) return 'device-peppe-hold-3';
            break;
        default:
            return undefined;
    }
};

function getActiveDeviceFromVal(device, states) {
    if (!device || !device.type || !states) {
        return false;
    }
    const ON_OFF_TYPE = [DEVICE_TYPE.SWITCH, DEVICE_TYPE.VIRTUAL, DEVICE_TYPE.LIGHT, DEVICE_TYPE.LIGHTV2, DEVICE_TYPE.FAN, DEVICE_TYPE.COOKER, DEVICE_TYPE.DAIKIN, DEVICE_TYPE.INPUT]
    const { type } = device;
    if (ON_OFF_TYPE.includes(type)) {
        return states[DEVICE_TRAIT.OnOff] && states[DEVICE_TRAIT.OnOff].on;
    }
    if (type == DEVICE_TYPE.CAMERA || type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.BATTERY || type == DEVICE_TYPE.PEBBLE) {
        return false
    }
    if (type == DEVICE_TYPE.CURTAIN) {
        let maxLevel = CURTAIN_MAX_LEVEL;
        if (!!device.traits.find(t => t.name == DEVICE_TRAIT.Level)) {
            maxLevel = device.traits.find(t => t.name == DEVICE_TRAIT.Level).max || maxLevel;
        }
        return states[DEVICE_TRAIT.Level].level == 0 ? true : ((states[DEVICE_TRAIT.Level].level == 100 || states[DEVICE_TRAIT.Level].level == maxLevel) ? false : true);
    }
    if (type == DEVICE_TYPE.LMYALELOCK) {
        return states[DEVICE_TRAIT.LockUnlock] && states[DEVICE_TRAIT.LockUnlock].act !== 'locked';
    }
    if (type == DEVICE_TYPE.DOORLOCK) {
        return !states[DEVICE_TRAIT.LockUnlock].lock;
    }
    return false;
};

function getActiveDeviceFromExecution(device, execution) {
    if (!device || !device.type || !execution) {
        return false;
    }
    const ON_OFF_TYPE = [DEVICE_TYPE.SWITCH, DEVICE_TYPE.VIRTUAL, DEVICE_TYPE.LIGHT, DEVICE_TYPE.LIGHTV2, DEVICE_TYPE.FAN, DEVICE_TYPE.COOKER, DEVICE_TYPE.DAIKIN, DEVICE_TYPE.INPUT]
    const { type } = device;
    if (ON_OFF_TYPE.includes(type)) {
        return execution.params && execution.params.on;
    }
    if (type == DEVICE_TYPE.CAMERA || type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.BATTERY || type == DEVICE_TYPE.PEBBLE) {
        return false
    }
    if (type == DEVICE_TYPE.CURTAIN) {
        let maxLevel = CURTAIN_MAX_LEVEL;
        if (!!device.traits.find(t => t.name == DEVICE_TRAIT.Level)) {
            maxLevel = device.traits.find(t => t.name == DEVICE_TRAIT.Level).max || maxLevel;
        }
        return execution.params.level == 0 ? true : ((execution.params.level == 100 || execution.params.level == maxLevel) ? false : true);
    }
    if (type == DEVICE_TYPE.LMYALELOCK) {
        return execution.params.act !== 'locked';
    }
    if (type == DEVICE_TYPE.DOORLOCK) {
        return !execution.params.lock;
    }
    return false;
};

function getStatusDeviceFromVal(device, states) {
    if (!device || !device.type || !states) {
        return ` `;
    }
    try {
        const { type, traits } = device;
        if (type == DEVICE_TYPE.SWITCH) {
            return states[DEVICE_TRAIT.OnOff].on ? 'devices.statusOn' : 'devices.statusOff';
        }

        if (type == DEVICE_TYPE.VIRTUAL) {
            return states[DEVICE_TRAIT.OnOff].on ? 'devices.statusOn' : 'devices.statusOff';
        }

        if (type == DEVICE_TYPE.CAMERA) {
            try {
                if (!states) return ` `;
                return `${states[DEVICE_TRAIT.CameraEvent].eventType}`;
            } catch (e) {
                return ` `;
            }
        }

        if (type == DEVICE_TYPE.LIGHT) {
            if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
                const rgbValue = states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum;
                return (rgbValue == '0:0:0' || rgbValue == 'Nav:0:0' || rgbValue == 'NaN:NaN:0' || rgbValue == 'NaN:NaN:NaN') ? 'devices.statusOff' : `${states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum}`;
            }

            // dimmer
            if ((states[DEVICE_TRAIT.OnOff] && !states[DEVICE_TRAIT.OnOff].on) || states[DEVICE_TRAIT.Brightness].brightness < 0) {
                return 'devices.statusOff';
            }

            const traitDimmer = traits.find(t => t.name == DEVICE_TRAIT.Brightness);
            if (!!traitDimmer) {
                const levelBrightness = Math.round(states[DEVICE_TRAIT.Brightness].brightness * 100 / (traitDimmer.max - traitDimmer.min));
                return levelBrightness > 0 ? `${levelBrightness}%` : 'devices.statusOff';
            }

            return `${states[DEVICE_TRAIT.Brightness].brightness}`;
        }

        if (type == DEVICE_TYPE.LIGHTV2) {
            if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
                const rgbValue = states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum;
                return (rgbValue == '0:0:0' || rgbValue == 'Nav:0:0' || rgbValue == 'NaN:NaN:0' || rgbValue == 'NaN:NaN:NaN') ? 'devices.statusOff' : `${states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum}`;
            }

            // dimmer
            if (states[DEVICE_TRAIT.OnOff] && !states[DEVICE_TRAIT.OnOff].on) {
                return 'devices.statusOff';
            }
            if (parseInt(states[DEVICE_TRAIT.Brightness].brightness) < 0) {
                return 'devices.statusOff';
            }

            const traitDimmer = traits.find(t => t.name == DEVICE_TRAIT.Brightness);
            if (!!traitDimmer) {
                const levelBrightness = Math.round(states[DEVICE_TRAIT.Brightness].brightness * 100 / (traitDimmer.max - traitDimmer.min));
                return levelBrightness > 0 ? `${levelBrightness}%` : 'devices.statusOff';
            }

            return `${states[DEVICE_TRAIT.Brightness].brightness}`;
        }

        if (type == DEVICE_TYPE.FAN) {
            return (states[DEVICE_TRAIT.OnOff] && !states[DEVICE_TRAIT.OnOff].on || states[DEVICE_TRAIT.Speed].speed === 0) ? 'devices.statusOff' : `${'devices.levelTitle'}_${states[DEVICE_TRAIT.Speed].speed}`;
        }

        if (type == DEVICE_TYPE.CURTAIN) {
            if (states[DEVICE_TRAIT.StartStop] && states[DEVICE_TRAIT.StartStop].start === false)
                return 'devices.stop'
            let maxLevel = CURTAIN_MAX_LEVEL;
            if (!!device.traits.find(t => t.name == DEVICE_TRAIT.Level)) {
                maxLevel = device.traits.find(t => t.name == DEVICE_TRAIT.Level).max || CURTAIN_MAX_LEVEL;
            }
            return states[DEVICE_TRAIT.Level].level == 0 ? 'devices.statusOpen' : ((states[DEVICE_TRAIT.Level].level == maxLevel || states[DEVICE_TRAIT.Level].level == CURTAIN_MAX_LEVEL) ? 'devices.statusClose' : `${states[DEVICE_TRAIT.Level].level}%`);
        }

        if (type == DEVICE_TYPE.LMYALELOCK) {
            return states[DEVICE_TRAIT.LockUnlock].act === 'locked' ? 'devices.statusLock' : 'devices.statusUnlock';
        }

        if (type == DEVICE_TYPE.DOORLOCK) {
            return states[DEVICE_TRAIT.LockUnlock].lock ? 'devices.statusLock' : 'devices.statusUnlock';
        }

        if (type == DEVICE_TYPE.COOKER) {
            if (!!states[DEVICE_TRAIT.OnOff] && states[DEVICE_TRAIT.OnOff].on == false) {
                return 'devices.off';
            }

            if (!!states[DEVICE_TRAIT.Temperature]) {
                return `${states[DEVICE_TRAIT.Temperature].temperature}˚C`;
            }

            return `--`;
        }

        if (type == DEVICE_TYPE.DAIKIN) {
            if (!states[DEVICE_TRAIT.OnOff].on) {
                return 'devices.statusOff';
            }

            if (states[DEVICE_TRAIT.TemperatureControl] && !!states[DEVICE_TRAIT.TemperatureControl].temperatureControl) {
                const tempTrait = traits.find(t => t.name == DEVICE_TRAIT.TemperatureControl);
                const currentTemp = states[DEVICE_TRAIT.TemperatureControl].temperatureControl;

                if (!!tempTrait) {
                    const { min, max } = tempTrait;
                    return (currentTemp >= min && currentTemp <= max) ? `${currentTemp}˚C` : '';
                }

                return `${currentTemp}˚C`;
            }

            return '';
        }

        if (type == DEVICE_TYPE.INPUT) {
            // xử lý riêng cho module input
            const { iconkey } = device;

            if (iconkey == 'ic-zw-water-alarm') {
                return states[DEVICE_TRAIT.OnOff].on ? 'devices.hasWatter' : 'devices.normal';
            }

            if (iconkey == 'ic-zw-smoke-alarm') {
                return states[DEVICE_TRAIT.OnOff].on ? 'devices.hasSmoke' : 'devices.normal';
            }

            if (iconkey == 'ic-zw-gas-alarm') {
                return states[DEVICE_TRAIT.OnOff].on ? 'devices.hasGar' : 'devices.normal';
            }

            if (iconkey == 'ic-zw-co-alarm') {
                return states[DEVICE_TRAIT.OnOff].on ? 'devices.hasGar' : 'devices.normal';
            }

            if (iconkey == 'ic-zw-security-door') {
                return states[DEVICE_TRAIT.OnOff].on ? 'devices.doorOpen' : 'devices.doorClose';
            }

            if (iconkey == 'ic-zw-sencer-motion') {
                return states[DEVICE_TRAIT.OnOff].on ? 'devices.motionDetect' : 'devices.noMotion';
            }

            return states[DEVICE_TRAIT.OnOff].on ? 'devices.statusOn' : 'devices.statusOff';
        }

        if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.BATTERY) {
            const mainTrait = traits.find(t => t.is_main);
            if (!mainTrait)
                return 'devices.unKnow';
            try {
                if (mainTrait.name == DEVICE_TRAIT.Battery) {
                    return `${!!states[DEVICE_TRAIT.Battery].battery ? states[DEVICE_TRAIT.Battery].battery : 0}%`;
                }
                if (mainTrait.name == DEVICE_TRAIT.Luminance)
                    return `${!!states[DEVICE_TRAIT.Luminance].lux ? states[DEVICE_TRAIT.Luminance].lux : 0}lux`;
                if (mainTrait.name == DEVICE_TRAIT.Humidity)
                    return `${!!states[DEVICE_TRAIT.Humidity].humidity ? states[DEVICE_TRAIT.Humidity].humidity : 0}%`;
                if (mainTrait.name == DEVICE_TRAIT.Temperature)
                    return `${!!states[DEVICE_TRAIT.Temperature].temperature ? states[DEVICE_TRAIT.Temperature].temperature : 0}˚C`;
                if (mainTrait.name == DEVICE_TRAIT.Power)
                    return `${!!states[DEVICE_TRAIT.Power].power ? states[DEVICE_TRAIT.Power].power : 0}W`;
                if (mainTrait.name == DEVICE_TRAIT.Voltage)
                    return `${!!states[DEVICE_TRAIT.Voltage].voltage ? states[DEVICE_TRAIT.Voltage].voltage : 0}V`;
                if (mainTrait.name == DEVICE_TRAIT.Ampe)
                    return `${!!states[DEVICE_TRAIT.Ampe].ampe ? states[DEVICE_TRAIT.Ampe].ampe : 0}A`;
                if (mainTrait.name == DEVICE_TRAIT.ContactSensor)
                    return states[DEVICE_TRAIT.ContactSensor].csAlarm ? 'devices.doorOpen' : 'devices.doorClose';
                if (mainTrait.name == DEVICE_TRAIT.Pir)
                    return states[DEVICE_TRAIT.Pir].pirAlarm ? 'devices.motionDetect' : 'devices.noMotion';
                if (mainTrait.name == DEVICE_TRAIT.COAlarm)
                    return states[DEVICE_TRAIT.COAlarm].coAlarm ? 'devices.hasGar' : 'devices.normal';
                if (mainTrait.name == DEVICE_TRAIT.SmokeAlarm)
                    return states[DEVICE_TRAIT.SmokeAlarm].smokeAlarm ? 'devices.hasSmoke' : 'devices.normal';
                if (mainTrait.name == DEVICE_TRAIT.WaterAlarm)
                    return states[DEVICE_TRAIT.WaterAlarm].waterAlarm ? 'devices.hasWatter' : 'devices.normal';
                if (mainTrait.name == DEVICE_TRAIT.GasAlarm)
                    return states[DEVICE_TRAIT.GasAlarm].gasAlarm ? 'devices.hasGar' : 'devices.normal';
                if (mainTrait.name == DEVICE_TRAIT.ShockAlarm)
                    if (isLumi) {
                        if (states[DEVICE_TRAIT.ShockAlarm].shockAlarm == 0) return 'devices.normal';
                        if (states[DEVICE_TRAIT.ShockAlarm].shockAlarm == 1) return 'devices.vibration';
                        if (states[DEVICE_TRAIT.ShockAlarm].shockAlarm == 2) return 'devices.tilt';
                        if (states[DEVICE_TRAIT.ShockAlarm].shockAlarm == 3) return 'devices.fall';

                        return ` `;
                    } else {
                        return states[DEVICE_TRAIT.ShockAlarm].shockAlarm ? 'devices.hasVibration' : 'devices.normal';
                    }
                if (mainTrait.name == DEVICE_TRAIT.HeatAlarm)
                    return states[DEVICE_TRAIT.ShockAlarm].heatAlarm;
            } catch (error) {
                return 'devices.unKnow';
            }
            return 'devices.unKnow';
        }

        if (type == DEVICE_TYPE.PEBBLE) {
            // return 'devices.pebbleStatus'[states[DEVICE_TRAIT.Act].act]
            return '';
        }
    } catch (error) {
        return 'devices.unKnow';
    }
    return '';
};

function getStatusDeviceFromExecution(device, execution) {
    if (!device || !device.type || !execution) {
        return ` `;
    }
    try {
        const { type, traits } = device;
        if (type == DEVICE_TYPE.SWITCH) {
            return execution.params.on ? 'devices.statusOn' : 'devices.statusOff';
        }

        if (type == DEVICE_TYPE.VIRTUAL) {
            return execution.params.on ? 'devices.statusOn' : 'devices.statusOff';
        }

        if (type == DEVICE_TYPE.CAMERA) {
            try {
                if (!execution) return ` `;
                return `${execution.params.eventType}`;
            } catch (e) {
                return ` `;
            }
        }

        if (type == DEVICE_TYPE.LIGHT) {
            if (execution.command === DEVICE_TRAIT.OnOff && !execution.params.on) {
                return 'devices.statusOff';
            }
            if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
                const rgbValue = execution.params.colorSpectrum;
                return (rgbValue == '0:0:0' || rgbValue == 'Nav:0:0' || rgbValue == 'NaN:NaN:0' || rgbValue == 'NaN:NaN:NaN') ? 'devices.statusOff' : `${execution.params.colorSpectrum}`;
            }
            // dimmer
            if (!execution.params || !execution.params.brightness || execution.params.brightness < 0) {
                return 'devices.statusOff';
            }
            const traitDimmer = traits.find(t => t.name == DEVICE_TRAIT.Brightness);
            if (!!traitDimmer) {
                const levelBrightness = execution.params.brightness
                return levelBrightness > 0 ? `${levelBrightness}%` : 'devices.statusOff';
            }

            return `${execution.params.brightness}`;
        }

        if (type == DEVICE_TYPE.LIGHTV2) {
            if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
                const rgbValue = execution.params.colorSpectrum;
                return (rgbValue == '0:0:0' || rgbValue == 'Nav:0:0' || rgbValue == 'NaN:NaN:0' || rgbValue == 'NaN:NaN:NaN') ? 'devices.statusOff' : `${execution.params.colorSpectrum}`;
            }

            // dimmer
            if (execution.params && !execution.params.on) {
                return 'devices.statusOff';
            }
            if (parseInt(execution.params.brightness) < 0) {
                return 'devices.statusOff';
            }

            const traitDimmer = traits.find(t => t.name == DEVICE_TRAIT.Brightness);
            if (!!traitDimmer) {
                const levelBrightness = Math.round(execution.params.brightness * 100 / (traitDimmer.max - traitDimmer.min));
                return levelBrightness > 0 ? `${levelBrightness}%` : 'devices.statusOff';
            }
            return `${execution.params.brightness}`;
        }

        if (type == DEVICE_TYPE.FAN) {
            return (execution.params && execution.params.speed) ? `${'devices.levelTitle'}_${execution.params.speed}` : 'devices.statusOff';
        }

        if (type == DEVICE_TYPE.CURTAIN) {
            let maxLevel = CURTAIN_MAX_LEVEL;
            if (!!device.traits.find(t => t.name == DEVICE_TRAIT.Level)) {
                maxLevel = device.traits.find(t => t.name == DEVICE_TRAIT.Level).max || maxLevel;
            }
            return execution.params.level == 0 ? 'devices.statusOpen' : ((execution.params.level == maxLevel || execution.params.level == CURTAIN_MAX_LEVEL) ? 'devices.statusClose' : `${execution.params.level}%`);
        }

        if (type == DEVICE_TYPE.LMYALELOCK) {
            return execution.params.act === 'locked' ? 'devices.statusLock' : 'devices.statusUnlock';
        }

        if (type == DEVICE_TYPE.DOORLOCK) {
            return execution.params.lock ? 'devices.statusLock' : 'devices.statusUnlock';
        }

        if (type == DEVICE_TYPE.COOKER) {
            if (!!execution.params && execution.params.on == false) {
                return 'devices.off';
            }

            if (!!execution.params) {
                return `${execution.params.temperature}˚C`;
            }

            return `--`;
        }

        if (type == DEVICE_TYPE.DAIKIN) {
            if (!execution.params.on) {
                return 'devices.statusOff';
            }

            if (execution.params && !!execution.params.temperatureControl) {
                const tempTrait = traits.find(t => t.name == DEVICE_TRAIT.TemperatureControl);
                const currentTemp = execution.params.temperatureControl;

                if (!!tempTrait) {
                    const { min, max } = tempTrait;
                    return (currentTemp >= min && currentTemp <= max) ? `${currentTemp}˚C` : '';
                }

                return `${currentTemp}˚C`;
            }

            return '';
        }

        if (type == DEVICE_TYPE.INPUT) {
            // xử lý riêng cho module input
            const { iconkey } = device;

            if (iconkey == 'ic-zw-water-alarm') {
                return execution.params.on ? 'devices.hasWatter' : 'devices.normal';
            }

            if (iconkey == 'ic-zw-smoke-alarm') {
                return execution.params.on ? 'devices.hasSmoke' : 'devices.normal';
            }

            if (iconkey == 'ic-zw-gas-alarm') {
                return execution.params.on ? 'devices.hasGar' : 'devices.normal';
            }

            if (iconkey == 'ic-zw-co-alarm') {
                return execution.params.on ? 'devices.hasGar' : 'devices.normal';
            }

            if (iconkey == 'ic-zw-security-door') {
                return execution.params.on ? 'devices.doorOpen' : 'devices.doorClose';
            }

            if (iconkey == 'ic-zw-sencer-motion') {
                return execution.params.on ? 'devices.motionDetect' : 'devices.noMotion';
            }

            return execution.params.on ? 'devices.statusOn' : 'devices.statusOff';
        }

        if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.BATTERY) {
            const mainTrait = traits.find(t => t.is_main);
            if (!mainTrait)
                return 'devices.unKnow';
            try {
                if (mainTrait.name == DEVICE_TRAIT.Battery) {
                    return `${!!execution.params.battery ? execution.params.battery : 0}%`;
                }
                if (mainTrait.name == DEVICE_TRAIT.Luminance)
                    return `${!!execution.params.lux ? execution.params.lux : 0}lux`;
                if (mainTrait.name == DEVICE_TRAIT.Humidity)
                    return `${!!execution.params.humidity ? execution.params.humidity : 0}%`;
                if (mainTrait.name == DEVICE_TRAIT.Temperature)
                    return `${!!execution.params.temperature ? execution.params.temperature : 0}˚C`;
                if (mainTrait.name == DEVICE_TRAIT.Power)
                    return `${!!execution.params.power ? execution.params.power : 0}W`;
                if (mainTrait.name == DEVICE_TRAIT.Voltage)
                    return `${!!execution.params.voltage ? execution.params.voltage : 0}V`;
                if (mainTrait.name == DEVICE_TRAIT.Ampe)
                    return `${!!execution.params.ampe ? execution.params.ampe : 0}A`;
                if (mainTrait.name == DEVICE_TRAIT.ContactSensor)
                    return execution.params.csAlarm ? 'devices.doorOpen' : 'devices.doorClose';
                if (mainTrait.name == DEVICE_TRAIT.Pir)
                    return execution.params.pirAlarm ? 'devices.motionDetect' : 'devices.noMotion';
                if (mainTrait.name == DEVICE_TRAIT.COAlarm)
                    return execution.params.coAlarm ? 'devices.hasGar' : 'devices.normal';
                if (mainTrait.name == DEVICE_TRAIT.SmokeAlarm)
                    return execution.params.smokeAlarm ? 'devices.hasSmoke' : 'devices.normal';
                if (mainTrait.name == DEVICE_TRAIT.WaterAlarm)
                    return execution.params.waterAlarm ? 'devices.hasWatter' : 'devices.normal';
                if (mainTrait.name == DEVICE_TRAIT.GasAlarm)
                    return execution.params.gasAlarm ? 'devices.hasGar' : 'devices.normal';
                if (mainTrait.name == DEVICE_TRAIT.ShockAlarm)
                    if (isLumi) {
                        if (execution.params.shockAlarm == 0) return 'devices.normal';
                        if (execution.params.shockAlarm == 1) return 'devices.vibration';
                        if (execution.params.shockAlarm == 2) return 'devices.tilt';
                        if (execution.params.shockAlarm == 3) return 'devices.fall';

                        return ` `;
                    } else {
                        return execution.params.shockAlarm ? 'devices.hasVibration' : 'devices.normal';
                    }
                if (mainTrait.name == DEVICE_TRAIT.HeatAlarm)
                    return execution.params.heatAlarm;
            } catch (error) {
                return 'devices.unKnow';
            }
            return 'devices.unKnow';
        }

        if (type == DEVICE_TYPE.PEBBLE) {
            // return 'devices.pebbleStatus'[execution.params
            return '';
        }
    } catch (error) {
        return 'devices.unKnow';
    }
    return '';
};

function getIconByTypeForSetting(device) {


    if (!device) return [];

    switch (device.type) {
        case DEVICE_TYPE.SWITCH:
            return [

                { key: 'ic-zw-chandelier', name: 'devices.ic-zw-chandelier' },
                { key: 'ic-zw-church-lamp', name: 'devices.ic-zw-church-lamp' },
                { key: 'ic-zw-compact', name: 'devices.ic-zw-compact' },
                { key: 'ic-zw-decorative-light', name: 'devices.ic-zw-decorative-light' },
                { key: 'ic-zw-dimmer', name: 'devices.ic-zw-dimmer' },
                { key: 'ic-zw-down-light', name: 'devices.ic-zw-down-light' },
                { key: 'ic-zw-drop-light', name: 'devices.ic-zw-drop-light' },
                { key: 'icon-ir2-ac', name: 'devices.icon-ir2-ac' },
                { key: 'ic-zw-fan', name: 'devices.ic-zw-fan' },
                { key: 'ic-zw-fluorescent', name: 'devices.ic-zw-fluorescent' },
                { key: 'ic-zw-gate', name: 'devices.ic-zw-gate' },
                { key: 'ic-zw-heating-lamp', name: 'devices.ic-zw-heating-lamp' },
                { key: 'ic-zw-ic-zw-IrrigationValve', name: 'devices.ic-zw-ic-zw-IrrigationValve' },
                { key: 'ic-zw-led', name: 'devices.ic-zw-led' },
                { key: 'ic-zw-light-pole', name: 'devices.ic-zw-light-pole' },
                { key: 'ic-zw-motor', name: 'devices.ic-zw-motor' },
                { key: 'ic-zw-night-light', name: 'devices.ic-zw-night-light' },
                { key: 'ic-zw-overhead-light', name: 'devices.ic-zw-overhead-light' },
                { key: 'ic-zw-siren', name: 'devices.ic-zw-siren' },
                { key: 'ic-zw-speaker', name: 'devices.ic-zw-speaker' },
                { key: 'ic-zw-switch', name: 'devices.ic-zw-switch' },
                { key: 'ic-zw-tv', name: 'devices.ic-zw-tv' },
                { key: 'ic-zw-ventilator', name: 'devices.ic-zw-ventilator' },
                { key: 'ic-zw-wall-light', name: 'devices.ic-zw-wall-light' },
                { key: 'ic-zw-water-heater', name: 'devices.ic-zw-water-heater' },
                { key: 'ic-zw-power-strip', name: 'devices.ic-zw-power-strip' },
                { key: 'color-lens', name: 'devices.color-lens' },
                { key: 'signal_wifi_4_bar_lock', name: 'devices.signal_wifi_4_bar_lock' },
                { key: 'mic', name: 'devices.mic' },
            ];
        case DEVICE_TYPE.LIGHT:
            return [
                { key: 'ic-zw-overhead-light', name: 'devices.ic-zw-overhead-light' },
                { key: 'color-lens', name: 'devices.color-lens' },
            ];
        case DEVICE_TYPE.FAN:
            return [
                { key: 'ic-zw-fan', name: 'devices.ic-zw-fan' },
            ];
        case DEVICE_TYPE.CURTAIN:
            return [

                { key: 'device-curtain-horizontal-0', name: 'devices.device-curtain-horizontal-0' },
                { key: 'cutain-vertical-0', name: 'devices.cutain-vertical-0' },
                { key: 'cutain-screen-0', name: 'devices.cutain-screen-0' },
            ];
        case DEVICE_TYPE.DOORLOCK:
            return [

                { key: 'ic-zw-door-lock-keypad', name: 'devices.ic-zw-door-lock-keypad' },
            ];
        case DEVICE_TYPE.INPUT:
            return [

                { key: 'ic-zw-switch', name: 'devices.ic-zw-switch' },
                { key: 'ic-zw-water-alarm', name: 'devices.ic-zw-water-alarm' },
                { key: 'ic-zw-smoke-alarm', name: 'devices.ic-zw-smoke-alarm' },
                { key: 'ic-zw-gas-alarm', name: 'devices.ic-zw-gas-alarm' },
                { key: 'ic-zw-co-alarm', name: 'devices.ic-zw-co-alarm' },
                { key: 'ic-zw-security-door', name: 'devices.ic-zw-security-door' },
                { key: 'ic-zw-sencer-motion', name: 'devices.ic-zw-sencer-motion' },
            ];
        case DEVICE_TYPE.SENSOR:
        case DEVICE_TYPE.BATTERY:
            return [];
        // return [
        //   { key: 'ic-zw-co-alarm', name: langs['ic-zw-co-alarm'] },
        //   { key: 'ic-zw-gas-alarm', name: langs['ic-zw-gas-alarm'] },
        //   { key: 'ic-zw-heat-alarm', name: langs['ic-zw-heat-alarm'] },
        //   { key: 'ic-zw-luminace', name: langs['ic-zw-luminace'] },
        //   { key: 'ic-zw-power-management-100', name: langs['ic-zw-power-management-100'] },
        //   { key: 'ic-zw-security-door', name: langs['ic-zw-security-door'] },
        //   { key: 'ic-zw-sencer-motion', name: langs['ic-zw-sencer-motion'] },
        //   { key: 'ic-zw-smoke-alarm', name: langs['ic-zw-smoke-alarm'] },
        //   { key: 'ic-zw-water-alarm', name: langs['ic-zw-water-alarm'] },
        //   { key: 'ic-zw-metter', name: langs['ic-zw-metter'] },
        // ];
        default:
            return [];
    }
};


function getOptionActionSheet(device) {

    if (device.type == DEVICE_TYPE.IR) {
        return [
            {
                title: 'devices.removeDevice',
                leftIconName: 'delete',
                // onPress: this.onConfirmRemoveDevice
            },
            {
                title: 'devices.addIrTV',
                leftIconName: 'ic-zw-tv',
                onPress: () => onAddIR(device, IR_TYPE.REMOTE_TV, Number(this.$route.params.homeID))
            },
            {
                title: 'devices.addIrFan',
                leftIconName: 'ic-zw-fan',
                onPress: () => onAddIR(device, IR_TYPE.REMOTE_FAN, Number(this.$route.params.homeID))
            },
            {
                title: 'devices.AddIrAir',
                leftIconName: 'ic-zw-thermostat',
                onPress: () => onAddIR(device, IR_TYPE.REMOTE_AIR, Number(this.$route.params.homeID))
            },
        ]
    }
}

function getIconScene(name) {
    if (!name || ICON_SCENE[name] == undefined) {
        return ICON_SCENE['-1'];
    }
    return ICON_SCENE[name];
};

function getMainTraits(device) {
    if (device && device.traits && device.traits.length) {
        let mainTrait = device.traits.find(item => item.is_main)
        if (mainTrait) return mainTrait.name
    }
    return false
}

function hasTraitOnOff(device) {
    if (device && device.traits && device.traits.length) {
        return device.traits.find(item => item.name == DEVICE_TRAIT.OnOff)
    }
    return false
}

function getLevelFromValue(value, levelArray) {
    const v = parseInt(value);
    for (let i = 0; i < levelArray.length; i++) {
        if (v <= levelArray[i]) {
            return i;
        }
    }

    return 6;
}

function getIrDataCommand(device_type, currentIrData, cmdData) {
    if (device_type == IRV2_ALL_TYPE.IR_TV || device_type == IRV2_ALL_TYPE.IR_FAN || device_type == IRV2_ALL_TYPE.IR_STB) {
        // irdata= length(1 bytes) + ActTimes(default: 01) + RuleId(2 bytes) + CmdData + EOF(default: 4C)

        const length = `00${(parseInt(currentIrData.length) + 4).toString(16).toLocaleUpperCase()}`.slice(-2);
        const actTimes = '01';
        const ruleIdConvert = parseInt(currentIrData.rule_id);
        const ruleId = `0000${ruleIdConvert.toString(16).toLocaleUpperCase()}`.slice(-4);
        const eof = '4C';

        return `${length}${actTimes}${ruleId}${cmdData}${eof}`;
    }
};

function getIrAcDataCommand(cmd_rule, { power, mode, fan, temp, swing }) {
    const ruleCommand = cmd_rule.replace('$_pow', power)
        .replace('$_mod', mode)
        .replace('$_fa', fan)
        .replace('$_tem', temp)
        .replace('$_swi', swing);
    // eslint-disable-next-line no-eval
    const command = eval(ruleCommand);
    return command;
};

function getGroupTraitByType(type) {
    let deviceType = DEVICE_TYPE.LIGHTV2;
    let traits = [
        { name: DEVICE_TRAIT.OnOff, isMain: true },
        { name: DEVICE_TRAIT.ColorSpectrum, isMain: true },
        { name: DEVICE_TRAIT.Brightness, is_main: true, max: 100, min: 0 },
        { name: DEVICE_TRAIT.ColdWarmColor, is_main: true, max: 255, min: 0 },
        { name: DEVICE_TRAIT.ModeActive, is_main: false },
        { name: DEVICE_TRAIT.ModeConfig, is_main: false },
        { name: DEVICE_TRAIT.HCL, is_main: false }
    ];
    if (type === 1) {
        deviceType = DEVICE_TYPE.LIGHTV2;
        traits = [
            { name: DEVICE_TRAIT.OnOff, isMain: true },
            { name: DEVICE_TRAIT.ColorSpectrum, isMain: true },
            { name: DEVICE_TRAIT.Brightness, is_main: true, max: 100, min: 0 },
            { name: DEVICE_TRAIT.ColdWarmColor, is_main: true, max: 255, min: 0 },
            { name: DEVICE_TRAIT.ModeActive, is_main: false },
            { name: DEVICE_TRAIT.ModeConfig, is_main: false },
            { name: DEVICE_TRAIT.HCL, is_main: false }
        ];
    }
    if (type === 2) {
        deviceType = DEVICE_TYPE.LIGHT;
        traits = [
            { name: DEVICE_TRAIT.OnOff, isMain: true },
            { name: DEVICE_TRAIT.ColorSpectrum, isMain: true },
            { name: DEVICE_TRAIT.ModeActive, is_main: false },
            { name: DEVICE_TRAIT.ModeConfig, is_main: false }
        ];
    }
    if (type === 3) {
        deviceType = DEVICE_TYPE.LIGHTV2;
        traits = [
            { name: DEVICE_TRAIT.OnOff, isMain: true },
            { name: DEVICE_TRAIT.Brightness, is_main: true, max: 100, min: 0 },
            { name: DEVICE_TRAIT.ColdWarmColor, is_main: true, max: 255, min: 0 },
            { name: DEVICE_TRAIT.HCL, is_main: false }
        ];
    }
    if (type === 4) {
        deviceType = DEVICE_TYPE.SWITCH;
        traits = [{ name: DEVICE_TRAIT.OnOff, isMain: true }];
    }
    if (type === 5) {
        deviceType = DEVICE_TYPE.LIGHT;
        traits = [
            { name: DEVICE_TRAIT.OnOff, isMain: true },
            { name: DEVICE_TRAIT.Brightness, isMain: true }
        ];
    }
    return {
        deviceType,
        traits
    };
}

function getDefaultDeviceExecution(device) {
    if (!device) return;
    const { type } = device;
    if (device.execution) {
        return device.execution;
    }

    if (type == DEVICE_TYPE.SWITCH || type == DEVICE_TYPE.LIGHT || type == DEVICE_TYPE.FAN) {
        return { command: DEVICE_TRAIT.OnOff, params: { on: false } }
    }

    if (type == DEVICE_TYPE.IR) {
        if (!!device.irCommands) {
            return { command: DEVICE_TRAIT.IrActive, params: { irActive: device.irCommands[0].commandId } };
        }
    }

    if (type == DEVICE_TYPE.COOKER) {
        return [{ command: DEVICE_TRAIT.OnOff, params: { on: false } }];
    }

    if (type == DEVICE_TYPE.SPEAKER) {
        return [{
            command: DEVICE_TRAIT.PlayController,
            params: {
                controller: PLAY_CONTROL.pause
            }
        }];
    }

    if (type == DEVICE_TYPE.CURTAIN) {
        return {
            command: DEVICE_TRAIT.Level,
            params: { level: 99 }
        };
    }

    if (type == DEVICE_TYPE.DAIKIN) {
        return [{ command: DEVICE_TRAIT.OnOff, params: { on: false } }];
    }

    if (type == DEVICE_TYPE.IRV2) {
        const { irData, irtype } = device;

        let irCommand = '';

        if (irtype == IRV2_ALL_TYPE.IR_TV && !!irData.ir_code && !!irData.ir_code.power) {
            irCommand = getIrDataCommand(irtype, irData, irData.ir_code.power);
            return { command: DEVICE_TRAIT.IrActiveV2, arrIr: { buttonid: IRV2_ID_TV.power }, params: { irActiveV2: irCommand } };
        }

        if (irtype == IRV2_ALL_TYPE.IR_STB && !!irData.ir_code && !!irData.ir_code.power) {
            irCommand = getIrDataCommand(irtype, irData, irData.ir_code.power);
            return { command: DEVICE_TRAIT.IrActiveV2, arrIr: { buttonid: IRV2_ID_STB.power }, params: { irActiveV2: irCommand } };
        }

        if (irtype == IRV2_ALL_TYPE.IR_FAN && !!irData.ir_code && !!irData.ir_code.on_off) {
            irCommand = getIrDataCommand(irtype, irData, irData.ir_code.on_off);
            return { command: DEVICE_TRAIT.IrActiveV2, arrIr: { buttonid: IRV2_ID_FAN.on_off }, params: { irActiveV2: irCommand } };
        }

        if (irtype == IRV2_ALL_TYPE.IR_AC && !!irData.cmd_rule) {
            /*
            Power: On: 1, Off 0, Normal: 2
            Mode:  Auto: 0, Dry: 2, Cool: 3, Heat: 4, Fan: 6
            Fan:   Level 1: 3, level 2: 5, level 3: 7, auto: 10
            Temp: 16 - 30
            Swing: Yes: 1, No: 0
            */
            const _pow = 1;
            const _fa = 10;
            const _swi = 0;
            const _mod = 3;
            const _tem = 24;

            irCommand = getIrAcDataCommand(irData.cmd_rule, _pow, _mod, _fa, _tem, _swi);

            return { command: DEVICE_TRAIT.IrActiveV2, arrIr: { power: _pow, fan: _fa, swing: _swi, mode: _mod, temp: _tem }, params: { irActiveV2: irCommand } };
        }

        return irCommand;
    }

    // other device
    return {};
}

function getDefaultDeviceState(device) {
    const { type, traits } = device;
    if (type == DEVICE_TYPE.SWITCH) {
        return { OnOff: { on: false } };
    }

    if (type == DEVICE_TYPE.LIGHT) {
        if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
            // Device RGB or RGBW
            return {
                OnOff: { on: true },
                ColorSpectrum: { name: 'rgb', colorSpectrum: '00:00:00' }
            };
        }

        // Device Dimmer
        return {
            OnOff: { on: true },
            Brightness: { brightness: 0 }
        };
    }

    if (type == DEVICE_TYPE.FAN) {
        return {
            OnOff: { on: false },
            Speed: { speed: 0 }
        };
    }

    if (type == DEVICE_TYPE.CURTAIN) {
        return {
            StartStop: { start: true },
            OpenClose: { open: false },
            Level: { level: 100 }
        };
    }

    if (type == DEVICE_TYPE.DAIKIN) {
        return {
            OnOff: { on: false },
            TemperatureSetting: { temperatureSetting: MODE_DAIKIN[0].mode },
            Speed: { speed: SPEED_DAIKIN[0].speed },
            TemperatureControl: { temperatureControl: TEMP_DAIKIN.min }
        };
    }

    if (type == DEVICE_TYPE.DOORLOCK) {
        return { LockUnlock: { lock: true } };
    }

    if (type == DEVICE_TYPE.PEBBLE) {
        return { Act: { act: 1 } };
    }

    if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.UNKNOW) {
        return { OnOff: { on: false } };
    }
}

function getDefaultInputDeviceState(device) {
    const { type, traits } = device;
    if (type == DEVICE_TYPE.SWITCH || type === DEVICE_TYPE.LIGHTV2 || type === DEVICE_TYPE.INPUT) {
        return { OnOff: { on: false } };
    }

    if (type == DEVICE_TYPE.LIGHT) {
        if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
            // Device RGB or RGBW
            return {
                ColorSpectrum: { name: 'rgb', colorSpectrum: '00:00:00' }
            };
        }

        // Device Dimmer
        return {
            Brightness: { brightness: 0 }
        };
    }

    if (type == DEVICE_TYPE.FAN) {
        return {
            Speed: { speed: 0 }
        };
    }

    if (type == DEVICE_TYPE.CURTAIN) {
        return {
            Level: { level: 0 }
        };
    }

    if (type == DEVICE_TYPE.DAIKIN) {
        return {
            OnOff: { on: false },
        };
    }

    if (type == DEVICE_TYPE.DOORLOCK) {
        return { LockUnlock: { lock: true } };
    }

    if (type == DEVICE_TYPE.LMYALELOCK) {
        return { LockUnlock: { act: 'unlock' } };
    }
    
    if (type == DEVICE_TYPE.CAMERA) {
        return { CameraEvent: { eventType: 0 } };
    }

    if (type == DEVICE_TYPE.PEBBLE) {
        return { Act: { act: 1 } };
    }

    if (type == DEVICE_TYPE.SENSOR) {
        if (traits.find(t => t.name == DEVICE_TRAIT.Battery)) {
            return {
                Battery: { battery: 100 },
            };
        }
        if (traits.find(t => t.name == DEVICE_TRAIT.ContactSensor)) {
            return {
                ContactAlarm: { csAlarm: true },
            };
        }
        if (traits.find(t => t.name == DEVICE_TRAIT.Temperature)) {
            return {
                Temperature: { temperature: 100 },
            };
        }
        if (traits.find(t => t.name == DEVICE_TRAIT.Pir)) {
            return {
                PirAlarm: { pirAlarm: true },
            };
        }
        if (traits.find(t => t.name == DEVICE_TRAIT.Luminance)) {
            return {
                Luminance: { lux: 100 },
            };
        }
        if (traits.find(t => t.name == DEVICE_TRAIT.Humidity)) {
            return {
                Humidity: { humidity: 100 },
            };
        }
    }
    if (type == DEVICE_TYPE.UNKNOW) {
        return { OnOff: { on: false } };
    }
}

function calcTimestamp(inputTimer) {
    let array = inputTimer.split(":").map(Number);
    return (
        (array[0] > 23 ? 23 : array[0]) * 3600 +
        (array[1] > 59 ? 59 : array[1]) * 60 +
        (array[2] > 59 ? 59 : array[2])
    );
}

function getTypeDeviceName(group) {
    let typeDevice = TYPE_DEVICE_GROUP_LIGHTING[1];
    try {
        if (group.deviceType === DEVICE_TYPE.LIGHTV2) {
            if (group.traits.find(t => t.name === DEVICE_TRAIT.ColorSpectrum)) {
                typeDevice = TYPE_DEVICE_GROUP_LIGHTING[0];
            } else {
                typeDevice = TYPE_DEVICE_GROUP_LIGHTING[2];
            }
        }
        if (group.deviceType === DEVICE_TYPE.LIGHT) {
            if (group.traits.find(t => t.name === DEVICE_TRAIT.Brightness)) {
                typeDevice = TYPE_DEVICE_GROUP_LIGHTING[4];
            } else {
                typeDevice = TYPE_DEVICE_GROUP_LIGHTING[1];
            }
        }
        if (group.deviceType === DEVICE_TYPE.SWITCH) {
            typeDevice = TYPE_DEVICE_GROUP_LIGHTING[3];
        }
    } catch (error) {
        console.log('getTypeDeviceName::error', error);
    }

    return typeDevice;
}

function parseUrlCamera(cam, time, type) {
    let { user, pass, dns, port2, ip, port, channel, channel2, main, string } = cam
    let baseUrlStream = `rtsp://${user.trim()}:${pass.trim()}@${ip.trim()}:${port.trim()}`
    let currentChamel = channel.trim()
    let currentPort = port.trim()

    if (!currentChamel || !currentPort) type = 'remote'

    if (type === 'remote' || !currentPort)
        currentPort = port2.trim()

    if (type === 'remote' || !currentChamel)
        currentChamel = channel2.trim()

    if (type === 'remote' || !(ip && ip.trim()))
        baseUrlStream = `rtsp://${user.trim()}:${pass.trim()}@${dns.trim()}:${currentPort}`

    switch (cam.type) {
        case '1': // dahua
            if (time) {
                let startTimeSet = timer(time, 'YYYY_MM_DD_HH_mm_ss')
                let endTimeSet = timer(Date.now(), 'YYYY_MM_DD_HH_mm_ss')
                return `${baseUrlStream}/cam/playback?channel=${currentChamel}/starttime=${startTimeSet}/endtime=${endTimeSet}`
            }
            return `${baseUrlStream}/cam/realmonitor?channel=${currentChamel}/subtype=${main.trim()}`
        case '2': // Hikvision
            baseUrlStream += currentChamel ? ('/Streaming/channels/' + currentChamel + '0' + (main.trim() === '0' ? '1' : '2')) : ''
            if (time) {
                let endTimeSet = timer(time, 'YYYYMMDDTHHmmssZZ')
                baseUrlStream += `&starttime=${endTimeSet}`
            }
            return baseUrlStream
        default:
            return `${string.trim() || ''}`
    }
}

function controllDeviceDefault(devid, execution = false) {
    let device = $getters['HomeConfig/getDevice'](devid)
    let status = $getters['HomeControll/getDeviceStatusByDeviceID'](devid)

    if (device.type === DEVICE_TYPE.CURTAIN) {
        execution = {
            command: DEVICE_TRAIT.OpenClose,
            params: {
                open: status.states.Level && status.states.Level.level === 100 ? true : false,
            },
        };
    }

    if (device.type === DEVICE_TYPE.FAN) {
        execution = {
            command: DEVICE_TRAIT.Speed,
            params: {
                speed: status.states.Speed && status.states.Speed.speed ? 0 : 3,
            },
        };
    }
    if (device.type === DEVICE_TYPE.SWITCH) {
        execution = {
            command: DEVICE_TRAIT.OnOff,
            params: {
                on: !(status.states.OnOff && status.states.OnOff.on),
            },
        };
    }
    if (device.type === DEVICE_TYPE.LIGHT) {
        if (device.traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
            execution = {
                command: DEVICE_TRAIT.OnOff,
                params: {
                    on: !(status.states.OnOff && status.states.OnOff.on),
                },
            };
        }
        else execution = {
            command: DEVICE_TRAIT.Brightness,
            params: {
                brightness: status.states.Brightness && status.states.Brightness.brightness ? 0 : 100,
            },
        };
    }
    if (device.type === DEVICE_TYPE.DAIKIN) {
        execution = {
            command: DEVICE_TRAIT.OnOff,
            params: {
                on: !(status.states.OnOff && status.states.OnOff.on),
            },
        };
    }
    if (execution)
        return $dispatch($api.HomeControll.controllDevice, {
            devid: device.devid,
            execution,
        });
}
