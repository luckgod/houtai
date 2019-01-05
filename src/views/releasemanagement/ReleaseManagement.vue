<template>
  <div>
    <el-card class="box-card">
      <div class="tit">经销商信息</div>
        <dropdown :data="dataa" :cbChanged="changed"></dropdown>
      <div class="titcon">
        <el-form label-position="top" label-width="80px" :model="formLabelAlign" :inline="true">
          <!-- 图片上传 ============================================================================================================-->
          <el-form-item label="封面图片" style="margin:0;">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              style="width:220px;height:38px;border:1px solid #dcdfe6;position:relative;border-radius: 5%;background:#f1f1f1"
            >
              <img
                v-if="imageUrla"
                :src="imageUrl"
                class="avatar"
                style="width:38px;height:38px;border:1px solid #dcdfe6;border-radius: 25%"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                style="width:38px;height:38px;position:absolute;top:-69px;"
              ></i>
            </el-upload>
            <div class="tipwenzi">点击右侧上传图片</div>
          </el-form-item>
          <!-- 图片上传结束。。。。。 ========================================================================================================-->
          <el-form-item label="主标题">
            <el-input v-model="formLabelAlign.title" placeholder="请输入主标题"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="formLabelAlign.subTitle" placeholder="请输入副标题"></el-input>
          </el-form-item>
          <el-form-item label="类目选择">
            <el-select v-model="formLabelAlign.agentGrades" placeholder="选择类目" >
              <div v-for="(item,index) in cayegotyIdlist" :key="index">
              <el-option :label="item.categoryName" :value="item.id+1"></el-option>
            </div>
            </el-select>
          </el-form-item>
          <!-- 图片上传 ============================================================================================================-->
          <el-form-item label="正文主图" style="margin:0;">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccessb"
              :before-upload="beforeAvatarUploadb"
              style="width:220px;height:38px;border:1px solid #dcdfe6;position:relative;border-radius: 5%;background:#f1f1f1"
            >
              <img
                v-if="imageUrlb"
                :src="imageUrlb"
                class="avatar"
                style="width:38px;height:38px;border:1px solid #dcdfe6;border-radius: 25%"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                style="width:38px;height:38px;position:absolute;top:-69px;"
              ></i>
            </el-upload>
            <div class="tipwenzi">点击右侧上传图片</div>
          </el-form-item>
          <!-- 图片上传结束。。。。。 ========================================================================================================-->
          <!-- 图片上传 ============================================================================================================-->
          <el-form-item label="正文插图" style="margin:0;">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccessc"
              :before-upload="beforeAvatarUploadc"
              :multiple='true'
              style="width:220px;height:38px;border:1px solid #dcdfe6;position:relative;border-radius: 5%;background:#f1f1f1"
            >
              <img
                v-if="imageUrlc"
                :src="imageUrlc"
                class="avatar"
                style="width:38px;height:38px;border:1px solid #dcdfe6;border-radius: 25%"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                style="width:38px;height:38px;position:absolute;top:-69px;"
              ></i>
            </el-upload>
            <div class="tipwenzi">点击右侧上传图片</div>
          </el-form-item>
          <!-- 图片上传结束。。。。。 ========================================================================================================-->
           <el-form-item label="" >
           </el-form-item> <el-form-item label="" >
           </el-form-item>
           <div style="display:block">
          
          
          <el-form-item label="正文内容" >
           <el-input type="textarea" v-model="formLabelAlign.content" style="width:800px;min-height:100px"></el-input>
          </el-form-item>
           <el-form-item label="" >
           </el-form-item>
            <el-form-item label="" >
           </el-form-item>
            <el-form-item label="" >
           </el-form-item>
            </div>
         
       

        
             <el-form-item label="物料图片" style=" width:700px;padding-right:524px;">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="shanwoliat"
                style="width:548px;height:48px;border:1px solid #dcdfe6"
                >
                <i class="el-icon-plus " style="width:48px;height:48px;"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" style="width:48px;height:48px;">
                <img width="100%" :src="dialogImageUrl" alt="" style="width:48px;height:48px;" >
              </el-dialog>
          </el-form-item>        
        </el-form>
        <div class="btn">
          <el-button type="success" @click="subd">正式发布</el-button>
        </div>
      </div>
    </el-card>

    <!-- ==============================================2==================================================================================================================2 -->
  </div>
</template>

<script>

import { client } from "../../alioss.js";

