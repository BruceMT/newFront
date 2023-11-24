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

<style scoped>

</style>