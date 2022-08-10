/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable dot-notation */
/* eslint-disable curly */
/* eslint-disable eqeqeq */

/**
* Created by nghinv on Wed Aug 08 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

'use strick';

import React from 'react';
import { View } from 'react-native';
import langs from '../languages/device';
import { isLumi } from '../config/config';

/**
 * Type of device
 */
export const DEVICE_TYPE = {
  SWITCH: 'SWITCH',
  LIGHT: 'LIGHT',
  LIGHTV2: 'LIGHTV2',
  FAN: 'FAN',
  CURTAIN: 'CURTAIN',
  DOORLOCK: 'DOORLOCK',
  SENSOR: 'SENSOR',
  DAIKIN: 'DAIKIN',
  PEBBLE: 'PEBBLE',
  BATTERY: 'BATTERY',
  SPEAKER: 'SPEAKER',
  IR: 'IR',
  IRV2: 'IRV2',
  CAMERA: 'CAMERA',
  INPUT: 'INPUT',
  UNKNOW: 'UNKNOW',
  MILO: 'MILO',
  COOKER: 'COOKER',
  LMYALELOCK: 'LMYALELOCK',
  VIRTUAL: 'VIRTUAL'
};
/**
 * Trait device
 */
export const DEVICE_TRAIT = {
  OnOff: 'OnOff', // Chức năng cơ bản cho bất kỳ loại thiết bị nào có tính năng on/off
  StartStop: 'StartStop', // Dành cho các loại thiết bị có chế độ start / stop
  Brightness: 'Brightness', // Điều chỉnh độ sáng của thiết bị như đèn ...
  Speed: 'Speed', // Những thiết bị có cơ chế thay đổi tốc độ quạt
  Level: 'Level', // Điều khiển trạng thái theo mức
  ColorSpectrum: 'ColorSpectrum', // Chức năng cho các thiết bị thay đổi màu sắc
  OpenClose: 'OpenClose', // Các thiết bị có chức năng open close
  LockUnlock: 'LockUnlock', // Các thiết bị có chức năng lock và unlock
  PinCode: 'PinCode', // cho khoa yale
  Act: 'Act', // Các thiết lập riêng cho device
  SysMod: 'SysMod',
  Battery: 'Battery', // Mức pin
  Luminance: 'Luminance', // Cường độ ánh sáng
  Humidity: 'Humidity', // Độ ẩm
  Temperature: 'Temperature', // Nhiệt độ
  Power: 'Power', // Công suất tiêu thụ
  ContactSensor: 'ContactAlarm', // Cảm biến tiếp xúc
  Pir: 'PirAlarm', // Cảm biến chuyển động
  COAlarm: 'COAlarm', // Cảm biến CO
  SmokeAlarm: 'SmokeAlarm', // Cảm biến khói
  WaterAlarm: 'WaterAlarm', // Cảm biến nước
  GasAlarm: 'GasAlarm', // Cảm biến gar
  ShockAlarm: 'ShockAlarm', // Cảm biến rung,
  IrAct: 'IrAct', // thiết bị thực hiện các command, học lệnh, xóa lệnh, active lệnh, stop học lệnh.
  IrCmd: 'IrCmd', // thiết bị tự mã hóa lệnh điều khiển để gửi đi dựa vào data
  Voltage: 'Voltage', // Điện áp
  Ampe: 'Ampe', // Dòng điện
  HeatAlarm: 'HeatAlarm',
  TemperatureControl: 'TemperatureControl', // nhiệt độ ir daikin
  TemperatureSetting: 'TemperatureSetting', // mode ir daikin
  // speaker trait
  ChangeChannel: 'ChangeChannel',
  LoopMode: 'LoopMode',
  PlayController: 'PlayController',
  Speaker: 'Speaker',
  SpeakerInfor: 'SpeakerInfor',
  SpeakerPlaybackState: 'SpeakerPlaybackState',
  SpeakerSlaveList: 'SpeakerSlaveList',
  InputController: 'InputController',
  ConfigSpeaker: 'ConfigSpeaker',
  // ir trait
  IrConfig: 'IrConfig',
  IrActive: 'IrActive',
  IrActiveV2: 'IrActiveV2',
  // Camera event
  CameraEvent: 'CameraEvent',
  // Daikin
  Swing: 'Swing',
  ColdWarmColor: 'ColdWarmColor',
  Language: 'Language',
  FingerPrint: 'FingerPrint',
  ArmDisarm: 'ArmDisarm',
  YaleLockCode: 'YaleLockCode',
  YaleLockLog: 'YaleLockLog',
  HCTime: 'HCTime',
  ModeActive: 'ModeActive'
};

export const IR_PREFIX_KEY = '__buttonId__';

export const getAllTypeDevice = () => {
  return [
    { type: '-1', name: langs.allTypeDevice },
    { type: DEVICE_TYPE.SWITCH, name: langs.deviceTypeSwitch },
    { type: DEVICE_TYPE.LIGHT, name: langs.deviceTypeLight },
    { type: DEVICE_TYPE.FAN, name: langs.deviceTypeFan },
    { type: DEVICE_TYPE.CURTAIN, name: langs.deviceTypeCurtain },
    { type: DEVICE_TYPE.DOORLOCK, name: langs.deviceTypeDoorlock },
    { type: DEVICE_TYPE.SENSOR, name: langs.deviceTypeSensor },
    { type: DEVICE_TYPE.DAIKIN, name: langs.deviceTypeDaikin },
    { type: DEVICE_TYPE.PEBBLE, name: langs.deviceTypePebble },
    { type: DEVICE_TYPE.BATTERY, name: langs.deviceTypeBattery },
    { type: DEVICE_TYPE.UNKNOW, name: langs.deviceTypeUnknow },
  ];
};

/**
 * Định nghĩa loại thiết bị theo mục đích sử dụng thực tế
 */
export const REAL_TYPE_DEVICE = {
  Switch: 'SWITCH',
  Light: 'LIGHT',
  Dimmer: 'DIMMER',
  Tivi: 'TIVI',
  Bell: 'BELL',
  Downlight: 'DOWNLIGHT',
  Gate: 'GATE',
  Led: 'LED',
  Camera: 'CAMERA',
  IrrigationValve: 'IRRIGATIONVALVE', // van tưới
  Motor: 'MOTOR',
  NightLight: 'NIGHTLIGHT',
  Siren: 'SIREN',
  Speaker: 'SPEAKER',
  Ventilator: 'VENTILATOR', // quạt thông gió
  WaterHeater: 'WATERHEATER',
  HeatAlarm: 'HEATALARM', // Đèn sưởi
  PowerStrip: 'POWERSTRIP', // ổ cắm
  RGB: 'RGB',
  Fan: 'FAN',
  Curtain: 'CURTAIN',
  DoorLock: 'DOORLOCK',
  Sensor: 'SENSOR',
  Daikin: 'DAIKIN',
  Pebble: 'PEBBLE',
  Ir: 'IR',
  Unknow: 'UNKNOW'
};

export const CONDITION_DEVICE = {
  EQUAL: 0,
  NOT_EQUAL: 1,
  LESS: 2,
  LESS_OR_EQUAL: 3,
  GREATER: 4,
  GREATER_OR_EQUAL: 5
};

/**
 * define type of ir
 */
export const IR_TYPE = {
  REMOTE_TV: '0',
  REMOTE_FAN: '1',
  REMOTE_AIR: '3',
  REMOTE_AMPLY1: '4',
  REMOTE_AMPLY2: '5'
};

export const SPEED_DAIKIN = [
  { speed: 0, name: 'Off' },
  { speed: 1, name: 'Low' },
  { speed: 2, name: 'Mid' },
  { speed: 3, name: 'High' },
  { speed: 4, name: 'Auto' },
];

export const SWING_DAIKIN = [
  { swing: 0, name: 'P0' },
  { swing: 1, name: 'P1' },
  { swing: 2, name: 'P2' },
  { swing: 3, name: 'P3' },
  { swing: 4, name: 'P4' },
  { swing: 5, name: 'Stop' },
  { swing: 6, name: 'Auto' },
];

export const MODE_DAIKIN = [
  { mode: 0, name: 'Auto', icon: undefined },
  { mode: 1, name: 'Fan-only', icon: 'ic-zw-fan' },
  { mode: 2, name: 'Heat', icon: 'ic-zw-luminace' },
  { mode: 3, name: 'Cool', icon: 'ic-zw-thermostat' },
  { mode: 4, name: 'Dry', icon: 'ic-zw-humidity' },
  // { mode: 5, name: 'Off', icon: 'ic-zw-switch' },
];

export const TEMP_DAIKIN = {
  min: 18,
  max: 31
};

export const CURTAIN_MAX_LEVEL = 100;

export const IRV2_ALL_TYPE = {
  IR_AC: 'IR_AC',
  IR_CAMERA: 'IR_CAMERA',
  IR_DVD: 'IR_DVD',
  IR_FAN: 'IR_FAN',
  IR_SPEAKER: 'IR_SPEAKER',
  IR_BOX: 'IR_BOX',
  IR_TV: 'IR_TV',
  IR_STB: 'IR_STB'
};

export const IRV2_TYPE = [
  { key: IRV2_ALL_TYPE.IR_AC, name: 'AC', icon: 'icon-ir2-ac' },
  { key: IRV2_ALL_TYPE.IR_CAMERA, name: 'Camera', icon: 'icon-ir2-camera' },
  { key: IRV2_ALL_TYPE.IR_DVD, name: 'DVD', icon: 'icon-ir2-av' },
  { key: IRV2_ALL_TYPE.IR_FAN, name: 'Fan', icon: 'icon-ir2-fan' },
  { key: IRV2_ALL_TYPE.IR_SPEAKER, name: 'Speaker', icon: 'icon-ir2-speaker' },
  { key: IRV2_ALL_TYPE.IR_BOX, name: 'Box', icon: 'icon-ir2-box' },
  { key: IRV2_ALL_TYPE.IR_STB, name: 'Set-Top-Box', icon: 'icon-ir2-box' },
  { key: IRV2_ALL_TYPE.IR_TV, name: 'TV', icon: 'icon-ir2-tv' }
];

// Conver temp K to level
export function getColdWarmColor(temp) {
  const minWarm = 2700;
  const maxWarm = 6500;
  const minLevel = 0;
  const maxLevel = 255;

  const level = Math.round(((maxLevel - minLevel) * (temp - minWarm)) / (maxWarm - minWarm));
  return (maxLevel - Math.min(maxLevel, Math.max(minLevel, level)));
}

// conver coloWarm level to Temp
export function getTempFromColdWarmColor(warmColor) {
  const minWarm = 2700;
  const maxWarm = 6500;
  const minLevel = 0;
  const maxLevel = 255;

  return Math.round((maxWarm - minWarm) * warmColor / (maxLevel - minLevel)) + minWarm;
}

// Get default control for device RGBWW
export const sceneDefaultRgbww = {
  readingBooks: [
    { command: DEVICE_TRAIT.Brightness, params: { brightness: 100 } },
    { command: DEVICE_TRAIT.ColdWarmColor, params: { coldWarmColor: getColdWarmColor(3700) } }
  ],
  dinner: [
    { command: DEVICE_TRAIT.Brightness, params: { brightness: 100 } },
    { command: DEVICE_TRAIT.ColdWarmColor, params: { coldWarmColor: getColdWarmColor(4000) } }
  ],
  watchMovie: [
    { command: DEVICE_TRAIT.Brightness, params: { brightness: 20 } },
    { command: DEVICE_TRAIT.ColdWarmColor, params: { coldWarmColor: getColdWarmColor(5000) } }
  ],
  meeting: [
    { command: DEVICE_TRAIT.Brightness, params: { brightness: 100 } },
    { command: DEVICE_TRAIT.ColdWarmColor, params: { coldWarmColor: getColdWarmColor(6500) } }
  ],
};

function clamp(x, min, max) {
  if (x < min) { return min; }
  if (x > max) { return max; }

  return x;
}

export function colorTemperatureToRGB(kelvin) {
  const temp = kelvin / 100;

  let red;
  let green;
  let blue;

  if (temp <= 66) {
    red = 255;
    green = temp;
    green = 99.4708025861 * Math.log(green) - 161.1195681661;

    if (temp <= 19) {
      blue = 0;
    } else {
      blue = temp - 10;
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
    }
  } else {
    red = temp - 60;
    // eslint-disable-next-line no-restricted-properties
    red = 329.698727446 * Math.pow(red, -0.1332047592);

    green = temp - 60;
    // eslint-disable-next-line no-restricted-properties
    green = 288.1221695283 * Math.pow(green, -0.0755148492);

    blue = 255;
  }

  return {
    r: clamp(red, 0, 255),
    g: clamp(green, 0, 255),
    b: clamp(blue, 0, 255)
  };
}

/**
 * Hàm get min, max speed của IR daikin
 * @param {*} device
 */
export const getMaxMinFanSpeedIrDaikin = (device) => {
  if (!device || !device.traits) {
    return {
      min: SPEED_DAIKIN[0].speed,
      max: SPEED_DAIKIN[SPEED_DAIKIN.length - 1].speed
    };
  }

  const { traits } = device;
  const speedTrait = traits.find(t => t.name === DEVICE_TRAIT.Speed);
  if (speedTrait) {
    return {
      min: speedTrait.min,
      max: speedTrait.max
    };
  }

  return {
    min: SPEED_DAIKIN[0].speed,
    max: SPEED_DAIKIN[SPEED_DAIKIN.length - 1].speed
  };
};

/**
 * Hàm get min, max mode của IR daikin
 * @param {*} device
 */
export const getMaxMinModeIrDaikin = (device) => {
  if (!device || !device.traits) {
    return {
      min: MODE_DAIKIN[0].mode,
      max: MODE_DAIKIN[MODE_DAIKIN.length - 1].mode
    };
  }

  const { traits } = device;
  const temperatureSettingTrait = traits.find(t => t.name === DEVICE_TRAIT.TemperatureSetting);
  if (!!temperatureSettingTrait) {
    return {
      min: temperatureSettingTrait.min,
      max: temperatureSettingTrait.max
    };
  }

  return {
    min: MODE_DAIKIN[0].mode,
    max: MODE_DAIKIN[MODE_DAIKIN.length - 1].mode
  };
};

/**
 * Hàm get min, max temp của IR daikin
 * @param {*} device
 */
export const getMaxMinTempIrDaikin = (device) => {
  if (!device || !device.traits) {
    return TEMP_DAIKIN;
  }

  const { traits } = device;
  const temperatureControlTrait = traits.find(t => t.name === DEVICE_TRAIT.TemperatureControl);
  if (!!temperatureControlTrait) {
    return {
      min: temperatureControlTrait.min,
      max: temperatureControlTrait.max
    };
  }

  return TEMP_DAIKIN;
};

/**
 * Lấy trạng thái active theo trait
 */
export const getActiveStateByTrait = (trait, state) => {
  if (!state) return false;

  switch (trait) {
    case DEVICE_TRAIT.OnOff:
      return state.on;
    case DEVICE_TRAIT.StartStop:
      return state.start;
    case DEVICE_TRAIT.Brightness:
      return state.brightness > 0;
    case DEVICE_TRAIT.Speed:
      return state.speed > 0;
    case DEVICE_TRAIT.Level:
      return state.level > 0;
    case DEVICE_TRAIT.ColorSpectrum:
      return state.colorSpectrum !== '00:00:00';
    case DEVICE_TRAIT.OpenClose:
      return !state.open;
    case DEVICE_TRAIT.LockUnlock:
      return !state.lock;
    case DEVICE_TRAIT.Act:
      return state.act > 0;
    case DEVICE_TRAIT.Battery:
    case DEVICE_TRAIT.Luminance:
    case DEVICE_TRAIT.Humidity:
    case DEVICE_TRAIT.Temperature:
    case DEVICE_TRAIT.Power:
    case DEVICE_TRAIT.Voltage:
    case DEVICE_TRAIT.Ampe:
      return false;
    case DEVICE_TRAIT.ContactSensor:
      return state.csAlarm;
    case DEVICE_TRAIT.Pir:
      return state.pirAlarm;
    case DEVICE_TRAIT.COAlarm:
      return state.coAlarm;
    case DEVICE_TRAIT.SmokeAlarm:
      return state.smokeAlarm;
    case DEVICE_TRAIT.WaterAlarm:
      return state.waterAlarm;
    case DEVICE_TRAIT.GasAlarm:
      return state.gasAlarm;
    case DEVICE_TRAIT.ShockAlarm:
      return isLumi ? (state.shockAlarm > 0) : state.shockAlarm;
    case DEVICE_TRAIT.HeatAlarm:
      return true;
    default:
      return false;
  }
};

