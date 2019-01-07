import axios from 'axios'
import CryptoJS from 'crypto-js'
import queryString from 'querystring'
import Vue from 'vue'
import md5 from 'js-md5'
import ElementUI from 'element-ui';
Vue.use(ElementUI);
// const PUBLIC_KEY =
//     '-----BEGIN PUBLIC KEY-----\
//     MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCA\
//     QEAjY/4fPFdDJUD4zKbriRc69dlCL68SdrwwyvH7Sj\
//     Fc/s3g50Fl9ZPCVUuorvmePCIOOjuIjEQPTLWFGRNg\
//     53p9Uwt1nGkazrjsXcuEFFLs5lvMMjPjj8EFiRqHnEA\
//     2hJ8tXmIGxEHB2LpFwZgEh10Km7XshCGmViN4FP3mMd\
//     3Ih7OaHOav69D4nxJM4dSoJOrW6rMUG1sRTtdaPjxnryv\
//     lxlQ+81gwq1Dvs9w3LD8rn/rpZKNT3Zdk9XL1E4r2s0vS\
//     WHFAkT8KBP6dhAfSSBmIrM+Hb6yxYpkkC+XfsO9InZ3Qd\
//     udeIP+AOBo+iV2J70PbkPTxumxu0iIhgd/G0M1XQIDAQAB\
//     -----END PUBLIC KEY-----';

// //WebSocket请求地址
// //const WSHOST='ws://47.100.33.4:9009'
// //const WSHOST='ws://192.168.0.104:9009'
// // const WSHOST='ws://www.miruohz.com:9009'

// let vm = new Vue()
// var TOKEN = "#GK@2017-2018&MR*LSL!";
// let encrypt = new JSEncrypt();
// encrypt.setPublicKey(PUBLIC_KEY);

// function aesEncrypt(data) {
//         var time=new Date().getTime().toString()
//         var arr=[]
//         var arr2=[]
//         for ( var i = 0; i<time.length; i++) {
//              arr.push(parseInt(time.substring(i,i+1))+(i+1))
//         }
//         if (sessionStorage.getItem('permission')) {
//             var token=JSON.parse(sessionStorage.getItem('permission')).authToken  
//             for (var i = 0;i<arr.length; i++) {
//                     arr2.push(token.substring(arr[i],arr[i]+1))
//             }
//         }    
//         var str=data+arr2.join('')
//        var encrypt=md5(str).toUpperCase()
//       return encrypt.toString();
// }

// function getJsonData(data,key,AesKey) {
//     let iv =  md5(TOKEN+key).substring(0, 16).toUpperCase();
//     AesKey=CryptoJS.enc.Utf8.parse(AesKey)
//     iv=CryptoJS.enc.Utf8.parse(iv)
//     data = JSON.stringify(data);
//     let encrypted = CryptoJS.AES.encrypt(data, AesKey, {
//         iv:iv,
//         mode:CryptoJS.mode.CBC,
//         padding:CryptoJS.pad.Pkcs7
//     });
//     // console.log(encrypted.toString())
//     return encrypted.toString();
// }

// function getHeadKey(AesKey) {
//      //AESKey
//     let RSAKey = encrypt.encrypt(AesKey);
//     // console.log(AesKey,RSAKey.toString())
//      return RSAKey.toString();
// }

// function sha1(arr) {
    
//    arr.sort();
//     let str = '';
//     for (let i = 0; i < arr.length; i++) {

//         str += arr[i] ;

//     }
//     let sign = CryptoJS.SHA1(str).toString().toUpperCase();
//     return sign;
// }

// function aesDecrypt(encrypted, key) {
//     let decrypted = CryptoJS.AES.decrypt(encrypted, key, {iv: iv});
//     decrypted = CryptoJS.enc.Utf8.stringify(decrypted);// 转换为 utf8 字符串
//     return decrypted;
// }

function cryptData(data,act) {
    data = data || {};
    let timestamp = +new Date();
    let headSerialNo = generateOrderNum();
    let headChannel = 1;
    let headAuthToken = generateMixed(32);
    // if (sessionStorage.getItem('permission')) {
    //     data.headUserId = JSON.parse(sessionStorage.getItem('permission')).adminCode;
    //     data.headAuthToken = JSON.parse(sessionStorage.getItem('permission')).authToken;
    //     data.clientId = JSON.parse(sessionStorage.getItem('permission')).adminCode;

    // }else{
    //      data.headUserId = 1;
    //       data.headAuthToken=headAuthToken
    //       location.hash = '/login';
    //       data.clientId='BT00000000BT'
    // }
    
    let AesKey = generateMixed(16);
    data.headTrTime= new Date().getTime();
    data.timestamp = timestamp;
    data.headSerialNo = headSerialNo;
    data.headChannel = headChannel;
    data.body='';  
    data.headAccu='0';
    data.headDime='0';
    data.headArea='0';
    data.headTrCode='0';

    //data=removeProperty(data);

    data.key=getHeadKey(AesKey);  
    data.body=getJsonData(data,data.key,AesKey);
    var key=md5(data.key).toUpperCase()
    var body=md5(data.body).toUpperCase()
    var arr=[key,body,TOKEN]
    data.sign=sha1(arr);
    
    var aesData={
       key:data.key,
       body: data.body,
       sign:data.sign,
       msgType:'ASK',
       clientType:'web',
       trCode:act,
       clientId:data.clientId
    }
    //return data;
   
    return aesData;
}

