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
        
         <el-form-item label="代理区域">
            <el-select v-model="formLabelAlign.locid" placeholder="请选择您想要代理的地方">
            <el-option style="overflow:hidden;"> 
                  <el-tree
                    :data="data2"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    ref="tree"
                    highlight-current
                    :props="defaultProps">
                  </el-tree>
            </el-option>
          
            </el-select>
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
            <el-form-item label="名称">
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
           <el-button type="success">提交申请</el-button>
        </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "companydata",
  data() {
    return {
       formLabelAlign: {
          name: '',
          region: '',
          mobile: '',
          locid: '',         
          dregion:'',
          sex:'',
          jbc:'',
          idcard:'',
          cayegotyId:'',
          dname:'',
          dregion:'',
          dizhi:'',
          dtime:'',
          roleId:'A',
          
        },
          value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          imageUrl: '',
         
       cayegotyIdlist:[],
       //节点数据
            data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
     
    };
     
  },
  methods: {
       handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //获取店铺 分类  /shop/shopCategoryList
      catchdata(){
       
         this.dataApi.ajax('get','/shop/shopCategoryList',{}, cb => {    
                        console.log(cb)
                        this.cayegotyIdlist=cb
                 });
          
           
                      
          },
    //获取地址 分类  /admin/verify/getLocation
      catchdatd(){
       
         
          this.dataApi.ajax('get','/admin/verify/getLocation',{},cb => {    
                        console.log(cb)
                 });
          
                
                      
        },
      
        subj(){
      
      var params = new URLSearchParams()
      params.append('name', this.formLabelAlign.name)
      params.append('idCard', this.formLabelAlign.idcard)
      params.append('mobile', this.formLabelAlign.mobile)
      params.append('sex', this.formLabelAlign.sex)
       params.append('locid', this.formLabelAlign.locid)
      params.append('cayegotyId', this.formLabelAlign.cayegotyId)
      params.append('roleId', this.formLabelAlign.roleId)
      
      var data={
          name: this.formLabelAlign.name,
          idCard: this.formLabelAlign.idcard,
          mobile: this.formLabelAlign.mobile,
          sex: this.formLabelAlign.sex,
          locid: this.formLabelAlign.locid,
          cayegotyId: this.formLabelAlign.cayegotyId,
          roleId: this.formLabelAlign.roleId,

      }
 
      this.dataApi.ajax('post','/admin/verify/applyForAagent',data, res => {    
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
      }
     
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