/**
 * Lấy tên icon theo trạng thái và trait
 */
export const getIconStateByTrait = (trait, state) => {
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

// - Giá trị act
//     + 0: trạng thái ban đầu (~ nhả nút)
//     + 1: xoay cùng chiều kim đồng hồ
//     + 2: ngược chiều kim đồng hồ
//     + 3: vuốt lên
//     + 4: vuốt xuống
//     + 5: vuốt trái
//     + 6: vuốt phải
//     + 7: ấn giữ
//     + 8: ấn 1 lần liên tiếp
//     + 9: ấn 2 lần liên tiếp
//     + 10: ấn 3 lần liên tiếp
//     + 11: ấn 4 lần liên tiếp
//     + 12: ấn 5 lần liên tiếp

//     + 21: press 1 time EP1
//     + 22: press 2 times EP1
//     + 23: hold EP1
//     + 24: press 1 time EP2
//     + 25: press 2 times EP2
//     + 26: hold EP2
//     + 27: press 1 time EP3
//     + 28: press 2 times EP3
//     + 29: hold EP3

/**
 *
 * @param {object} device
 * @returns {object} state, level, other
 */
export const getDefaultValueDevice = (device) => {
  if (!device) return;

  const { type, traits } = device;
  switch (type) {
    case DEVICE_TYPE.SWITCH:
    case DEVICE_TYPE.INPUT:
    case DEVICE_TYPE.VIRTUAL:
      return { OnOff: { on: false } };
    case DEVICE_TYPE.LIGHT: {
      if (traits.find((t) => t.name == DEVICE_TRAIT.ColorSpectrum)) {
        return { OnOff: { on: false }, ColorSpectrum: { colorSpectrum: '00:00:00' } };
      }
      return { OnOff: { on: false }, Brightness: { brightness: 0 } };
    }
    case DEVICE_TYPE.LIGHTV2: {
      if (traits.find((t) => t.name == DEVICE_TRAIT.ColorSpectrum)) {
        return {
          OnOff: { on: false },
          ColorSpectrum: { colorSpectrum: '00:00:00' },
          Brightness: { brightness: 0 },
          ColdWarmColor: { coldWarmColor: 0 }
        };
      }

      return {
        OnOff: { on: false },
        Brightness: { brightness: 0 },
        ColdWarmColor: { coldWarmColor: 0 }
      };
    }
    case DEVICE_TYPE.FAN:
      return { OnOff: { on: false }, Speed: { speed: 0 } };
    case DEVICE_TYPE.CAMERA:
      // eventType: 0/1/2/3 -> Idle/Line Detected/Field Detected/Scene Change Detected
      return { CameraEvent: { eventType: 2 } };
    case DEVICE_TYPE.CURTAIN:
      let maxLevel = CURTAIN_MAX_LEVEL;
      if (!!device.traits.find(t => t.name == DEVICE_TRAIT.Level)) {
        maxLevel = device.traits.find(t => t.name == DEVICE_TRAIT.Level).max || maxLevel;
      }
      return { OpenClose: { open: false }, StartStop: { start: false }, Level: { level: maxLevel } };
    case DEVICE_TYPE.DAIKIN:
      const findTraitTempSetting = traits.find((t) => t.name == DEVICE_TRAIT.TemperatureSetting);
      const findTraitSpeed = traits.find((t) => t.name == DEVICE_TRAIT.Speed);
      const findTraitTempControl = traits.find((t) => t.name == DEVICE_TRAIT.TemperatureControl);

      return {
        OnOff: { on: true },
        TemperatureSetting: { temperatureSetting: !!findTraitTempSetting ? findTraitTempSetting.min : MODE_DAIKIN[0].mode },
        Speed: { speed: !!findTraitSpeed ? findTraitSpeed.min : SPEED_DAIKIN[0].speed },
        TemperatureControl: { temperatureControl: !!findTraitTempControl ? findTraitTempControl.min : TEMP_DAIKIN.min }
      };
    case DEVICE_TYPE.IR:
      return { OnOff: { on: false } };
    case DEVICE_TYPE.LMYALELOCK:
      return { LockUnlock: { act: 'unlocked' } };
    case DEVICE_TYPE.DOORLOCK:
      return { LockUnlock: { lock: false } };
    case DEVICE_TYPE.SENSOR:
    case DEVICE_TYPE.BATTERY: {
      const mainTrait = traits.find((t) => t.is_main);
      if (!mainTrait) return {};
      if (mainTrait.name == DEVICE_TRAIT.Battery)
        return { Battery: { battery: 100 } };
      if (mainTrait.name == DEVICE_TRAIT.Luminance)
        return { Luminance: { lux: 1000 } };
      if (mainTrait.name == DEVICE_TRAIT.Humidity)
        return { Humidity: { humidity: 80 } };
      if (mainTrait.name == DEVICE_TRAIT.Temperature)
        return { Temperature: { temperature: 25 } };
      if (mainTrait.name == DEVICE_TRAIT.Power)
        return { Power: { power: 0 } };
      if (mainTrait.name == DEVICE_TRAIT.Voltage)
        return { Voltage: { voltage: 0 } };
      if (mainTrait.name == DEVICE_TRAIT.Ampe)
        return { Ampe: { ampe: 0 } };
      if (mainTrait.name == DEVICE_TRAIT.ContactSensor)
        return { ContactAlarm: { csAlarm: false } };
      if (mainTrait.name == DEVICE_TRAIT.Pir)
        return { PirAlarm: { pirAlarm: false } };
      if (mainTrait.name == DEVICE_TRAIT.COAlarm)
        return { COAlarm: { coAlarm: false } };
      if (mainTrait.name == DEVICE_TRAIT.SmokeAlarm)
        return { SmokeAlarm: { smokeAlarm: false } };
      if (mainTrait.name == DEVICE_TRAIT.WaterAlarm)
        return { WaterAlarm: { waterAlarm: false } };
      if (mainTrait.name == DEVICE_TRAIT.GasAlarm)
        return { GasAlarm: { gasAlarm: false } };
      if (mainTrait.name == DEVICE_TRAIT.ShockAlarm)
        return { ShockAlarm: { shockAlarm: 0 } };
      if (mainTrait.name == DEVICE_TRAIT.HeatAlarm)
        return { HeatAlarm: { heatAlarm: 'Normal' } };
      return {};
    }
    case DEVICE_TYPE.PEBBLE:
      return { Act: { act: 0 } };
    default:
      return {};
  }
};

export const getArrayIcon = (type) => {
  if (type == 'vertical') {
    return ['cutain-vertical-0', 'cutain-vertical-1', 'cutain-vertical-2', 'cutain-vertical-3', 'cutain-vertical-4', 'cutain-vertical-5', 'cutain-vertical-6'];
  }
  if (type == 'screen') {
    return ['cutain-screen-0', 'cutain-screen-1', 'cutain-screen-2', 'cutain-screen-3', 'cutain-screen-4', 'cutain-screen-5', 'cutain-screen-6'];
  }

  return ['device-curtain-horizontal-0', 'device-curtain-horizontal-1', 'device-curtain-horizontal-2', 'device-curtain-horizontal-3', 'device-curtain-horizontal-4', 'device-curtain-horizontal-5', 'device-curtain-horizontal-6'];
};

export const arrayLevel = [0, 17, 33, 50, 67, 83, CURTAIN_MAX_LEVEL];

// Hàm lấy level cutain từ value
export function getLevelFromValue(value, levelArray) {
  const v = parseInt(value);
  for (let i = 0; i < levelArray.length; i++) {
    if (v <= levelArray[i]) {
      return i;
    }
  }

  return 6;
}

// Hàm lấy value cutain từ level
export function getValueFromLevel(level, levelArray) {
  const v = parseInt(level);
  for (let i = 0; i < 7; i++) {
    if (v === i) {
      return levelArray[i];
    }
  }
}

// get icon curtain
export const getIconCurtain = (device, states) => {
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

// Check những thiết bị là loại mức
export const isLevelDevice = (dev) => {
  console.log('isLevelDevice', dev);
  try {
    if (dev.type === DEVICE_TYPE.BATTERY
      || dev.type === DEVICE_TYPE.CURTAIN
      || dev.type === DEVICE_TYPE.FAN
      || dev.type === DEVICE_TYPE.LIGHT
      || dev.type === DEVICE_TYPE.LIGHTV2
      // || dev.type === DEVICE_TYPE.SENSOR
      || dev.type === DEVICE_TYPE.SPEAKER) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @param { string} type
 * @returns {string} iconName of device
 */
export const getDefaultIconDevice = (device, states) => {
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

export const getIconByTypeForSetting = (device) => {

  console.log( 'my device==>', device)
  if (!device) return [];

  switch (device.type) {
    case DEVICE_TYPE.SWITCH:
      return [
        { key: 'ic-zw-light-bulb', name: langs['ic-zw-light-bulb'] },
        { key: 'ic-zw-bell', name: langs['ic-zw-bell'] },
        { key: 'ic-zw-camera', name: langs['ic-zw-camera'] },
        { key: 'ic-zw-chandelier', name: langs['ic-zw-chandelier'] },
        { key: 'ic-zw-church-lamp', name: langs['ic-zw-church-lamp'] },
        { key: 'ic-zw-compact', name: langs['ic-zw-compact'] },
        { key: 'ic-zw-decorative-light', name: langs['ic-zw-decorative-light'] },
        { key: 'ic-zw-dimmer', name: langs['ic-zw-dimmer'] },
        { key: 'ic-zw-down-light', name: langs['ic-zw-down-light'] },
        { key: 'ic-zw-drop-light', name: langs['ic-zw-drop-light'] },
        { key: 'icon-ir2-ac', name: langs['icon-ir2-ac'] },
        { key: 'ic-zw-fan', name: langs['ic-zw-fan'] },
        { key: 'ic-zw-fluorescent', name: langs['ic-zw-fluorescent'] },
        { key: 'ic-zw-gate', name: langs['ic-zw-gate'] },
        { key: 'ic-zw-heating-lamp', name: langs['ic-zw-heating-lamp'] },
        { key: 'ic-zw-ic-zw-IrrigationValve', name: langs['ic-zw-ic-zw-IrrigationValve'] },
        { key: 'ic-zw-led', name: langs['ic-zw-led'] },
        { key: 'ic-zw-light-pole', name: langs['ic-zw-light-pole'] },
        { key: 'ic-zw-motor', name: langs['ic-zw-motor'] },
        { key: 'ic-zw-night-light', name: langs['ic-zw-night-light'] },
        { key: 'ic-zw-overhead-light', name: langs['ic-zw-overhead-light'] },
        { key: 'ic-zw-siren', name: langs['ic-zw-siren'] },
        { key: 'ic-zw-speaker', name: langs['ic-zw-speaker'] },
        { key: 'ic-zw-switch', name: langs['ic-zw-switch'] },
        { key: 'ic-zw-tv', name: langs['ic-zw-tv'] },
        { key: 'ic-zw-ventilator', name: langs['ic-zw-ventilator'] },
        { key: 'ic-zw-wall-light', name: langs['ic-zw-wall-light'] },
        { key: 'ic-zw-water-heater', name: langs['ic-zw-water-heater'] },
        { key: 'ic-zw-power-strip', name: langs['ic-zw-power-strip'] },
        { key: 'color-lens', name: langs['ic-zw-rgb'] },
        { key: 'signal_wifi_4_bar_lock', name: langs['wifi'] },
        { key: 'mic', name: langs['mic'] },
      ];
    case DEVICE_TYPE.LIGHT:
      return [
        { key: 'ic-zw-overhead-light', name: langs['ic-zw-dimmer'] },
        { key: 'color-lens', name: langs['ic-zw-rgb'] },
      ];
    case DEVICE_TYPE.FAN:
      return [
        { key: 'ic-zw-fan', name: langs['ic-zw-fan'] },
      ];
    case DEVICE_TYPE.CURTAIN:
      return [
        { key: 'device-curtain-horizontal-0', name: langs['device-curtain-horizontal-0'] },
        { key: 'cutain-vertical-0', name: langs['cutain-vertical-0'] },
        { key: 'cutain-screen-0', name: langs['cutain-screen-0'] },
      ];
    case DEVICE_TYPE.DOORLOCK:
      return [
        { key: 'ic-zw-door-lock-keypad', name: langs['ic-zw-door-lock-keypad'] },
      ];
    case DEVICE_TYPE.INPUT:
      return [
        { key: 'ic-zw-switch', name: langs['ic-zw-switch'] },
        { key: 'ic-zw-water-alarm', name: langs['ic-zw-water-alarm'] },
        { key: 'ic-zw-smoke-alarm', name: langs['ic-zw-smoke-alarm'] },
        { key: 'ic-zw-gas-alarm', name: langs['ic-zw-gas-alarm'] },
        { key: 'ic-zw-co-alarm', name: langs['ic-zw-co-alarm'] },
        { key: 'ic-zw-security-door', name: langs['ic-zw-security-door'] },
        { key: 'ic-zw-sencer-motion', name: langs['ic-zw-sencer-motion'] },
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

export const getRealTypeDevice = (device, iconkeyDevice) => {
  if (!device) return REAL_TYPE_DEVICE.Unknow;

  const { type } = device;
  // eslint-disable-next-line prefer-destructuring
  let iconkey = device.iconkey;
  if (!!iconkeyDevice) {
    iconkey = iconkeyDevice;
  }

  if (!type) return REAL_TYPE_DEVICE.Unknow;

  if (type == DEVICE_TYPE.SWITCH) {
    switch (iconkey) {
      case 'ic-zw-light-bulb':
      case 'ic-zw-chandelier':
      case 'ic-zw-church-lamp':
      case 'ic-zw-compact':
      case 'ic-zw-decorative-light':
      case 'ic-zw-drop-light':
      case 'ic-zw-fluorescent':
      case 'ic-zw-light-pole':
      case 'ic-zw-overhead-light':
      case 'ic-zw-wall-light':
        return REAL_TYPE_DEVICE.Light;
      case 'ic-zw-bell':
        return REAL_TYPE_DEVICE.Bell;
      case 'ic-zw-camera':
        return REAL_TYPE_DEVICE.Camera;
      case 'ic-zw-dimmer':
        return REAL_TYPE_DEVICE.Dimmer;
      case 'ic-zw-down-light':
        return REAL_TYPE_DEVICE.Downlight;
      case 'ic-zw-fan':
        return REAL_TYPE_DEVICE.Fan;
      case 'ic-zw-gate':
        return REAL_TYPE_DEVICE.Gate;
      case 'ic-zw-heating-lamp':
        return REAL_TYPE_DEVICE.HeatAlarm;
      case 'ic-zw-ic-zw-IrrigationValve':
        return REAL_TYPE_DEVICE.IrrigationValve;
      case 'ic-zw-led':
        return REAL_TYPE_DEVICE.Led;
      case 'ic-zw-motor':
        return REAL_TYPE_DEVICE.Motor;
      case 'ic-zw-night-light':
        return REAL_TYPE_DEVICE.NightLight;
      case 'ic-zw-siren':
        return REAL_TYPE_DEVICE.Siren;
      case 'ic-zw-speaker':
        return REAL_TYPE_DEVICE.Speaker;
      case 'ic-zw-tv':
        return REAL_TYPE_DEVICE.Tivi;
      case 'ic-zw-ventilator':
        return REAL_TYPE_DEVICE.Ventilator;
      case 'ic-zw-water-heater':
        return REAL_TYPE_DEVICE.WaterHeater;
      case 'ic-zw-power-strip':
        return REAL_TYPE_DEVICE.PowerStrip;
      case 'color-lens':
        return REAL_TYPE_DEVICE.RGB;
      default:
        return REAL_TYPE_DEVICE.Switch;
    }
  }

  if (type == DEVICE_TYPE.LIGHT) {
    switch (iconkey) {
      case 'ic-zw-overhead-light':
        return REAL_TYPE_DEVICE.Dimmer;
      case 'color-lens':
        return REAL_TYPE_DEVICE.RGB;
      default:
        return REAL_TYPE_DEVICE.Light;
    }
  }

  if (type == DEVICE_TYPE.FAN) {
    return REAL_TYPE_DEVICE.Fan;
  }

  if (type == DEVICE_TYPE.CURTAIN) {
    return REAL_TYPE_DEVICE.Curtain;
  }

  if (type == DEVICE_TYPE.DOORLOCK) {
    return REAL_TYPE_DEVICE.DoorLock;
  }

  if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.BATTERY) {
    return REAL_TYPE_DEVICE.Sensor;
  }

  if (type == DEVICE_TYPE.DAIKIN) {
    return REAL_TYPE_DEVICE.Daikin;
  }

  return REAL_TYPE_DEVICE.Unknow;
};

export const getDefaultStateGroupHCL = (group) => {
  try {
    const { deviceType, traits } = group;
    if (deviceType === DEVICE_TYPE.LIGHT) {
      if (traits.find(t => t.name === DEVICE_TRAIT.ColorSpectrum)) {
        return {
          OnOff: { on: false },
          Brightness: { brightness: 0 },
          ColorSpectrum: { colorSpectrum: '00:00:00' }
        };
      }
    } else if (deviceType === DEVICE_TYPE.LIGHTV2) {
      if (traits.find(t => t.name === DEVICE_TRAIT.ColorSpectrum)) {
        return {
          OnOff: { on: false },
          Brightness: { brightness: 0 },
          ColorSpectrum: { colorSpectrum: '00:00:00' },
          ColdWarmColor: { coldWarmColor: 0 }
        };
      }
      return {
        OnOff: { on: false },
        Brightness: { brightness: 0 },
        ColdWarmColor: { coldWarmColor: 0 }
      };
    } else {
      return {
        OnOff: { on: false },
        Brightness: { brightness: 0 },
        ColorSpectrum: { colorSpectrum: '00:00:00' }
      };
    }
  } catch (error) {
    return {
      OnOff: { on: false },
      Brightness: { brightness: 0 },
      ColorSpectrum: { colorSpectrum: '00:00:00' }
    };
  }
};

/**
 *
 * @param {Object} device
 * @returns {string} default name of device
 */
export const getDefaultNameDevice = (device) => {
  if (!device) return 'UNKNOWN';

  const { type, traits } = device;

  switch (type) {
    case DEVICE_TYPE.SWITCH:
      return langs.deviceOnOff;
    case DEVICE_TYPE.LIGHT: {
      if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum))
        return langs.deviceRGB;
      return langs.deviceDimmer;
    }
    case DEVICE_TYPE.LIGHTV2:
      if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum))
        return 'RGBWW';
      return 'WW';
    case DEVICE_TYPE.FAN:
      return langs.deviceFan;
    case DEVICE_TYPE.CURTAIN:
      return langs.deviceCurtain;
    case DEVICE_TYPE.CAMERA:
      return langs.camera;
    case DEVICE_TYPE.IR:
    case DEVICE_TYPE.IRV2:
      return langs.deviceIR;
    case DEVICE_TYPE.LMYALELOCK:
      return langs.deviceYaleLock;
    case DEVICE_TYPE.DOORLOCK:
      return langs.deviceDoorLock;
    case DEVICE_TYPE.DAIKIN:
      return langs.deviceDaikin;
    case DEVICE_TYPE.SPEAKER:
      return langs.speaker;
    case DEVICE_TYPE.INPUT:
      return langs.moduleInput;
    case DEVICE_TYPE.VIRTUAL:
      return langs.virtualDevice;
    case DEVICE_TYPE.SENSOR:
    case DEVICE_TYPE.BATTERY: {
      const mainTrait = traits.find(t => t.is_main);
      if (!mainTrait)
        return langs.deviceSensor;
      if (mainTrait.name == DEVICE_TRAIT.Battery)
        return langs.deviceBatterySensor;
      if (mainTrait.name == DEVICE_TRAIT.Luminance)
        return langs.deviceLightSensor;
      if (mainTrait.name == DEVICE_TRAIT.Humidity)
        return langs.deviceHumiditySensor;
      if (mainTrait.name == DEVICE_TRAIT.Temperature)
        return langs.deviceTempSensor;
      if (mainTrait.name == DEVICE_TRAIT.Power)
        return langs.devicePowerSensor;
      if (mainTrait.name == DEVICE_TRAIT.Voltage)
        return langs.deviceVoltageSensor;
      if (mainTrait.name == DEVICE_TRAIT.Ampe)
        return langs.deviceCurrentSensor;
      if (mainTrait.name == DEVICE_TRAIT.ContactSensor)
        return langs.deviceDoorSensor;
      if (mainTrait.name == DEVICE_TRAIT.Pir)
        return langs.deviceMotionSensor;
      if (mainTrait.name == DEVICE_TRAIT.COAlarm)
        return langs.deviceCOSensor;
      if (mainTrait.name == DEVICE_TRAIT.SmokeAlarm)
        return langs.deviceSmokeSensor;
      if (mainTrait.name == DEVICE_TRAIT.WaterAlarm)
        return langs.deviceWatterSensor;
      if (mainTrait.name == DEVICE_TRAIT.GasAlarm)
        return langs.deviceGarSensor;
      if (mainTrait.name == DEVICE_TRAIT.ShockAlarm)
        return langs.deviceVirSensor;
      if (mainTrait.name == DEVICE_TRAIT.HeatAlarm)
        return langs.deviceHeatSensor;
      return langs.deviceSensor;
    }
    case DEVICE_TYPE.PEBBLE:
      return langs.devicePebbleSensor;
    default:
      return 'Unknow';
  }
};

export const getDefaultExecutionDevice = (device) => {
  const { type } = device;

  if (device.execution) {
    return device.execution;
  }

  if (type == DEVICE_TYPE.IR) {
    if (!!device.irCommands) {
      const execution = { command: DEVICE_TRAIT.IrActive, params: { irActive: device.irCommands[0].commandId } };
      return execution;
    }
  }

  if (type == DEVICE_TYPE.COOKER) {
    return [{ command: DEVICE_TRAIT.OnOff, params: { on: false } }];
  }

  if (type == DEVICE_TYPE.SPEAKER) {
    return undefined;
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
  return { command: DEVICE_TRAIT.OnOff, params: { on: true } };
};

// Get trạng thái của thiết bị ir trong rule, cảnh, lịch
export const getStatusDeviceIR = (device) => {
  if (!device) return '';

  const { irCommands, execution } = device;

  if (device.type == DEVICE_TYPE.IR) {
    if (!irCommands || !execution || irCommands.length == 0 || !execution.params) return '';

    const detailCommand = irCommands.find(cm => cm.commandId == execution.params.irActive);

    if (!detailCommand) return '';

    const { buttonId, arrIr } = detailCommand;

    if (!!arrIr) {
      if (arrIr.power === 0) {
        return langs.off;
      }
      return `temp:${arrIr.temp}-mode:${arrIr.mode}-fan:${arrIr.fan}-swing:${arrIr.swing}`;
    }

    return buttonId;
  }

  if (device.type === DEVICE_TYPE.IRV2) {
    const { irtype } = device;

    if (irtype == IRV2_ALL_TYPE.IR_AC) {
      const { fan, swing, mode, temp, power } = execution.arrIr;
      if (power === 0) {
        return langs.off;
      }
      return `Mode:${getModeName(mode)}-Temp:${temp}˚C-Fan:${getFanName(fan)}-Swing:${getSwingName(swing)}`;
    }

    if (irtype == IRV2_ALL_TYPE.IR_FAN) {
      return irv2GetIconAndNameFan(execution.arrIr.buttonid).displayName;
    }

    if (irtype == IRV2_ALL_TYPE.IR_TV) {
      return irv2GetIconAndNameTV(execution.arrIr.buttonid).displayName;
    }

    if (irtype == IRV2_ALL_TYPE.IR_STB) {
      return irv2GetIconAndNameSTB(execution.arrIr.buttonid).displayName;
    }

    return '';
  }

  return '';
};

export const getModeName = (mode) => {
  // Mode:  Auto: 0, Dry: 2, Cool: 3, Heat: 4, Fan: 6
  switch (mode) {
    case 0:
      return 'Auto';
    case 4:
      return 'Heat';
    case 2:
      return 'Dry';
    case 3:
      return 'Cool';
    case 6:
      return 'Fan';
    default:
      return 'Auto';
  }
};

export const getFanName = (fan) => {
  /* Fan:   Level 1: 3, level 2: 5, level 3: 7, auto: 10 */
  switch (fan) {
    case 10:
      return 'Auto';
    case 3:
      return 'Low';
    case 5:
      return 'Mid';
    case 7:
      return 'Hig';
    default:
      return 'Auto';
  }
};

export const getSwingName = (swing) => {
  // Swing: Yes: 1, No: 0
  switch (swing) {
    case 1:
      return 'Auto';
    case 0:
      return 'No';
    default:
      return 'Auto';
  }
};

/**
 *
 * @param {object} device
 * function get title status device from val
 */
export const getStatusDeviceFromVal = (device, states) => {
  if (!device || !device.type || !states) {
    return ` `;
  }
  try {
    const { type, traits } = device;
    if (type == DEVICE_TYPE.SWITCH) {
      return states[DEVICE_TRAIT.OnOff].on ? langs.statusOn : langs.statusOff;
    }

    if (type == DEVICE_TYPE.VIRTUAL) {
      return states[DEVICE_TRAIT.OnOff].on ? langs.statusOn : langs.statusOff;
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
        return (rgbValue == '0:0:0' || rgbValue == 'Nav:0:0' || rgbValue == 'NaN:NaN:0' || rgbValue == 'NaN:NaN:NaN') ? langs.statusOff : `${states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum}`;
      }

      // dimmer
      if ((states[DEVICE_TRAIT.OnOff] && !states[DEVICE_TRAIT.OnOff].on) || states[DEVICE_TRAIT.Brightness].brightness < 0) {
        return langs.statusOff;
      }

      const traitDimmer = traits.find(t => t.name == DEVICE_TRAIT.Brightness);
      if (!!traitDimmer) {
        const levelBrightness = Math.round(states[DEVICE_TRAIT.Brightness].brightness * 100 / (traitDimmer.max - traitDimmer.min));
        return levelBrightness > 0 ? `${levelBrightness}%` : langs.statusOff;
      }

      return `${states[DEVICE_TRAIT.Brightness].brightness}`;
    }

    if (type == DEVICE_TYPE.LIGHTV2) {
      if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
        const rgbValue = states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum;
        return (rgbValue == '0:0:0' || rgbValue == 'Nav:0:0' || rgbValue == 'NaN:NaN:0' || rgbValue == 'NaN:NaN:NaN') ? langs.statusOff : `${states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum}`;
      }

      // dimmer
      if (states[DEVICE_TRAIT.OnOff] && !states[DEVICE_TRAIT.OnOff].on) {
        return langs.statusOff;
      }
      if (parseInt(states[DEVICE_TRAIT.Brightness].brightness) < 0) {
        return langs.statusOff;
      }

      const traitDimmer = traits.find(t => t.name == DEVICE_TRAIT.Brightness);
      if (!!traitDimmer) {
        const levelBrightness = Math.round(states[DEVICE_TRAIT.Brightness].brightness * 100 / (traitDimmer.max - traitDimmer.min));
        return levelBrightness > 0 ? `${levelBrightness}%` : langs.statusOff;
      }

      return `${states[DEVICE_TRAIT.Brightness].brightness}`;
    }

    if (type == DEVICE_TYPE.FAN) {
      return (states[DEVICE_TRAIT.OnOff] && !states[DEVICE_TRAIT.OnOff].on) ? langs.statusOff : `${langs.levelTitle} ${states[DEVICE_TRAIT.Speed].speed}`;
    }

    if (type == DEVICE_TYPE.CURTAIN) {
      let maxLevel = CURTAIN_MAX_LEVEL;
      if (!!device.traits.find(t => t.name == DEVICE_TRAIT.Level)) {
        maxLevel = device.traits.find(t => t.name == DEVICE_TRAIT.Level).max || maxLevel;
      }
      return states[DEVICE_TRAIT.Level].level == 0 ? langs.statusOpen : ((states[DEVICE_TRAIT.Level].level == 100 || states[DEVICE_TRAIT.Level].level == maxLevel) ? langs.statusClose : `${states[DEVICE_TRAIT.Level].level}`);
    }

    if (type == DEVICE_TYPE.LMYALELOCK) {
      return states[DEVICE_TRAIT.LockUnlock].act === 'locked' ? langs.statusLock : langs.statusUnlock;
    }

    if (type == DEVICE_TYPE.DOORLOCK) {
      return states[DEVICE_TRAIT.LockUnlock].lock ? langs.statusLock : langs.statusUnlock;
    }

    if (type == DEVICE_TYPE.COOKER) {
      if (!!states[DEVICE_TRAIT.OnOff] && states[DEVICE_TRAIT.OnOff].on == false) {
        return langs.off;
      }

      if (!!states[DEVICE_TRAIT.Temperature]) {
        return `${states[DEVICE_TRAIT.Temperature].temperature}˚C`;
      }

      return `--`;
    }

    if (type == DEVICE_TYPE.DAIKIN) {
      if (!states[DEVICE_TRAIT.OnOff].on) {
        return langs.statusOff;
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
        return states[DEVICE_TRAIT.OnOff].on ? langs.hasWatter : langs.normal;
      }

      if (iconkey == 'ic-zw-smoke-alarm') {
        return states[DEVICE_TRAIT.OnOff].on ? langs.hasSmoke : langs.normal;
      }

      if (iconkey == 'ic-zw-gas-alarm') {
        return states[DEVICE_TRAIT.OnOff].on ? langs.hasGar : langs.normal;
      }

      if (iconkey == 'ic-zw-co-alarm') {
        return states[DEVICE_TRAIT.OnOff].on ? langs.hasGar : langs.normal;
      }

      if (iconkey == 'ic-zw-security-door') {
        return states[DEVICE_TRAIT.OnOff].on ? langs.doorOpen : langs.doorClose;
      }

      if (iconkey == 'ic-zw-sencer-motion') {
        return states[DEVICE_TRAIT.OnOff].on ? langs.motionDetect : langs.noMotion;
      }

      return states[DEVICE_TRAIT.OnOff].on ? langs.statusOn : langs.statusOff;
    }

    if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.BATTERY) {
      const mainTrait = traits.find(t => t.is_main);
      if (!mainTrait)
        return langs.unKnow;
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
          return states[DEVICE_TRAIT.ContactSensor].csAlarm ? langs.doorOpen : langs.doorClose;
        if (mainTrait.name == DEVICE_TRAIT.Pir)
          return states[DEVICE_TRAIT.Pir].pirAlarm ? langs.motionDetect : langs.noMotion;
        if (mainTrait.name == DEVICE_TRAIT.COAlarm)
          return states[DEVICE_TRAIT.COAlarm].coAlarm ? langs.hasGar : langs.normal;
        if (mainTrait.name == DEVICE_TRAIT.SmokeAlarm)
          return states[DEVICE_TRAIT.SmokeAlarm].smokeAlarm ? langs.hasSmoke : langs.normal;
        if (mainTrait.name == DEVICE_TRAIT.WaterAlarm)
          return states[DEVICE_TRAIT.WaterAlarm].waterAlarm ? langs.hasWatter : langs.normal;
        if (mainTrait.name == DEVICE_TRAIT.GasAlarm)
          return states[DEVICE_TRAIT.GasAlarm].gasAlarm ? langs.hasGar : langs.normal;
        if (mainTrait.name == DEVICE_TRAIT.ShockAlarm)
          if (isLumi) {
            if (states[DEVICE_TRAIT.ShockAlarm].shockAlarm == 0) return langs.normal;
            if (states[DEVICE_TRAIT.ShockAlarm].shockAlarm == 1) return langs.vibration;
            if (states[DEVICE_TRAIT.ShockAlarm].shockAlarm == 2) return langs.tilt;
            if (states[DEVICE_TRAIT.ShockAlarm].shockAlarm == 3) return langs.fall;

            return ` `;
          } else {
            return states[DEVICE_TRAIT.ShockAlarm].shockAlarm ? langs.hasVibration : langs.normal;
          }
        if (mainTrait.name == DEVICE_TRAIT.HeatAlarm)
          return states[DEVICE_TRAIT.ShockAlarm].heatAlarm;
      } catch (error) {
        return langs.unKnow;
      }
      return langs.unKnow;
    }

    if (type == DEVICE_TYPE.PEBBLE) {
      // return langs.pebbleStatus[states[DEVICE_TRAIT.Act].act]
      return '';
    }
  } catch (error) {
    return langs.unKnow;
  }
  return '';
};

