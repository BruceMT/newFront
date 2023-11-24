<template>
  <el-row>
    <el-col :span="8">
      <div class="grid-content bg-purple">
      <el-card class="box-card">
            <div  class="user">
              <img src="../assets/images/user-default.png" />
              <div  class="userinfo">
                <p class="name">Admin</p>
                <p class="access">超级管理员</p>
              </div>
            </div>
            <div  class="login-info">
                <p>上次登录时间：<span>2023-11-25</span></p>
                <p>上次登录地点：<span>2023-11-25</span></p>
            </div>
      </el-card>
    </div>
    </el-col>
    <el-col :span="18"><div class="grid-content bg-purple-light"></div></el-col>
  </el-row>
</template>

<script>
import PageOne from "@/views/PageOne";
export default {

  name: "Home",
  components: PageOne,
  data(){
    return{}
  }
}
</script>

<style lang="less" scoped>
.user{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display:flex;
  align-items: center;
  img{
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo{

    .name{
      font-size:32px;
      margin-bottom: 10px;
    }
    .access{
      color: gray;
    }
  }
}

.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span{
      color: #666666;
      margin-left: 60px;
    }
  }
}



</style>