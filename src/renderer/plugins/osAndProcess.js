const os = require('os')
const child_process = require('child_process')
const electron = require('electron');
const fs = require('fs');
var https = require('https');

export default {
  isWindow,
  isProduction,
  runProcess,
  killProcess,
  killAllStreamProcess,
  downloadFile
}

function isWindow() {
  return os.platform() === 'win32'
}

function isProduction() {
  return !process.env.APP_DEV
}

function runProcess(command, args) {
  let newProcess = child_process.spawn(command, args, {
    encoding: 'utf8',
    shell: true,
    // detached: true
  });

  $process.push(newProcess)

  newProcess.on('error', (error) => {
    console.error('error', error);
  });

  newProcess.stdout.setEncoding('utf8');
  newProcess.stdout.on('data', (data) => {
    console.log(1, data);
  });

  newProcess.stderr.setEncoding('utf8');
  newProcess.stderr.on('data', (data) => {
    console.log('process_log', data);
    if (typeof callback === 'function')
      callback(data);
  });

  newProcess.on('close', (code) => {
    switch (code) {
      case 0:
        console.error('close-process', newProcess.pid, command);
        break;
    }
  });
  return newProcess
}

function killProcess(processID) {
  if (isWindow())
    child_process.exec('taskkill /pid ' + processID + ' /T /F')
  else
    process.kill(-processID);
}

function killAllStreamProcess(processID) {
  if (isWindow())
    child_process.exec('taskkill /IM "ffmpeg.exe" /F')
  else
    process.kill(-processID);
}

function downloadFile(url, name) {
  return new Promise((resolve, reject) => {
    electron.remote.dialog.showSaveDialog({
      title: 'Select the File Path to save',
      // defaultPath: path.join(__dirname, '../assets/sample.txt'),
      // defaultPath: path.join(__dirname, '../assets/'), 
      buttonLabel: 'Save',
      defaultPath: `~/${name}`,
      filters: [
        {
          name: 'image',
          extensions: ["jpg", "png", "jpeg"]
        },],
      properties: []
    }, (file) => {
      if (file) {
        let saveFile = fs.createWriteStream(file);
        https.get(url, function (response) {
          response.pipe(saveFile);
          resolve()
        });
      }
    })
  })
}