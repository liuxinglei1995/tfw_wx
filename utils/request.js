import store from '@/tm-vuetify/tool/store/tm-vuetify.js'
import config from '@/config'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { toast, showConfirm, tansParams } from '@/utils/common'

let timeout = 20000
const baseUrl = config.baseUrl

// 添加全局变量控制弹窗状态
let isLoginConfirmShowing = false

const request = config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    config.header = config.header || {}
    if (getToken() && !isToken) {
        config.header['Authorization'] = 'Bearer ' + getToken()
    }
    // get请求映射params参数
    if (config.params) {
        let url = config.url + '?' + tansParams(config.params)
        url = url.slice(0, -1)
        config.url = url
    }
    return new Promise((resolve, reject) => {
        uni.request({
                method: config.method || 'get',
                timeout: config.timeout || timeout,
                url: config.baseUrl || baseUrl + config.url,
                data: config.data,
                header: config.header,
                dataType: 'json'
            }).then(response => {
                let [error, res] = response
                if (error) {
                    toast('后端接口连接异常')
                    reject('后端接口连接异常')
                    return
                }
                const code = res.data.code || 200
                const msg = errorCode[code] || res.data.msg || errorCode['default']
                
                if (code === 401) {
                    // 如果已经在显示登录确认框，则不再重复显示
                    if (isLoginConfirmShowing) {
                        reject('无效的会话，或者会话已过期，请重新登录。')
                        return
                    }
                    
                    isLoginConfirmShowing = true
                    showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
                        isLoginConfirmShowing = false
                        store.dispatch('user/LogOut')
                        if (res.confirm) {
                            uni.navigateTo({
                                url: '/pagesUser/login/login'
                            })
                        }
                    }).catch(() => {
                        isLoginConfirmShowing = false
                    })
                    reject('无效的会话，或者会话已过期，请重新登录。')
                } else if (code === 500) {
                    toast(msg)
                    reject('500')
                } else if (code !== 200) {
                    toast(msg)
                    reject(code)
                }
                resolve(res.data)
            })
            .catch(error => {
                let { message } = error
                if (message === 'Network Error') {
                    message = '后端接口连接异常'
                } else if (message.includes('timeout')) {
                    message = '系统接口请求超时'
                } else if (message.includes('Request failed with status code')) {
                    message = '系统接口' + message.substr(message.length - 3) + '异常'
                }
                toast(message)
                reject(error)
            })
    })
}

export default request