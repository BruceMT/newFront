<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/user-default.png"/>
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2023-11-25</span></p>
            <p>上次登录地点：<span>2023-11-25</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px;height: 460px">
          <el-table
              :data="tableData"
              style="width: 100%">
<!--            <el-table-column
                prop="name"
                label="课程">
            </el-table-column>
            <el-table-column
                prop="todayBuy"
                label="今日购买">
            </el-table-column>
            <el-table-column
                prop="monthBuy"
                label="本月购买">
            </el-table-column>
            <el-table-column
                prop="totalBuy"
                label="总购买">
            </el-table-column>-->
            <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val"/>

          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="price">￥ {{item.value}}</p>
            <p class="desc">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!--            折线图-->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!--            折线图-->
        </el-card>
        <el-card style="height: 260px">
          <!--            折线图-->
        </el-card>

      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
import {getData} from "@/api";

export default {

  name: "Home",


  data() {
    return {
      tableData: [],
      tableLabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  mounted() {
    getData().then(({data})=>{
      const {tableData} = data.data
      this.tableData = tableData

      //基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      //指定图表的配置和数据
      var echarts01option = {}
      //处理数据xAXIS
      const {orderData} = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data:xAxis
      }
      echarts01option.xAxis = xAxisData
      echarts01option.yAxis = {}
      echarts01option.legend = xAxisData
      echarts01option.series = []
      xAxis.forEach(key => {
        echarts01option.series.push({
          name: key,
          data:orderData.data.map(item => item[key]),
          type:'line'
        })
      })
      console.log(echarts01option)
      //根据刚才配置生成图表
      echarts1.setOption(echarts01option)

    })

  }
}
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userinfo {

    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: gray;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: white;
  }
  .detail{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
  }
}

</style>