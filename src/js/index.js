import '../css/style.css'
import '../css/index.css'
import axios from './axios.js'
import API from './api.js'
$(document).ready(function() {

  // 统计代码

    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?a9ddf9ad79c4cd2d3be330595dc04258";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  // 登录操作
  let btn = document.querySelector('.btn')
  btn.onclick = function(){

    window.localStorage.removeItem('username')
    
    let userName = document.querySelector('.userName').value;
    let password = document.querySelector('.password').value;
    let userdata = { 
      username:userName,
      password:password,
      grant_type: 'password', 
      server_name: 'cloud'
    }
    
    // 存储用户名到本地
    window.localStorage.setItem("username",userName)

    if(userName == "" || password == ""){
        alert('请输入用户名或密码')
        return false;
    }

    let headers = {
      'authorization': 'Basic Z3BybzpncHJv',
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    //不可多次点击
    $('.btn').attr("disabled","disabled");  
   
    //登录
    axios.post(API.admin.login, userdata, { headers: headers }).then( response => {
      console.log(res)
      let res = response.status == 200?response.data:response
      if (res.access_token && res.token_type) { 
          localStorage.setItem('access_token', res.token_type + ' ' + res.access_token)
          window.location.href = 'list.html'
          $('.btn').removeAttr("disabled"); 
      } else {
          alert('登录错误')
          $('.btn').removeAttr("disabled"); 
      }

    }).catch( error => {

        console.log(error)
        $('.btn').removeAttr("disabled"); 

    })

  }


  
});
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}