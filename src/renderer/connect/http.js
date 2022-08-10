import config from './config'
export { METHOD, httpCloud, httpHC, httpDefault, httpCloudNoAnimation, httpHCNoAnimation, httpDefaultNoAnimation }
import needle from 'needle'

let statusCodeNotAlert = [501, 599]

const METHOD = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    del: 'DELETE',
}

function httpDefault(method, uri,
    {
        body = null,
        headers = null,
        options
    } = {},
    {
        isLoading = true,
        isAlertError = true,
        reqid
    } = {}) {
    console.groupCollapsed('%c' + method, 'color:green', uri)
    console.log(body)
    console.groupEnd();
    if (isLoading)
        $dispatch($api.ContentManager.setPageLoading, reqid || true)
    return new Promise((resolve, rejects) => {
        needle(method, uri, body, {
            headers,
            open_timeout: 5000,
            ...options
        }).then(result => {
            console.groupCollapsed('%cresponse', 'color:blue', uri)
            console.log(result.body)
            console.groupEnd();
            if (!reqid)
                $dispatch($api.ContentManager.setPageLoading, false)
            resolve(result.body)
        }).catch(error => {
            console.groupCollapsed('%cresponse-error', 'color:red', uri)
            console.log(error)
            console.groupEnd();
            if (isAlertError)
                $alertify.error(error.message)
            $dispatch($api.ContentManager.setPageLoading, false)
            rejects(error)
        })
    })
}

function httpDefaultNoAnimation(method, uri, { body = null, headers = null, options } = {}) {
    return httpDefault(method, uri, { body, headers, options }, { isLoading: false })
}


function httpCloud(method, uri, { body = {}, headers = {}, options = {} } = {}, reqOption) {
    let serverLanguagle = 'vi-VN'
    let language = localStorage.getItem('lang')
    if (language == 'GB') serverLanguagle = 'en-US'
    if (language == 'VN') serverLanguagle = 'vi-VN'
    let token = {}
    let access_token = sessionStorage.getItem('access_token')
    if (access_token) token.Authorization = `Bearer ${access_token}`
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Lumi-Language": serverLanguagle,
        "X-Lumi-Api-Key": config.API_KEY_WEB,
        ...token,
        ...headers
    }
    options = {
        json: true,
        open_timeout: 10000,
        ...options
    }
    return new Promise((resolve, reject) => {
        httpDefault(method, uri, { body, headers, options }, reqOption)
            .then(result => {
                if (!result.success) {
                    if (result.errorName === "Unauthorized") {
                        sessionStorage.removeItem('access_token')
                        localStorage.removeItem('refresh_token')
                        location.reload()
                    }
                    if (statusCodeNotAlert.includes(result.statusCode)) {
                        resolve(result)
                    } else {
                        $alertify.error(result.message)
                        reject(result)
                    }
                }
                if (reqOption&&reqOption.reqid) {
                    $apiStack[reqOption.reqid] = resolve
                    setTimeout(() => {
                        if ($apiStack[reqOption.reqid]) {
                            reject('not receive socket')
                            delete $apiStack[reqOption.reqid]
                        }
                    }, 30000)
                }
                else
                    resolve(result)

            }).catch(reject)
    })
}

function httpCloudNoAnimation(method, uri, { body = {}, headers = {}, options = {} } = {}, reqOption = {}) {
    return httpCloud(method, uri, { body, headers, options }, { isLoading: false, ...reqOption })
}

function httpHC(method, uri, { body = {}, headers = {}, options = {} } = {}, reqOption) {
    options = {
        jinsecure: true,
        rejectUnauthorized: false,
        open_timeout: 2000,
        json: true,
        ...options
    }
    return httpDefault(method, uri, { body, headers, options }, reqOption)
}

function httpHCNoAnimation(method, uri, { body = {}, headers = {}, options = {} } = {}, reqOption = {}) {
    return httpHC(method, uri, { body, headers, options }, { isLoading: false, ...reqOption })
}