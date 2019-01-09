<template>
  <div>
    <el-card class="box-card">
      <div class="tit">经销商信息
        <div class="chose">
         <multiCascader  :options="options" @on-selected="getSelected" :inputValue="configTips"></multiCascader>
      </div>
      </div>
      
       
      <div class="titcon">
        <el-form label-position="top"  :model="formLabelAlign" :inline="true"  :rules="rules">
          <!-- 图片上传 ============================================================================================================-->
          <el-form-item label="封面图片" >
            <div  class="imgup">
              <image-uploader @onChange='imgChangea' :maxSize="maxSize" placeholder="选择或拖放图片"></image-uploader>
              <span class="descimg">点击右侧上传图片</span>
            </div>
          </el-form-item>
          <!-- 图片上传结束。。。。。 ========================================================================================================-->
          <el-form-item label="主标题" prop="title">
            <el-input v-model="formLabelAlign.title" placeholder="请输入主标题"></el-input>
          </el-form-item>
          <el-form-item label="副标题" prop="subTitle">
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
            <div  class="imgup">
              <image-uploader @onChange='imgChangeb' :maxSize="maxSize" placeholder="选择或拖放图片"></image-uploader>
              <span class="descimg">点击右侧上传图片</span>
            </div>
          </el-form-item>
          <!-- 图片上传结束。。。。。 ========================================================================================================-->
          <!-- 图片上传 ============================================================================================================-->
          <el-form-item label="正文插图" style="margin:0;">
           <div  class="imgup">
              <image-uploader @onChange='imgChangec' :maxSize="maxSize" placeholder="选择或拖放图片"></image-uploader>
              <span class="descimg">点击右侧上传图片</span>
            </div>
          </el-form-item>
          <!-- 图片上传结束。。。。。 ========================================================================================================-->
           <el-form-item label="" >
           </el-form-item> <el-form-item label="" >
           </el-form-item>
           <div style="display:block">
          
          
          <el-form-item label="正文内容" prop="content">
           <el-input type="textarea" v-model="formLabelAlign.content" style="width:800px;min-height:100px"></el-input>
          </el-form-item>
           <el-form-item label="" >
           </el-form-item>
            <el-form-item label="" >
           </el-form-item>
            <el-form-item label="" >
           </el-form-item>
            </div>
         
       

        
             <el-form-item label="物料图片" style=" width:60%;margin-right:22%;">
                <div  class="imgup">
              <mostImageUploader @onChange='imgChangeb' :maxSize="maxSize" placeholder="选择或拖放图片"></mostImageUploader>
              <span class="descimga">点击右侧多上传图片</span>
            </div>

              <!-- <el-dialog :visible.sync="dialogVisible" style="width:48px;height:48px;">
                <img width="100%" :src="dialogImageUrl" alt="" style="width:48px;height:48px;" >
              </el-dialog> -->
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
import multiCascader from "multi-cascader";
import ImageUploader from '../../components/upimg/ImageUploader'
import mostImageUploader from '../../components/upimg/mostImageUploader'
export default {
  name: "ReleaseManagement",
   components:{
            multiCascader,
            ImageUploader,
            mostImageUploader
        },

  data() {
    // 35
    // 60
    // 150 
    // 100 张
    var titreg=/^(?:[\u4e00-\u9fa5]|[a-z]{30}|\d\d){30,30}$/ig
   
    var titvalidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("标题不能为空!!"));
      }
      setTimeout(() => {
        if (!titreg.test(value)) {
          callback(new Error("标题格式不正确!!"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      maxSize: 3072,
      rules: {
        // 校验手机号码，主要通过validator来指定验证器名称
        title: [{ required: true, validator: titvalidate, trigger: "blur" }],
       
      },
      formLabelAlign: {
        title:'',
        subTitle:'',
        content:'',
        agentGrades:'',
       
    },
      options: [{
          value: 'A级经销商',
          label: 'A级经销商',         
          },
          {
          value: 'B级经销商',
          label: 'B级经销商',          
          },
           {
          value: 'C级经销商',
          label: 'C级经销商',          
          },
           {
          value: 'D级经销商',
          label: 'D级经销商',          
          },
           {
          value: 'E级经销商',
          label: 'E级经销商',          
          },

          ],
        
     
      configTips:'',
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
    //权限选择
     getSelected(val) {
    this.selectGroups = val;
   
    this.configTips = `已选择${val.length}个分组`;
      },
    changed(selected) {
      console.log(selected)
    },
    //图片上传
     Uploada(file) {
       var uid=new Date().getTime()
      var fileName = "banner" + uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrla = result.url;
        });
    
    },

      Uploadb(file) {
       var uid=new Date().getTime()
      var fileName = "banner" + uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrlb = result.url;
        });
    
    },

      Uploadc(file) {
       var uid=new Date().getTime()
      var fileName = "banner" + uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrlc = result.url;
        });
    
    },
    imgChangea (files) {
        if (files) {
          console.log(files)
         this.Uploada(files[0])
        }
      },
      imgChangeb (files) {
        if (files) {
          console.log(files)
         this.Uploadb(files[0])
        }
      },
      imgChangec (files) {
        if (files) {
          console.log(files)
         this.Uploadc(files[0])
        }
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
.imgup{
  height: 41px;
  background:#eee;
  
  margin-right: 20px;
  line-height: 41px;
  border-radius:5px; 
  position: relative;
}
.descimg{
  position: absolute;
  top: 0;
  font-size: 12px;
  left: 90px;
  display:inline-block;
  
}
.descimga{
  position: absolute;
  top: 0;
  font-size: 12px;
  right:100px;
  display:inline-block;
  text-align: center;
  
}
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
  width: 100%;
  margin: 0;
}
.chose{
  
  display: inline-block;
  position: absolute;
  right:0;
}
.tit {
  text-align: left;
  line-height: 80px;
  height: 80px;
  border-bottom: 1px solid #cccccc;
  position: relative;
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

