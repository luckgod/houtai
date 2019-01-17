<template>
  <div class="warp">
    <div class="sefirst">
      <div class="map_warp">
        <map-com></map-com>
      </div>
      <div class="sefirst_seone">
        <ul>
          <li class="sefirst_seone_up">
            <ul>
              <li class="sefirst_seone_upuser"><span>累计用户数：{{Cumulative_users}}人</span> <span>累计付费用户：{{Cumulative_paid_users}}人</span><span></span></li>
               <li class="sefirst_seone_upuser"><span>累计玩家数：{{Cumulative_users}}人</span> <span>我推广的：{{Cumulative_paid_users}}人</span><span>下级推广的：{{Cumulative_paid_users}}人</span></li>
                <li class="sefirst_seone_upuserw"><span>累计经销商数：{{Cumulative_users}}人</span> <span>A级经销商：{{Cumulative_paid_users}}人</span><span>B级经销商：{{Cumulative_paid_users}}人</span></li>
                <li class="sefirst_seone_upuserw"><span></span><span>C级经销商：{{Cumulative_users}}人</span><span></span></li>
            </ul>
          </li>
          <li class="sefirst_seone_con">
               <ul>
    
               <li class="sefirst_seone_upuser"><span>总充值金额：￥{{Cumulative_users}}</span> <span>消费金额：￥{{Cumulative_paid_users}}</span><span>剩余金额：￥{{Cumulative_paid_users}}</span></li>
                <li class="sefirst_seone_upuserw"><span>累计收益：￥{{Cumulative_users}}</span> <span>推广收益：￥{{Cumulative_paid_users}}</span><span>分成收益：￥{{Cumulative_paid_users}}</span></li>
            </ul>
          </li>
          <li class="sefirst_seone_bot">
            <div class="charttit">
              近半年各级总收益变化表（含科顿）
            </div>
            <div id="myChart" :style="{width: '602px', height: '179px',background:'#ffffff'}"></div>
          </li>
        </ul>
      </div>
    </div>

    <div class="setwo">
      <ul class="setwo_oul">
        <li class="setwo_one">
           <div class="charttit">
              近半年新增玩家和经销数
              <span class="el-icon-zoom-in" @click="dialogVisible = true"></span>
            </div>
          <div id="bargraphone" :style="{width: '420px', height: '176px',background:'#ffffff'}"></div>
        </li>
        <li class="setwo_two">
           <div class="charttit">
              近半年各平台新增游戏用户
            </div>
          <div id="bargraphtwo" :style="{width: '420px', height: '176px',background:'#ffffff'}"></div>
        </li>
        <li class="setwo_three">
           <div class="charttit">
              男女性别占比
            </div>
          <div id="doughnutchartone" :style="{width: '160px', height: '190px',background:'#ffffff'}"></div>
        </li>
        <li class="setwo_four">
          <div class="charttit">
              各级经销商占比
            </div>
          <div id="doughnutcharttwo" :style="{width: '160px', height: '190px',background:'#ffffff'}"></div>
        </li>
        <li class="setwo_five">
           <div class="charttit">
              收入渠道占比
            </div>
          <div id="doughnutchartthree" :style="{width: '160px', height: '190px',background:'#ffffff'}"></div>
        </li>
      </ul>
    </div>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <!-- <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer"> -->
    
  
  <!-- </span> -->
</el-dialog>
  </div>
</template>
<script>
import MapCom from "../../components/Map";
export default {
  name: "Tatal_big_data",
  data(){
    return {
        Cumulative_users:'12569',
        Cumulative_paid_users:'23500',
        Cumulative_number_of_players:'12569',
        generalize:'12569',
        lower_level_to_promote:'12569',
        Accumulated_dealers:'12569',
        Adealer:'12569',
        Bdealer:'12569',
        Cdealer:'12569',
        Total_recharge_amount:'12569',
        Monetary:'12569',
        balance:'12569',
        accumulated:'12569',
        Promotion_of_earnings:'12569',

        dialogVisible: false,


    }
  },
  mounted() {
    this.drawLine();
    this.doughnutchartone();
    this.doughnutcharttwo();
    this.doughnutchartthree();
    this.bargraphone();
    this.bargraphtwo();
   
  },
   components: { MapCom },
  methods: {
    handleClose(){
        this.dialogVisible=false
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          // text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["A级经销商", "B级经销商", "C级经销商",],
           orient: 'vertical',
          padding:[0,50,0,0],
          right: -45,
          bottom:50,
        },
        grid: {
          left: "3%",
          right: "16%",
          bottom: "3%",
          top:'10%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "A级经销商",
            type: "line",
           
            data: [1200, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "B级经销商",
            type: "line",
           
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "C级经销商",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
         
        ]
      });
    },
    doughnutchartone() {
      let myChart = this.echarts.init(
        document.getElementById("doughnutchartone")
      );
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
         
          data: ["男", "女",],
         
         
          bottom:0,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            grid:{
              top:'1%',
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "男" },
              { value: 310, name: "女" },
            
            ]
          }
        ]
      });
    },
    doughnutcharttwo() {
      let myChart = this.echarts.init(
        document.getElementById("doughnutcharttwo")
      );
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",        
          data: ["A级", "B级", "C级", ],
          bottom:'-5',
        },        
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "A级" },
              { value: 310, name: "B级" },
              { value: 234, name: "C级" },
             
            ]
          }
        ]
      });
    },
    doughnutchartthree() {
      let myChart = this.echarts.init(
        document.getElementById("doughnutchartthree")
      );
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
         orient: "horizontal",
          data: ["PC", "Android", "Ios",],
          bottom:'-5',
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "PC" },
              { value: 310, name: "Android" },
              { value: 234, name: "Ios" },
             
            ]
          }
        ]
      });
    },
    bargraphone() {
      let myChart = this.echarts.init(document.getElementById("bargraphone"));
      myChart.setOption({
        title: {
          // text: "世界人口总量",
          // subtext: "数据来自网络"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["经销商", "玩家"],
           orient: 'vertical',
          padding:[0,50,0,0],
          right: -45,
          bottom:50,
        },
        grid: {
          left: "5%",
          right: "18%",
          bottom: "3%",
           top :'15%',
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        series: [
          {
            name: "经销商",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: "玩家",
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      });
    },
    bargraphtwo() {
      let myChart = this.echarts.init(document.getElementById("bargraphtwo"));
      myChart.setOption({
        title: {
          // text: "世界人口总量",
          // subtext: "数据来自网络"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["ios", 'Android'],
          orient: 'vertical',
          padding:[0,50,0,0],
          right: -45,
          bottom:50,
        },
        
        grid: {
          left: "5%",
          right: '20%',
          bottom: "3%",
          top :'10%',
          containLabel: true
        },
        xAxis: {
          type: "category",
           data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        series: [
          {
            name: "ios",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: "Android",
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      });
    }
  }
};
</script>
<style>
@import "../../views/Big Data/Tatal_big_data.css";
</style>

