import '../css/style.css'
import '../css/list.css'
import axios from './axios.js'
import API from './api.js'
import {getRequest,getDataset} from "./utils.js"
require("expose-loader?$!jquery");
$(document).ready(function() {

    let cate = null
    // 根据用户名获取用户级别
    let name = window.localStorage.getItem('username').replace(/video/ig, '') 
    
    getViodeType()
    // 获取视频类型以及子类
    function getViodeType(cateId){

      let api = cateId?API.video.categories+"?cateId="+cateId:API.video.categories

      axios.get(api).then( response => {
          let res = response.status == 200?response.data:response
          let {code, data, msg} = res
              if (code === 0) {
                  let subCategories = data.subCategories.reverse()
                  // 判断是否是获取列表
                  if(cateId){
                    let str = ''
                    subCategories.forEach(element => {
                      str += `<li data-cateId='${element.cateId}' class='list-item'>
                                <span>${element.cateName}</span>
                              </li>`
                    });
                    $('#video-wrap').html(str)

                    playList()

                  }else{  
                    cate = subCategories.filter(e=>{
                     
                      return e.cateName.toLowerCase() == name
                    })
                    
                    // 设置分类名
                    let listTitle =  document.querySelector('.list-title')
                    listTitle.innerHTML = cate[0].cateName
                    
                    console.log(listTitle)

                    getViodeType(cate[0].cateId)
                  }
                  
                  
                  // getVidoeList(cate[0].cateId)
              }else{
                  console.log(res)
                  alert(msg)
              }
      })
  } 

  function playList(){
    $('.list-item').click(function(){
      let cateId = getDataset(this).cateid
      window.localStorage.setItem('cateid',cateId)
      window.location.href = 'video.html'
    })
  } 
    
})

if (module.hot) {
    // 实现热更新
    module.hot.accept();
  }