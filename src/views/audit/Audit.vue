<template>
  <div>
    <el-card class="box-card">
      <div class="tit">筛选查询</div>
      <div class="titcon">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="top">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="请输入真实姓名或手机"></el-input>
          </el-form-item>
          <el-form-item label="审核经销商状态">
            <el-select v-model="formInline.region" placeholder="请在下拉列表中选则">
              <el-option label="未审核" value="0"></el-option>
              <el-option label="已通过审核" value="1"></el-option>
              <el-option label="已拒绝审核" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="注册时间">
            <el-date-picker v-model="value1" type="date" placeholder="请在日历中选择"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- ==============================================2==================================================================================================================2 -->
    <el-card class="box-card cardtwo">
      <div class="tit">用户列表</div>
      <el-table :data="tableData" style="width: 100%">
        <!-- <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="unioid" label="科蚪号"></el-table-column>
        <el-table-column prop="applyTime" label="注册时间"></el-table-column>
        <el-table-column label="审核经销商状态">
         
             
          
          <template slot-scope="scope" prop="id">
             <el-tooltip placement="top">
              <div slot="content" class="statustip">
                <span style="padding: 0 20px;" @click="jshenhe(scope.row)">查看详情</span><span style="padding: 0 20px;" @click="dpushenhea(scope.row.id)">通过申请</span><span style="padding: 0 20px;" @click="dpushenheb(scope.row.id)">拒绝申请</span>
              </div>
            <el-button
              type="text"
              @click="jshenhe(scope.row)"
            >{{scope.row.isHandleAgent|capitalize}}</el-button>
              </el-tooltip>
            <!-- <div @click="jshenhe(scope.row)">
            
              待审核
            </div>-->
          </template>
        </el-table-column>
        <el-table-column label="审核店铺状态">
          <template slot-scope="scope">
             <el-tooltip placement="top">
            <div slot="content" class="statustip">
                <span style="padding: 0 20px;" @click="jshenhea(scope.row)">查看详情</span><span style="padding: 0 20px;" @click="jshenheta(scope.row.id)">通过申请</span><span style="padding: 0 20px;" @click="jshenhetb(scope.row.id)">拒绝申请</span>
              </div>
            <el-button
              type="text"
              @click="jshenhea(scope.row)"
            >{{scope.row.isHandleShop|capitalizea}}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <!-- <span class="demonstration">直接前往</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="datc.pages"
          :page-size="datc.size"
          layout="prev, pager, next, jumper"
          :total="datc.total"
        ></el-pagination>
      </div>
     
      <!-- 店铺商店铺资料 -->
      <el-dialog title="收货地址1" :visible.sync="dialogFormVisible" append-to-body width="400px">
        <el-form>
          <el-form-item label="活动标志" :label-width="formLabelWidth">
            <div class="tupain">
              <img :src="date.shopLogo" alt="头像" style="width:50px;height:50px;">
            </div>
          </el-form-item>
          <el-form-item label="店铺名称" :label-width="formLabelWidth">
            <div class="wenzi">{{date.shopName}}</div>
          </el-form-item>
          <el-form-item label="所属品类" :label-width="formLabelWidth">
            <div class="wenzi">{{date.category}}</div>
          </el-form-item>
          <el-form-item label="店铺地址" :label-width="formLabelWidth">
            <div class="wenzi">{{date.addr}}</div>
          </el-form-item>
          <el-form-item label="店家电话" :label-width="formLabelWidth">
            <div class="wenzi">{{date.shopPhone}}</div>
          </el-form-item>
          <el-form-item label="营业时间" :label-width="formLabelWidth">
            <div class="wenzi">{{date.opentime+'-'+date.closetime}}</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="jshenheta(date.id)">通过申请</el-button>
          <el-button type="primary" @click="jshenhetb(date.id)">拒绝申请</el-button>
          <!-- dialogFormVisible = false -->
        </div>
      </el-dialog>
       <!-- A级经销商资料 -->
      <el-dialog title="收货地址a" :visible.sync="dialogFormVisiblea" append-to-body width="400px">
        <el-form>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <div class="wenzi">{{data.name}}</div>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <div class="wenzi">{{data.idCard}}</div>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <div class="wenzi">{{data.mobile}}</div>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <div class="wenzi">{{data.sex}}</div>
          </el-form-item>
          <el-form-item label="所属行业" :label-width="formLabelWidth">
            <div class="wenzi">{{data.shopCategoryName}}</div>
          </el-form-item>
          <el-form-item label="代理区域" :label-width="formLabelWidth">
            <div class="wenzi">{{data.locidNames}}</div>
          </el-form-item>
          <el-form-item label="代理级别" :label-width="formLabelWidth">
            <div class="wenzi">A级</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dpushenhea(data.id)">通过申请</el-button>
          <el-button type="primary" @click="dpushenheb(data.id)">拒绝申请</el-button>
          <!-- dialogFormVisiblea = false -->
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "audit",
  data() {
    return {
      value1: "",
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],

      formLabelWidth: "80px",
      dialogFormVisible: false,
      dialogFormVisiblea: false,
      data: {
        name: "",
        idCard: "",
        mobile: "",
        sex: "",
        shopCategoryName: "",
        locidNames: "",
         id:'',
      },
      date: {
        shopLogo: "",
        shopName: "",
        category: "",
        addr: "",
        opentime: "",
        closetime: "",
        shopPhone: "",
        id:'',
      },
      //分页
      datc: {
        current: 0,
        pages: 1,
        size: 0,
        total: 0
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.value1) {
        var d = new Date(this.value1);
        var sa = d.getMonth() + 1;
        var sb = d.getDate();
        if (sa < 10) {
          sa = "0" + sa;
        }
        if (d.getDate() < 10) {
          sb = "0" + sb;
        }
        var youWant = d.getFullYear() + "-" + sa + "-" + sb;
      } else {
        var youWant = "";
      }

      var params = new URLSearchParams();
      params.append("page", this.datc.current);
      params.append("nameOrMobile", this.formInline.user);
      params.append("date", youWant);
      params.append("status", this.formInline.region);
      this.dataApi.ajax("get", "/admin/verify/applyAgentList", params, res => {
        this.datc.current = res.data.current;

        this.datc.size = res.data.size;
        this.datc.total = res.data.total;

        this.tableData = res.data.records;
      });
    },
    //经销商详细信息
    jshenhe(ta) {
      console.log(ta);
      this.data.name = ta.name;
      this.data.idCard = ta.idCard;
      this.data.mobile = ta.mobile;
      this.data.sex = ta.sex;
      this.data.shopCategoryName = ta.shopCategoryName;
      this.data.locidNames = ta.locidNames;
       this.data.id = ta.id;
      this.dialogFormVisiblea = true;
    },
    //店铺详细信息
    jshenhea(ta) {
      console.log(ta);
      this.date.shopLogo = ta.shopLogo;
      this.date.shopName = ta.shopName;
      this.date.category = ta.category;
      this.date.addr = ta.shopAddr;
      this.date.opentime = ta.openTime;
      this.date.closetime = ta.closeTime;
      this.date.shopPhone = ta.shopPhone;
      this.date.id=ta.id
      this.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.datc.current = val;
      this.onSubmit();
    },

    catchdata() {
      var params = new URLSearchParams();

      params.append("page", this.datc.current);
      this.dataApi.ajax("get", "/admin/verify/applyAgentList", params, res => {
        // console.log(res.data.records);
        this.datc.current = res.data.current;

        this.datc.size = res.data.size;
        this.datc.total = res.data.total;
        this.tableData = res.data.records;
      });
    },
    //  <!-- 店铺商店铺资料 -->
    jshenheta(a){
         var params = new URLSearchParams();

         params.append("id",parseInt(a));
         params.append("ishandAgent",false);
         params.append("isAgree",true);
         
        this.dataApi.ajax("post", "/admin/verify/handleApply", params, res => {
       
        if(res.code==0){
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.dialogFormVisible = false
        this.onSubmit();
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    jshenhetb(a){
         var params = new URLSearchParams();

         params.append("id",parseInt(a));
         params.append("ishandAgent",false);
         params.append("isAgree",false);
        this.dataApi.ajax("post", "/admin/verify/handleApply", params, res => {
        
        if(res.code==0){
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.dialogFormVisible = false
        this.onSubmit();
        }else{
          this.$message.error(res.msg);
        }
      });
    },
     //  <!-- 经销商店铺资料 -->
     dpushenhea(b){
       console.log(b)
        var params = new URLSearchParams();

         params.append("id",parseInt(b));
         params.append("ishandAgent",true);
         params.append("isAgree",true);
        this.dataApi.ajax("post", "/admin/verify/handleApply", params, res => {
        
        
        if(res.code==0){
          this.$message({
          message: '修改成功',
          type: 'success'
        });
         this.dialogFormVisiblea = false
        this.onSubmit();
        }else{
          this.$message.error(res.msg);
        }

      });
     },
     dpushenheb(b){
         var params = new URLSearchParams();

         params.append("id",parseInt(b));
         params.append("ishandAgent",true);
         params.append("isAgree",false);
        this.dataApi.ajax("post", "/admin/verify/handleApply", params, res => {
            if(res.code==0){
          this.$message({
          message: '修改成功',
          type: 'success'
        });
         this.dialogFormVisiblea = false
        this.onSubmit();
       
        }else{
          this.$message.error(res.msg);
        }
          
      });
     }
  },
  mounted() {
    this.catchdata();
  },
  filters: {
    capitalize: function(value) {
      if (value == 0) return "未审核";
      if (value == 1) return "已通过审核";
      if (value == 2) return "已拒绝审核";
    },
    capitalizea: function(value) {
      if (value == null) return "未开通";
      if (value == 0) return "未审核";
      if (value == 1) return "已通过审核";
      if (value == 2) return "已拒绝审核";
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 91%;
  margin: 0 60px;
}
.tit {
  text-align: left;
  line-height: 80px;
  height: 80px;
  border-bottom: 1px solid #cccccc;
}
.titcon {
  height: 160px;
}
.el-form-item {
  width: 30%;
  text-align: left;
}
.el-input__inner {
  width: 30%;
  text-align: left;
}
.cardtwo {
  margin-top: 22px;
}
.wenzi {
  width: 280px;
  text-align: right;
}
.tupain {
  width: 280px;
}
.tupain img {
  float: right;
  border-radius: 50%;
}
.statustip span{
  text-indent: 20px;
  
}
</style>

