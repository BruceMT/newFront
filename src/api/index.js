import http from "@/utils/request";

//请求首页数据

export const getData = () =>{
    return http.get('/home/getData')
}

export const getUser= (params) =>{
    //返回用户列表
    return http.get('/user/getuser',params)
}
export const addUser= () =>{

    return http.post('/user/add',data)
}

export const editUser= () =>{

    return http.post('/user/edit',data)
}

export const deleteUser= () =>{

    return http.post('/user/delete',data)
}