export const getStatusFromExecution = (device) => {
  try {
    const { execution, type } = device;

    if (type == DEVICE_TYPE.COOKER) {
      const powerFind = execution.find(e => e.command == DEVICE_TRAIT.OnOff);

      if (!!powerFind && powerFind.params.on == false) {
        return langs.off;
      }

      if (!!execution.find(e => e.command == DEVICE_TRAIT.Temperature)) {
        return `${execution.find(e => e.command == DEVICE_TRAIT.Temperature).params.temperature}˚C`;
      }

      if (!!execution.find(e => e.command == DEVICE_TRAIT.TemperatureControl)) {
        return `${langs.levelTitle} ${execution.find(e => e.command == DEVICE_TRAIT.TemperatureControl).params.temperatureControl}`;
      }

      return `--`;
    }
  } catch (error) {
    return ` `;
  }
};

/**
 * @param {object} device
 * @returns {array} title of device
 */
export const getArrayControlDevice = (device) => {
  if (!device || !device.type) {
    return [];
  }
  const { type, traits } = device;

  if (type == DEVICE_TYPE.SWITCH || type == DEVICE_TYPE.LIGHT || type == DEVICE_TYPE.FAN) {
    return [
      { title: langs.statusOn, execution: { command: DEVICE_TRAIT.OnOff, params: { on: true } } },
      { title: langs.statusOff, execution: { command: DEVICE_TRAIT.OnOff, params: { on: false } } }
    ];
  }
  if (type == DEVICE_TYPE.CURTAIN) {
    return [
      { title: langs.stopTitle, execution: { command: DEVICE_TRAIT.StartStop, params: { start: false } } },
      { title: langs.statusOpen, execution: { command: DEVICE_TRAIT.OpenClose, params: { open: true } } },
      { title: langs.statusClose, execution: { command: DEVICE_TRAIT.OpenClose, params: { open: false } } },
    ];
  }

  if (type == DEVICE_TYPE.IR) {
    return [];
  }

  if (type == DEVICE_TYPE.DOORLOCK) {
    return [
      { title: langs.statusLock, execution: { command: DEVICE_TRAIT.LockUnlock, params: { lock: true } } },
      { title: langs.statusUnlock, execution: { command: DEVICE_TRAIT.LockUnlock, params: { lock: false } } }
    ];
  }

  if (type == DEVICE_TYPE.DAIKIN) {
    return [];
  }

  if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.BATTERY) {
    const mainTrait = traits.find(t => t.is_main);
    if (!mainTrait)
      return [];
    if (mainTrait.name == DEVICE_TRAIT.Battery)
      return [];
    if (mainTrait.name == DEVICE_TRAIT.Luminance)
      return [];
    if (mainTrait.name == DEVICE_TRAIT.Humidity)
      return [];
    if (mainTrait.name == DEVICE_TRAIT.Temperature)
      return [];
    if (mainTrait.name == DEVICE_TRAIT.Power)
      return [];
    if (mainTrait.name == DEVICE_TRAIT.Voltage)
      return [];
    if (mainTrait.name == DEVICE_TRAIT.Ampe)
      return [];
    if (mainTrait.name == DEVICE_TRAIT.ContactSensor)
      return [
        { title: langs.doorOpen, execution: { command: DEVICE_TRAIT.ContactSensor, params: { csAlarm: true } } },
        { title: langs.doorClose, execution: { command: DEVICE_TRAIT.ContactSensor, params: { csAlarm: false } } }
      ];
    if (mainTrait.name == DEVICE_TRAIT.Pir)
      return [
        { title: langs.motionDetect, execution: { command: DEVICE_TRAIT.Pir, params: { pirAlarm: true } } },
        { title: langs.noMotion, execution: { command: DEVICE_TRAIT.Pir, params: { pirAlarm: false } } }
      ];
    if (mainTrait.name == DEVICE_TRAIT.COAlarm)
      return [
        { title: langs.hasGar, execution: { command: DEVICE_TRAIT.COAlarm, params: { coAlarm: true } } },
        { title: langs.normal, execution: { command: DEVICE_TRAIT.COAlarm, params: { coAlarm: false } } }
      ];
    if (mainTrait.name == DEVICE_TRAIT.SmokeAlarm)
      return [
        { title: langs.hasSmoke, execution: { command: DEVICE_TRAIT.SmokeAlarm, params: { smokeAlarm: true } } },
        { title: langs.normal, execution: { command: DEVICE_TRAIT.SmokeAlarm, params: { smokeAlarm: false } } }
      ];
    if (mainTrait.name == DEVICE_TRAIT.WaterAlarm)
      return [
        { title: langs.hasWatter, execution: { command: DEVICE_TRAIT.WaterAlarm, params: { waterAlarm: true } } },
        { title: langs.normal, execution: { command: DEVICE_TRAIT.WaterAlarm, params: { waterAlarm: false } } }
      ];
    if (mainTrait.name == DEVICE_TRAIT.GasAlarm)
      return [
        { title: langs.hasGar, execution: { command: DEVICE_TRAIT.GasAlarm, params: { gasAlarm: true } } },
        { title: langs.normal, execution: { command: DEVICE_TRAIT.GasAlarm, params: { gasAlarm: false } } }
      ];
    if (mainTrait.name == DEVICE_TRAIT.ShockAlarm)
      return [
        { title: langs.statusOn, execution: { command: DEVICE_TRAIT.ShockAlarm, params: { shockAlarm: true } } },
        { title: langs.statusOff, execution: { command: DEVICE_TRAIT.ShockAlarm, params: { shockAlarm: false } } }
      ];
    if (mainTrait.name == DEVICE_TRAIT.HeatAlarm)
      return [
        { title: 'Overheat', execution: { command: DEVICE_TRAIT.HeatAlarm, params: { heatAlarm: 'Overheat' } } },
        { title: 'Underheat', execution: { command: DEVICE_TRAIT.HeatAlarm, params: { heatAlarm: 'Underheat' } } },
        { title: 'Normal', execution: { command: DEVICE_TRAIT.HeatAlarm, params: { heatAlarm: 'Normal' } } },
      ];
    return [];
  }

  if (type == DEVICE_TYPE.PEBBLE) {
    return [
      { title: langs.pebbleStatus[0], execution: { command: DEVICE_TRAIT.Act, params: { act: 0 } } },
      { title: langs.pebbleStatus[1], execution: { command: DEVICE_TRAIT.Act, params: { act: 1 } } },
      { title: langs.pebbleStatus[2], execution: { command: DEVICE_TRAIT.Act, params: { act: 2 } } },
      { title: langs.pebbleStatus[3], execution: { command: DEVICE_TRAIT.Act, params: { act: 3 } } },
      { title: langs.pebbleStatus[4], execution: { command: DEVICE_TRAIT.Act, params: { act: 4 } } },
      { title: langs.pebbleStatus[5], execution: { command: DEVICE_TRAIT.Act, params: { act: 5 } } },
      { title: langs.pebbleStatus[6], execution: { command: DEVICE_TRAIT.Act, params: { act: 6 } } },
      { title: langs.pebbleStatus[7], execution: { command: DEVICE_TRAIT.Act, params: { act: 7 } } },
      { title: langs.pebbleStatus[8], execution: { command: DEVICE_TRAIT.Act, params: { act: 8 } } },
      { title: langs.pebbleStatus[9], execution: { command: DEVICE_TRAIT.Act, params: { act: 9 } } },
      { title: langs.pebbleStatus[10], execution: { command: DEVICE_TRAIT.Act, params: { act: 10 } } },
      { title: langs.pebbleStatus[11], execution: { command: DEVICE_TRAIT.Act, params: { act: 11 } } },
      { title: langs.pebbleStatus[12], execution: { command: DEVICE_TRAIT.Act, params: { act: 12 } } },
    ];
  }

  return [];
};

