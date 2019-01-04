<template>
  <div class="upload-wrapper">
                <div class="upload-tip">建议尺寸：800 x 800 像素。仅支持 gif、 jpeg、 png、 bmp 4种格式, 大小不超过3.0 MB。</div>
                <div class="clearfix">
                  <a-upload
                    action="//qqq.com/upload/file"
                    name="file"
                    :data="{fileType: 'pic'}"
                    listType="picture-card"
                    :fileList="fileList"
                    :withCredentials="true"
                    @preview="handleUploadPreview"
                    @change="handleUploadChange"
                  >
                    <div>
                      <a-icon type="plus" />
                      <div class="ant-upload-text">添加图片</div>
                    </div>
                  </a-upload>
                  <a-modal :visible="previewVisible" :footer="null" @cancel="handleUploadCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                  </a-modal>
                </div>
              </div>
</template>

<script>
export default {
    name: "uploader",
  data:{
    return:{
        // 上传图片
      previewVisible: false, // 是否可预览图片
      previewImage: '', // 预览图片
      fileList: [], // 上传图片数据列表
    }
  },
  methods:{
    handleUploadCancel () {
      this.previewVisible = false
    },
    handleUploadPreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleUploadChange ({file, fileList}) {
      let pos = file.name.lastIndexOf('.')
      let lastName = file.name.substring(pos, file.name.length)
      let supportTypes = ['.gif', '.jpeg', '.png', '.bmp', '.jpg'] // gif、 jpeg、 png、 bmp
      if (supportTypes.indexOf(lastName.toLowerCase()) <= -1) {
        this.$message.error('商品图片仅支持 gif、 jpeg、 png、 bmp 4种格式！')
        return
      }
      if (file.size / (1024 * 1024) > 3) {
        this.$message.error('上传商品图片大小应小于3Mb！')
        return
      }
      this.fileList = fileList
      // 根据服务端返回数据筛选上传成功的文件
      let imgUrls = []
      fileList.forEach((file) => {
        if (file.response && file.response.code === '0') {
          imgUrls.push(file.response.data.fileInfo.url)
        }
      })
    },

  }
}
</script>


