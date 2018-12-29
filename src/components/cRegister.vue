<template>
  <div>
       <div class="tit">
        <span>科蚪游戏 </span>
        <span> 后台管理系统</span>
    </div>
      <div class="seone" key="3">
          
    <el-form class="demo-ruleForm">
        <el-form-item   class="aa">
            <el-input  placeholder="你的昵称" v-model="name"></el-input>
           <!-- <i  class="digweib el-icon-mobile-phone" ></i> -->
        </el-form-item>
          <el-form-item   class="aa">
            <el-input  placeholder="你的手机号码" v-model="phone"></el-input>
           <!-- <i  class="digweib el-icon-more" ></i> -->
        </el-form-item>
        <div style="line-height:0!important;">
                 <el-form-item   class="bb" >
            <el-input  placeholder="验证码" v-model="cod" ></el-input>
             <el-button type="primary" class="weizhi"  @click="reg" >验证码{{timey}}S</el-button>
        </el-form-item>
        </div>
        
        <el-form-item   class="aa">
            <el-input type='password'  placeholder="你的密码" v-model='word'></el-input>
         
        </el-form-item>
                    
        <el-form-item>
            <el-button type="primary" @click="catchdata" style="width: 86%; height: 58px;font-size: 20px;background: #2a334b;font-weight: 100;">注  册</el-button>
           
        </el-form-item>
        </el-form>
        <div class="setwoa" key="32">
             <span @click="jumpr"> 返回登录页</span>
             
              
    </div>
</div>
     
  </div>
</template>

<script>

  export default {
    name: 'register',
    data(){
        return{
            phone:'',
            name:'',
            cod:'',
            word:'',
            timey:80,

        }
    },
  
    methods: {
      jumpr(){
          this.$router.push('/login')
      },
      catchdata(){
       
      var params = new URLSearchParams()
      params.append('code', this.cod)
      params.append('mobile', this.phone)
      params.append('name', this.name)
        params.append('password', this.word)
 
      this.dataApi.ajax('post','/user/register',params, res => {    
                        console.log(res)
                 });
    },
    catcode(){
      console.log(this.phone)
      var params = new URLSearchParams()
      params.append('mobile',this.phone)
     
    //   this.dataApi.ajax('get','/user/sms',{'mobile':this.phone}, res => {    
    //                     console.log(res)
    //              });
    axios.get('http://192.168.100.120:8082/user/sms', {
    params: {
      mobile:this.phone
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
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
  
   height: 365px;
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
font-weight: 100;
top: 0;
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