export const checkNeedGetExecution = (device) => {
  try {
    const { type, traits } = device;
    if (type === DEVICE_TYPE.SPEAKER) {
      return false;
    }
    if (type === DEVICE_TYPE.DAIKIN) {
      return false;
    }
    if (type === DEVICE_TYPE.COOKER) {
      return false;
    }
    if (type === DEVICE_TYPE.LIGHTV2) {
      return false;
    }
    if (type === DEVICE_TYPE.LIGHT && traits.find(t => t.name === DEVICE_TRAIT.ColorSpectrum)) {
      return false;
    }

    return true;
  } catch (error) {
    return true;
  }
};

/**
 * get lệnh điều khiển thiết bị mặc định từ trạng thái
 */
export const getExecutionFromState = (device) => {
  const { type, traits, states } = device;

  if (type == DEVICE_TYPE.SWITCH) {
    return { command: DEVICE_TRAIT.OnOff, params: { on: states[DEVICE_TRAIT.OnOff].on } };
  }

  if (type == DEVICE_TYPE.VIRTUAL) {
    return { command: DEVICE_TRAIT.OnOff, params: { on: states[DEVICE_TRAIT.OnOff].on } };
  }

  if (type == DEVICE_TYPE.LIGHTV2) {
    if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
      try {
        return [
          { command: DEVICE_TRAIT.OnOff, params: { on: states[DEVICE_TRAIT.OnOff].on } },
          { command: DEVICE_TRAIT.ColorSpectrum, params: { colorSpectrum: states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum } },
          { command: DEVICE_TRAIT.Brightness, params: { brightness: states[DEVICE_TRAIT.Brightness].brightness } },
          { command: DEVICE_TRAIT.ColdWarmColor, params: { coldWarmColor: states[DEVICE_TRAIT.ColdWarmColor].coldWarmColor } }
        ];
      } catch (error) {
        return [
          { command: DEVICE_TRAIT.OnOff, params: { on: false } },
          { command: DEVICE_TRAIT.ColorSpectrum, params: { colorSpectrum: '00:00:00' } },
          { command: DEVICE_TRAIT.Brightness, params: { brightness: 0 } },
          { command: DEVICE_TRAIT.ColdWarmColor, params: { coldWarmColor: 0 } }
        ];
      }
    } else {
      try {
        return [
          { command: DEVICE_TRAIT.OnOff, params: { on: states[DEVICE_TRAIT.OnOff].on } },
          { command: DEVICE_TRAIT.Brightness, params: { brightness: states[DEVICE_TRAIT.Brightness].brightness } },
          { command: DEVICE_TRAIT.ColdWarmColor, params: { coldWarmColor: states[DEVICE_TRAIT.ColdWarmColor].coldWarmColor } }
        ];
      } catch (error) {
        return [
          { command: DEVICE_TRAIT.OnOff, params: { on: false } },
          { command: DEVICE_TRAIT.Brightness, params: { brightness: 0 } },
          { command: DEVICE_TRAIT.ColdWarmColor, params: { coldWarmColor: 0 } }
        ];
      }
    }
  }

  if (type == DEVICE_TYPE.LIGHT) {
    if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
      // Device RGB or RGBW
      if (!!states.selectOnOff) {
        return { command: DEVICE_TRAIT.OnOff, params: { on: states[DEVICE_TRAIT.OnOff].on } };
      }
      return { command: DEVICE_TRAIT.ColorSpectrum, params: { name: "rgb", colorSpectrum: states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum } };
    }

    // Device Dimmer
    if (!states[DEVICE_TRAIT.OnOff].on) {
      return { command: DEVICE_TRAIT.OnOff, params: { on: false } };
    }

    return { command: DEVICE_TRAIT.Brightness, params: { brightness: states[DEVICE_TRAIT.Brightness].brightness } };
  }

  if (type == DEVICE_TYPE.FAN) {
    if (!states[DEVICE_TRAIT.OnOff].on) {
      return { command: DEVICE_TRAIT.OnOff, params: { on: false } };
    }

    return { command: DEVICE_TRAIT.Speed, params: { speed: states[DEVICE_TRAIT.Speed].speed } };
  }

  if (type == DEVICE_TYPE.CURTAIN) {
    // fix error setting device in rule initial state
    let maxLevel = CURTAIN_MAX_LEVEL;
    if (!!device.traits.find(t => t.name === DEVICE_TRAIT.Level)) {
      maxLevel = device.traits.find(t => t.name === DEVICE_TRAIT.Level).max || maxLevel;
    }
    const array = [0, 17, 33, 50, 67, 83, maxLevel];
    const levelPoint = getLevelFromValue(states[DEVICE_TRAIT.Level].level, array);
    const level = getValueFromLevel(levelPoint, array);
    return { command: DEVICE_TRAIT.Level, params: { level } };
  }

  if (type == DEVICE_TYPE.DAIKIN) {
    const newExecution = [
      { command: DEVICE_TRAIT.OnOff, params: { on: false } },
      { command: DEVICE_TRAIT.TemperatureSetting, params: { temperatureSetting: MODE_DAIKIN[0].mode } },
      { command: DEVICE_TRAIT.Speed, params: { speed: SPEED_DAIKIN[0].speed } },
      { command: DEVICE_TRAIT.TemperatureControl, params: { temperatureControl: TEMP_DAIKIN.min } }
    ];

    if (!!states[DEVICE_TRAIT.OnOff]) {
      newExecution[0].params = states[DEVICE_TRAIT.OnOff];
    }

    if (!!states[DEVICE_TRAIT.TemperatureSetting]) {
      newExecution[1].params = states[DEVICE_TRAIT.TemperatureSetting];
    }

    if (!!states[DEVICE_TRAIT.Speed]) {
      newExecution[2].params = states[DEVICE_TRAIT.Speed];
    }

    if (!!states[DEVICE_TRAIT.TemperatureControl]) {
      newExecution[3].params = states[DEVICE_TRAIT.TemperatureControl];
    }

    return newExecution;
  }

  if (type == DEVICE_TYPE.DOORLOCK) {
    return { command: DEVICE_TRAIT.LockUnlock, params: { lock: states[DEVICE_TRAIT.LockUnlock].lock } };
  }

  if (type == DEVICE_TYPE.PEBBLE) {
    return { command: DEVICE_TRAIT.Act, params: { act: states[DEVICE_TRAIT.Act].act } };
  }

  if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.UNKNOW) {
    return undefined;
  }
};

/**
 * Get execution default của groups
 */
export const getDefaultExecutionOfGroup = (group) => {
  try {
    const { deviceType, traits } = group;
    return { command: DEVICE_TRAIT.OnOff, params: { on: false } };
  } catch (error) {
    return { command: DEVICE_TRAIT.OnOff, params: { on: false } };
  }
};

/**
 * get trạng thái thiết bị từ lệnh điều khiển
 */
