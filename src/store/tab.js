export default {
    state:{
        isCollapse:false//控制侧面菜单展开和收起
    },
    mutations:{
        //修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        }
    }
}