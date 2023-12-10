import Vue from 'vue'
import VueRouter from 'vue-router'


//create router elements
import Home from "@/views/Home";
import User from "@/views/User";
import Main from "@/views/Main"
import Mall from "@/views/Mall";
import PageOne from "@/views/PageOne";
import PageTwo from "@/views/PageTwo";
import Login from "@/views/Login.vue";
Vue.use(VueRouter)
const routes = [
    {   path: '/',
        component: Main,
        redirect:'/home',
        children:[
            //嵌套路由
            { path: '/home', component: Home , name: "home",},//首页
            { path: '/user', name: "user",component: User },//用户管理
            { path: '/mall', name: "mall", component: Mall },//商品管理
            { path: '/page1', name: "page1", component: PageOne },//页面1
            { path: '/page2', name: "page2",component: PageTwo },//页面2
        ]
    },
    {
        path: '/login',
        component: Login,
    }

]
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    routes // (缩写) 相当于 routes: routes
})

export default router