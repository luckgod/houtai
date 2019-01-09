<template>
  <div>
    <el-card class="box-card">
      <div class="tit">经销商信息</div>
      <div class="titcon">
        <el-form
          label-position="top"
          label-width="80px"
          :model="formLabelAlign"
          :inline="true"
          :rules="rules"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formLabelAlign.name" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idcard">
            <el-input
              v-model="formLabelAlign.idcard"
              placeholder="请输入真实身份证号"
             
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="formLabelAlign.mobile"
              placeholder="请输入您的手机号"
             
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="formLabelAlign.sex" placeholder="活动区域">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理级别">
            <el-select v-model="formLabelAlign.jbc" placeholder="请选择你的代理级别">
              <el-option label="A" value="A"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属行业">
            <el-select v-model="formLabelAlign.cayegotyId" placeholder="请选择你当前行业的类型">
              <div v-for="(item,index) in cayegotyIdlist" :key="index">
                <el-option :label="item.categoryName" :value="item.id+1"></el-option>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="代理区域市">
          
             <cascaderMulti v-model="formLabelAlign.locid" :data="options" placeholder="状态码" style="z-index:100"></cascaderMulti>
          
          </el-form-item>

          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
        </el-form>
      
      </div>
    <!-- </el-card> -->

    <!-- ==============================================2==================================================================================================================2 -->
    <!-- <el-card class="box-card cardtwo"> -->
      <div class="tit">店铺信息</div>
      <el-form
        label-position="top"
        label-width="80px"
        :model="formLabelAlign"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="名称" style="margin:0;"  >
            <div  class="imgup">
              <image-uploader @onChange='imgChange' :maxSize="maxSize" placeholder="选择或拖放图片"></image-uploader>
              <span class="descimg">点击右侧上传图片</span>
            </div>
              
                
           
        </el-form-item>
        <el-form-item label="店铺名称" prop="dname">
          <el-input v-model="formLabelAlign.dname"></el-input>
        </el-form-item>
        <el-form-item label="所属品类">
          <el-select v-model="formLabelAlign.dregion" placeholder="活动区域">
            <div v-for="(item,index) in cayegotyIdlist" :key="index">
              <el-option :label="item.categoryName" :value="item.id+1"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="店家电话" prop="dtime">
          <el-input v-model="formLabelAlign.dtime"></el-input>
        </el-form-item>

        <el-form-item label="店铺地址">
          <el-input v-model="formLabelAlign.dizhi"></el-input>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="value4"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            style="width:450px"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label></el-form-item>
        <el-form-item label></el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="success" @click="subd">提交申请</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios'
// import aliUpload from "../../components/public/uploader";
import { client } from "../../alioss.js";
import multiCascader from "multi-cascader";
import ImageUploader from '../../components/upimg/ImageUploader'