export const getStatesFromExecution = (device, execution) => {
  const { type, traits, states } = device;

  // Nếu excution là array
  if (Array.isArray(execution)) {
    if (execution.length === 0) {
      return getDefaultStatesDevice(device);
    }

    if (type == DEVICE_TYPE.SWITCH) {
      return { OnOff: execution[0].params };
    }

    if (type == DEVICE_TYPE.VIRTUAL) {
      return { OnOff: execution[0].params };
    }

    if (type == DEVICE_TYPE.LIGHTV2) {
      if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
        try {
          const onOffTrait = execution.find(e => e.command == DEVICE_TRAIT.OnOff);
          const colorSpectrumTrait = execution.find(e => e.command == DEVICE_TRAIT.ColorSpectrum);
          const brightnessTrait = execution.find(e => e.command == DEVICE_TRAIT.Brightness);
          const coldWarmColorTrait = execution.find(e => e.command == DEVICE_TRAIT.ColdWarmColor);
          return {
            OnOff: { on: onOffTrait.params.on },
            ColorSpectrum: { colorSpectrum: colorSpectrumTrait.params.colorSpectrum },
            Brightness: { brightness: brightnessTrait.params.brightness },
            ColdWarmColor: { coldWarmColor: coldWarmColorTrait.params.coldWarmColor },
            selectOnOff: onOffTrait.params.on
          };
        } catch (error) {
          return {
            OnOff: { on: false },
            ColorSpectrum: { colorSpectrum: '00:00:00' },
            Brightness: { brightness: 0 },
            ColdWarmColor: { coldWarmColor: 0 },
            selectOnOff: false
          };
        }
      } else {
        try {
          const onOffTrait = execution.find(e => e.command == DEVICE_TRAIT.OnOff);
          const brightnessTrait = execution.find(e => e.command == DEVICE_TRAIT.Brightness);
          const coldWarmColorTrait = execution.find(e => e.command == DEVICE_TRAIT.ColdWarmColor);
          return {
            OnOff: { on: onOffTrait.params.on },
            Brightness: { brightness: brightnessTrait.params.brightness },
            ColdWarmColor: { coldWarmColor: coldWarmColorTrait.params.coldWarmColor },
            selectOnOff: onOffTrait.params.on
          };
        } catch (error) {
          return {
            OnOff: { on: false },
            Brightness: { brightness: 0 },
            ColdWarmColor: { coldWarmColor: 0 },
            selectOnOff: false
          };
        }
      }
    }

    if (type == DEVICE_TYPE.LIGHT) {
      if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
        // Device RGB or RGBW
        if (execution[0].command == DEVICE_TRAIT.OnOff) {
          return {
            OnOff: { on: execution[0].params.on },
            ColorSpectrum: { name: 'rgb', colorSpectrum: execution[0].params.on ? 'ff:ff:ff' : '00:00:00' },
            selectOnOff: true
          };
        }
        return {
          OnOff: { on: true },
          ColorSpectrum: { name: 'rgb', colorSpectrum: execution[0].params.colorSpectrum }
        };
      }

      // Device Dimmer
      if (execution[0].command == DEVICE_TRAIT.OnOff) {
        return {
          OnOff: { on: false },
          Brightness: { brightness: 0 }
        };
      }

      return {
        OnOff: { on: true },
        Brightness: execution[0].params
      };
    }

    if (type == DEVICE_TYPE.FAN) {
      if (execution[0].command == DEVICE_TRAIT.OnOff) {
        return {
          OnOff: { on: false },
          Speed: { speed: 0 }
        };
      }

      return {
        OnOff: { on: true },
        Speed: execution[0].params
      };
    }

    if (type == DEVICE_TYPE.CURTAIN) {
      if (execution[0].command == DEVICE_TRAIT.StartStop) {
        return {
          StartStop: execution[0].params,
          OpenClose: { open: false },
          Level: { level: 0 }
        };
      }

      if (execution[0].command == DEVICE_TRAIT.OpenClose) {
        return {
          StartStop: { start: true },
          OpenClose: execution[0].params,
          Level: { level: 0 }
        };
      }
      // Truong hop level
      return {
        StartStop: { start: true },
        OpenClose: { open: false },
        Level: execution[0].params
      };
    }

    if (type == DEVICE_TYPE.DAIKIN) {
      let newState = {
        OnOff: { on: false },
        TemperatureSetting: { temperatureSetting: MODE_DAIKIN[0].mode },
        Speed: { speed: SPEED_DAIKIN[0].speed },
        TemperatureControl: { temperatureControl: TEMP_DAIKIN.min }
      };

      execution.forEach(ex => {
        if (ex.command == DEVICE_TRAIT.OnOff) {
          newState = { ...newState, OnOff: ex.params };
        }

        if (ex.command == DEVICE_TRAIT.TemperatureSetting) {
          newState = {
            ...newState,
            OnOff: { on: true },
            TemperatureSetting: ex.params
          };
        }

        if (ex.command == DEVICE_TRAIT.Speed) {
          newState = {
            ...newState,
            OnOff: { on: true },
            Speed: ex.params
          };
        }

        if (ex.command == DEVICE_TRAIT.TemperatureControl) {
          newState = {
            ...newState,
            OnOff: { on: true },
            TemperatureControl: ex.params
          };
        }
      });

      return newState;
    }

    if (type == DEVICE_TYPE.DOORLOCK) {
      return { LockUnlock: execution[0].params };
    }

    if (type == DEVICE_TYPE.PEBBLE) {
      return { Act: execution[0].params };
    }

    if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.UNKNOW) {
      return { OnOff: { on: false } };
    }

    return;
  }

  // Nếu excution là object
  if (type == DEVICE_TYPE.SWITCH) {
    return { OnOff: execution.params };
  }

  if (type == DEVICE_TYPE.VIRTUAL) {
    return { OnOff: execution.params };
  }

  if (type == DEVICE_TYPE.LIGHT) {
    if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
      // Device RGB or RGBW
      if (execution.command == DEVICE_TRAIT.OnOff) {
        return {
          OnOff: { on: execution.params.on },
          ColorSpectrum: { name: 'rgb', colorSpectrum: execution.params.on ? 'ff:ff:ff' : '00:00:00' },
          selectOnOff: true
        };
      }

      return {
        OnOff: { on: true },
        ColorSpectrum: { name: 'rgb', colorSpectrum: execution.params.colorSpectrum }
      };
    }

    // Device Dimmer
    if (execution.command == DEVICE_TRAIT.OnOff) {
      return {
        OnOff: { on: false },
        Brightness: { brightness: 0 }
      };
    }

    return {
      OnOff: { on: true },
      Brightness: execution.params
    };
  }

  if (type == DEVICE_TYPE.FAN) {
    if (execution.command == DEVICE_TRAIT.OnOff) {
      return {
        OnOff: { on: false },
        Speed: { speed: 0 }
      };
    }

    return {
      OnOff: { on: true },
      Speed: execution.params
    };
  }

  if (type == DEVICE_TYPE.CURTAIN) {
    if (execution.command == DEVICE_TRAIT.StartStop) {
      return {
        StartStop: execution.params,
        OpenClose: { open: false },
        Level: { level: 0 }
      };
    }

    if (execution.command == DEVICE_TRAIT.OpenClose) {
      return {
        StartStop: { start: true },
        OpenClose: execution.params,
        Level: { level: 0 }
      };
    }
    // Truong hop level
    return {
      StartStop: { start: true },
      OpenClose: { open: false },
      Level: execution.params
    };
  }

  if (type == DEVICE_TYPE.DAIKIN) {
    return {
      OnOff: { on: !!execution.params },
      TemperatureSetting: { temperatureSetting: MODE_DAIKIN[0].mode },
      Speed: { speed: SPEED_DAIKIN[0].speed },
      TemperatureControl: { temperatureControl: TEMP_DAIKIN.min }
    };
  }

  if (type == DEVICE_TYPE.DOORLOCK) {
    return { LockUnlock: execution.params };
  }

  if (type == DEVICE_TYPE.PEBBLE) {
    return { Act: execution.params };
  }

  if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.UNKNOW) {
    return { OnOff: { on: false } };
  }
};

export const getDefaultStatesDevice = (device) => {
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
      Level: { level: 0 }
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
};

/**
 * @param {object} device
 * @returns {array} title of device
 */
export const getArrayStatusDevice = (device) => {
  if (!device || !device.type) {
    return [];
  }
  const { type, traits } = device;

  if (type == DEVICE_TYPE.SWITCH || type == DEVICE_TYPE.LIGHT || type == DEVICE_TYPE.FAN || type == DEVICE_TYPE.VIRTUAL) {
    return [
      { title: langs.statusOn, execution: { command: DEVICE_TRAIT.OnOff, params: { on: true } } },
      { title: langs.statusOff, execution: { command: DEVICE_TRAIT.OnOff, params: { on: false } } }
    ];
  }

  if (type == DEVICE_TYPE.CURTAIN) {
    return [
      { title: langs.stopTitle, execution: { command: DEVICE_TRAIT.StartStop, params: { start: false } } },
      { title: langs.statusOpen, execution: { command: DEVICE_TRAIT.OpenClose, params: { open: true } } },
      { title: langs.statusClose, execution: { command: DEVICE_TRAIT.OpenClose, params: { open: false } } },
    ];
  }

  if (type == DEVICE_TYPE.CAMERA) {
    return [
      { title: langs.lineDetection, execution: { command: DEVICE_TRAIT.CameraEvent, params: { eventType: 1 } } },
      { title: langs.fieldDetection, execution: { command: DEVICE_TRAIT.CameraEvent, params: { eventType: 2 } } },
      { title: langs.sceneChangeDetection, execution: { command: DEVICE_TRAIT.CameraEvent, params: { eventType: 3 } } }
    ];
  }

  if (type == DEVICE_TYPE.IR) {
    return [];
  }

  if (type == DEVICE_TYPE.LMYALELOCK) {
    return [
      { title: langs.statusLock, execution: { command: DEVICE_TRAIT.LockUnlock, params: { act: 'locked' } } },
      { title: langs.statusUnlock, execution: { command: DEVICE_TRAIT.LockUnlock, params: { act: 'unlocked' } } }
    ];
  }

  if (type == DEVICE_TYPE.DOORLOCK) {
    return [
      { title: langs.statusLock, execution: { command: DEVICE_TRAIT.LockUnlock, params: { lock: true } } },
      { title: langs.statusUnlock, execution: { command: DEVICE_TRAIT.LockUnlock, params: { lock: false } } }
    ];
  }

  if (type == DEVICE_TYPE.DAIKIN) {
    return [];
  }

  if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.BATTERY) {
    const mainTrait = traits.find(t => t.is_main);
    if (!mainTrait)
      return [];
    try {
      if (mainTrait.name == DEVICE_TRAIT.Battery)
        return [];
      if (mainTrait.name == DEVICE_TRAIT.Luminance)
        return [];
      if (mainTrait.name == DEVICE_TRAIT.Humidity)
        return [];
      if (mainTrait.name == DEVICE_TRAIT.Temperature)
        return [];
      if (mainTrait.name == DEVICE_TRAIT.Power)
        return [];
      if (mainTrait.name == DEVICE_TRAIT.Voltage)
        return [];
      if (mainTrait.name == DEVICE_TRAIT.Ampe)
        return [];
      if (mainTrait.name == DEVICE_TRAIT.ContactSensor)
        return [
          { title: langs.doorOpen, execution: { command: DEVICE_TRAIT.ContactSensor, params: { csAlarm: true } } },
          { title: langs.doorClose, execution: { command: DEVICE_TRAIT.ContactSensor, params: { csAlarm: false } } }
        ];
      if (mainTrait.name == DEVICE_TRAIT.Pir)
        return [
          { title: langs.motionDetect, execution: { command: DEVICE_TRAIT.Pir, params: { pirAlarm: true } } },
          { title: langs.noMotion, execution: { command: DEVICE_TRAIT.Pir, params: { pirAlarm: false } } }
        ];
      if (mainTrait.name == DEVICE_TRAIT.COAlarm)
        return [
          { title: langs.hasGar, execution: { command: DEVICE_TRAIT.COAlarm, params: { coAlarm: true } } },
          { title: langs.normal, execution: { command: DEVICE_TRAIT.COAlarm, params: { coAlarm: false } } }
        ];
      if (mainTrait.name == DEVICE_TRAIT.SmokeAlarm)
        return [
          { title: langs.hasSmoke, execution: { command: DEVICE_TRAIT.SmokeAlarm, params: { smokeAlarm: true } } },
          { title: langs.normal, execution: { command: DEVICE_TRAIT.SmokeAlarm, params: { smokeAlarm: false } } }
        ];
      if (mainTrait.name == DEVICE_TRAIT.WaterAlarm)
        return [
          { title: langs.hasWatter, execution: { command: DEVICE_TRAIT.WaterAlarm, params: { waterAlarm: true } } },
          { title: langs.normal, execution: { command: DEVICE_TRAIT.WaterAlarm, params: { waterAlarm: false } } }
        ];
      if (mainTrait.name == DEVICE_TRAIT.GasAlarm)
        return [
          { title: langs.hasGar, execution: { command: DEVICE_TRAIT.GasAlarm, params: { gasAlarm: true } } },
          { title: langs.normal, execution: { command: DEVICE_TRAIT.GasAlarm, params: { gasAlarm: false } } }
        ];
      if (mainTrait.name == DEVICE_TRAIT.ShockAlarm)
        return isLumi ? [
          { title: langs.off, execution: { command: DEVICE_TRAIT.ShockAlarm, params: { shockAlarm: 0 } } },
          { title: langs.vibration, execution: { command: DEVICE_TRAIT.ShockAlarm, params: { shockAlarm: 1 } } },
          { title: langs.tilt, execution: { command: DEVICE_TRAIT.ShockAlarm, params: { shockAlarm: 2 } } },
          { title: langs.fall, execution: { command: DEVICE_TRAIT.ShockAlarm, params: { shockAlarm: 3 } } },
        ] : [
            { title: langs.statusOn, execution: { command: DEVICE_TRAIT.ShockAlarm, params: { shockAlarm: true } } },
            { title: langs.statusOff, execution: { command: DEVICE_TRAIT.ShockAlarm, params: { shockAlarm: false } } }
          ];
      if (mainTrait.name == DEVICE_TRAIT.HeatAlarm)
        return [
          { title: 'Overheat', execution: { command: DEVICE_TRAIT.HeatAlarm, params: { heatAlarm: 'Overheat' } } },
          { title: 'Underheat', execution: { command: DEVICE_TRAIT.HeatAlarm, params: { heatAlarm: 'Underheat' } } },
          { title: 'Normal', execution: { command: DEVICE_TRAIT.HeatAlarm, params: { heatAlarm: 'Normal' } } },
        ];
    } catch (error) {
      return [];
    }
  }

  if (type == DEVICE_TYPE.INPUT) {
    // xử lý riêng cho module input
    const { iconkey } = device;

    if (iconkey == 'ic-zw-water-alarm') {
      return [
        { title: langs.hasWatter, execution: { command: DEVICE_TRAIT.OnOff, params: { on: true } } },
        { title: langs.normal, execution: { command: DEVICE_TRAIT.OnOff, params: { on: false } } }
      ];
    }

    if (iconkey == 'ic-zw-smoke-alarm') {
      return [
        { title: langs.hasSmoke, execution: { command: DEVICE_TRAIT.OnOff, params: { on: true } } },
        { title: langs.normal, execution: { command: DEVICE_TRAIT.OnOff, params: { on: false } } }
      ];
    }

    if (iconkey == 'ic-zw-gas-alarm') {
      return [
        { title: langs.hasGar, execution: { command: DEVICE_TRAIT.OnOff, params: { on: true } } },
        { title: langs.normal, execution: { command: DEVICE_TRAIT.OnOff, params: { on: false } } }
      ];
    }

    if (iconkey == 'ic-zw-co-alarm') {
      return [
        { title: langs.hasGar, execution: { command: DEVICE_TRAIT.OnOff, params: { on: true } } },
        { title: langs.normal, execution: { command: DEVICE_TRAIT.OnOff, params: { on: false } } }
      ];
    }

    if (iconkey == 'ic-zw-security-door') {
      return [
        { title: langs.doorOpen, execution: { command: DEVICE_TRAIT.OnOff, params: { on: true } } },
        { title: langs.doorClose, execution: { command: DEVICE_TRAIT.OnOff, params: { on: false } } }
      ];
    }

    if (iconkey == 'ic-zw-sencer-motion') {
      return [
        { title: langs.motionDetect, execution: { command: DEVICE_TRAIT.OnOff, params: { on: true } } },
        { title: langs.noMotion, execution: { command: DEVICE_TRAIT.OnOff, params: { on: false } } }
      ];
    }

    return [
      { title: langs.statusOn, execution: { command: DEVICE_TRAIT.OnOff, params: { on: true } } },
      { title: langs.statusOff, execution: { command: DEVICE_TRAIT.OnOff, params: { on: false } } }
    ];
  }

  if (type == DEVICE_TYPE.PEBBLE) {
    return [
      { title: langs.pebbleStatus[0], execution: { command: DEVICE_TRAIT.Act, params: { act: 0 } } },
      { title: langs.pebbleStatus[1], execution: { command: DEVICE_TRAIT.Act, params: { act: 1 } } },
      { title: langs.pebbleStatus[2], execution: { command: DEVICE_TRAIT.Act, params: { act: 2 } } },
      { title: langs.pebbleStatus[3], execution: { command: DEVICE_TRAIT.Act, params: { act: 3 } } },
      { title: langs.pebbleStatus[4], execution: { command: DEVICE_TRAIT.Act, params: { act: 4 } } },
      { title: langs.pebbleStatus[5], execution: { command: DEVICE_TRAIT.Act, params: { act: 5 } } },
      { title: langs.pebbleStatus[6], execution: { command: DEVICE_TRAIT.Act, params: { act: 6 } } },
      { title: langs.pebbleStatus[7], execution: { command: DEVICE_TRAIT.Act, params: { act: 7 } } },
      { title: langs.pebbleStatus[8], execution: { command: DEVICE_TRAIT.Act, params: { act: 8 } } },
      { title: langs.pebbleStatus[9], execution: { command: DEVICE_TRAIT.Act, params: { act: 9 } } },
      { title: langs.pebbleStatus[10], execution: { command: DEVICE_TRAIT.Act, params: { act: 10 } } },
      { title: langs.pebbleStatus[11], execution: { command: DEVICE_TRAIT.Act, params: { act: 11 } } },
      { title: langs.pebbleStatus[12], execution: { command: DEVICE_TRAIT.Act, params: { act: 12 } } },

      { title: langs.pebbleStatus[15], execution: { command: DEVICE_TRAIT.Act, params: { act: 21 } } },
      { title: langs.pebbleStatus[16], execution: { command: DEVICE_TRAIT.Act, params: { act: 22 } } },
      { title: langs.pebbleStatus[17], execution: { command: DEVICE_TRAIT.Act, params: { act: 23 } } },
      { title: langs.pebbleStatus[18], execution: { command: DEVICE_TRAIT.Act, params: { act: 24 } } },
      { title: langs.pebbleStatus[19], execution: { command: DEVICE_TRAIT.Act, params: { act: 25 } } },
      { title: langs.pebbleStatus[20], execution: { command: DEVICE_TRAIT.Act, params: { act: 26 } } },
      { title: langs.pebbleStatus[21], execution: { command: DEVICE_TRAIT.Act, params: { act: 27 } } },
      { title: langs.pebbleStatus[22], execution: { command: DEVICE_TRAIT.Act, params: { act: 28 } } },
      { title: langs.pebbleStatus[23], execution: { command: DEVICE_TRAIT.Act, params: { act: 29 } } },
    ];
  }

  return [];
};

