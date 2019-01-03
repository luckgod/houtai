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
             <!-- <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange">
                </el-cascader>                  -->
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
           <el-button type="success" @click="subd">正式发布</el-button>
        </div>
      </div>
    </el-card>
    
    <!-- ==============================================2==================================================================================================================2 -->
 
  </div>
</template>

<script>


export default {
  name: "ReleaseManagement",
  //  components:{
  //           aliUpload
  //       },
  data() {
    return {
       formLabelAlign: {
         
          
        },
        cayegotyIdlist:'',
       
    };
     
  },
 
  methods: {      
      //获取店铺 分类  /shop/shopCategoryList
      catchdata(){
       
         this.dataApi.ajax('get','/admin/verify/category', {},cb => {    
                        // console.log(cb.data)
                        // console.log('获取店铺分类')
                        
                        this.cayegotyIdlist=cb.data
                 });
          
           
                      
          },
    //获取地址 分类  /admin/verify/getLocation
    
    
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
        


        
  },
  mounted(){
    this.catchdata()
  
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
