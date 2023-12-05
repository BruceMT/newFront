<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        >
<!--      用户表单信息-->
      <el-form ref="form" inline :rules="rules" :model="form" label-width="80px">
        <el-form-item label="姓名"  prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"  ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age" ></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </span>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="dialogVisible = true" >
        新增
      </el-button>

      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
      </el-table>

    </div>
  </div>

</template>

<script>
import{getUser}from'../api'
export default {

  name: "User",
  data() {
    return {
      dialogVisible: false,
      form:{
        name:'',
        age:'',
        sex:'',
        birth:'',
        addr:''
      },
      rules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 2 到 5 个字', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入地址 ', trigger: 'blur' }
        ],
        birth: [
          { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        sex: [
          {  required: true, message: '请选择性别', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ]
      },
      tableData:[]
    };
  },
  methods: {
    submit(){
      this.$refs.form.validate((valid) => {
          if(valid){
            console.log(this.form)
            //调接口上传数据
            //清空表单
            this.$refs.form.resetFields()
            this.dialogVisible=false
          }
      })
    },
    //弹窗关闭时候触发
    handleClose(){
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel(){
      this.handleClose()
    }
  },
  mounted() {
    getUser().then(({data})=>{
      console.log(data)
    })
  }
}
</script>

<style scoped>

</style>