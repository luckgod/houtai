const env = require('./aliOssConfig.js');
const Base64 = require('./Base64.js'); //Base64,hmac,sha1,crypto相关算法
require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');

const uploadFile = function(filePath, successc, failc) {
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }
  // 这里我自定义上传文件的key（key为字符串右上传的路径和图片名称组成，如：headImg/2018-05/09/test.png）
  let date = new Date();

  let month = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);

  let day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();

  let path = "headImg/" + date.getFullYear() + "-" + month + "/" + day + "/"; //拼接上传路径

  let fileName = date.getTime() + "." + filePath.split(".").pop(); //自定义图片名称

  const aliyunFileKey = path + fileName;

  const newAvatar = env.uploadImageUrl + "/" + aliyunFileKey; //最终图片cdn链接

  const aliyunServerURL = 'https://kd-sdk.oss-cn-hangzhou.aliyuncs.com';//env.uploadImageUrl; //OSS存储服务器域名，需要https

  const accessid = env.OSSAccessKeyId; //拿到配置文件中的ossAccessKeyId

  const policyBase64 = getPolicyBase64(); //将policy转为base64位字符串

  const signature = getSignature(policyBase64); //通过policyBase64获取签名凭证
  console.log("上传到额图片filePath--->", filePath);
  // 上传文件
  wx.uploadFile({
    url: aliyunServerURL,
    filePath: filePath,
    name: 'file', //必须填file
    header: {
      "Content-Type": "multipart/form-data",
      'accept': 'application/json',
    },
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200',
    },
    success: function(res) {
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
      successc(newAvatar); //上传成功后将图片链接通过回调返回
    },
    fail: function(err) {
      console.log(err);
      failc();
      err.wxaddinfo = aliyunServerURL;
    },
  })
}

const getPolicyBase64 = function() {
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
      ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };
  const policyBase64 = Base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function(policyBase64) {
  const accesskey = env.AccessKeySecret;

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

// module.exports = uploadFile;
export default {
  uploadFile:uploadFile,
 
}