function cryptFormData(file) {
    let data = new FormData();
    let timestamp = +new Date();
    let headSerialNo = generateOrderNum();
    let headChannel = 1;
    let headAuthToken = generateMixed(40);
    data.append('image', file);
    data.append('headTrTime', timestamp);
    data.append('headSerialNo', headSerialNo);
    data.append('headChannel', headChannel);
    data.append('headAuthToken', headAuthToken);
    return data;
}


// let showMessage = function (res) {
//     if (res.responseType === 300) {
//         vm.$message({
//             message: res.respmsg,
//             type: 'warning'
//         });
//         // location.hash = '/login';
//     } else if (res.responseType >= 600 && res.code < 700) {
//         vm.$message({
//             message: res.respmsg,
//             type: 'warning'
//         });
//     } else if (res.responseType =='F') {
//         if(res.respmsg == '安全令牌失效'){
//              vm.$message({
//                     message: '请重新登录',
//                     type: 'warning'
//                 });
//               sessionStorage.removeItem('permission')
//             //   location.hash = '/login';
//               return
//         }
//         vm.$message({
//             message: res.respmsg,
//             type: 'warning'
//         });
//     }else if (res.responseType > 0) {
        
//         if (res.respcode==30006) {
//             //   location.hash = '/login';
//               vm.$message({
//                     message: '请重新登录',
//                     type: 'warning'
//                 });
//               return
//         }
//         vm.$message({
//             message: res.respmsg,
//             type: 'warning'
//         });
        
//     } else if (res.responseType < 0) {
//         vm.$message({
//             message: '系统繁忙: ' + res.respmsg,
//             type: 'warning'
//         });
//     }
// }

/**
 * 数据接口
 */

// 
// let ajax = function (req,act, date, callback, progressFunc) {
//    if(req=='get'){
//        console.log(req+'get')
//     axios
//     .get(HOST+act,date)
//     .then(function(response) {
//         console.log(response)
//         if (response.data.code == 0) {
//         callback(response.data)
//         } else {
//         alert(response.data.msg)
//         }
//     })
//     .catch(function(error) {
//         console.log(error)
//     })
//    }else{
//         axios
//         .post(HOST+act, date)
//         .then(function(response) {
//             console.log(response)
//             if (response.data.code == 0) {
//             callback(response.data)
//             } else {
//             alert(response.data.msg)
//             }
//         })
//         .catch(function(error) {
//             console.log(error)
//         })
//    }
    
   
// };
let ajax = function (posttype, url, params, cb) {
    var method_type = posttype.toLowerCase();
       function getCookie(name) {
         var arr = document.cookie.split('; ');
            for(var i = 0; i < arr.length; i++) {
            var arrName = arr[i].split('=');
            if(arrName[0] == name) {
            return arrName[1];
             }
             }
             return '';
             }
	// axios.interceptors.request.use(
    //     config => {
    //       // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        
       
    //          if(getCookie('token')){
    //             config.headers = {
    //                 // 'Content-Type':'application/json;charset=UTF-8',
    //                 'token':getCookie('token'),
                    
    //               }
    //           }
          
    //     //   console.log(config)
    //       return config;
    //     },
    //     error => {
    //       return Promise.reject(err);
    //     }
    //   );		
	if(method_type == "get") {					
	        //get和post传参不同，get最前变需要增加"params:"而post不需要
	        // if(!params.params){
		    //      params={params:params}
	        // }						
	        // return axios.get(HOST+url, params).then(function(res) {
            return axios.get(HOST+url,{
                headers: {'token': getCookie('token')},
                params:params,
            },
            ).then(function(res) {
            //    console.log(res)
		        if(res.data.code == 0) {
                        //正确返回时的处理
                        
                    cb(res.data);
                    
		        } else if(res.data.code == -1) {
                    //登录获取的sessionkey失效等逻辑的处理
                    this.$message.error(res.data.msg);
		        } else {
			        //code=0的处理
			         alert(res.data.msg);
		        }
            })
            .catch(function(error) {
                            console.log(error)
                         })   
	} else if(method_type == "post") {					
        //get和post传参不同，get最前变需要增加"params:"而post不需要
        
		// return axios.post(HOST+url,params).then(function(res) {
            return axios.post(HOST+url,params,{
                
                headers: {'token': getCookie('token')},
            }
            ).then(function(res) { 	
                cb(res.data);					
			// if(res.data.code == 0) {
			// 	//正确返回时的处理
			// 	cb(res.data);
			// } else if(res.data.code == -1) {
            //     //登录获取的sessionkey失效等逻辑的处理
            //     this.$message.error(res.data.msg);
			// } else {
			// 	//code=0的处理
			// 	alert(res.data.msg);
			// }
		}).catch(function(error) {
            console.log(error)
         }) 
	}			    
 
}