/**
 *
 * @param {*} device
 * @param {*} states
 * @returns {bool} true or false
 *  Hàm trả về trạng thái thiết bị được kích hoạt tích cực hay không
 *  trả về trạng thái:
 *  true: --> background thiết bị ở trạng thái sáng
 *  false: --> background thiết bị ở trạng thái tối
 */
export const getActiveStatusDevice = (device, states) => {
  if (!device) {
    return false;
  }

  if (!device.traits) {
    return false;
  }

  const { type, traits, execution } = device;

  if (type == DEVICE_TYPE.COOKER) {
    if (!!execution) {
      const powerTrait = execution.find(e => e.command == DEVICE_TRAIT.OnOff);
      if (!!powerTrait) {
        return execution.find(e => e.command == DEVICE_TRAIT.OnOff).params.on;
      }

      return false;
    }

    if (!!states && !!states[DEVICE_TRAIT.OnOff]) {
      return states[DEVICE_TRAIT.OnOff].on;
    }

    return false;
  }

  if (type == DEVICE_TYPE.LMYALELOCK) {
    if (!!states && !!states[DEVICE_TRAIT.LockUnlock]) {
      return states[DEVICE_TRAIT.LockUnlock].act === 'unlocked';
    }
  }

  if (type == DEVICE_TYPE.DAIKIN) {
    if (!!execution) {
      try {
        const powerTrait = execution.find(e => e.command == DEVICE_TRAIT.OnOff);
        if (!!powerTrait) {
          return execution.find(e => e.command == DEVICE_TRAIT.OnOff).params.on;
        }

        return false;
      } catch (error) {
        return false;
      }
    }

    if (!!states && !!states[DEVICE_TRAIT.OnOff] && states[DEVICE_TRAIT.OnOff].on == false) {
      return false;
    }

    if (!!states && !!states[DEVICE_TRAIT.OnOff] && states[DEVICE_TRAIT.OnOff].on == true) {
      return true;
    }

    if (!!states && !!states[DEVICE_TRAIT.TemperatureControl] && states[DEVICE_TRAIT.TemperatureControl].temperatureControl > 16) {
      return true;
    }

    return false;
  }

  if (type == DEVICE_TYPE.LIGHTV2 || (type === DEVICE_TYPE.LIGHT && traits.find(t => t.name === DEVICE_TRAIT.ColorSpectrum))) {
    if (!!execution) {
      try {
        return execution.command === DEVICE_TRAIT.OnOff ? execution.params.on : true;
      } catch (error) {
        return true;
      }
    }
  }

  if (!states) return false;

  const mainTrait = traits.find(t => t.is_main);

  if (type == DEVICE_TYPE.CAMERA) {
    try {
      if (!states)
        return false;
      return states[DEVICE_TRAIT.CameraEvent].eventType > 0;
    } catch (e) {
      return false;
    }
  }

  if (type == DEVICE_TYPE.CURTAIN) {
    let maxLevel = CURTAIN_MAX_LEVEL;
    if (!!device.traits.find(t => t.name == DEVICE_TRAIT.Level)) {
      maxLevel = device.traits.find(t => t.name == DEVICE_TRAIT.Level).max || maxLevel;
    }

    try {
      if (!states)
        return false;
      return parseInt(states[DEVICE_TRAIT.Level].level) < parseInt(maxLevel);
    } catch (e) {
      return false;
    }
  }

  if (!mainTrait)
    return false;

  return getActiveStateByTrait(mainTrait.name, states[mainTrait.name]);
};

/**
 *
 * @param {number | string} type
 * @returns {number} type of sensor
 * 1 --> sensor mutil state
 * 0 --> sensor 2 state
 */
export const getTypeOfSensor = (device) => {
  if (!device) return 0;
  const { type, traits } = device;
  if (type != DEVICE_TYPE.SENSOR && type != DEVICE_TYPE.BATTERY)
    return 1;
  if (traits.find(
    t => t.name == DEVICE_TRAIT.Pir
      || t.name == DEVICE_TRAIT.ContactSensor
      || t.name == DEVICE_TRAIT.WaterAlarm
      || t.name == DEVICE_TRAIT.SmokeAlarm
      || t.name == DEVICE_TRAIT.COAlarm
      || t.name == DEVICE_TRAIT.ShockAlarm
      || t.name == DEVICE_TRAIT.HeatAlarm
  ))
    return 0;
  return 1;
};

export const checkDeviceCanOnOffEngineerMode = (device) => {
  if (!device) return false;
  const { type, traits } = device;

  switch (type) {
    case DEVICE_TYPE.LIGHT:
    case DEVICE_TYPE.SWITCH:
    case DEVICE_TYPE.CURTAIN:
    case DEVICE_TYPE.DOORLOCK:
    case DEVICE_TYPE.FAN:
      return true;
    default:
      return false;
  }
};

/**
 *
 * @param {number | string} type
 * @returns {component} device component
 */
export const getComponentDevice = (device) => {
  // if (!device) return <View />;
  const { type, traits } = device;
  switch (type) {
    case DEVICE_TYPE.SWITCH:
      return require('../components/Devices/Control/DeviceOnOff').default;
    case DEVICE_TYPE.LIGHT:
      if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
        return require('../components/Devices/Control/DeviceRGB').default;
      }
      return require('../components/Devices/Control/DeviceDimmer').default;
    case DEVICE_TYPE.LIGHTV2:
      if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
        return require('../components/Devices/Control/DeviceRGBWW').default;
      }
      return require('../components/Devices/Control/DeviceWW').default;
    case DEVICE_TYPE.CURTAIN:
      return require('../components/Devices/Control/DeviceCurtain').default;
    case DEVICE_TYPE.FAN:
      return require('../components/Devices/Control/DeviceFan').default;
    // case DEVICE_TYPE.IR:
    //   return require('../components/Device/DeviceIr').default;
    case DEVICE_TYPE.DOORLOCK:
      return require('../components/Devices/Control/DeviceDoorLock').default;
    case DEVICE_TYPE.VIRTUAL:
      return require('../components/Devices/Control/DeviceVirtual').default;
    case DEVICE_TYPE.LMYALELOCK:
      return require('../components/Devices/Control/DeviceYaleLock').default;
    case DEVICE_TYPE.CAMERA:
      return require('../components/Devices/Control/DeviceCamera').default;
    case DEVICE_TYPE.DAIKIN:
      return require('../components/Devices/Control/DeviceDaikin').default;
    case DEVICE_TYPE.COOKER:
      return require('../components/Devices/Control/DeviceCooker').default;
    case DEVICE_TYPE.SENSOR:
      return require('../components/Devices/Control/DeviceSensor').default;
    case DEVICE_TYPE.SPEAKER:
      return require('../components/Devices/Control/DeviceSpeaker').default;
    case DEVICE_TYPE.IR:
    case DEVICE_TYPE.IRV2:
      return require('../components/Devices/Control/DeviceIR').default;
    case DEVICE_TYPE.INPUT:
      return require('../components/Devices/Control/DeviceInput').default;
    case DEVICE_TYPE.PEBBLE:
    case DEVICE_TYPE.BATTERY:
      return require('../components/Devices/Control/DeviceSensor').default;
    case DEVICE_TYPE.MILO:
      return require('../components/Devices/Control/DeviceMilo').default;
    default:
      return require('../components/Devices/Control/DeviceUnknow').default;
  }
};

/**
 * device status component
 * @param {number | string} type
 * @returns {component} device component
 */
export const getComponentStatusDevice = (device) => {
  if (!device) return <View />;

  const { type, traits } = device;
  if (!type) return <View />;

  switch (type) {
    case DEVICE_TYPE.SWITCH:
      return require('../components/Devices/Select/SelectSwitchOnOff').default;
    case DEVICE_TYPE.LIGHT:
      if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
        return require('../components/Devices/Select/SelectRGB').default;
      }
      return require('../components/Devices/ComponentDevice/Dimmer').default;
    case DEVICE_TYPE.LIGHTV2:
      if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
        return require('../components/Devices/Select/SelectRGBWW').default;
      }
      return require('../components/Devices/Select/SelectWW').default;
    case DEVICE_TYPE.CURTAIN:
      return require('../components/Devices/Select/SelectCurtain').default;
    case DEVICE_TYPE.FAN:
      return require('../components/Devices/ComponentDevice/Fan').default;
    // case DEVICE_TYPE.IR:
    //   return require('../components/Device/DeviceOnOff').default;
    // case DEVICE_TYPE.RGBW:
    //   return require('../components/Device/selectDevice/SelectRGBW').default;
    case DEVICE_TYPE.LMYALELOCK:
    case DEVICE_TYPE.DOORLOCK:
      return require('../components/Devices/Select/SelectSensor2State').default;
    case DEVICE_TYPE.SPEAKER:
      return require('../components/Devices/Select/DeviceSpeaker').default;
    case DEVICE_TYPE.CAMERA:
      return require('../components/Devices/Select/SelectCamera').default;
    case DEVICE_TYPE.DAIKIN:
      return require('../components/Devices/Select/SelectIrDaikin').default;
    case DEVICE_TYPE.INPUT:
      return require('../components/Devices/Select/SelectSensor2State').default;
    case DEVICE_TYPE.VIRTUAL:
      return require('../components/Devices/Select/SelectVirtualDevice').default;
    case DEVICE_TYPE.SENSOR:
    case DEVICE_TYPE.BATTERY: {
      const mainTrait = traits.find(t => t.is_main);
      if (!mainTrait) {
        return require('../components/Devices/Select/SelectSensor2State').default;
      }
      if (
        mainTrait.name == DEVICE_TRAIT.Battery
        || mainTrait.name == DEVICE_TRAIT.Luminance
        || mainTrait.name == DEVICE_TRAIT.Humidity
        || mainTrait.name == DEVICE_TRAIT.Temperature
        || mainTrait.name == DEVICE_TRAIT.Power
        || mainTrait.name == DEVICE_TRAIT.Voltage
        || mainTrait.name == DEVICE_TRAIT.Ampe
      )
        return require('../components/Devices/Select/SelectSensorMutiState').default;
      return require('../components/Devices/Select/SelectSensor2State').default;
    }
    case DEVICE_TYPE.PEBBLE:
      return require('../components/Devices/Select/SelectPebble').default;
    default:
      return require('../components/Devices/Select/SelectUnknow').default;
  }
};

export const getColorFromLevel = (level) => {
  if (!level) {
    return '#000000';
  }

  const array = level.split(':');
  if (array[0] == 'NaN') array[0] = '00';
  if (array[1] == 'NaN') array[1] = '00';
  if (array[2] == 'NaN') array[2] = '00';

  return `#${array[0] == '0' ? '00' : array[0]}${array[1] == '0' ? '00' : array[1]}${array[2] == '0' ? '00' : array[2]}`;
};

/**
 *
 * @param {String} color // #FFFF00
 * @returns {String} level // '00:00:00'
 */
export const getLevelFromColor = (colorValue) => {
  const color = colorValue;
  if (!color) {
    return '00:00:00';
  }

  return `${color[1]}${color[2]}:${color[3]}${color[4]}:${color[5]}${color[6]}`;
};

export const getNumberOffSpeed = (device) => {
  const { type, traits } = device;
  if (type == DEVICE_TYPE.FAN) {
    return traits.find(t => t.name == DEVICE_TRAIT.Speed).max + 1;
  }

  return 3;
};

/**
 *
 * @param {object} device
 * @returns {cond: number, enableCondition: bool}
 */
export const getEnableCondition = (device) => {
  const { type, traits, execution } = device;

  if (execution && execution.command == DEVICE_TRAIT.OnOff && !execution.params.on) {
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
  }

  if (type == DEVICE_TYPE.SWITCH) {
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
  }

  if (type == DEVICE_TYPE.VIRTUAL) {
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
  }

  if (type == DEVICE_TYPE.LIGHT) {
    if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum))
      return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: true };
  }

  if (type == DEVICE_TYPE.FAN) {
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: true };
  }

  if (type == DEVICE_TYPE.CURTAIN) {
    if (execution && (execution.command == DEVICE_TRAIT.OpenClose || execution.command == DEVICE_TRAIT.StartStop)) {
      return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
    }

    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: true };
  }

  if (type == DEVICE_TYPE.CAMERA) {
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
  }

  // if (type == DEVICE_TYPE.IR) {
  //   return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false }
  // }

  if (type == DEVICE_TYPE.DOORLOCK || type == DEVICE_TYPE.LMYALELOCK) {
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
  }

  if (type == DEVICE_TYPE.DAIKIN) {
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
  }

  if (type == DEVICE_TYPE.SENSOR || type == DEVICE_TYPE.BATTERY) {
    const mainTrait = traits.find(t => t.is_main);
    if (!mainTrait) {
      return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
    }
    if (
      mainTrait.name == DEVICE_TRAIT.Battery
      || mainTrait.name == DEVICE_TRAIT.Luminance
      || mainTrait.name == DEVICE_TRAIT.Humidity
      || mainTrait.name == DEVICE_TRAIT.Temperature
      || mainTrait.name == DEVICE_TRAIT.Power
      || mainTrait.name == DEVICE_TRAIT.Voltage
      || mainTrait.name == DEVICE_TRAIT.Ampe
    )
      return { cond: CONDITION_DEVICE.EQUAL, enableCondition: true };
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
  }

  if (type == DEVICE_TYPE.PEBBLE) {
    return { cond: CONDITION_DEVICE.EQUAL, enableCondition: false };
  }

  return { cond: CONDITION_DEVICE.EQUAL, enableCondition: true };
};

