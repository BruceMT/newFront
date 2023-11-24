<template>
<div class="header-container">

  <div class="l-content">
    <el-button @click="handleMenu" icon="el-icon-menu"  size="mini"></el-button>
    <span class="header-text">首页</span>
  </div>
  <div class="r-content">
    <el-dropdown>
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>个人中心</el-dropdown-item>
      <el-dropdown-item>退出</el-dropdown-item>

    </el-dropdown-menu>
  </el-dropdown>
  </div>
</div>
</template>

<script>
export default {
  name: "ComonHeader",
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style lang="less" scoped>
.header-container{
  padding: 20px;
  background-color:#333;
  //height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-text{
    color:white;
    font-size: 14px;
    margin-left: 10px
  ;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: white;
  }
  .el-icon-arrow-down {
    font-size: 14px;
  }
}
</style>