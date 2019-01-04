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
          <el-form-item label="代理区域市">
            <!-- <el-select v-model="formLabelAlign.locid" placeholder="请选择代理的市" >   -->
            <el-cascader :options="options" change-on-select></el-cascader>
            <!-- </el-select> -->
          </el-form-item>

          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
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
        <el-form-item label="名称" style="margin:0;">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            style="width:220px;height:38px;border:1px solid #dcdfe6;position:relative;border-radius: 5%;background:#f1f1f1"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:38px;height:38px;border:1px solid #dcdfe6;border-radius: 25%">
            <i v-else class="el-icon-plus avatar-uploader-icon" style="width:38px;height:38px;position:absolute;top:-69px;"></i>
          </el-upload>
          <div class="tipwenzi">点击右侧上传图片</div>
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
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="">
          </el-form-item>
           <el-form-item label="">
          </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="success" @click="subd">提交申请</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios'
// import aliUpload from "../../components/public/uploader";
import { client } from "../../alioss.js";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  name: "companydata",
  //  components:{
  //           aliUpload
  //       },
  data() {
    return {
      formLabelAlign: {
        name: "",
        region: "",
        mobile: "",
        locid: "",
        locida: "",
        locidb: "",
        dregion: "",
        sex: "",
        jbc: "",
        idcard: "",
        cayegotyId: "",
        dname: "",
        dregion: "",
        dizhi: "",
        dtime: "",
        detail: "",
        roleId: "A",
        categoryName: ""
      },
      data: { noticeImage: [] },
      value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      imageUrl: "",
      options: regionDataPlus,
      selectedOptions: [],
      cayegotyIdlist: [],
      //节点数据
      shenglist: [],
      shilist: [],
      qulist: [],
      optionsMessage: [],
      uploadUrl: [],
      uploadId: "file",
      uploadCode: 0,
      log:0,
      loga:0,
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      optionsa:[
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
    };
  },
  watch: {
    uploadCode(val) {
      console.info(val);
    }
  },
  // computed: {
  //   shia: function () {
  //       console.log(this.locid)
  //   }
  // },
  methods: {
    handleChange(value) {
      console.log(value);
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
    catchdatd() {
      this.dataApi.ajax("get", "/admin/verify/getLocation", {}, cb => {
        // console.log(Object.entries(cb.data),'cb');  
        var arr = Object.entries(cb.data);
        var arr1 = [];
        var arr2 = [];
        var arr2_1 = [];
        
        var arr3 = [];
        var arr3_1 = []
        var obj=  {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            }
          ]
        }
        
        arr.map((data,index)=>{
            // console.log(data[0],'data');
            
            this.log = index;
            // console.log(Object.entries(arr[index][1]).length,index);
            arr2_1=[];
            // console.log(arr[index][1])
             Object.entries(arr[index][1]).map((data,index)=>{
                //  console.log(JSON.parse(JSON.stringify(data[0])),this.log);
                 var b = JSON.parse(JSON.stringify(data[0]));
                 arr2_1.push({'label':b,'value':index});
                 arr2[this.log] = arr2_1;   
                //  console.log(arr2[this.log])
                arr3_1=[]
                this.loga=index
                var s=arr1[index]
                // console.log(JSON.parse(JSON.stringify(s)))
                //  Object.entries(arr1[index][1]).map((data,index)=>{
                //         var c = JSON.parse(JSON.stringify(data[0]));
                //         arr3_1.push({'label':c,'value':index});
                //         arr3[this.loga] = arr3_1; 
                //       })
            })
            // console.log(arr2)
            obj.label = data[0];
            obj.value = index+'1';
            // obj[index].children= arr2[index];
         
            arr1[index] =JSON.parse(JSON.stringify(obj));
            // obj.children.label = Object.entries(data[1])[0][0];
            // obj.children.value = index+'2';
            //  arr2.push(Object.entries(data[1])[0][0]);
        })
         arr1.map((data,index)=>{
             arr1[index].children=arr2[index]
         })
        // console.log(arr3)
        // console.log(arr1);
        
         this.options = arr1;
         
        // henglist = Object.entries(cb.data);
        // var arr = {};
        // var element = "";
        // for (let index = 0; index < this.shenglist.length; index++) {
        //   element = this.shenglist[0];
        //   arr = { value: "1", label: "" };
        // }
        // console.log(element);
      });
    },
    //经销商选择上传
    subj() {
      var data = {
        name: this.formLabelAlign.name,
        idCard: this.formLabelAlign.idcard,
        mobile: this.formLabelAlign.mobile,
        sex: this.formLabelAlign.sex,
        locid: "110101",
        cayegotyId: this.formLabelAlign.cayegotyId,
        roleId: this.formLabelAlign.roleId
      };
      // this.dataApi.ajax('post','/admin/verify/applyForAagent',data, res => {
      //                   console.log(res)
      //            });
    },
    //店铺选择上传
    subd() {
      // console.log(this.value4[0].getHours(),this.value4[0].getMinutes())
      if (this.value4[0].getHours() < 10) {
        var sa = "0" + this.value4[0].getHours();
      } else {
        var sa = this.value4[0].getHours();
      }
      if (this.value4[0].getMinutes() < 10) {
        var st = "0" + this.value4[0].getMinutes();
      } else {
        var st = +this.value4[0].getMinutes();
      }
      if (this.value4[1].getHours() < 10) {
        var sc = "0" + this.value4[1].getHours();
      } else {
        var sc = this.value4[1].getHours();
      }
      if (this.value4[1].getMinutes() < 10) {
        var sg = "0" + this.value4[1].getMinutes();
      } else {
        var sg = +this.value4[1].getMinutes();
      }
      //  console.log(sc+":"+sg)
      var params = new URLSearchParams();
      params.append("name", this.formLabelAlign.name);
      params.append("idCard", this.formLabelAlign.idcard);
      params.append("mobile", this.formLabelAlign.mobile);
      params.append("sex", this.formLabelAlign.sex);
      params.append("locid", "110101");
      params.append("cayegotyId", this.formLabelAlign.cayegotyId);
      params.append("roleId", this.formLabelAlign.roleId);
      params.append("shopName", this.formLabelAlign.dname);
      params.append(
        "shopLogo",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2147322031,325904174&fm=27&gp=0.jpg"
      );
      params.append("phone", this.formLabelAlign.dtime);
      params.append("category", this.formLabelAlign.dregion);
      params.append("detail", "测试数据");
      params.append("addr", this.formLabelAlign.dizhi);
      params.append("opentime", sa + ":" + st);
      params.append("closetime", sc + ":" + sg);
      console.log(this.formLabelAlign.sex, this.formLabelAlign.cayegotyId);
      this.dataApi.ajax("post", "/admin/verify/applyForAagent", params, res => {
        console.log("提交执行");
        console.log(res);
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
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1"
        },
        {
          id: 9,
          label: "三级 1-1-1"
        }
      ]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file);
      this.Upload(file);
      // console.log(file.name)
      // this.dataApi.upload(file)
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      const isJPG = true;
      const isLt2M = true;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isJPG && isLt2M;
    },
    Upload(file) {
      console.log(file, 2222);
      var fileName = "banner" + file.raw.uid;
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      var storeAs = "upload-file" + "/";
      client()
        .put(storeAs + fileName, file.raw)
        .then(result => {
          // 大功搞成
          //下面是如果对返回结果再进行处理，根据项目需要，下面是我们自己项目所用的，仅供参考
          console.log(result.url);
          this.imageUrl = result.url;
        });
       var storeAs = 'upload-file'+"/";  //命名空间
        console.log(' => ' + storeAs);
        client.multipartUpload(storeAs, file).then(function (result) {
             console.log(result);
             console.log(result.url);
        }).catch(function (err) {
             console.log(err);
       });
    }
  },
  mounted() {
    this.catchdata();
    this.catchdatd();
  }
};
</script>

<style scoped>
.box-card {
  width: 91%;
  margin: 0;
  
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
.tipwenzi{
position:absolute;
top: 0;
line-height: 42px;

left:48px;
}
</style>