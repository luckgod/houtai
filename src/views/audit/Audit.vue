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
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item >
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item> -->

          <el-form-item label="注册时间">
            <el-date-picker v-model="value1" type="date" placeholder="请在日历中选择"></el-date-picker>
          </el-form-item>
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
        </el-table-column> -->

         <el-table-column
        prop="name"
        label="用户名"
        width="180">
        </el-table-column>
        <el-table-column
        prop="phone"
        label="手机号"
        width="180">
        </el-table-column>
        <el-table-column
        prop="unm"
        label="科蚪号"
        width="180">
        </el-table-column>
        <el-table-column
        prop="date"
        label="注册时间"
        width="180">
    </el-table-column>
        <el-table-column label="审核经销商状态" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
       <el-table-column label="审核店铺状态" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
     
         <div class="block">
        <!-- <span class="demonstration">直接前往</span> -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
        </el-pagination>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "audit",
  data() {
    return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        value1:'',
      formInline: {
        user:'',
        region: ""
      },
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          phone:'123123',
          unm:'456456',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
           phone:'123123',
           unm:'456456',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
           phone:'123123',
           unm:'456456',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
           phone:'123123',
           unm:'456456',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
     
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
        console.log(`当前页: ${val}`);
      },
      catchdata(){
        //   var params = new URLSearchParams()
        // params.append('name', this.formInline.user)
        // params.append('page', 1)
        this.dataApi.ajax('get','/admin/verify/applyAgentList',{name:this.formInline.user,page:1}, res => {    
                        console.log(res.data)
                       console.log('111')
                 });
      },

  },
  mounted(){
    this.catchdata()
    
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
.el-form-item{
   width: 30%;
    text-align: left;
  }
  .el-input__inner {
   width: 30%;
    text-align: left;
  }
   .cardtwo{
    margin-top: 22px;
  }
  
</style>

