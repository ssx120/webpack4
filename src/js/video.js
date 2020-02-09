import '../css/style.css'
import '../css/video.css'
import axios from './axios.js'
import API from './api.js'
import {getRequest,getDataset} from "./utils.js"
$(document).ready(function() {

    getVidoeList()
    // 点击列表播放视频
    function playVideo(){
        $('.video-list-item').click(function(){
            $('.video-list-item').removeClass('play')
            this.classList.add("play");
            let videoId = getDataset(this).videoid
            getVideoPlayAuth(videoId)
        })
    }
  
    //获取视频列表
    function getVidoeList() {
        let data = {
            cateId : window.localStorage.getItem('cateid'),
            current : 1,
            size : 10
        }
        axios.get(API.video.videoList, {params : data}).then( response => {
            let res = response.status == 200?response.data:response
            let {code, data, msg} = res
                if (code === 0) {
                    let videoList = data.videoList
                    let str = ''
                    videoList.forEach(element => {
                        
                        str += `<li data-videoId='${element.videoId}' class='video-list-item'>
                                    <div class='video-cover'>
                                        <img src='${element.coverURL}' alt=''>
                                    </div>
                                    <h5>${element.title}</h5>
                                </li>`
                        
                    });

                    $('#video-wrap').html(str)

                    // 每点击播放第一个
                    getVideoPlayAuth(data.videoList[0].videoId)
                    $('.video-list-item')[0].classList.add("play");  

                    playVideo()

                }else{
                    alert(msg)
                    window.history.back(-1);
                    console.log(res)
                }
        })
    }

    // 获取播放凭证函数
    function getVideoPlayAuth( videoId ){
        let data = {
            videoId : videoId,
        }
        axios.get(API.video.getVideoPlayAuth, {params : data}).then( response => {
            $("#J_prismPlayer").remove();
            let res = response.status == 200?response.data:response
            video(res.VideoId,res.PlayAuth,res.CoverUrl)
        })
    }

    // 获取播放地址
    // function videoPlay(videoId){
    //     axios.get(API.video.getVideoPlayInfo+"?videoId="+videoId).then( res => {
    //         console.log(res)     
    //     })
    // }
    
    /** 
     * 设置视频
    */
   function video(videoId,PlayAuth,cover) { 
        $('#video-conter').prepend('<div class="prism-player" id="J_prismPlayer"></div>') 
        var player = new Aliplayer({
            "id": 'J_prismPlayer', //播放器外层容器的dom元素id。
            "width": '100%',
            "vid" : videoId, //媒体转码服务的媒体Id
            "playauth" : PlayAuth,  //播放权证
            "cover": cover, //封面
            "encryptType":1, //当播放私有加密流时需要设置。
            "autoplay": true,
            "showBuffer": false,
            "encryptType":1, //当播放私有加密流时需要设置。
            "controlBarVisibility": "hover",
            "useH5Prism": true,
            "enableSystemMenu":true,
        },function(player){
            player.play();
        });
        
     }

    

})

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}