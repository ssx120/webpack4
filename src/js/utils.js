//获取url中的参数
const getRequest = (name)=> {
    var hash = window.location.search;
    if (window.location.hash.substring(2).match("/")) {
        this.pagename = "/" + hash.split("/")[1] + "/";
    }
    if (hash.indexOf("?") > 0 && hash.indexOf("?") < hash.indexOf("=")) {
        hash = hash.substring(hash.indexOf("?") + 1, hash.length + 1);
    } else {
        hash = hash.substring(hash.lastIndexOf("/") + 1, hash.length + 1);
    }
    hash = hash.replace("?", "&");
    let kvarray = hash.split("&");
    let hashkv = {};
    for (let i in kvarray) {
        hashkv[kvarray[i].split("=")[0]] = kvarray[i].split("=")[1];
    }
    var kv = hashkv[name] === undefined ? "" : hashkv[name];
    return kv;
}

 // 兼容ie不支持dataset
 const getDataset = (ele)=>{
    if(ele.dataset){
        return ele.dataset;
    }else{
        var attrs = ele.attributes,//元素的属性集合
            dataset = {}, name, matchStr;
        for(var i = 0;i<attrs.length;i++){ //是否是data- 开头
            matchStr = attrs[i].name.match(/^data-(.+)/);
            if(matchStr){ //data-auto-play 转成驼峰写法 autoPlay
                name = matchStr[1].replace(/-([\da-z])/gi,function(all,letter){
                     return letter.toUpperCase(); 
                });
                 dataset[name] = attrs[i].value;
            }
        }
        return dataset;
    }
}
export  {
    getRequest,
    getDataset
}