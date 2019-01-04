<template>
  <div>
     <div class="tit">
        <span>科蚪游戏 </span>
        <span> 后台管理系统</span>
    </div>
      <div class="seone" key="2">
          
    <el-form class="demo-ruleForm">
       
          <el-form-item   class="aa">
            <el-input  placeholder="你的手机号码" v-model="phone"></el-input>
           <!-- <i  class="digweib el-icon-more" ></i> -->
        </el-form-item>
         <el-form-item   class="bb">
            <el-input  placeholder="验证码" v-model="cod"></el-input>
            <el-button type="primary" class="weizhi"  @click="reg" v-show="sendAuthCode" >发送</el-button>
             <el-button type="primary" class="weizhi" style="background:#ccc" v-show="!sendAuthCode" >{{auth_time}}S</el-button>
        </el-form-item>
        <el-form-item   class="aa">
            <el-input  placeholder="你的密码"  v-model="worda"></el-input>
         
        </el-form-item>
        <el-form-item   class="aa">
            <el-input  placeholder="确认你的密码"  v-model="word"></el-input>
           <!-- <i  class="digweib el-icon-mobile-phone" ></i> -->
        </el-form-item>            
        <el-form-item>
            <el-button type="primary" style="width: 86%; height: 58px;font-size: 20px;background: #2a334b;font-weight: 100;" @click="creg">确认提交</el-button>
           
        </el-form-item>
        </el-form>
        <div class="setwoa" key="21">
             <span @click="jumpr">返回登录页</span>
              
    </div>
</div>
    
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'cforgetpassword',
    data(){
        return{
            phone:'',
            worda:'',
            cod:'',
            word:'',
            sendAuthCode:true,
            auth_time:80,
        }
    },
    methods: {
      jumpr(){
         
          this.$router.push('/login')
      },
    catchdata(){
       
     console.log(this.word)
     
    axios.get('http://192.168.100.120:8082/user/forgetPassword', {
    params: {
      mobile:this.phone,
      code:this.cod,
      password:this.word,
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });             
                 
    },
    catcode(){
      console.log(this.phone)
      var params = new URLSearchParams()
      params.append('mobile',this.phone)
 
     this.dataApi.ajax('get','/user/sms',params, res => {    
                       
                       if(res.code==0){
                         this.$message({
                                        message: '短信发送成功',
                                        type: 'success'
                                      });
                        this.sendAuthCode = false;
                        this.auth_time = 80;
                        var auth_timetimer =  setInterval(()=>{
                            this.auth_time--;
                            if(this.auth_time<=0){
                                this.sendAuthCode = true;
                                clearInterval(auth_timetimer);
                            }
                            }, 1000);

                       }
                       
                 });
    },
    reg(){
       this.catcode()
    },
    creg(){
         this.catchdata()
    }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.seone{
    margin:5% 6%;
   height: 383px;
}
.tit {
  font-size: 30px;
  color: #333333;
  margin:60px 110px 26px 0; 

}
.tit span:nth-child(1){
    font-weight: 400;
}
.tit span:nth-child(2){
    font-weight: 100;
}


.bb{
    position: relative;
}
.setwoa {
padding-left:34px; 
  font-size: 18px;
  border-radius: 5px;
}
.setwoa span:nth-child(1) {
float: left;
cursor: pointer;
cursor: pointer;
color: #088cee;
font-weight: 100;
text-decoration:underline;
}
.weizhi{
width: 29%;
height: 70px;
font-size: 22px;
position: absolute;
right: 35px;
top: 0;
font-weight: 100;
}
</style>
<style>
.aa .el-input__inner {
  height: 70px;
  color:#243333;
    
  width:420px;  
  font-size: 22px;
  font-weight:200;
  border:1px solid #c1c1c1;
  
}
.el-form-item{
margin-bottom: 10px;
}
.el-form-item__content{
    line-height:0;
}
.bb .el-input__inner{
width:55%;
margin-left:35px;
float: left;
 height: 70px;
  color:#243333;
  font-size: 22px;
  font-weight:200;
  border:1px solid #c1c1c1;
}
</style>

