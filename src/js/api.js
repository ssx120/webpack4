const MODULE = {
    AUTH: process.env.VUE_APP_MODULE_AUTH,
    GMS: process.env.VUE_APP_MODULE_GMS
}

// API host
// const API_HOST = ( process.env.NODE_ENV === 'development' ) ? 
//                  ( process.env.VUE_APP_SIT_HOST ? process.env.VUE_APP_SIT_HOST : process.env.BASE_URL ) : 
//                  ( process.env.VUE_APP_API_HOST )

const API_HOST = process.env.NODE_ENV === 'development'? 'http://api.test': 'https://api2/'
const MODULE_AUTH = 'auth/oauth'
const MODULE_GMS = 'gms'
const VIDEO = process.env.NODE_ENV === 'development'? 'http://api.test': 'https://api2'

export default {
    admin: {
        login: API_HOST + MODULE_AUTH + '/token'
    },
    video: {
        getVideoVid: '',
        categories:'',
        videoList :'',
        getVideoPlayAuth:'',
        getVideoPlayInfo:''
    }

}