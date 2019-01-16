<template>
  <div>
    <el-card class="box-card">
      <div class="tit">经销商信息
        <!-- <div class="chose"> -->
          <!-- <el-dropdown> -->
      
          <!-- <multiCascader :options="options" @on-selected="getSelected" :inputValue="configTips" placeholder="选择可见对象"></multiCascader> -->
        <!-- </div> -->
      </div>

      <div class="titcon">
        <el-form
          label-position="top"
          :model="formLabelAlign"
          :inline="true"
          ref="formLabelAlign"
          label-width="100px"
        >
          <!-- 图片上传 ============================================================================================================-->
          <div class="buju">
            <div class="bujus">
                 <el-select v-model="selectGroups" clearable placeholder="选择可见对象" :multiple="true" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <el-form-item label="封面图片">
              <div class="imgup">
                <image-uploader @onChange="imgChangea" :maxSize="maxSize" placeholder="选择或拖放图片"></image-uploader>
                <span class="descimg" v-if="imageUrla==''">点击右侧上传图片</span>
              </div>
            </el-form-item>

            <!-- 图片上传结束。。。。。 ========================================================================================================-->
            <el-form-item label="主标题">
              <div>
                <el-input
                  v-model="formLabelAlign.maintitle"
                  placeholder="请输入主标题（15字以内）"
                  size="medium"
                ></el-input>
              </div>
            </el-form-item>
            
            <el-form-item label="副标题">
              <el-input v-model="formLabelAlign.subTitle" placeholder="请输入副标题（30字以内）"></el-input>
            </el-form-item>
            <el-form-item label="类目选择">
              <el-select v-model="formLabelAlign.agentGrades" placeholder="选择类目">
                <div v-for="(item,index) in cayegotyIdlist" :key="index">
                  <el-option :label="item.categoryName" :value="item.id"></el-option>
                </div>
              </el-select>
            </el-form-item>
          </div>
          <!-- 图片上传 ============================================================================================================-->
          <div style="display:block">
            <el-form-item label="正文主图">
              <div class="imgup">
                <image-uploader @onChange="imgChangeb" :maxSize="maxSize" placeholder="选择或拖放图片"></image-uploader>
                <span class="descimg" v-if="imageUrla==''">点击右侧上传图片</span>
              </div>
            </el-form-item>
            <!-- 图片上传结束。。。。。 ========================================================================================================-->
            <!-- 图片上传 ============================================================================================================-->
            <el-form-item label="正文插图" style="margin:0;">
              <div class="imgup">
                <image-uploader @onChange="imgChangec" :maxSize="maxSize" placeholder="选择或拖放图片"></image-uploader>
                <span class="descimg" v-if="imageUrlc==''">点击右侧上传图片</span>
              </div>
            </el-form-item>
            <!-- 图片上传结束。。。。。 ========================================================================================================-->
            <el-form-item label></el-form-item>
            <el-form-item label></el-form-item>
          </div>
          <div style="display:block">
            <el-form-item label="正文内容" prop="content">
              <el-input
                type="textarea"
                v-model="formLabelAlign.content"
                style="width:800px;min-height:100px"
              ></el-input>
            </el-form-item>
            <el-form-item label></el-form-item>
            <el-form-item label></el-form-item>
            <el-form-item label></el-form-item>
          </div>

          <el-form-item label="物料图片" style=" width:60%;margin-right:22%;">
            <div class="imgup">
              <mostImageUploader @onChange="mostimgChange" :maxSize="maxSize" placeholder="选择或拖放图片"></mostImageUploader>
              <span class="descimga" v-if="imageUrlm==''">点击右侧多上传图片</span>
              <div class="materialimgwarp">
                <ul class="materialimglist">
                  <li v-for="(item,index) in imageUrlm" :key="index">
                    <img :src="item" class="uploader-delete-btnimg" alt>
                    <img
                      src="../../assets/round_close.svg"
                      class="uploader-delete-btn"
                      @click="deleteImg(index)"
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- <el-dialog :visible.sync="dialogVisible" style="width:48px;height:48px;">
                <img width="100%" :src="dialogImageUrl" alt="" style="width:48px;height:48px;" >
            </el-dialog>-->
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
import { client } from "../../alioss.js";
import multiCascader from "multi-cascader";
import ImageUploader from "../../components/upimg/ImageUploader";
import mostImageUploader from "../../components/upimg/mostImageUploader";
export default {
  name: "ReleaseManagement",
  components: {
    multiCascader,
    ImageUploader,
    mostImageUploader
  },

  data() {
    // 30
    // 60
    // 150
    // 100 张

    return {
      maxSize: 3072,
      rules: {
        // 校验手机号码，主要通过validator来指定验证器名称
      },
      formLabelAlign: {
        maintitle: "",
        subTitle: "",
        content: "",
        agentGrades: ""
      },
      options: [
        {
          value: "1",
          label: "A级经销商"
        },
        {
          value: "2",
          label: "B级经销商"
        },
        {
          value: "3",
          label: "C级经销商"
        }
      ],
      selectGroups: "",
      configTips: "",
      cayegotyIdlist: "",
      imageUrla: "",
      imageUrlb: "",
      imageUrlc: "",
      dialogImageUrl: "",
      dialogVisible: false,
      imglist: [],
      imageUrlm: [],
      imageUrlma: [],
      dataa: [
        {
          label: "Volvo",
          value: 1
        },
        {
          label: "Saab",
          value: 2
        },
        {
          label: "Long long long long long long test",
          value: 2
        }
      ]
    };
  },

  methods: {
    //权限选择
    getSelected(val) {
      this.selectGroups = val;

      this.configTips = `已选择${val.length}个分组`;
    },
    changed(selected) {
      console.log(selected);
    },
    //图片上传
    Uploada(file) {
      var uid = new Date().getTime();
      var fileName = "banner" + uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrla = result.url;
        });
    },

    Uploadb(file) {
      var uid = new Date().getTime();
      var fileName = "banner" + uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrlb = result.url;
        });
    },

    Uploadc(file) {
      var uid = new Date().getTime();
      var fileName = "banner" + uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrlc = result.url;
        });
    },
    Uploadmost(file) {
      // console.log(file)
      // console.log(file[0])
      
      function randomWord(randomFlag, min, max) {
        var str = "";
        var range = min;
        var arr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];

        // 随机产生
        if (randomFlag) {
          range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
          var pos = Math.round(Math.random() * (arr.length - 1));
          str += arr[pos];
        }
        return str;
      }
      for (let index = 0; index < file.length; index++) {
        var uid = new Date().getTime();
        var fileName = "banner" + uid + randomWord(true, 3, 20);
        //定义唯一的文件名，打印出来的uid其实就是时间戳
        var storeAs = "upload-file" + "/";

        client()
          .put(storeAs + fileName, file[index])
          .then(result => {
            // 大功搞成
            //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
            // console.log(result.url);

           this.imageUrlm.push(result.url);
          });
      }
      // console.log(element);
      // this.imageUrlm = element;
      // this.imageUrlma=this.imageUrlm 
      // console.log(this.imageUrlm)
      // console.log(this.imageUrlma)
      // }
    },
    deleteImg(index) {
      this.imageUrlm.splice(index, 1);
    },

    imgChangea(files) {
      if (files) {
        console.log(files);
        this.Uploada(files[0]);
      }
    },
    imgChangeb(files) {
      if (files) {
        console.log(files);
        this.Uploadb(files[0]);
      }
    },
    imgChangec(files) {
      console.log(files);
      if (files) {
        console.log(files);
        this.Uploadc(files[0]);
      }
    },
    mostimgChange(files) {
      if (files) {
        this.Uploadmost(files);
      }
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

    //店铺选择上传
    subd() {
     
      if (this.imageUrla == "") {
        this.$message.error("封面图片有误");
      } else {
        // console.log(this.formLabelAlign.maintitle.length)
        // console.log(this.formLabelAlign.maintitle.length>15)

        var str = this.formLabelAlign.maintitle.replace(/\s*/g, "");
        console.log(str !== "");
        if (this.formLabelAlign.maintitle.length > 15 || str == "") {
          this.$message.error("主标题格式错误");
        } else {
          var stra = this.formLabelAlign.subTitle.replace(/\s*/g, "");
          if (this.formLabelAlign.maintitle.subTitle > 30 || stra == "") {
            this.$message.error("副标题格式错误");
          } else {
            if (this.formLabelAlign.agentGrades == "") {
              this.$message.error("类目无选择");
            } else {
              if (this.imageUrlb == "") {
                this.$message.error("正文主图有误");
              } else {
                if (this.imageUrlc == "") {
                  this.$message.error("正文插图有误");
                } else {
                  var strb = this.formLabelAlign.content.replace(/\s*/g, "");
                  if (
                    this.formLabelAlign.maintitle.subTitle > 150 ||
                    strb == ""
                  ) {
                    this.$message.error("正文内容有误");
                  } else {
                    if (this.selectGroups == "") {
                      this.$message.error("请选择级别");
                    } else {
                      if (this.formLabelAlign.agentGrades == "") {
                        this.$message.error("请选择类目");
                      } else {
                        if (this.imageUrlm.length == 0) {
                          this.$message.error("请选择上传物料");
                        } else {
                          var params = new URLSearchParams();
                          params.append("title", this.formLabelAlign.maintitle);
                          params.append(
                            "subTitle",
                            this.formLabelAlign.subTitle
                          );
                          params.append("content", this.formLabelAlign.content);
                          params.append("mainpic", this.imageUrlb);
                          params.append("subPics", this.imageUrlc);
                          params.append("category", this.imageUrla);
                          params.append(
                            "categoryId",
                            parseInt(this.formLabelAlign.agentGrades)
                          );
                          params.append(
                            "agentGrades",
                            this.selectGroups.join()
                          );

                          params.append("downloadPics", this.imageUrlm.join());

                          this.dataApi.ajax(
                            "post",
                            "/admin/verify/uploadMateriel",
                            params,
                            res => {
                              console.log("提交执行");
                              console.log();
                              if (res.code == 0) {
                                this.$message({
                                  message: "物料发布成功",
                                  type: "success"
                                });
                              }
                            }
                          );
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      // var Saab=''
      // for (let index = 0; index < this.imageUrlm.length; index++) {
      //   const element = this.imageUrlm[index];
      //   Saab  = element+','+Saab

      // }
      // console.log(Saab)
    },

    catchdatf() {
      this.dataApi.ajax("get", "/admin/verify/category", {}, cb => {
        // console.log(cb.data)
        // console.log('获取店铺分类')
        this.cayegotyIdlist = cb.data;
      });
    }
  },
  computed: {
    fullName: function() {
      this.mostimgChange();
      return this.firstName + "" + this.lastName;
    }
  },
  mounted() {
    this.catchdata();
    this.catchdatf();
  }
};
</script>
<style>
.materialimglist {
  overflow: hidden;
}
.materialimglist li {
  float: left;
}
.uploader-delete-btnimg {
  width: 40px;
  height: 40px;
  padding: 4px;
  border-radius: 10px;
}

.materialimgwarp {
  position: absolute;
  top: 0;
  left: 50px;
}
.uploader-delete-btn {
  position: absolute;
  /* top: -10px;
    right: -10px;
    margin: 5px;
    width: 15px;
    height: 15px; */
  width: 16px;

  height: 16px;
  top: 0;
  margin-left: 24px;
}

.imgup {
  height: 41px;
  background: #eee;

  margin-right: 20px;
  line-height: 41px;
  border-radius: 5px;
  position: relative;
}
.descimg {
  position: absolute;
  top: 0;
  font-size: 12px;
  left: 90px;
  display: inline-block;
}
.descimga {
  position: absolute;
  top: 0;
  font-size: 12px;
  right: 100px;
  display: inline-block;
  text-align: center;
}
.el-upload--picture-card {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.el-upload-list__item-thumbnail {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.el-upload-list__item-actions {
  width: 48px !important;
  height: 48px !important;
}
.el-upload-list__item-thumbnail {
  width: 48px !important;
  height: 48px !important;
}
.is-success {
  width: 48px !important;
  height: 48px !important;
}
</style>

<style scoped>
.el-input__inner{
height:30px;
width:200px;
}
.box-card {
  width: 95%;
  margin: 0;
  margin:40px;
}
.chose {
  display: inline-block;
  position: absolute;\
  height: 40px;
  right: 100px;
}
.tit {
  text-align: left;
  line-height: 80px;
  height: 80px;
  font-size:25px;
  text-indent:24px;
  border-bottom: 1px solid #cccccc;
  position: relative;
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
.el-upload--picture-card {
  width: 48px;
  height: 48px;
  line-height: 48px;
}
.el-icon-plus {
}
.buju{
  position: relative;
}
.bujus{
  position: absolute;
  top:-65px;
  width:300px;
  height: 30px;
  right:0;
}
.el-tag{
  position: absolute;
}

</style>
<style>
.el-textarea__inner {
  height: 200px;
}
.el-select__tags{
  flex-wrap:nowrap;
}
.el-input__inner{
  width:300px;
}
</style>

