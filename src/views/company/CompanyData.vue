<template>
  <div>
    <el-card class="box-card">
      <div class="tit">经销商信息</div>
      <div class="titcon">
    <el-form label-position="top" label-width="80px" :model="formLabelAlign" :inline="true">
        <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.name" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-input v-model="formLabelAlign.idcard" placeholder="请输入真实身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input v-model="formLabelAlign.mobile" placeholder="请输入您的手机号"></el-input>
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
            <el-form-item label="代理区域市" >
            <el-select v-model="formLabelAlign.locid" placeholder="请选择代理的市" >  
             <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange">
                </el-cascader>                 
            </el-select>
           
           
            </el-form-item>
              <el-form-item label="代理区域县">
                <el-select v-model="formLabelAlign.locidb" placeholder="请选择代理的县"  >                       
                </el-select>
               </el-form-item>
              <el-form-item label="代理区域区">
              <el-select v-model="formLabelAlign.locida" placeholder="请选择代理的区"  >                       
              </el-select>
              
            </el-form-item>
            <el-form-item >
                
               </el-form-item>
               <el-form-item >
                
               </el-form-item>
               <el-form-item >
                
               </el-form-item>
        </el-form>
        <div class="btn">
           <el-button type="success" @click="subj">提交申请</el-button>
        </div>
      </div>
    </el-card>
    
    <!-- ==============================================2==================================================================================================================2 -->
    <el-card class="box-card cardtwo">
         <div class="tit">店铺信息</div>
          <el-form label-position="top" label-width="80px" :model="formLabelAlign" :inline="true">
            <el-form-item label="名称" >
          
           <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>
           <el-form-item label="店铺名称">
            <el-input v-model="formLabelAlign.dname"></el-input>
        </el-form-item>
        <el-form-item label="所属品类">
            <el-select v-model="formLabelAlign.dregion" placeholder="活动区域">
            <div v-for="(item,index) in cayegotyIdlist" :key="index">
                   <el-option :label="item.categoryName" :value="item.id+1"></el-option>
              </div>
            </el-select>
        </el-form-item>
          <el-form-item label="店家电话">
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
              placeholder="选择时间范围">
            </el-time-picker>
           </el-form-item>
           
        </el-form>
        <div class="btn">
           <el-button type="success" @click="subd">提交申请</el-button>
        </div>
    </el-card>
  </div>
</template>

<script>

import axios from 'axios'
import aliUpload from "../../components/public/uploader";
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'

