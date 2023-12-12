<template>
<div>
    <el-form ref="form" label-width="70px" :inline="true" class="login_container" :model="form" :rules="rules">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
            <el-input  type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style="margin-left: 105px;
                       margin-top: 10px"
                       type="primary"
                       size="medium"
                       @click="submit"

            >登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import Mock from 'mockjs'
import Cookie  from  'js-cookie'
import {getMenu} from "@/api";

export default {
    name: "Login",
  data: function () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, trigger: 'blur', message: '请输入用户名'}
        ],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码'}
        ]

      }

    }
  },
  methods:{
    submit() {
      /*//token信息
      const token  = Mock.Random.guid()
      */
      this.$refs.form.validate((val)=>{
            if(val){
                getMenu(this.form).then(({data})=>{//解构data
                    if(data.code === 20000){
                        //将token信息存入Cookie用于不同页面通信
                        Cookie.set('token',data.data.token)
                        //获取菜单数据存入store
                        this.$store.commit('setMenu',data.data.menu)
                        //动态添加路由
                        this.$store.commit('addMenu',this.$router)
                        //跳转到首页
                        this.$router.push("/home")
                    }else{
                        this.$message.error(data.data.message)
                    }
                })
            }
      })



    }
  },
}
</script>

<style lang="less" scoped>
.login_container{
    width: 350px;
    margin: 180px auto;
    border: 1px;
    padding: 35px 35px 15px 35px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .login_title{
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }
    .el-input{
        width: 198px;
    }
}

</style>