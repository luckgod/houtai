

<template>

 <!-- <link rel="stylesheet" media="screen" href=""> -->
 
  <div >
    <h1>This is an login</h1>
    
    <div id="particles-js"></div>
      <remote-script src="../../../particles.js"></remote-script>
       <remote-script src="../../../particles.min.js"></remote-script>
      <remote-script src="./js/app.js"></remote-script>
  </div>
</template>
<style scoped>
@import "./css/style.css";
</style>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'login',
  components: {
    HelloWorld,
    
  },
  
}

</script>
