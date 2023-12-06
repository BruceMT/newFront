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
            <el-option label="男" value=1></el-option>
            <el-option label="女" value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="form.birth"
                          value-format="yyyy-MM-dd"
                          style="width: 100%;"></el-date-picker>
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
      <el-button type="primary" @click="handleAdd" >
        新增
      </el-button>
      <el-table
          :data="tableData"
          style="width: 100%"
          max-height="600"
          highlight-current-row
          border
      >
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            width="180">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别">
        </el-table-column>
        <el-table-column
            prop="birth"
            label="生日"
            width="180">
        </el-table-column>
        <el-table-column
            prop="addr"
            label="住址">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
           >
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)"  size="mini">编辑</el-button>
            <el-button @click="handleDelete" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>

</template>

<script>
import{getUser,addUser,editUser}from'../api'
export default {

  name: "User",
  data() {
    return {
      modalType:0,//0 表示新增弹窗，1表示编辑
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
          { min: 2, max: 10, message: '长度在 2 到 5 个字', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入地址 ', trigger: 'blur' }
        ],
        birth: [
          {  required: true, message: '请选择出生日期', trigger: 'change' }
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
    handleEdit(item){
      this.modalType = 1
      this.dialogVisible = true
      //这里用json深拷贝，不影响原数据
      this.form = JSON.parse(JSON.stringify(item))
    },
    handleDelete(){},
    submit(){
      this.$refs.form.validate((valid) => {
          if(valid){

            if( this.modalType === 0){
            //调接口上传数据
              addUser(this.form).then(()=>{
                //刷新列表
                this.getLiist()
              })}else{
              editUser(this.form).then(()=>{
                //刷新列表
                this.getLiist()
              })
            }
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
    },
    getLiist(){
      getUser().then(({data})=>{
        /* let temData = data.list
         for(let i =0;i<temData.length;i++){
           if(temData[i].sex===1){
             temData[i].sex='男'
           }else{
             temData[i].sex='女'
           }
         }
         this.tableData=temData*/
        this.tableData = data.list.filter(item=> item.sex=item.sex == 1 ?'男':'女')
      })
    },
    handleAdd(){
      this.modalType = 0
      this.dialogVisible = true
    }
  },
  mounted() {
    this.getLiist()
  }
}
</script>

<style scoped>

</style>