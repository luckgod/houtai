<template>
  <div>
    <div class="bg">
      <el-row >
        <el-col :span="4">
          <div class="grid-content bg-purple"  style=" text-align: left;">
              <img src="../../assets/img/logo.png" alt="" class="logo">
              <span class="tit">科蚪游戏-后台管理系统</span>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
              <span class="tit">{{msg}}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style=" text-align: right;">
              <span  class="tit" >你好！{{name}}</span>
           
              <img src="../../assets/img/logo.png" alt="" class="logo "> 
              
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
/* .bg{
  height: 90px;
}
.logo{
    width: 35px;
    height: 35px;
    display: inline;
    vertical-align: middle;
}
.tit{
    line-height: 90px;
    height: 90px;
}

.logoa{
    border-radius: 50%;
}
.el-header{
    height:90px;
    background:#2a334b;
    color: #ffffff;
   
}
.grid-content .bg-purple{
   float: left;
  
} */
.logo{
    width: 35px;
    height: 35px;
    display: inline;
    vertical-align: middle;
}


</style>
<script>
export default {
  name: "NavTop",
  data(){
      return{
          msg:'经销商/店铺申请',
          name:'笑笑',
      }
  }
};
</script>

