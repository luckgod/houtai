<template>
  <div>
    <div class="tit">
        <span>科蚪游戏 </span>
        <span> 后台管理系统</span>
    </div>
    <div class="seone" key="1">
      <el-form class="demo-ruleForm" ref="form" :rules="rules" :model="form">
        <el-form-item class="aa" prop="phone">

          <el-input class="digweia" placeholder="请输入手机号" v-model="form.phone" auto-complete="true" ></el-input>
        
        </el-form-item>
      </el-form>
      <el-form class="demo-ruleForm" ref="form" :model="form" :rules="rules"  >
        <el-form-item class="aa" prop="word">

          <el-input class="digweic" placeholder="请输入密码" v-model="form.word"   type="password"></el-input>
       
        </el-form-item>
      </el-form>
      <el-form class="demo-ruleForm"  :model="form">
        <el-form-item class="fg">
          <el-button
            type="primary"
          
            style="width: 201px; height: 70px;font-size: 24px;background: #2a334b; font-weight: 400;"
          >注 册</el-button>
           <el-button
            type="primary"
             @click="log"
            style="width: 201px; height: 70px;font-size: 24px;background:#088cee; font-weight: 400;"
          >登 录</el-button>
        </el-form-item>
      </el-form>
      <div class="setwoa" key="12">
        <span >忘记密码？</span>
        <span >立即找回</span>
      </div>
    </div>
  </div>
   <!-- // w560px
    //h460 -->
</template>

<script>

export default {
  name: "clogin",
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
          callback()
        }
      }, 1000);
    };
    var mimareg = /^[a-zA-Z0-9]{6,16}$/;
    var mimaregPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("号码不能为空!!"));
      }
      setTimeout(() => {
        if (!mimareg.test(value)) {
          callback(new Error("格式有误"));
        } else {
          callback()
        }
      }, 1000);
    };
    return {
      form: {
        phone: "",
        word:"",
      },
      // 校验规则
      rules: {
        // 校验手机号码，主要通过validator来指定验证器名称
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        word: [{ required: true, validator: mimaregPhone, trigger: "blur" }],
       
      },
       
    };
  },

  methods: {
    jumpr() {
      // this.$router.push('companydata')
      // this.$router.push("/register");
    },
    jumpf() {
      // this.$router.push('companydata')
      // this.$router.push("/forgetpassword");
    },
    catchdata(){
      // console.log(this.form.phone)
      //  console.log(this.form.word)
        var mimareg = /^[a-zA-Z0-9]{6,16}$/;
         var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!phoneReg.test(this.form.phone)) {
          this.$message.error('手机号格式有误');
        } 
         if (!mimareg.test(this.form.word)) {
           this.$message.error('密码格式有误');
        } 
      if(phoneReg.test(this.form.phone)&&mimareg.test(this.form.word)){
          var params = new URLSearchParams()
      params.append('mobile', this.form.phone)
      params.append('password', this.form.word)

 
      this.dataApi.ajax('post','/user/login',params, res => { 
                      console.log(res)
                        if(res.code==0){
                            
                        function setCookie(name, value, day) {
                                var oDate = new Date();
                                oDate.setDate(oDate.getDate() + day);
                                document.cookie = name + '=' + value + ';expires=' + oDate;
                                }
                                setCookie('token',res.data.token)
                                setCookie('user',JSON.stringify(res.data.user))
                                this.$router.push('companydata')
                                this.$message({
                                        message: '恭喜你,登陆成功',
                                        type: 'success'
                                      });
                           
                        }else{
                            console.log(res)
                           this.$message.error(res.msg);
                           
                        }
                  });     
      }  
      
    },
    log(){
       this.catchdata()
    },
    keyDownLogin(e) {
                if (!e) {
                    e = window.event;
                }
                if ((e.keyCode || e.which) === 13) {
                  this.catchdata()
                }
            },
  },
  mounted(){
     document.addEventListener('keydown', this.keyDownLogin)
  },
   created() {
            document.addEventListener('keydown', this.keyDownLogin)
        },
  destroyed() {
            document.removeEventListener('keydown', this.keyDownLogin)
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
   
<style scoped>
.seone {
  margin:26px 70px 30px;
    
  height: 220px;
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
.digweia {
  position: relative;
  
}
.digweib {
  display: inline-block;
  width: 60px;
  height: 40px;
  position: absolute;
  top: 5px;
  right: 5px;
  text-align: center;
  border-left: #dfe3e6 1px solid;
  font-size: 19px;
  text-align: center;
  line-height: 40px;
  
}

.setwoa {
 
  padding: 0 3px;
  height: 65px;
 
  font-size: 18px;
  border-radius: 5px;
}
.setwoa span:nth-child(1) {
  float: left;
  cursor: pointer;
}
.setwoa span:nth-child(2) {
 float: left;
  cursor: pointer;
  color: #088cee;
    font-weight: 100;
    text-decoration:underline;
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
/* .el-form-item{
margin-bottom: 10px;
} */
</style>

