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
            <el-option label="男" :value=1></el-option>
            <el-option label="女" :value=0></el-option>
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
        <el-form inline :model="userForm">
          <el-form-item>
              <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
    </div>
    <div class="common-table">
      <el-table

          :data="tableData"
          style="width: 100%"
          height="90%"
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
          <template slot-scope="scope">
            <span >{{scope.row.sex === 0?'女':'男' }}</span>
          </template>
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
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import{getUser,addUser,editUser,deleteUser}from '@/api'
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
          {  required: true,  message: '请选择性别', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ]
      },
      tableData:[],
      total:0,//当前页总条数
      pageData:{
        page:1,
        limit:10
      },
      userForm: {
       name:''
      },



    };
  },
  methods: {
    handleEdit(item){
      this.modalType = 1
      this.dialogVisible = true
      //这里用json深拷贝，不影响原数据
      this.form = JSON.parse(JSON.stringify(item))
    },
    handleDelete(row){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row).then(()=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })

        this.getList()

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submit(){
      this.$refs.form.validate((valid) => {
          if(valid){
            if( this.modalType === 0){
            //调接口上传数据
              addUser(this.form).then(()=>{
                //刷新列表
                this.getList()
              })}else{
              editUser(this.form).then(()=>{
                //刷新列表
                this.getList()
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
    getList(){
      getUser({params:{...this.pageData,...this.userForm}}).then(({data})=>{
       /*   let temData = data.list
         for(let i =0;i<temData.length;i++){
           if(temData[i].sex===1){
             temData[i].sex='男'
           }else {
             temData[i].sex='女'
           }
         }
         this.tableData=temData*/
        /* 上下两种方法会导致编辑性别不手动修改的 话默认为女*/
      /*this.tableData = data.list.filter(item=> item.sex = item.sex == 1 ?'男':'女')*/
        this.tableData = data.list
        this.total = data.count || 0

        console.log(this.tableData)
      })
    },
    //选择页码回调函数
    handlePage(val){
      this.pageData.page = val
      this.getList()
    },
    handleAdd(){
      this.modalType = 0
      this.dialogVisible = true
    },
    //列表搜索
    onSubmit(){
        this.getList()
    }
  },
  mounted() {
    this.getList()

  }
}
</script>

<style lang="less" scoped>
.manage{
  height: 90%;
  .manage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  }
  .common-table{
    position: relative;
    height: calc(100% - 62px);
    .pager{
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }

}
</style>