<template>
<div class="header-container">

  <div class="l-content">
    <el-button style="margin-right: 20px" @click="handleMenu" icon="el-icon-menu"  size="mini"></el-button>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>

    </el-breadcrumb>
  </div>
  <div class="r-content">
    <el-dropdown @command="handleClick">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>个人中心</el-dropdown-item>
      <el-dropdown-item command="logOut">退出</el-dropdown-item>

    </el-dropdown-menu>
  </el-dropdown>
  </div>
</div>
</template>

<script>
import{mapState} from 'vuex'
import Cookie from "js-cookie";
export default {
  name: "ComonHeader",
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    handleClick(command){
        this.$confirm('是否退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if(command === 'logOut'){
                //清楚 cookie得token信息
                Cookie.remove('token')
                this.$router.push('login')
            }
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消退出'
            });
        });




    }

  },
  computed:{
    //解构并且获取vuex中的数据
    ...mapState({
      tags: state => state.tab.tabsList
    })
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
  .l-content{
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner{
        font-weight: normal;
        &.is-link{
          color: #666;
        }
      }
      &:last-child{
        .el-breadcrumb__inner{
          color: white;
        }
      }
    }
  }
}
</style>