// function ajax_curl(posttype, url, params, cb) {
// 	var method_type = posttype.toLowerCase();
			
// 	if(method_type == "get") {					
// 	        //get和post传参不同，get最前变需要增加"params:"而post不需要
// 	        if(!params.params){
// 		         params={params:params}
// 	        }						
// 	        return axios.get(url, params).then(function(res) {
						
// 		        if(res.data.code == 1) {
// 		                //正确返回时的处理
// 			        cb(res.data.data);
// 		        } else if(res.data.code == -1) {
// 			        //登录获取的sessionkey失效等逻辑的处理
// 		        } else {
// 			        //code=0的处理
// 			        alert(res.data.msg);
// 		        }
// 	        })
// 	} else if(method_type == "post") {					
// 		//get和post传参不同，get最前变需要增加"params:"而post不需要
// 		return axios.post(url, params).then(function(res) {						
// 			if(res.data.code == 1) {
// 				//正确返回时的处理
// 				cb(res.data.data);
// 			} else if(res.data.code == -1) {
// 				//登录获取的sessionkey失效等逻辑的处理
// 			} else {
// 				//code=0的处理
// 				alert(res.data.msg);
// 			}
// 		})
// 	}			
 
// }

// 打开一个 web socket
// var ws = new WebSocket(WSHOST);

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
// window.onbeforeunload = function () {
//     ws.close();
// }
// var _listeners={}
function emit(name, callback) {
        let listener = _listeners[name];
        //console.log(name,listener)
        if (listener) {
            ws.removeEventListener('message', listener);
        }
        listener = _listeners[name] = (e) => {
            let res = JSON.parse(e.data);
             //console.log(res, name);
            if (res.trCode === name) {
              if (res.params.pageNum=='0') {     //分页0条时pageNum=0
                    res.params.pageNum=1
               }
                callback && callback(res.params);
                showMessage(res.params)
            }
        };
        ws.addEventListener('message', listener);
}
let socket =function (act,data,callback){
    if ("WebSocket" in window){
          if (ws.readyState==1) {
               //正常发送数据
              var preData=cryptData(data);
              var aesData={
                  clientId:preData.clientId,
                  key:preData.key,
                  body:preData.body,
                  sign:preData.sign,
                  msgType:'ASK',
                  trCode:act,
                  clientType:'web'
              }
              console.log(preData,'preData')
              ws.send(JSON.stringify(aesData));
          }

         emit(act,callback)

         
         ws.onclose=function(){
            //Web Socket断开连接
            vm.$message({
                message: '与服务器断开连接',
                type: 'error'
            });
         };

        
         ws.onerror=function(){
             //Web Socket连接异常
            vm.$message({
                message: '与服务器断开连接',
                type: 'error'
            });
         };
    }else{
       // 浏览器不支持 WebSocket
        vm.$message({
            message: '您的浏览器不支持 WebSocket!',
            type: 'error'
        });
    }
   
}
// let upload = function (act, data, callback, progressFunc) {

//     return axios({
//         method: 'post',
//         url: 'enve/' + act,
//         baseURL: URL,
//         headers: {},
//         withCredentials: true,
//         timeout: 30000,
//         data: cryptFormData(data),
//         progress: function (progressEvent) {
//             // Do whatever you want with the native progress event
//             progressFunc(progressEvent)
//         }
//     }).then(response => {
//         let res = response.data;
//         //console.log(res)
//         callback(res)
//         showMessage(res)
//     }).catch(response => {
//         if (response instanceof Error) {
//             // Something happened in setting up the request that triggered an Error
//             console.log('Error: ', response.message);
//             vm.$message({
//                 message: 'Error: ' + response.message,
//                 type: 'error'
//             });
//         } else {
//             // The request was made, but the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log(response);
//             vm.$message({
//                 message: '服务器异常' + response.status + ':' + response.data,
//                 type: 'error'
//             });
//         }

//     });
// };

/**
**删除对象空属性
**/
function removeProperty(object){
        for(var k in object){
            if (object[k]==='') {
                delete object[k]
            }
        }
        return object;
}


// import { OSS } from '../src/up.js'
  
// let upload= function on_click_upload_file(file){
//     var client = new OSS.Wrapper({
//     region : 'oss-cn-hangzhou',
//     accessKeyId : 'LTAIaR0ueCJadtLy',
//     accessKeySecret : '80S2QLW8SUREsewA6UxYsVYHRs3CiU',
//     bucket : 'kd-sdk'
//     });
//       var storeAs = 'upload-file'+"/";  //命名空间
//       console.log(' => ' + storeAs);
//       client.multipartUpload(storeAs, file).then(function (result) {
//            console.log(result); 
//            console.log(result.url);
//       }).catch(function (err) {
//            console.log(err);
//      });   
//    }
export default {
    ajax: ajax,
    
    socket:socket,
    emit:emit
}
