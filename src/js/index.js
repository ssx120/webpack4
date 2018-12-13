import '../css/fullpage.min.css'
import '../font/iconfont.css'
import '../css/style.css'
import move from "move-js"

$(document).ready(function() {
   // swiper
  var swiper = new Swiper(".swiper-container", {
    spaceBetween: 30,
    effect: "fade",
    autoplay: 3000,
    loop: true, // 循环模式选项
    autoplay: true, //可选选项，自动滑动
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });


  // pullpage
  $("#fullpage").fullpage({
    resize: false,
    verticalCentered: false, //定义每一页的内容是否垂直居中，默认true
    sectionsColor: ["#fff", "#fff", "#fff", "#bfbfbf", ""], //为每个section设置background-color属性
    anchors: ["page1", "page2", "page3", "page4", "page5"], //anchors定义锚链接，默认为[]
    // scrollOverflow: false,//内容超过满屏后是否显示滚动条，true则显示滚动条，若需滚动查看内容还需要jquery.slimscroll插件的配合
    menu: "#menu", //绑定菜单，设定的相关属性与anchors的值对应后，菜单可以控制滚动，默认为false。
    scrollingSpeed:700, //设置滚动速度，单位毫秒，默认700
    // navigation: true, //是否显示导航，默认为false
    // scrollBar:true,
    afterLoad: function(link, index) {
      // 滚动到某一屏后的回调函数
      switch (index) {
        case 1:
          break;

        case 2:
          move(".section2 .about")
            .set("margin-left", "0")
            .end(function() {
              move(".section2 h5").set("opacity", 1).end();
              move(".section2 p").set("opacity", 1).end();
            });
          break;

        case 3:
          // move('.section3 h1').set('margin-left','20%').end();
          break;

        case 4:
        // pc
          move('.section4 h5') .set("opacity", 1).end()
          move(".section4 h5").scale(1).end(function(){
            move(".section4 .company").scale(1).end();
            move(".section4 .company").set("opacity", 1).end();
          });
          // mobile
          move('.mobile_table h5').set("opacity", 1).end()
          move(".mobile_table h5").scale(1).end(function () {
            move(".mobile_table .company").scale(1).end();
            move(".mobile_table .company").set("opacity", 1).end();
          });
        break;
          case 5:
            move('.city').set('left','80%').end();
          break;
        default:
          break;
      }
    },
    onLeave: function(link, index) {
      //滚动前的回调函数;
      switch (index) {
        case 2:
          move(".section2 .about").set("margin-left", "-100%").end(function() {
              move(".section2 h5").set("opacity", 0).end();
              move(".section2 p").set("opacity", 0).end();
            });
          break;
        case 3:
          // move('.section3 h1').set('margin-left','20%').end();
          break;
        case 4:
         move('.section4 h5') .set("opacity", 0).end()
          move(".section4 h5").scale(.2).end(function(){
            move(".section4 .company").scale(.3).end();
            move(".section4 .company").set("opacity", 0).end();
          });
          move('.mobile_table h5').set("opacity", 0).end()
          move(".mobile_table h5").scale(.2).end(function () {
            move(".mobile_table .company").scale(.3).end();
            move(".mobile_table .company").set("opacity", 0).end();
          });
          break;
        case 5:
            case 5:
          move('.city').set('left','1000px').end();
          break;
          break;
        default:
          break;

      }
    }
  });

  // page3 hover效果
  $(".operate").hover(function () {
    move(".operate_w img").rotate(180).end(function(){
       move(".operate_w").set("opacity", .3).end()
       move(".operate_w p").set("opacity", 0).end()
       move(".operate_w img").set("opacity", 0).end()
         move(".textinfo").set("top", 0).end()
      ;
    })
     
    },
    function () {
     move(".operate_w img").rotate(0).end(function(){
    })
      move(".operate_w p").set("opacity", 1).end()
     move(".operate_w img").set("opacity", 1).end()
     move(".operate_w").set("opacity", 1).end(function () { 
           move(".textinfo").set("top", "100%").end()
     });
    })


    // .analysis
// page3 精准投资hover
  $(".analysis").hover(function () {
    move(".analysis_w img").rotate(180).end(function(){

       move(".analysis_w").set("opacity", .5).end()
       move(".analysis_w p").set("opacity", 0).end()
       move(".analysis_w img").set("opacity", 0).end()
         move(".analysis_text").set("top", 0).end()
      ;
    })
     
    },
    function () {
     move(".analysis_w img").rotate(0).end(function(){
    })
     move(".analysis_w p").set("opacity", 1).end()
     move(".analysis_w img").set("opacity", 1).end()
     move(".analysis_w").set("opacity", 1).end(function () { 
           move(".analysis_text").set("top", "100%").end()
     }
     );
    })

    //点击菜单
      var a = true;
    $(".menu_a").click(function () { 
      if(a){
        $("#menu").addClass("menu_b")
        a = false
      }else{
        $("#menu").removeClass("menu_b");
        a = true;
      }
    })
    $("#menu").click(function(){
      $("#menu").removeClass("menu_b");
      a = true;
    })
});
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}