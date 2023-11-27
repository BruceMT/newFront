import Mock from 'mockjs'

Mock.mock('/api/home/getData',function (){
    //拦截到请求后的处理路径
    console.log('拦截了')
})