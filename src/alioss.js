var OSS = require('ali-oss')
export function client() {
  var client = new OSS({
    region : 'oss-cn-hangzhou',
    accessKeyId : 'LTAIaR0ueCJadtLy',
    accessKeySecret : '80S2QLW8SUREsewA6UxYsVYHRs3CiU',
    bucket : 'kd-sdk'
  })  //后端提供数据
  return client
}

