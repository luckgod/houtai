<template>
  <div>
    <!-- ====================================账号管理================================================================================= -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title" class="shenhe">
          <p style="color:#ffffff">账号管理&nbsp;&nbsp;&nbsp;&nbsp;></p>
          <!-- <span slot="title">导航一</span> -->
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">未开放</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!-- ===========================================游戏管理==================================================================================== -->
     <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title" class="shenhe">
          <p style="color:#ffffff">游戏管理&nbsp;&nbsp;&nbsp;&nbsp;></p>
          <!-- <span slot="title">导航一</span> -->
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">未开放</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!-- =========================================发布管理================================================================================ -->
     <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title" class="shenhe">
          <p style="color:#ffffff">发布管理&nbsp;&nbsp;&nbsp;&nbsp;></p>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="jump13">商学院文章和物料发布</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    <!-- ====================================================================================================================================== -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      active-text-color="#409EFF"
    >
      <el-submenu index="1">
        <template
          slot="title"
          class="shenhe"
          style="background-color: rgb(231, 235, 240) !important;"
        >
          <p style="color:#ffffff">
              数据管理(经销商用)&nbsp;&nbsp;>

          </p>
         
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="jump14">大数据图表总览</el-menu-item>
          <el-menu-item index="1-2" @click="jump12">经销商店铺填写</el-menu-item>
          <el-menu-item index="1-3">所有店铺和店铺商品一览</el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>-->
      </el-submenu>
    </el-menu>
    <!-- 数据管理（公司用） -->
      <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      active-text-color="#409EFF"
    >
      <el-submenu index="1">
        <template
          slot="title"
          class="shenhe"
          style="background-color: rgb(231, 235, 240) !important;"
        >
          <p style="color:#ffffff">
              数据管理(公司用)&nbsp;&nbsp;>

          </p>
         
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="jump14">大数据图表总览</el-menu-item>
          <el-menu-item index="1-2" @click="jump12">经销商店铺填写</el-menu-item>
          <el-menu-item index="1-3">所有店铺和店铺商品一览</el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>-->
      </el-submenu>
    </el-menu>
    <!-- =============================================================================================================================== -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title" class="shenhe">
          <p style="color:#ffffff">审核管理&nbsp;&nbsp;&nbsp;&nbsp;></p>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="jump11">经销商/店铺审核</el-menu-item>
          <el-menu-item index="1-2">评测留言管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!-- ============================================================================================================================== -->
    
  </div>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 108px;
  min-height: 400px;
}

.el-submenu {
  width: 200px;
  background: #2a334b;
  color: #ffffff;
}
.el-submenu:hover {
}
.shenhe:hover {
  background: #000016 !important;
}

</style>
<style>
.el-submenu__title:hover {
  background: #000016 !important;
}
.el-submenu__title {
    height: 100px!important;
    line-height: 100px!important;
    font-size: 16px!important;
     border-top:1px solid #666666;
    border-bottom:1px solid #666666;
    margin-bottom:-1px;
  }
</style>

<script>
export default {
  name: "NavLeft",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    jump12() {
      this.$router.push("companydata");
    },
    jump11() {
      this.$router.push("audit");
    },
    jump13() {
      this.$router.push("releasemanagement");
    },
    jump14() {
      this.$router.push("tatal_big_data");
    }
  }
};
</script>
