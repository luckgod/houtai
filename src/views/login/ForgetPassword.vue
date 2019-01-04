

<template>
  <!-- <link rel="stylesheet" media="screen" href=""> -->
  <div>
    <div class="bg">
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>
      <div class="con" key="13">
        <cforgetpassword></cforgetpassword>
        
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg{
  width: 100vw;
  height: 100vh;
  background-color: rgb(42, 51, 75);
  background-image: url('http://img1.178.com/lol/201711/305858071819/305858390881.jpg');
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  position: relative;
}
.con{
      width:560px;      
      background-color:rgba(255,255,255, 0.9) ;
      position: absolute;      
      /* top: 29%;    
      right: 200px; */      
      box-shadow: 0px 0px 16px rgba(31,84,167,0.1);
      border: 2px solid #ecf0f5;
      border-radius: 10px;

      position: absolute;           
      top:50%;
      left:72%;
      margin-left:-280px;
      margin-top:-310px;
      text-align: center;
      padding-bottom:70px;
      box-sizing: border-box;
}


</style>


<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import cforgetpassword from "@/components/cForgetPassword.vue";
export default {
  name: "forgetpassword",
  
  components: {
    HelloWorld,
    cforgetpassword,
  },
  mounted() {

  }
};
</script>
