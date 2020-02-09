import axios from 'axios'
import Qs from 'qs'

axios.defaults.headers['Content-Type'] = 'application/json'

/**
 * 记录错误的报错次数
 */
let countFail = 0

/**
 * 拦截客户端请求，预处理
 */
axios.interceptors.request.use(

    (config) => {

        let FORM = 'application/x-www-form-urlencoded'
        if (config.method == 'post' && config.headers['Content-Type'] == FORM) {

            config.data = Qs.stringify(config.data)

        } else {

            if (localStorage.getItem('access_token') != null) {
                config.headers.Authorization = localStorage.getItem('access_token')
            }
    
        }

        config.responseType = 'json'
        return config
    },

    (error) => {

        return Promise.reject(error)
    }
);

/**
 * 拦截服务器响应，预处理
 */
axios.interceptors.response.use(

    (response) => {

        if (response.status && response.status === 200 && response.statusText === 'OK') {
            return response.data
        }
        
        return response
    },

    (error) => {

        return Promise.reject(error).catch( fail => {

            let {status, data} = fail.response

            
            // let status = fail.response.status
            if (status === 401) {
                
                // 错误信息
                if (data && data.code == 1) {

                    window.location.replace('/')

                } else {

                    if( countFail == 0 ) {

                        alert('登录已过期，请重新登录')
                        window.location.replace('/')
                    }

                    countFail++
                }
            }

            if (status === 426) {
                alert('用户名或密码错误')
            }

            if (status === 403) {

                alert('权限不够，请联系管理员')
            }
        })
    }
);

export default axios