export default {
  name: "ReleaseManagement",
   
  data() {
    return {
      formLabelAlign: {
        title:'',
        subTitle:'',
        content:'',
        agentGrades:'',
       
    },
     
      cayegotyIdlist: "",
      imageUrla: "",
      imageUrlb: "",
      imageUrlc: "",
      dialogImageUrl: '',
      dialogVisible: false,
      imglist:[],
      dataa:[{
  label: 'Volvo',
  value: 1
}, {
  label: 'Saab',
  value: 2
}, {
  label: 'Long long long long long long test',
  value: 2
}],
    };
  },

  methods: {
    changed(selected) {
      console.log(selected)
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
       
        console.log(this.dialogImageUrl)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      shanwoliat(esponse, file, fileList){
        
        
       this.Uploadf(file);
      },
      Uploadf(file) {
      console.log(file, 2222);
      var fileName = "banner" + file.raw.uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file.raw)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imglist.push(result.url)
          console.log(this.imglist)
          // this.imageUrlc = result.url;
        });
    },
    //获取店铺 分类  /shop/shopCategoryList
    catchdata() {
      this.dataApi.ajax("get", "/admin/verify/category", {}, cb => {
        // console.log(cb.data)
        // console.log('获取店铺分类')

        this.cayegotyIdlist = cb.data;
      });
    },
    //获取地址 分类  /admin/verify/getLocation

    //店铺选择上传
    subd() {
        console.log()
        
        
       
      var params = new URLSearchParams();
      params.append("title", this.formLabelAlign.title);
      params.append("subTitle", this.formLabelAlign.subTitle);
      params.append("content", this.formLabelAlign.content);
      params.append("mainpic", this.imageUrlb);
      params.append("subPics", this.imageUrlc);
      params.append("category", this.imageUrla);
      params.append("categoryId", 1);
      params.append("agentGrades", this.formLabelAlign.agentGrades);
    
      params.append("downloadPics",this.imglist.toString());
     

    
      this.dataApi.ajax("post", "/admin/verify/uploadMateriel", params, res => {
        console.log("提交执行");
        console.log(res);
      });
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file);
      this.Upload(file);
    },
    beforeAvatarUpload(file) {
      const isJPG = true;
      const isLt2M = true;

      return isJPG && isLt2M;
    },
    Upload(file) {
      console.log(file, 2222);
      var fileName = "banner" + file.raw.uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file.raw)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrla = result.url;
        });
    },
    handleAvatarSuccessb(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file);
      this.Uploadb(file);
    },
    beforeAvatarUploadb(file) {
      const isJPG = true;
      const isLt2M = true;

      return isJPG && isLt2M;
    },
    Uploadb(file) {
      console.log(file, 2222);
      var fileName = "banner" + file.raw.uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file.raw)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrlb = result.url;
        });
    },
    handleAvatarSuccessc(res, file) {
      this.imageUrlc = URL.createObjectURL(file.raw);
      console.log(file);
      this.Uploadc(file);
    },
    beforeAvatarUploadc(file) {
      const isJPG = true;
      const isLt2M = true;

      return isJPG && isLt2M;
    },
    Uploadc(file) {
      console.log(file, 2222);
      var fileName = "banner" + file.raw.uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file.raw)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrlc = result.url;
        });
    },
    catchdatf() {
      this.dataApi.ajax("get", "/admin/verify/category", {}, cb => {
        // console.log(cb.data)
        // console.log('获取店铺分类')
        this.cayegotyIdlist = cb.data;
      });
    },

  },
  mounted() {
    this.catchdata();
    this.catchdatf();
  }
};
</script>
<style>
.el-upload--picture-card {
  width: 48px;
  height: 48px;
  line-height:48px;
}

.el-upload-list__item-thumbnail{
  width: 48px;
  height: 48px;
  line-height:48px;
}

.el-upload-list__item-actions{
   width: 48px!important;
  height: 48px!important;
}
.el-upload-list__item-thumbnail{
   width: 48px!important;
  height: 48px!important;
}
.is-success{
   width: 48px!important;
  height: 48px!important;
}
</style>

<style scoped>
.box-card {
  width: 91%;
  margin: 0;
}
.tit {
  text-align: left;
  line-height: 80px;
  height: 80px;
  border-bottom: 1px solid #cccccc;
}
.titcon {
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form-item {
  width: 20%;
  text-align: left;
}
.btn {
  overflow: hidden;
  float: left;
  padding-left: 8%;
  padding-top: 2%;
  padding-bottom: 2%;
}
.cardtwo {
  margin-top: 22px;
}
.tipwenzi {
  position: absolute;
  top: 0;
  line-height: 42px;

  left: 48px;
}
.el-upload--picture-card{
  width: 48px;
  height: 48px;
  line-height:48px;
}
.el-icon-plus{
  
}

</style>

