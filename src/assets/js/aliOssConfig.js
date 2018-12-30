var fileHost = "https://kd-sdk.oss-cn-hangzhou.aliyuncs.com"//这里配置oss存储服务器地址,如：https://test.oss-cn-beijing.aliyuncs.com
var config = {
  //aliyun OSS config
  uploadImageUrl: fileHost, //默认存在根目录，可根据需求改
  AccessKeySecret: '80S2QLW8SUREsewA6UxYsVYHRs3CiU',
  OSSAccessKeyId: 'LTAIaR0ueCJadtLy',
  timeout: 87600 //这个是上传文件时Policy的失效时间
};
// module.exports = config
export default {
  config:config,
 
}