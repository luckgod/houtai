<template>
  <div>
    <div class="tit">
      <span>科蚪游戏</span>
      <span>后台管理系统</span>
    </div>
    <div class="seone" key="3">
      <el-form class="demo-ruleForm" :rules="rules" :model="form">
        <el-form-item class="aa" prop="name">
          <el-input placeholder="请输入你的昵称 " v-model="form.name" maxlength="20" min="1"></el-input>
          <!-- <i  class="digweib el-icon-mobile-phone" ></i> -->
        </el-form-item>
        <el-form-item class="aa" prop="phone">
          <el-input placeholder="请输入你的手机号码" v-model="form.phone"></el-input>
          <!-- <i  class="digweib el-icon-more" ></i> -->
        </el-form-item>
        <!-- <div style="line-height:0!important;"> -->
        <el-form-item class="bb" prop="cod">
          <el-input placeholder="请输入验证码" v-model="form.cod"></el-input>
          <el-button type="primary" class="weizhi" @click="reg" v-show="sendAuthCode">发送</el-button>
          <el-button
            type="primary"
            class="weizhi"
            style="background:#ccc"
            v-show="!sendAuthCode"
          >{{auth_time}}S</el-button>
        </el-form-item>
        <!-- </div> -->
        <el-form class="demo-ruleForm" ref="form" :model="form" :rules="rules">
          <el-form-item class="aa" prop="word">
            <el-input type="password" placeholder="请输入你的八位数密码" v-model="form.word" maxlength="8" min="8"></el-input>
          </el-form-item>
        </el-form>
        <el-form-item>
          <el-button
            type="primary"
            @click="catchdata"
            style="width: 86%; height: 58px;font-size: 20px;background: #2a334b;font-weight: 100;"
          >注 册</el-button>
        </el-form-item>
      </el-form>
      <div class="setwoa" key="32">
        <span @click="jumpr">返回登录页</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
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
    var mimareg = /^[a-zA-Z0-9]{8,8}$/;
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
    var nameareg = /^[\d\w\u4e00-\u9fa5,]{2,8}$/;
    var nameregPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("呢称不能为空!!"));
      }
       setTimeout(() => {
        if (!nameareg.test(value)) {
          callback(new Error("2到8位 不可输入标点符号"));
        } else {
          callback();
        }
      }, 1000);
    };
    var codreg = /^\d{4}$/;
    var codPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空!!"));
      }
      setTimeout(() => {
        if (!codreg.test(value)) {
          callback(new Error("格式有误"));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      form: {
        phone: "",
        name: "",
        cod: "",
        word: ""
      },
      sendAuthCode: true,
      auth_time: 60,
      rules: {
        // 校验手机号码，主要通过validator来指定验证器名称
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        word: [{ required: true, validator: mimaregPhone, trigger: "blur" }],
        name: [{ required: true, validator: nameregPhone, trigger: "blur" }],
        cod: [{ required: true, validator: codPhone, trigger: "blur" }]
      }
    };
  },

  methods: {
    jumpr() {
      this.$router.push("/");
    },
    catchdata() {
       var nameareg = /^[\d\w\u4e00-\u9fa5,]{2,8}$/;
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      var mimareg = /^[a-zA-Z0-9]{8,8}$/;
      var codreg = /^\d{4}$/;
      if (!nameareg.test(this.form.name)) {
        this.$message.error("昵称格式有误");
      }
      if (!phoneReg.test(this.form.phone)) {
        this.$message.error("手机号格式有误");
      }
      if (!codreg.test(this.form.cod)) {
        this.$message.error("验证码格式有误");
      }
      if (!mimareg.test(this.form.word)) {
        this.$message.error("密码格式有误");
      }
    if(nameareg.test(this.form.name)&&phoneReg.test(this.form.phone)&&codreg.test(this.form.cod)&&mimareg.test(this.form.word)){
        var params = new URLSearchParams();
      params.append("code", this.form.cod);
      params.append("mobile", this.form.phone);
      params.append("name", this.form.name);
      params.append("password", this.form.word);

      this.dataApi.ajax("post", "/user/register", params, res => {
        if (res.code == 0) {
          this.$message({
            message: "注册成功",
            type: "success"
          });
          this.$router.push('/')
        } else {
          this.$message.error(res.msg);
        }
      });
    }else{
       this.$message.error('请输入真实数据');
    }
      
    },
    catcode() {
      // console.log(this.phone)
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!phoneReg.test(this.form.phone)) {
        this.$message.error("手机号格式有误");
      } else {
        var params = new URLSearchParams();
        params.append("mobile", this.form.phone);

        this.dataApi.ajax("get", "/user/sms", params, res => {
          if (res.code == 0) {
            this.$message({
              message: "短信发送成功",
              type: "success"
            });
            this.sendAuthCode = false;
            this.auth_time = 60;
            var auth_timetimer = setInterval(() => {
              this.auth_time--;
              if (this.auth_time <= 0) {
                this.sendAuthCode = true;
                clearInterval(auth_timetimer);
              }
            }, 1000);
          } else {
            // console.log(res);
            this.$message.error(res.msg);
          }
        });
      }
    },
    reg() {
      this.catcode();
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
  margin: 5% 6%;

  height: 365px;
}
.tit {
  font-size: 30px;
  color: #333333;
  margin: 60px 110px 26px 0;
}
.tit span:nth-child(1) {
  font-weight: 400;
}
.tit span:nth-child(2) {
  font-weight: 100;
}

.setwoa {
  padding-left: 34px;
  font-size: 18px;
  border-radius: 5px;
}
.setwoa span:nth-child(1) {
  float: left;
  cursor: pointer;
  cursor: pointer;
  color: #088cee;
  font-weight: 100;
  text-decoration: underline;
}

.weizhi {
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
  color: #243333;

  width: 420px;
  font-size: 22px;
  font-weight: 200;
  border: 1px solid #c1c1c1;
}
/* .el-form-item{
margin-bottom: 10px;
} */
.el-form-item__content {
  line-height: 0;
}
.bb .el-input__inner {
  width: 55%;
  margin-left: 35px;
  float: left;
  height: 70px;
  color: #243333;
  font-size: 22px;
  font-weight: 200;
  border: 1px solid #c1c1c1;
}
.el-form-item__error {
  padding-left: 40px;
}
</style>