// lấy state device input cho rule
export const getStatesInputForRule = (device) => {
  const { type, traits, states } = device;

  try {
    switch (type) {
      case DEVICE_TYPE.SWITCH:
      case DEVICE_TYPE.BATTERY:
      case DEVICE_TYPE.PEBBLE:
      case DEVICE_TYPE.SENSOR:
      case DEVICE_TYPE.DAIKIN:
      case DEVICE_TYPE.UNKNOW:
        return states;
      case DEVICE_TYPE.CURTAIN:
        return { Level: states[DEVICE_TRAIT.Level] };
      case DEVICE_TYPE.LIGHT:
        if (traits.find(t => t.name == DEVICE_TRAIT.ColorSpectrum)) {
          return { ColorSpectrum: states[DEVICE_TRAIT.ColorSpectrum] };
        }

        return { Brightness: states[DEVICE_TRAIT.Brightness] };
      case DEVICE_TYPE.FAN:
        return { Speed: states[DEVICE_TRAIT.Speed] };
      default:
        return states;
    }
  } catch (e) {
    return states;
  }
};

/**
 *
 * @param {*} device
 * @returns {String} name of device
 */
export const getDeviceName = (device) => {
  const { name, devid, brigde_key, type, macdev } = device;
  if (name) {
    return name;
  }

  try {
    if (brigde_key && brigde_key == 'zwave') {
      const arrayNameDevice = String(devid).split('-');
      if (type == DEVICE_TYPE.IR && !!device.remoteid) {
        return String(device.remoteid).slice(-6);
      }

      const lengthArrayName = arrayNameDevice.length;

      return `${arrayNameDevice[lengthArrayName - 3].slice(-4)}-${arrayNameDevice[lengthArrayName - 2]}-${arrayNameDevice[lengthArrayName - 1]}`;
    }

    if (brigde_key && brigde_key == 'zigbee' && !!macdev) {
      return String(macdev).slice(-4);
    }

    if (type == DEVICE_TYPE.IR && !!device.remoteid) {
      return String(device.remoteid).slice(-6);
    }

    if (type == DEVICE_TYPE.SPEAKER && !!device.mac) {
      return String(device.mac);
    }

    return String(devid).slice(-6);
  } catch (e) {
    return ` `;
  }
};

export const ICON_SCENE = {
  '-1': {
    icon: 'ic-scene-default',
    name: () => {
      return langs.namecanh1;
    }
  },
  0: {
    icon: 'ic-scene-afternoon',
    name: () => {
      return langs.namecanh2;
    }
  },
  1: {
    icon: 'ic-scene-clock',
    name: () => {
      return langs.namecanh3;
    }
  },
  2: {
    icon: 'ic-scene-go-home',
    name: () => {
      return langs.namecanh4;
    }
  },
  3: {
    icon: 'ic-scene-go-out',
    name: () => {
      return langs.namecanh5;
    }
  },
  4: {
    icon: 'ic-scene-home',
    name: () => {
      return langs.namecanh6;
    }
  },
  5: {
    icon: 'ic-scene-morning',
    name: () => {
      return langs.namecanh7;
    }
  },
  6: {
    icon: 'ic-scene-good-night',
    name: () => {
      return langs.namecanh8;
    }
  },
  7: {
    icon: 'ic-scene-noon',
    name: () => {
      return langs.namecanh9;
    }
  },
  8: {
    icon: 'ic-scene-security',
    name: () => {
      return langs.namecanh10;
    }
  },
  9: {
    icon: 'ic-scene-safe',
    name: () => {
      return langs.namecanh11;
    }
  },
  10: {
    icon: 'ic-scene-sleep',
    name: () => {
      return langs.namecanh12;
    }
  },
  11: {
    icon: 'ic-scene-travel',
    name: () => {
      return langs.namecanh13;
    }
  },
  12: {
    icon: 'ic-scene-warning',
    name: () => {
      return langs.namecanh14;
    }
  },
  13: {
    icon: 'ic-scene-movie',
    name: () => {
      return langs.namecanh15;
    }
  },
  14: {
    icon: 'ic-scene-welcome',
    name: () => {
      return langs.namecanh16;
    }
  },
  15: {
    icon: 'ic-scene-worktrip',
    name: () => {
      return langs.namecanh17;
    }
  }
};

export const getIconScene = (name) => {
  if (!name || ICON_SCENE[name] == undefined) {
    return ICON_SCENE['-1'];
  }
  return ICON_SCENE[name];
};

export const IR_ID_TV = {
  tv_power: 'tv_power',
  tv_input: 'tv_input',
  tv_vol_up: 'tv_vol_up',
  tv_vol_dow: 'tv_vol_dow',
  tv_channel_up: 'tv_channel_up',
  tv_channel_dow: 'tv_channel_dow',
  tv_menu_up: 'tv_menu_up',
  tv_menu_down: 'tv_menu_down',
  tv_menu_left: 'tv_menu_left',
  tv_menu_right: 'tv_menu_right',
  tv_menu_ok: 'tv_menu_ok',
  tv_ch1: 'tv_ch1',
  tv_ch2: 'tv_ch2',
  tv_ch3: 'tv_ch3',
  tv_ch4: 'tv_ch4',
  tv_ch5: 'tv_ch5',
  tv_ch6: 'tv_ch6',
  tv_ch7: 'tv_ch7',
  tv_ch8: 'tv_ch8',
  tv_ch9: 'tv_ch9',
  tv_ch0: 'tv_ch0',
  tv_menu: 'tv_menu',
  tv_edit: 'tv_edit',
  tv_list: 'tv_list',
  tv_info: 'tv_info',
  tv_mute: 'tv_mute',
  tv_smart_hub: 'tv_smart_hub',
  tv_enter: 'tv_enter'
};

export const IR_ID_FAN = {
  fan_onOff: 'fan_onOff',
  fan_timer: 'fan_timer',
  fan_swing: 'fan_swing',
  fan_auto: 'fan_auto',
  fan_speed: 'fan_speed'
};

export const IR_ID_AIR = {
  air_on: 'air_on',
  air_off: 'air_off',
  air_btn1: 'air_btn1',
  air_btn2: 'air_btn2',
  air_btn3: 'air_btn3',
  air_btn4: 'air_btn4',
  air_btn5: 'air_btn5',
  air_btn6: 'air_btn6'
};

export const irGetIconAndNameAir = (irId) => {
  switch (irId) {
    case IR_ID_AIR.air_on:
      return { icon: 'icon-ir-tv-volume-up', name: 'On', displayName: langs.irOn };
    case IR_ID_AIR.air_off:
      return { icon: 'icon-ir-tv-volume-up', name: 'Off', displayName: langs.irOff };
    default:
      return { icon: 'icon-ir-tv-volume-up', name: 'Add', displayName: langs.irOff };
  }
};

export const irGetIconAndNameFan = (irId) => {
  switch (irId) {
    case IR_ID_FAN.fan_onOff:
      return { icon: 'icon-ir-fan-power', name: 'On/Off', displayName: langs.irOnOff };
    case IR_ID_FAN.fan_auto:
      return { icon: 'icon-ir-fan-auto', name: 'Auto', displayName: langs.irAuto };
    case IR_ID_FAN.fan_speed:
      return { icon: 'icon-ir-fan-speed', name: 'Speed', displayName: langs.irSpeed };
    case IR_ID_FAN.fan_swing:
      return { icon: 'icon-ir-fan-swing', name: 'Swing', displayName: langs.irSwing };
    case IR_ID_FAN.fan_timer:
      return { icon: 'icon-ir-fan-timer-off', name: 'Timer', displayName: langs.irTimer };
    default:
      return { icon: 'icon-ir-fan-power', name: 'On/Off', displayName: langs.irOnOff };
  }
};

export const irGetIconAndNameTV = (irId) => {
  switch (irId) {
    case IR_ID_TV.tv_ch0:
      return { icon: 'icon-ir-tv-0', name: '', displayName: langs.irChannel0 };
    case IR_ID_TV.tv_ch1:
      return { icon: 'icon-ir-tv-1', name: '', displayName: langs.irChannel1 };
    case IR_ID_TV.tv_ch2:
      return { icon: 'icon-ir-tv-2', name: '', displayName: langs.irChannel2 };
    case IR_ID_TV.tv_ch3:
      return { icon: 'icon-ir-tv-3', name: '', displayName: langs.irChannel3 };
    case IR_ID_TV.tv_ch4:
      return { icon: 'icon-ir-tv-4', name: '', displayName: langs.irChannel4 };
    case IR_ID_TV.tv_ch5:
      return { icon: 'icon-ir-tv-5', name: '', displayName: langs.irChannel5 };
    case IR_ID_TV.tv_ch6:
      return { icon: 'icon-ir-tv-6', name: '', displayName: langs.irChannel6 };
    case IR_ID_TV.tv_ch7:
      return { icon: 'icon-ir-tv-7', name: '', displayName: langs.irChannel7 };
    case IR_ID_TV.tv_ch8:
      return { icon: 'icon-ir-tv-8', name: '', displayName: langs.irChannel8 };
    case IR_ID_TV.tv_ch9:
      return { icon: 'icon-ir-tv-9', name: '', displayName: langs.irChannel9 };
    case IR_ID_TV.tv_channel_dow:
      return { icon: 'icon-ir-tv-channel-down', name: '', displayName: langs.irChannelDown };
    case IR_ID_TV.tv_channel_up:
      return { icon: 'icon-ir-tv-channel-up', name: '', displayName: langs.irChannelUp };
    case IR_ID_TV.tv_edit:
      return { icon: 'icon-ir-tv-exit', name: '', displayName: langs.irExit };
    case IR_ID_TV.tv_info:
      return { icon: 'icon-ir-tv-info', name: '', displayName: langs.irInfo };
    case IR_ID_TV.tv_input:
      return { icon: 'icon-ir-tv-input', name: '', displayName: langs.irInput };
    case IR_ID_TV.tv_list:
      return { icon: 'icon-ir-tv-list', name: '', displayName: langs.irList };
    case IR_ID_TV.tv_menu:
      return { icon: 'icon-ir-tv-menu-01', name: '', displayName: langs.irMenu };
    case IR_ID_TV.tv_menu_down:
      return { icon: 'icon-ir-tv-arrow-down', name: '', displayName: langs.irMenuDown };
    case IR_ID_TV.tv_menu_left:
      return { icon: 'icon-ir-arrow-left-01', name: '', displayName: langs.irMenuLeft };
    case IR_ID_TV.tv_menu_ok:
      return { icon: 'icon-ir-tv-ok', name: '', displayName: langs.irMenuOK };
    case IR_ID_TV.tv_menu_right:
      return { icon: 'icon-ir-tv-arrow-right', name: '', displayName: langs.irMenuRight };
    case IR_ID_TV.tv_menu_up:
      return { icon: 'icon-ir-tv-arrow-up', name: '', displayName: langs.irMenuUp };
    case IR_ID_TV.tv_power:
      return { icon: 'icon-ir-tv-power', name: '', displayName: langs.irPower };
    case IR_ID_TV.tv_vol_dow:
      return { icon: 'icon-ir-tv-volume-down', name: '', displayName: langs.irVolDown };
    case IR_ID_TV.tv_vol_up:
      return { icon: 'icon-ir-tv-volume-up', name: '', displayName: langs.irVolumeUp };
    case IR_ID_TV.tv_mute:
      return { icon: 'icon-ir-tv-volume-off', name: '', displayName: langs.irMute };
    case IR_ID_TV.tv_smart_hub:
      return { icon: 'icon-ir-tv-smart-hub', name: '', displayName: langs.irSmartHub };
    case IR_ID_TV.tv_enter:
      return { icon: 'icon-ir-tv-return', name: '', displayName: langs.irEnter };
    default:
      return { icon: 'icon-ir-tv-0', name: '', displayName: langs.irChannel0 };
  }
};

export const IR_MODE = {
  auto: 'auto',
  heat: 'heat',
  dry: 'dry',
  cool: 'cool'
};

export const IR_FAN_MODE = {
  auto: 'AUTO',
  low: 'LOW',
  mid: 'MID',
  high: 'HIGH',
};

export const IR_SWING_MODE = {
  auto: 'AUTO',
  low: 'LOW',
  mid: 'MID',
  high: 'HIGH',
};

export const getActiveButtonIr = (buttonId, irCommands) => {
  if (!irCommands) return false;

  return !!irCommands.find(remote => remote.buttonId == buttonId);
};

export const IRV2_ID_TV = {
  power: 'power',
  source: 'source',
  volume_up: 'volume_up',
  volume_down: 'volume_down',
  channel_up: 'channel_up',
  channel_down: 'channel_down',
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  return: 'return',
  number_1: 'number_1',
  number_2: 'number_2',
  number_3: 'number_3',
  number_4: 'number_4',
  number_5: 'number_5',
  number_6: 'number_6',
  number_7: 'number_7',
  number_8: 'number_8',
  number_9: 'number_9',
  number_0: 'number_0',
  menu: 'menu',
  exit: 'exit',
  chn_list: 'chn_list',
  tv_radio: 'tv_radio',
  mute: 'mute',
  enter: 'enter'
};

export const IRV2_ID_STB = {
  back: 'back',
  channel_down: 'channel_down',
  channel_up: 'channel_up',
  delete: 'delete',
  down: 'down',
  enter: 'enter',
  exit: 'exit',
  home: 'home',
  info: 'info',
  left: 'left',
  menu: 'menu',
  mute: 'mute',
  number_0: 'number_0',
  number_1: 'number_1',
  number_2: 'number_2',
  number_3: 'number_3',
  number_4: 'number_4',
  number_5: 'number_5',
  number_6: 'number_6',
  number_7: 'number_7',
  number_8: 'number_8',
  number_9: 'number_9',
  page_down: 'page_down',
  page_up: 'page_up',
  power: 'power',
  right: 'right',
  up: 'up',
  volume_down: 'volume_down',
  volume_up: 'volume_up'
};

export const IRV2_ID_FAN = {
  auto: 'auto',
  on_off: 'on_off',
  speed: 'speed',
  swing: 'swing',
  timer: 'timer'
};

export const IRV2_ID_AIR = {
  on_off: 'on_off',
  temp_up: 'temp_up',
  temp_down: 'temp_down',
  mode: 'mode',
  fan: 'fan',
  swing: 'swing'
};

