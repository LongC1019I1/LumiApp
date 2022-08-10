export {
    DEVICE_TYPE,
    DEVICE_TRAIT,
    TYPE_PAYLOAD,
    CMD_KEY_FROM_HC,
    LIST_CONFIG_HOME,
    ROLE,
    USER_TYPE,
    CONDITION_DEVICE,
    // ir
    IR_TYPE, IRV2_ALL_TYPE,
    IR_SELECT,
    IR_ID_AIR,
    IR_ID_FAN,
    IR_ID_TV,
    IR_PREFIX_KEY,
    SPEAKER_CONFIG_CMD,
    PLAY_CONTROL,
    //irac
    MODE_IRV2_AC,
    SPEED_IRV2_AC,
    SWING_IRV2_AC,
    //fan
    IRV2_ID_FAN,
    IRV2_ID_TV,
    IRV2_ID_STB,
    IRV2_ID_AIR,
    //daikin
    SPEED_DAIKIN,
    SWING_DAIKIN,
    MODE_DAIKIN,
    TEMP_DAIKIN,

    CURTAIN_MAX_LEVEL,

    //group
    GROUP_TYPE,
    TYPE_DEVICE_GROUP_LIGHTING,
    ICON_LIGHTING,

    //rule
    TYPE_RULE,
    ICON_SCENE,
    RULE,

    listVideoQuality,
    listFramePerSecond,


    DEVICE_TYPE_CAN_CONTROLL_DEFAULT
}

const ROLE = {
    ADMIN: 1,
    USER: 0
}

