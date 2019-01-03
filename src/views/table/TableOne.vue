<template>
  <div>
    <g2-line :charData="serverData" :id="'c1'"></g2-line>
  </div>
</template>

<script>
import G2Line from '../../components/public/line'
export default {
    name:'tableone',
  components: {
    G2Line
  },
  data () {
    return {
      serverData: [{
        year: '2010',
        value: 3
      }, {
        year: '2011',
        value: 4
      }, {
        year: '2012',
        value: 3.5
      }, {
        year: '2013',
        value: 5
      }, {
        year: '2014',
        value: 4.9
      }, {
        year: '2015',
        value: 6
      }, {
        year: '2016',
        value: 7
      }, {
        year: '2017',
        value: 9
      }, {
        year: '2018',
        value: 13
      }]
    }
  },
  methods: {
    // 此处省略从服务器获取数据并且赋值给this.serverData
    // 推荐使用axios请求接口
  }
}
</script>