export const irv2GetIconAndNameSTB = (irId) => {
  switch (irId) {
    case IRV2_ID_STB.number_0:
      return { icon: 'icon-ir-tv-0', name: '', displayName: langs.irChannel0 };
    case IRV2_ID_STB.number_1:
      return { icon: 'icon-ir-tv-1', name: '', displayName: langs.irChannel1 };
    case IRV2_ID_STB.number_2:
      return { icon: 'icon-ir-tv-2', name: '', displayName: langs.irChannel2 };
    case IRV2_ID_STB.number_3:
      return { icon: 'icon-ir-tv-3', name: '', displayName: langs.irChannel3 };
    case IRV2_ID_STB.number_4:
      return { icon: 'icon-ir-tv-4', name: '', displayName: langs.irChannel4 };
    case IRV2_ID_STB.number_5:
      return { icon: 'icon-ir-tv-5', name: '', displayName: langs.irChannel5 };
    case IRV2_ID_STB.number_6:
      return { icon: 'icon-ir-tv-6', name: '', displayName: langs.irChannel6 };
    case IRV2_ID_STB.number_7:
      return { icon: 'icon-ir-tv-7', name: '', displayName: langs.irChannel7 };
    case IRV2_ID_STB.number_8:
      return { icon: 'icon-ir-tv-8', name: '', displayName: langs.irChannel8 };
    case IRV2_ID_STB.number_9:
      return { icon: 'icon-ir-tv-9', name: '', displayName: langs.irChannel9 };
    case IRV2_ID_STB.channel_down:
      return { icon: 'icon-ir-tv-channel-down', name: '', displayName: langs.irChannelDown };
    case IRV2_ID_STB.channel_up:
      return { icon: 'icon-ir-tv-channel-up', name: '', displayName: langs.irChannelUp };
    case IRV2_ID_STB.exit:
      return { icon: 'icon-ir-tv-exit', name: '', displayName: langs.irExit };
    case IRV2_ID_STB.info:
      return { icon: 'icon-ir-tv-info', name: '', displayName: langs.irInfo };
    case IRV2_ID_STB.menu:
      return { icon: 'icon-ir-tv-menu-01', name: '', displayName: langs.irMenu };
    case IRV2_ID_STB.down:
      return { icon: 'icon-ir-tv-arrow-down', name: '', displayName: langs.irMenuDown };
    case IRV2_ID_STB.left:
      return { icon: 'icon-ir-arrow-left-01', name: '', displayName: langs.irMenuLeft };
    case IRV2_ID_STB.enter:
      return { icon: 'icon-ir-tv-ok', name: '', displayName: langs.irMenuOK };
    case IRV2_ID_STB.right:
      return { icon: 'icon-ir-tv-arrow-right', name: '', displayName: langs.irMenuRight };
    case IRV2_ID_STB.up:
      return { icon: 'icon-ir-tv-arrow-up', name: '', displayName: langs.irMenuUp };
    case IRV2_ID_STB.power:
      return { icon: 'icon-ir-tv-power', name: '', displayName: langs.irPower };
    case IRV2_ID_STB.volume_down:
      return { icon: 'icon-ir-tv-volume-down', name: '', displayName: langs.irVolDown };
    case IRV2_ID_STB.volume_up:
      return { icon: 'icon-ir-tv-volume-up', name: '', displayName: langs.irVolumeUp };
    case IRV2_ID_STB.mute:
      return { icon: 'icon-ir-tv-volume-off', name: '', displayName: langs.irMute };
    case IRV2_ID_STB.home:
      return { icon: 'icon-ir-home', name: '', displayName: langs.irHome };
    case IRV2_ID_STB.back:
      return { icon: 'icon-ir-tv-return', name: '', displayName: langs.irBack };
    case IRV2_ID_STB.delete:
      return { icon: 'icon-ir-del', name: '', displayName: langs.irDelete };
    case IRV2_ID_STB.page_up:
      return { icon: 'icon-ir-tv-forward', name: '', displayName: langs.irPageUp };
    case IRV2_ID_STB.page_down:
      return { icon: 'icon-ir-tv-rewind', name: '', displayName: langs.irPageDown };
    default:
      return { icon: 'icon-ir-tv-0', name: '', displayName: langs.irChannel0 };
  }
};

export const irv2GetIconAndNameTV = (irId) => {
  switch (irId) {
    case IRV2_ID_TV.number_0:
      return { icon: 'icon-ir-tv-0', name: '', displayName: langs.irChannel0 };
    case IRV2_ID_TV.number_1:
      return { icon: 'icon-ir-tv-1', name: '', displayName: langs.irChannel1 };
    case IRV2_ID_TV.number_2:
      return { icon: 'icon-ir-tv-2', name: '', displayName: langs.irChannel2 };
    case IRV2_ID_TV.number_3:
      return { icon: 'icon-ir-tv-3', name: '', displayName: langs.irChannel3 };
    case IRV2_ID_TV.number_4:
      return { icon: 'icon-ir-tv-4', name: '', displayName: langs.irChannel4 };
    case IRV2_ID_TV.number_5:
      return { icon: 'icon-ir-tv-5', name: '', displayName: langs.irChannel5 };
    case IRV2_ID_TV.number_6:
      return { icon: 'icon-ir-tv-6', name: '', displayName: langs.irChannel6 };
    case IRV2_ID_TV.number_7:
      return { icon: 'icon-ir-tv-7', name: '', displayName: langs.irChannel7 };
    case IRV2_ID_TV.number_8:
      return { icon: 'icon-ir-tv-8', name: '', displayName: langs.irChannel8 };
    case IRV2_ID_TV.number_9:
      return { icon: 'icon-ir-tv-9', name: '', displayName: langs.irChannel9 };
    case IRV2_ID_TV.channel_down:
      return { icon: 'icon-ir-tv-channel-down', name: '', displayName: langs.irChannelDown };
    case IRV2_ID_TV.channel_up:
      return { icon: 'icon-ir-tv-channel-up', name: '', displayName: langs.irChannelUp };
    case IRV2_ID_TV.exit:
      return { icon: 'icon-ir-tv-exit', name: '', displayName: langs.irExit };
    case IRV2_ID_TV.tv_radio:
      return { icon: 'icon-ir-tv-info', name: '', displayName: langs.irInfo };
    case IRV2_ID_TV.source:
      return { icon: 'icon-ir-tv-input', name: '', displayName: langs.irInput };
    case IRV2_ID_TV.chn_list:
      return { icon: 'icon-ir-tv-list', name: '', displayName: langs.irList };
    case IRV2_ID_TV.menu:
      return { icon: 'icon-ir-tv-menu-01', name: '', displayName: langs.irMenu };
    case IRV2_ID_TV.down:
      return { icon: 'icon-ir-tv-arrow-down', name: '', displayName: langs.irMenuDown };
    case IRV2_ID_TV.left:
      return { icon: 'icon-ir-arrow-left-01', name: '', displayName: langs.irMenuLeft };
    case IRV2_ID_TV.enter:
      return { icon: 'icon-ir-tv-ok', name: '', displayName: langs.irMenuOK };
    case IRV2_ID_TV.right:
      return { icon: 'icon-ir-tv-arrow-right', name: '', displayName: langs.irMenuRight };
    case IRV2_ID_TV.up:
      return { icon: 'icon-ir-tv-arrow-up', name: '', displayName: langs.irMenuUp };
    case IRV2_ID_TV.power:
      return { icon: 'icon-ir-tv-power', name: '', displayName: langs.irPower };
    case IRV2_ID_TV.volume_down:
      return { icon: 'icon-ir-tv-volume-down', name: '', displayName: langs.irVolDown };
    case IRV2_ID_TV.volume_up:
      return { icon: 'icon-ir-tv-volume-up', name: '', displayName: langs.irVolumeUp };
    case IRV2_ID_TV.mute:
      return { icon: 'icon-ir-tv-volume-off', name: '', displayName: langs.irMute };
    case IRV2_ID_TV.return:
      return { icon: 'icon-ir-tv-return', name: '', displayName: langs.irEnter };
    default:
      return { icon: 'icon-ir-tv-0', name: '', displayName: langs.irChannel0 };
  }
};

export const irv2GetIconAndNameFan = (irId) => {
  switch (irId) {
    case IRV2_ID_FAN.on_off:
      return { icon: 'icon-ir-fan-power', name: 'On/Off', displayName: langs.irOnOff };
    case IRV2_ID_FAN.auto:
      return { icon: 'icon-ir-fan-auto', name: 'Auto', displayName: langs.irAuto };
    case IRV2_ID_FAN.speed:
      return { icon: 'icon-ir-fan-speed', name: 'Speed', displayName: langs.irSpeed };
    case IRV2_ID_FAN.swing:
      return { icon: 'icon-ir-fan-swing', name: 'Swing', displayName: langs.irSwing };
    case IRV2_ID_FAN.timer:
      return { icon: 'icon-ir-fan-timer-off', name: 'Timer', displayName: langs.irTimer };
    default:
      return { icon: 'icon-ir-fan-power', name: 'On/Off', displayName: langs.irOnOff };
  }
};

export const irv2GetIconAndNameAir = (irId) => {
  switch (irId) {
    case IRV2_ID_AIR.on_off:
      return { icon: 'icon-ir-tv-power', name: 'On/Off', displayName: 'On/Off' };
    case IRV2_ID_AIR.temp_up:
      return { icon: 'icon-ir-tv-volume-up', name: 'TempUp', displayName: '' };
    case IRV2_ID_AIR.temp_down:
      return { icon: 'icon-ir-tv-volume-down', name: 'TempDown', displayName: '' };
    case IRV2_ID_AIR.mode:
      return { icon: 'icon-ir-ac-cool', name: 'Off', displayName: 'Mode' };
    case IRV2_ID_AIR.fan:
      return { icon: 'icon-ir-fan-speed', name: 'Fan', displayName: 'Fan' };
    case IRV2_ID_AIR.swing:
      return { icon: 'icon-ir-fan-swing', name: 'Swing', displayName: 'Swing' };
    default:
      return { icon: 'icon-ir-tv-power', name: 'On/Off', displayName: 'On/Off' };
  }
};

// device_type, currentIrData, cmdData
export const getIrDataCommand = (device_type, currentIrData, cmdData) => {
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

// get ir ac data command
export const getIrAcDataCommand = (cmd_rule, _pow, _mod, _fa, _tem, _swi) => {
  try {
    const ruleCommand = cmd_rule.replace('$_pow', _pow)
      .replace('$_mod', _mod)
      .replace('$_fa', _fa)
      .replace('$_tem', _tem)
      .replace('$_swi', _swi);
    // eslint-disable-next-line no-eval
    const command = eval(ruleCommand);
    // const command = new Function(ruleCommand)
    console.log('command ir ac-->', _pow, _mod, _fa, _tem, _swi);
    console.log('command ir ac-->2', command);

    return command;
  } catch (error) {
    console.log('command ir ac-->error', error);
    return '';
  }
};

export const getStateSecurityDeviceSensor = (device) => {
  const { type, traits } = device;

  if (!type || !traits) return { OnOff: { on: true } };

  if (type == DEVICE_TYPE.SWITCH) {
    return { OnOff: { on: true } };
  }

  if (type == DEVICE_TYPE.FAN) {
    return { OnOff: { on: true } };
  }

  if (type == DEVICE_TYPE.LIGHT) {
    return { OnOff: { on: true } };
  }

  if (type == DEVICE_TYPE.DOORLOCK) {
    return { LockUnlock: { lock: false } };
  }

  if (type == DEVICE_TYPE.LMYALELOCK) {
    return { LockUnlock: { act: 'unlocked' } };
  }

  if (type == DEVICE_TYPE.CURTAIN) {
    return { OpenClose: { open: true } };
  }

  if (type == DEVICE_TYPE.SENSOR) {
    const mainTrait = traits.find(t => t.is_main);

    if (!mainTrait) return { OnOff: { on: false } };

    switch (mainTrait.name) {
      case DEVICE_TRAIT.ContactSensor:
        return { ContactAlarm: { csAlarm: true } };
      case DEVICE_TRAIT.Pir:
        return { PirAlarm: { pirAlarm: true } };
      case DEVICE_TRAIT.WaterAlarm:
        return { WaterAlarm: { waterAlarm: true } };
      case DEVICE_TRAIT.GasAlarm:
        return { GasAlarm: { gasAlarm: true } };
      case DEVICE_TRAIT.COAlarm:
        return { COAlarm: { coAlarm: true } };
      case DEVICE_TRAIT.SmokeAlarm:
        return { SmokeAlarm: { smokeAlarm: true } };
      case DEVICE_TRAIT.ShockAlarm:
        return { ShockAlarm: { shockAlarm: 0 } };
      default:
        return { OnOff: { on: true } };
    }
  }

  return { OnOff: { on: true } };
};

export const getContentDeviceSecuritySensor = (device) => {
  const { type, traits } = device;

  if (!type || !traits) return ` `;

  if (type == DEVICE_TYPE.SWITCH) {
    return langs.hadTurnOn;
  }

  if (type == DEVICE_TYPE.FAN) {
    return langs.hadTurnOn;
  }

  if (type == DEVICE_TYPE.LIGHT) {
    return langs.hadTurnOn;
  }

  if (type == DEVICE_TYPE.DOORLOCK) {
    return langs.hadUnlock;
  }

  if (type == DEVICE_TYPE.LMYALELOCK) {
    return langs.hadUnlock;
  }

  if (type == DEVICE_TYPE.CURTAIN) {
    return langs.hadOpen;
  }

  if (type == DEVICE_TYPE.SENSOR) {
    const mainTrait = traits.find(t => t.is_main);

    if (!mainTrait) return ` `;

    switch (mainTrait.name) {
      case DEVICE_TRAIT.ContactSensor:
        return langs.doorOpen;
      case DEVICE_TRAIT.Pir:
        return langs.motionDetect;
      case DEVICE_TRAIT.WaterAlarm:
        return langs.hasWatter;
      case DEVICE_TRAIT.GasAlarm:
        return langs.hasGar;
      case DEVICE_TRAIT.COAlarm:
        return langs.hasGar;
      case DEVICE_TRAIT.SmokeAlarm:
        return langs.hasSmoke;
      default:
        return ` `;
    }
  }

  return langs.hadTurnOn;
};

export const getMacHcFromHcs = (dev, hcs) => {
  try {
    if (dev.hc_id) {
      return hcs.find(hc => hc.hc_id === dev.hc_id).mac;
    }
    return dev.machc;
  } catch (error) {
    return dev.machc;
  }
};

export const getRGBHaveModeActive = (device) => {
  try {
    const { traits } = device;
    if (!!traits.find(t => t.name === DEVICE_TRAIT.ModeActive)) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getIconColorDeviceLighting = (device, states) => {
  try {
    const { deviceType, typeDevice, type } = device;
    if (!states) {
      return '#000000';
    }

    if (states[DEVICE_TRAIT.OnOff] && !states[DEVICE_TRAIT.OnOff].on) {
      return '#000000';
    }

    if (typeDevice === 'GROUP') {
      if (deviceType === DEVICE_TYPE.LIGHT) {
        return getColorFromLevel(states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum);
      }
      if (deviceType === DEVICE_TYPE.LIGHTV2) {
        if (states[DEVICE_TRAIT.ColorSpectrum] && getColorFromLevel(states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum) !== '#000000') {
          return getColorFromLevel(states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum);
        }

        if (states[DEVICE_TRAIT.ColdWarmColor] && states[DEVICE_TRAIT.ColdWarmColor].coldWarmColor !== undefined) {
          const tempKenvin = getTempFromColdWarmColor(255 - states[DEVICE_TRAIT.ColdWarmColor].coldWarmColor);
          const color = colorTemperatureToRGB(tempKenvin);
          return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
        }

        return '#000000';
      }
    } else {
      if (type === DEVICE_TYPE.LIGHT) {
        return getColorFromLevel(states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum);
      }
      if (type === DEVICE_TYPE.LIGHTV2) {
        if (states[DEVICE_TRAIT.ColorSpectrum] && getColorFromLevel(states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum) !== '#000000') {
          return getColorFromLevel(states[DEVICE_TRAIT.ColorSpectrum].colorSpectrum);
        }

        if (states[DEVICE_TRAIT.ColdWarmColor] && states[DEVICE_TRAIT.ColdWarmColor].coldWarmColor !== undefined) {
          const tempKenvin = getTempFromColdWarmColor(255 - states[DEVICE_TRAIT.ColdWarmColor].coldWarmColor);
          const color = colorTemperatureToRGB(tempKenvin);
          return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
        }

        return '#000000';
      }
    }
    return '#000000';
  } catch (error) {
    console.log('getIconColor::error', error);
    return '#000000';
  }
};

export const DeviceSupportCameraPreview = (device) => {
  try {
    const { type } = device;

    switch (type) {
      case DEVICE_TYPE.CURTAIN:
      case DEVICE_TYPE.SWITCH:
      case DEVICE_TYPE.LMYALELOCK:
        return true;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
};