import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  name: "companydata",
  components: {
    multiCascader,
     ImageUploader
  },
  data() {
    // 此处自定义校验手机号码js逻辑
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("号码不能为空!!"));
      }
      setTimeout(() => {
        if (!phoneReg.test(value)) {
          callback(new Error("格式有误"));
        } else {
          callback();
        }
      }, 1000);
    };
    var mimareg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var mimaregPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("号码不能为空!!"));
      }
      setTimeout(() => {
        if (!mimareg.test(value)) {
          callback(new Error("格式有误"));
        } else {
          callback();
        }
      }, 1000);
    };
    var nameareg = /^[\u4e00-\u9fa5]{2,4}$/;
    var nameregPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空!!"));
      }
       setTimeout(() => {
        if (!nameareg.test(value)) {
          callback(new Error("格式有误"));
        } else {
          callback();
        }
      }, 1000);
    };
    var shopnameareg = /^[\d\w\u4e00-\u9fa5,]{2,8}$/;
    var shopnameregPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空!!"));
      }
       setTimeout(() => {
        if (!shopnameareg.test(value)) {
          callback(new Error("格式有误"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
       maxSize: 3072,
      formLabelAlign: {
        name: "",
        region: "",
        mobile: "",
        locid: [],
        locida: "",
        locidb: "",
        dregion: "",
        sex: "",
        jbc: "",
        idcard: "",
        cayegotyId: "",
        dname: "",
        dregion: "",
        dizhi: "",
        dtime: "",
        detail: "",
        roleId: "A",
        categoryName: ""
      },
      configTips: "",
      data: { noticeImage: [] },
      value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      imageUrl: "",
      options: regionDataPlus,
      selectedOptions: [],
      cayegotyIdlist: [],
      //节点数据
      shenglist: [],
      shilist: [],
      qulist: [],
      optionsMessage: [],
      uploadUrl: [],
      uploadId: "file",
      uploadCode: 0,
      log: 0,
      loga: 0,
      rules: {
        // 校验手机号码，主要通过validator来指定验证器名称
        mobile: [{ required: true, validator: validatePhone, trigger: "blur" }],
        idcard: [{ required: true, validator: mimaregPhone, trigger: "blur" }],
        name: [{ required: true, validator: nameregPhone, trigger: "blur" }],
        dname: [{ required: true, validator: shopnameregPhone, trigger: "blur" }],
        dtime: [{ required: true, validator: validatePhone, trigger: "blur" }]
      },
      options: [
      ]
    };
  },
  watch: {
    uploadCode(val) {
      console.info(val);
    }
  },

  methods: {
    handleChange(value) {
      console.log(value);
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
    catchdatd() {
      this.dataApi.ajax("get", "/admin/verify/getLocation", {}, cb => {
        // console.log(cb);
        var arr = Object.entries(cb.data);
        var arr1 = [];
        var arr2 = [];
        var arr2_1 = [];

        var arr3 = [];
        var arr3_1 = [];
        var lougeArr = new Array();
        arr.map((data, index) => {
          var child = {};
          // console.log(index + '----' + data[1]);
         //
          child["value"] = index;
          child["label"] = data[0];
          
          child["multiple"] = false;
          child["children"] = new Array();
          var data1 = data[1];
          var subArr = child["children"];
          Object.keys(data1).forEach(key => {
            var subChild = {};
            subChild["value"] = key;
            subChild["label"] = key;
            subChild["multiple"] = false;
            subChild["children"] = new Array();
            var threeArr = subChild["children"];
            Object.keys(data1[key]).forEach(subKey => {
              var threeChild = {};

              var location = data1[key][subKey];
              threeChild["value"] = location.areaCode;
              threeChild["label"] = location.area;
              threeChild["multiple"] = true;
           
              threeArr.push(threeChild);
            });
            subArr.push(subChild);
          });
          lougeArr.push(child);
        });
        // console.log(lougeArr)
        this.options = lougeArr;
      });
    },
    //经销商选择上传
    
    getSelected(val) {
      this.selectGroups = val;
      this.configTips = `已选择${val.length}个分组`;
    },
    //店铺选择上传
    subd() {
      
      // console.log(this.value4[0].getHours(),this.value4[0].getMinutes())
      var element=''
      if(this.formLabelAlign.locid.length==3){
        for (let index = 2; index < this.formLabelAlign.locid.length; index++) {
         element = this.formLabelAlign.locid[index];
        
      }
      }else{
         
      for (let index = 2; index < this.formLabelAlign.locid.length; index++) {
         element = this.formLabelAlign.locid[index]+','+element;
        
      }

      }
      console.log(element)
      var selectGroups=this.selectGroups
          // selectGroups=selectGroups.join()
      if (this.value4[0].getHours() < 10) {
        var sa = "0" + this.value4[0].getHours();
      } else {
        var sa = this.value4[0].getHours();
      }
      if (this.value4[0].getMinutes() < 10) {
        var st = "0" + this.value4[0].getMinutes();
      } else {
        var st = +this.value4[0].getMinutes();
      }
      if (this.value4[1].getHours() < 10) {
        var sc = "0" + this.value4[1].getHours();
      } else {
        var sc = this.value4[1].getHours();
      }
      if (this.value4[1].getMinutes() < 10) {
        var sg = "0" + this.value4[1].getMinutes();
      } else {
        var sg = +this.value4[1].getMinutes();
      }
      // console.log(this.formLabelAlign.name)
      // console.log( this.formLabelAlign.idcard)
      // console.log(this.formLabelAlign.mobile)
      // console.log(this.formLabelAlign.sex)
      // console.log(this.formLabelAlign.cayegotyId)
      // console.log(this.formLabelAlign.roleId)
      // console.log(this.formLabelAlign.dname)
      // console.log(this.imageUrl)
      // console.log(this.formLabelAlign.dtime)
      // console.log(this.formLabelAlign.dregion)
      // console.log(this.formLabelAlign.dizhi)
      // console.log(sa + ":" + st)
      // console.log(sc + ":" + sg)
      var storesubmit = false;
      if (
        !this.formLabelAlign.name ||
        !this.formLabelAlign.idcard ||
        !this.formLabelAlign.mobile ||
        !this.formLabelAlign.sex ||
        !this.formLabelAlign.cayegotyId
      ) {
        this.$message.error("经销商信息不正确");
      }else{
        console.log(this.formLabelAlign.dtime==this.formLabelAlign.mobile)
        console.log(this.formLabelAlign.dtime=='')
        if(this.formLabelAlign.dtime==this.formLabelAlign.mobile || this.formLabelAlign.dtime==''){
          
          
           var nameareg = /^[\u4e00-\u9fa5]{2,4}$/;
           var mimareg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
           var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
          
          if(phoneReg.test(this.formLabelAlign.mobile)&&nameareg.test(this.formLabelAlign.name)&&mimareg.test(this.formLabelAlign.idcard)){
                this.formLabelAlign.name = this.formLabelAlign.name.replace(/\s*/g,"");          
        var params = new URLSearchParams();
        params.append("name", this.formLabelAlign.name);
        params.append("idCard", this.formLabelAlign.idcard);
        params.append("mobile", this.formLabelAlign.mobile);
        params.append("sex", this.formLabelAlign.sex);
        params.append("locid", element);
        params.append("cayegotyId", this.formLabelAlign.cayegotyId);
        params.append("roleId", this.formLabelAlign.roleId);
        params.append("shopName", this.formLabelAlign.dname);
        params.append("shopLogo", this.imageUrl);
        params.append("phone", this.formLabelAlign.dtime);
        params.append("category", this.formLabelAlign.dregion);
        params.append("detail", "测试数据");
        params.append("addr", this.formLabelAlign.dizhi);
        params.append("opentime", sa + ":" + st);
        params.append("closetime", sc + ":" + sg);
        // console.log(this.formLabelAlign.sex, this.formLabelAlign.cayegotyId);
        this.dataApi.ajax(
          "post",
          "/admin/verify/applyForAagent",
          params,
          res => {
            if (res.code == 0) {
              this.$message({
                message: "恭喜你,提交成功",
                type: "success"
              });
            } else {
              this.$message.error(res.msg);
            }
          }
        );


          }else{
            this.$message.error('信息填写不正确');
          }



     }else{

        this.$message.error('经销商与店铺手机好不一致');


     }
      }
     
     
      
     
    },
    //节点选择
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1"
        },
        {
          id: 9,
          label: "三级 1-1-1"
        }
      ]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
  
    Upload(file) {
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
          this.imageUrl = result.url;
        });
      // var storeAs = "upload-file" + "/"; //命名空间
      // console.log(" => " + storeAs);
      // client
      //   .multipartUpload(storeAs, file)
      //   .then(function(result) {
      //     console.log(result);
      //     console.log(result.url);
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
    },
    imgChange (files) {
        if (files) {
          console.log(files)
         this.Upload(files[0])
        }
      },
      

  },
  mounted() {
    this.catchdata();
    this.catchdatd();
  }
};
</script>

<style scoped>
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
.box-card {
  width: 100%;
  margin: 0;
}
.tit {
  text-align: left;
  line-height: 80px;
  height: 80px;
  border-bottom: 1px solid #cccccc;
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
</style>