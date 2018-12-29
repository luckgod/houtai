<template>
  <div>
    <el-header >
      <navtop></navtop>
    </el-header>

    
   <el-container>
            <el-aside style="height:100vh" >
                              <navleft></navleft>  
                                
            </el-aside>
            <el-main style="100vh">
               <router-view/>
            </el-main>
          </el-container>
     
  </div>
</template>
<style scoped>

.bgc{
  position: relative;
}
.cebian{
  height: 860px;
  width: 220px;
  background: #99a9bf;
position: fixed;
left: 0;
top: 70px;
bottom: 0;
}
.homecon{
position: absolute;
 height: 860px;
  background: #e5e9f2;
  padding-top: 60px;
}
.el-aside {
 
    background-color: #2a334b;
    color: #333;
    position:fixed;
    top: 65px;
    bottom: 0;
    left: 0;
   
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
   
  }
  .el-main{
   position:fixed;
   top: 65px;
   left: 200px;
   bottom: 0;
   right: 0;
   
 }
 .el-header{
    height:90px;
    background:#2a334b;
    color: #ffffff;
    line-height: 60px;
   
}
</style>
<script>
export default {
  name: "Home"
};
</script>