export default {
  name: "companydata",
   components:{
            aliUpload
        },
  data() {
    return {
       formLabelAlign: {
          name: '',
          region: '',
          mobile: '',
          locid: '',
          locida:'',
          locidb:'',         
          dregion:'',
          sex:'',
          jbc:'',
          idcard:'',
          cayegotyId:'',
          dname:'',
          dregion:'',
          dizhi:'',
          dtime:'',
          detail:'',
          roleId:'A',
          categoryName:'',
          
        },
        data:{noticeImage:[]},
          value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          imageUrl: '',
          options: regionDataPlus,
        selectedOptions: [],
       cayegotyIdlist:[],
       //节点数据
      shenglist:[],
      shilist:[],
      qulist:[],
      optionsMessage:[],
      options:[],

     uploadUrl:[],
    uploadId:'file',
    uploadCode:0
    };
     
  },
   watch:{
            uploadCode(val){
                console.info(val)
            }
        },
  // computed: {
  //   shia: function () {
  //       console.log(this.locid)
  //   }
  // },
  methods: {
       handleChange (value) {
        console.log(value)
      },
      //获取店铺 分类  /shop/shopCategoryList
      catchdata(){
       
         this.dataApi.ajax('get','/admin/verify/category', {},cb => {    
                        // console.log(cb.data)
                        // console.log('获取店铺分类')
                        
                        this.cayegotyIdlist=cb.data
                 });
          
           
                      
          },
    //获取地址 分类  /admin/verify/getLocation
      catchdatd(){
   this.dataApi.ajax('get','/admin/verify/getLocation',{},cb => {    
                        console.log(Object.entries(cb.data))
                         this.shenglist=Object.entries(cb.data)
                           
                 });             
        },
      //经销商选择上传
        subj(){
      
     
      
      var data={
          name: this.formLabelAlign.name,
          idCard: this.formLabelAlign.idcard,
          mobile: this.formLabelAlign.mobile,
          sex: this.formLabelAlign.sex,
          locid:'110101',
          cayegotyId: this.formLabelAlign.cayegotyId,
          roleId: this.formLabelAlign.roleId,

      }
 
      // this.dataApi.ajax('post','/admin/verify/applyForAagent',data, res => {    
      //                   console.log(res)
      //            });
        },
         //店铺选择上传
           subd(){  
          
            // console.log(this.value4[0].getHours(),this.value4[0].getMinutes())  
           if(this.value4[0].getHours()<10){
            var  sa='0'+this.value4[0].getHours()
           
           }else{
             var  sa=this.value4[0].getHours()
           
           }
           if(this.value4[0].getMinutes()<10){
                var st='0'+this.value4[0].getMinutes()
           }else{
                var st=+this.value4[0].getMinutes()
           }

           if(this.value4[1].getHours()<10){
            var  sc='0'+this.value4[1].getHours()
           
           }else{
             var  sc=this.value4[1].getHours()
           
           }
           if(this.value4[1].getMinutes()<10){
                var sg='0'+this.value4[1].getMinutes()
           }else{
                var sg=+this.value4[1].getMinutes()
           }
          //  console.log(sc+":"+sg)
    
      var params = new URLSearchParams()
      params.append('name',this.formLabelAlign.name)     
      params.append('idCard', this.formLabelAlign.idcard)
      params.append('mobile', this.formLabelAlign.mobile)
      params.append('sex', this.formLabelAlign.sex)
      params.append('locid', '110101')
      params.append('cayegotyId', this.formLabelAlign.cayegotyId)
      params.append('roleId', this.formLabelAlign.roleId)
      params.append('shopName', this.formLabelAlign.dname)
      params.append('shopLogo', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2147322031,325904174&fm=27&gp=0.jpg')
      params.append('phone', this.formLabelAlign.dtime)
      params.append('category', this.formLabelAlign.dregion)
      params.append('detail', '测试数据')
      params.append('addr', this.formLabelAlign.dizhi)
      params.append('opentime', sa+':'+st)
      params.append('closetime', sc+":"+sg)

     console.log(this.formLabelAlign.sex,this.formLabelAlign.cayegotyId)
      this.dataApi.ajax('post','/admin/verify/applyForAagent',params,res => {    
                        console.log('提交执行')
                        console.log(res)
                 });
        },
        //节点选择
        getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      //图片上传
      uploading(f) {
        console.log(f.file.name)
              //  this.dataApi.upload('upload', f.file, res => {
              //       if (res.respState == 'S') {
              //           f.images.splice(f.index,1,res.localPath)
              //       }
              //   });
              // this.dataApi.upload(f.file.name,function(res){
              //   console.log('res')
              // },function(res){
              //   console.log('res')
              // }
              // )
        },
         handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res)
        console.log(file.name)
        this.dataApi.upload(file)
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
         const isJPG =true;
        const isLt2M = true;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        return isJPG && isLt2M;
      },
        
  },
  mounted(){
    this.catchdata()
    this.catchdatd()
  }
};
</script>

<style scoped>
.box-card {
  width: 91%;
  margin: 0 ;
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
    border-color: #409EFF;
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
 .el-form-item{
   width: 20%;
    text-align: left;
  }
  .btn{
    overflow: hidden;
    float: left;
    padding-left: 8%;
    padding-top:2%; 
     padding-bottom:2%;
  }
  .cardtwo{
    margin-top: 22px;
  }
</style>