const USER_TYPE = {
    USER: 0,
    GUEST: 1,
    SUPPORTER: 2
}
//variable
const DEVICE_TYPE = {
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

const DEVICE_TRAIT = {
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
//ir
const IRV2_ALL_TYPE = {
    IR_AC: 'IR_AC',
    IR_CAMERA: 'IR_CAMERA',
    IR_DVD: 'IR_DVD',
    IR_FAN: 'IR_FAN',
    IR_SPEAKER: 'IR_SPEAKER',
    IR_BOX: 'IR_BOX',
    IR_TV: 'IR_TV',
    IR_STB: 'IR_STB'
};

const IRV2_ID_FAN = {
    auto: 'auto',
    on_off: 'on_off',
    speed: 'speed',
    swing: 'swing',
    timer: 'timer'
};

const IR_ID_TV = {
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

const IRV2_ID_TV = {
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

const IRV2_ID_STB = {
    power: 'power',
    info: 'info',
    channel_down: 'channel_down',
    channel_up: 'channel_up',
    volume_down: 'volume_down',
    volume_up: 'volume_up',
    up: 'up',
    right: 'right',
    left: 'left',
    down: 'down',
    enter: 'enter',
    back: 'back',
    exit: 'exit',
    home: 'home',
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
    delete: 'delete',
};

const IRV2_ID_AIR = {
    on_off: 'on_off',
    temp_up: 'temp_up',
    temp_down: 'temp_down',
    mode: 'mode',
    fan: 'fan',
    swing: 'swing'
};

const IR_TYPE = {
    REMOTE_TV: '0',
    REMOTE_FAN: '1',
    REMOTE_AIR: '3',
    REMOTE_AMPLY1: '4',
    REMOTE_AMPLY2: '5'
};

const IR_SELECT = [

    {
        name: 'air-conditioner-controls',
        value: '3'
    },
    {
        name: 'control-tv',
        value: '0'
    },
    {
        name: 'control-swing',
        value: '1'
    }
]

const RULE = {
    active: 0,
    enable: 1,
    iconkey: "-1",
    in: {
        devices: []
    },
    name: "",
    out: {
        devices: [],
        groups: [],
        scenes: [],
        rules: []
    },
    owner_create: false,
    owner_update: false,
    roomid: null,
    rooms: [],
    ruleid: "",
    shortcut: 0,
    shortcut_by_user: {},
    time_update: {},
    type: 1
}


const IR_ID_FAN = {
    fan_onOff: 'fan_onOff',
    fan_timer: 'fan_timer',
    fan_swing: 'fan_swing',
    fan_auto: 'fan_auto',
    fan_speed: 'fan_speed'
};

const IR_ID_AIR = {
    air_on: 'air_on',
    air_off: 'air_off',
    air_btn1: 'air_btn1',
    air_btn2: 'air_btn2',
    air_btn3: 'air_btn3',
    air_btn4: 'air_btn4',
    air_btn5: 'air_btn5',
    air_btn6: 'air_btn6'
};

const IR_PREFIX_KEY = "__buttonId__"

const SPEAKER_CONFIG_CMD = {
    GET_PLAY_USB: 'getPlaylistUSB',
    PLAY_USB_DISK: 'playtheUSBDisk',
    PLAY_URL: 'playURL',
    GET_SPEAKER_INFO: 'getSpeakerInformation',
    SET_SLAVE_VOLUME: 'setSlaveVolume',
    SET_MASTER_VOLUME: 'setMasterVolume',
    SET_MATER_CHANNEL: 'setMasterChannel',
    SET_SLAVE_CHANNEL: 'setSlaveChannel',
    RENAME_SPEAKER: 'renameSpeaker',
    JOIN_TO_GROUP: 'joinToGroup',
    UNGROUP: 'unGroup',
    KICKOUT_SLAVE: 'kickoutSlave',
    TIME_SYNC: 'timeSync',
    GET_ALARM: 'getAlarm',
    SET_ALARM: 'alarmSet',
    STOP_ALARM: 'stopAlarm',
    GET_PLAYBACK_STATE: 'getPlaybackState'
};

const PLAY_CONTROL = {
    resume: 'resume',
    pause: 'pause',
    previous: 'previous',
    next: 'next',
    seek: 'seek',
    update: 'update'
};

//ir-ac
const MODE_IRV2_AC = [
    {mode: 0, name: 'Auto', icon: 'icon-ir-fan-auto'},
    {mode: 6, name: 'Fan', icon: 'ic-zw-fan'},
    {mode: 4, name: 'Heat', icon: 'ic-zw-luminace'},
    {mode: 3, name: 'Cool', icon: 'ic-zw-thermostat'},
    {mode: 2, name: 'Dry', icon: 'ic-zw-humidity'},
]

const SPEED_IRV2_AC = [
    {speed: 0, name: 'Off'},
    {speed: 3, name: 'Low'},
    {speed: 5, name: 'Mid'},
    {speed: 7, name: 'High'},
    {speed: 10, name: 'Auto'},
];

const SWING_IRV2_AC = [
    {swing: 0, name: 'No'},
    {swing: 1, name: 'Auto'},
];

//daikin
const SPEED_DAIKIN = [
    {speed: 0, name: 'Off'},
    {speed: 1, name: 'Low'},
    {speed: 2, name: 'Mid'},
    {speed: 3, name: 'High'},
    {speed: 4, name: 'Auto'},
];

const SWING_DAIKIN = [
    {swing: 0, name: 'P0'},
    {swing: 1, name: 'P1'},
    {swing: 2, name: 'P2'},
    {swing: 3, name: 'P3'},
    {swing: 4, name: 'P4'},
    {swing: 5, name: 'Stop'},
    {swing: 6, name: 'Auto'},
];

const MODE_DAIKIN = [
    {mode: 0, name: 'Auto', icon: 'icon-ir-fan-auto'},
    {mode: 1, name: 'Fan-only', icon: 'ic-zw-fan'},
    {mode: 2, name: 'Heat', icon: 'ic-zw-luminace'},
    {mode: 3, name: 'Cool', icon: 'ic-zw-thermostat'},
    {mode: 4, name: 'Dry', icon: 'ic-zw-humidity'},
    // { mode: 5, name: 'Off', icon: 'ic-zw-switch' },
];

const TEMP_DAIKIN = {
    min: 16,
    max: 32
};

const TYPE_PAYLOAD = {
    infohc: {name: 'infohc', compareKey: 'infohc'},
    versions: {name: 'versions', compareKey: 'versions'},
    serverversions: {name: 'serverversions', compareKey: 'serverversions'},
    floors: {name: 'floors', compareKey: 'floors'},
    rooms: {name: 'rooms', compareKey: 'rooms'},
    groups: {name: 'groups', compareKey: 'groups'},
    devices: {name: 'devices', compareKey: 'devid'},
    rules: {name: 'rules', compareKey: 'ruleid'},
    hcs: {name: 'hcs', compareKey: 'hcs'},
    remotes: {name: 'remotes', compareKey: 'remotes'},
    ircommands: {name: 'ircommands', compareKey: 'ircommands'},
    users: {name: 'users', compareKey: 'userid'},
    cameras: {name: 'cameras', compareKey: 'cameras'},
    restart: {name: 'restart', compareKey: 'restart'},
    reset: {name: 'reset', compareKey: 'reset'},
    left: {name: 'left', compareKey: 'left'},
    join: {name: 'join', compareKey: 'join'},
    msg: {name: 'msg', compareKey: 'msg'},
    connect: {name: 'connect', compareKey: 'connect'},
    homes: {name: 'homes', compareKey: 'homes'},
    reset_brigde: {name: 'reset_brigde', compareKey: 'reset_brigde'},
    devices_join: {name: 'devices_join', compareKey: 'devices_join'},
    devices_left: {name: 'devices_left', compareKey: 'devices_left'},
    devices_off: {name: 'devices_off', compareKey: 'devices_off'},
    devices_wakeup: {name: 'devices_wakeup', compareKey: 'devices_wakeup'},
    learn_mode: {name: 'learn_mode', compareKey: 'learn_mode'},
    hcs_connect: {name: 'hcs_connect', compareKey: 'hcs_connect'},
    advanced: {name: 'advanced', compareKey: 'advanced'}
};
const CMD_KEY_FROM_HC = {
    set: 'set',
    status: 'status',
    post: 'post',
    get: 'get',
    delete: 'delete',
    response: 'response',
    sync: 'sync'
};
const LIST_CONFIG_HOME = ['versions', 'users', 'hcs', 'floors', 'rooms', 'groups', 'rules', 'devices', 'cameras', 'remotes']
const ICON_SCENE = {
    '-1': {
        icon: 'ic-scene-default',
        name: 'namecanh1'
    },
    0: {
        icon: 'ic-scene-afternoon',
        name: 'namecanh2'
    },
    1: {
        icon: 'ic-scene-clock',
        name: 'namecanh3'
    },
    2: {
        icon: 'ic-scene-go-home',
        name: 'namecanh4'
    },
    3: {
        icon: 'ic-scene-go-out',
        name: 'namecanh5'
    },
    4: {
        icon: 'ic-scene-home',
        name: 'namecanh6'
    },
    5: {
        icon: 'ic-scene-morning',
        name: 'namecanh7'
    },
    6: {
        icon: 'ic-scene-good-night',
        name: 'namecanh8'
    },
    7: {
        icon: 'ic-scene-noon',
        name: 'namecanh9'
    },
    8: {
        icon: 'ic-scene-security',
        name: 'namecanh10'
    },
    9: {
        icon: 'ic-scene-safe',
        name: 'namecanh11'
    },
    10: {
        icon: 'ic-scene-sleep',
        name: 'namecanh12'
    },
    11: {
        icon: 'ic-scene-travel',
        name: 'namecanh13'
    },
    12: {
        icon: 'ic-scene-warning',
        name: 'namecanh14'
    },
    13: {
        icon: 'ic-scene-movie',
        name: 'namecanh15'
    },
    14: {
        icon: 'ic-scene-welcome',
        name: 'namecanh16'
    },
    15: {
        icon: 'ic-scene-worktrip',
        name: 'namecanh17'
    },
    16: {
        icon: 'icon_energy',
        name: 'namecanh18'
    },
    17: {
        icon: 'icon_work',
        name: 'namecanh19'
    },
    18: {
        icon: 'icon_dinner',
        name: 'namecanh20'
    },
    19: {
        icon: 'icon_reading_book',
        name: 'namecanh21'
    },
    20: {
        icon: 'icon_creation',
        name: 'namecanh22'
    },
};

const CURTAIN_MAX_LEVEL = 99;

const GROUP_TYPE = {
    normalGroup: 0,
    bindingGroup: 1,
    lightingGroup: 2
};

const TYPE_DEVICE_GROUP_LIGHTING = [
    'RGBWW',
    'RGB',
    'WW',
    'On/Off',
    'DIMMER',
];

const ICON_LIGHTING = [
    {
        id: 0,
        icon: 'ic-zw-light-bulb',
    },
    {
        id: 1,
        icon: 'ic-zw-drop-light',
    },
    {
        id: 2,
        icon: 'ic-zw-dimmer',
    },
    {
        id: 3,
        icon: 'lighting_wall_lamp',
    },
    {
        id: 4,
        icon: 'ic-zw-light-pole',
    },
    {
        id: 5,
        icon: 'lighting_desk',
    },
    {
        id: 6,
        icon: 'ic-zw-chandelier',
    },
    {
        id: 8,
        icon: 'lighting_droplight_1',
    },
    {
        id: 9,
        icon: 'ic-zw-wall-light',
    },
    {
        id: 10,
        icon: 'lighting_lamp_2',
    },
    {
        id: 11,
        icon: 'lighting_chandeliers_1',
    },
    {
        id: 12,
        icon: 'ic-zw-down-light',
    },
    {
        id: 14,
        icon: 'lighting_chandeliers_3',
    },
    {
        id: 15,
        icon: 'lighting_pole_1',
    },
    {
        id: 16,
        icon: 'lighting_pole_3',
    },
    {
        id: 17,
        icon: 'lighting_pole_2',
    },
    {
        id: 18,
        icon: 'lighting_led_3',
    },
    {
        id: 19,
        icon: 'lighting_chandeliers_2',
    },
    {
        id: 20,
        icon: 'lighting_droplight_2',
    },
    {
        id: 21,
        icon: 'lighting_tube',
    },
    {
        id: 22,
        icon: 'ic-zw-night-light',
    },
    {
        id: 23,
        icon: 'ic-zw-church-lamp',
    },
    {
        id: 24,
        icon: 'lighting_lamp_1',
    },
    {
        id: 25,
        icon: 'lighting_pole_model',
    },
    {
        id: 26,
        icon: 'lighting_pannel_rect',
    },
    {
        id: 27,
        icon: 'lighting_pannel_circle',
    },
    {
        id: 28,
        icon: 'lighting_overhead',
    },
    {
        id: 30,
        icon: 'lighting_track',
    },
    {
        id: 31,
        icon: 'lighting_led_2',
    },
    {
        id: 32,
        icon: 'lighting_led_1',
    },
    {
        id: 33,
        icon: 'lighting_led_rgb',
    },
    {
        id: 34,
        icon: 'lighting_led_cob',
    },
    {
        id: 35,
        icon: 'lighting_cob',
    },
];

const TYPE_RULE = {
    scene: 1,
    rule_nomal: 0,
    rule_security: 2,
    schedule: 3,
    scene_lighting: 6,
};

const CONDITION_DEVICE = [
    {
        name: 'EQUAL',
        value: 0,
        symbol: '=='
    },
    {
        name: 'NOT_EQUAL',
        value: 1,
        symbol: '!='
    },
    {
        name: 'LESS',
        value: 2,
        symbol: '<'
    },
    {
        name: 'LESS_OR_EQUAL',
        value: 3,
        symbol: '<='
    },
    {
        name: 'GREATER',
        value: 4,
        symbol: '>'
    },
    {
        name: 'GREATER_OR_EQUAL',
        value: 5,
        symbol: '>='
    }
]

const listVideoQuality = [
    {label: "Lowest", value: 1},
    {label: "Lower", value: 20},
    {label: "Low", value: 40},
    {label: "Medium", value: 60},
    {label: "Higher", value: 80},
    {label: "Highest", value: 100},
]

const listFramePerSecond = [
    {label: "1/16", value: 6},
    {label: "1/8", value: 12},
    {label: "1/4", value: 25},
    {label: "1/2", value: 50},
    {label: "1", value: 100},
    {label: "2", value: 200},
    {label: "4", value: 400},
    {label: "8", value: 800},
    {label: "10", value: 1000},
    {label: "12", value: 1200},
    {label: "15", value: 1500},
    {label: "16", value: 1600},
    {label: "18", value: 1800},
    {label: "20", value: 2000},
    {label: "22", value: 2200},
    {label: "25", value: 2500},
]

const DEVICE_TYPE_CAN_CONTROLL_DEFAULT = [DEVICE_TYPE.SWITCH, DEVICE_TYPE.FAN, DEVICE_TYPE.LIGHT, DEVICE_TYPE.CURTAIN, DEVICE_TYPE.DAIKIN]
