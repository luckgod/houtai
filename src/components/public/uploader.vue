<template>
  <div class="upload">
    <div class="oss_file">
      <input type="file" :id="id" @change="doUpload">
      <img :src="url" alt>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'upload',
    data () {
      return {
        region: 'oss-cn-hangzhou',
        //根据你买的那个区的做相应的更改
        bucket: 'kd-sdk',
        id: 'upload',
        percentage: 0,
        url:'',
        urls:[],
        getToken:{
           sign:'',
        }
      }
    },
    methods:{
      doUpload () {
        const _this = this;
        const urls = [];
        _this.$post('请求后台接口获取accessKeyId，accessKeySecret和临时验签SecurityToken',_this.getToken).then((result) => {
          console.log(result);
          const client = new OSS.Wrapper({
            region: _this.region,
            accessKeyId: result.accessKeyId,
            accessKeySecret:result.accessKeySecret,
            stsToken: result.SecurityToken,
            bucket: _this.bucket
          })
         _this.percentage = 0;
          const files = document.getElementById(_this.id)
          if (files.files) {
            const fileLen = document.getElementById(_this.id).files
            let resultUpload = ''
            for (let i = 0; i < fileLen.length; i++) {
              const file = fileLen[i]
              // 随机命名
              let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
              // 上传
              client.multipartUpload(random_name, file, {
                progress: function* (percentage, cpt) {
                  // 上传进度
                  _this.percentage = percentage
                }
              }).then((results) => {
                // 上传完成
                const url = 'http://buket名称.oss-cn-hangzhou.aliyuncs.com/'+ results.name; _this.$store.dispatch("changeUrl", _this.url); _this.url = url; console.log(url); }).catch((err) => { console.log(err) }) } } }) }, 

// 随机生成文件名 
 random_string(len) { 　　len = len || 32; 　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 　　var maxPos = chars.length; 　　var pwd = ''; 　　for (let i = 0; i < len; i++) { 　　pwd += chars.charAt(Math.floor(Math.random() * maxPos)); } return pwd; } }, watch:{ url(val){ if(val){ this.urls.push(val); } } } } 

</script> 

