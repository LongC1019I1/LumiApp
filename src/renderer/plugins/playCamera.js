// import { dialog } from 'electron'
const app = require('electron')

const ffmpegStaticPath = require('ffmpeg-static').replace(
    'app.asar/dist/electron',
    'app.asar.unpacked/node_modules/ffmpeg-static'
).replace(
    'app.asar\\dist\\electron',
    'app.asar.unpacked\\node_modules\\ffmpeg-static'
);;

// console.log('ffmpeg.path2', ffmpegStaticPath)
// console.log('app.path', app.remote.app.getAppPath())
const path = require('path')

export { getStreamUrl, deleteFile }

function getStreamUrl(streamUrl, cameraName) {
    // run_script('mkdir', [ path.join(__dirname, '../../../static')])
    $os.runProcess('mkdir', ['-p', path.join(__dirname, '../../../static/streamCamera')])

    let staticPath = path.join(__dirname, '../../../static/streamCamera', cameraName)
    let streamOptions = [
        '-rtsp_transport tcp',
        '-i',
        streamUrl,
        // '-vf scale=-1:720',
        '-c libx264', // 264 encoder
        '-vsync 0',
        '-movflags +faststart', // create file soon
        '-preset:v ultrafast', // reduce cpu
        // '-tune zerolatency', // low lantency - more cpu
        // '-tune fastdecode ', // low lantency - more cpu
        '-crf 40', // bigger - lower quality - smaller cpu
        '-flags +cgop -g 10', // create file soon
        // '-b:v 1M',
        // '-minrate 0.5M -maxrate 4M -bufsize 2M',
        '-hls_time 1 -hls_list_size 3 -hls_flags delete_segments', // config segment time and number of files
        staticPath
    ]
    return $os.runProcess(ffmpegStaticPath, streamOptions)
}

function deleteFile(cameraName) {
    let staticPath = path.join(__dirname, '../../../static/streamCamera', cameraName)
    // console.log(staticPath);
    if ($os.isWindow())
        return $os.runProcess('del', ['/f', `${staticPath}*`])
    else
        return $os.runProcess('rm', [`${staticPath}*`])
}