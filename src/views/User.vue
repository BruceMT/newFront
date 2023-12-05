<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
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
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="dialogVisible = true" >
        新增
      </el-button>
    </div>
  </div>

</template>

<script>
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
          { type: 'number',message: '年龄必须为数字',trigger: 'change'}
        ]
      }
    };
  },
  methods: {

  }
}
</script>

<style scoped>

</style>