import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from "./mockServeData/user";
import permission from "@/api/mockServeData/permission";
//首页获取数据
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//用户列表数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/delete','post',user.deleteUser)
Mock.mock(/api\/user\/getuser/,user.getUserList)

Mock.mock(/api\/permission\/get-menu/,'post',permission.getMenu)