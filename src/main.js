import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";
import store from "@/store"
import "./api/mock"
import 'echarts/lib/component/grid'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI);
//添加全局前置导航守卫
router.beforeEach((to, from, next)=>{
    const token = Cookie.get('token')
    //如果token不存在,说明当前用户未登录，应该跳转至登录页
    if(!token && to.name !=='login'){
        next({name:'login'})
    }else if(token && to.name==='login'){
        next({name:'home'})
    }else{
        next();
    }

})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
