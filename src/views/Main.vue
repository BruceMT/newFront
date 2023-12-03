<template>
  <div>

    <el-container>
      <el-aside width="auto">
        <common-aside />
      </el-aside>

      <el-container>
        <el-header>
          <comon-header/>
        </el-header>
        <common-tag />
        <el-main>
          <h1>Main</h1>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import CommonAside from "@/components/CommonAside";
import ComonHeader from "@/components/ComonHeader";
import CommonTag from "@/components/CommonTag";
export default {
  name: "Main",
  components: {
    ComonHeader,
    CommonAside,
    CommonTag
  },


}
</script>

<style lang="less" scoped>
.el-header{
  padding: 0;
}
</style>