<template>
  <div>
    <div class="bg">
     
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
           
              <img src="../../assets/img/logo.png" alt="" class="logo userlogo"> 
              
          </div>
        </el-col>
     
    </div>
  </div>
</template>
<style scoped>

.logo{
    width: 30px;
    height: 30px;
    display: inline;
    margin:0 5px;
    vertical-align: middle;
    
}
.userlogo{
border-radius:30px; 
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

