import axios from "axios";
import router from "vue-router"

//请求拦截
axios.interceptors.request.use(
    config=>{
    if(localStorage.wxpyqToken){
        config.headers.Authorization=localStorage.wxpyqToken;
    }
    return config;
},error=>{
    return Promise.reject(error);
})

//响应拦截
axios.interceptors.response.use(
    response=>{
    return response
},error=>{
    //错误拦截
    const {status}=error.response;
    if(status==401){
        alert("toekn过期，请重新登录");
        //清除token
        localStorage.removeItem('wxpyqToken');
        //页面跳转
        router.push("/login");
    }else{
       alert(error.response.data);
    }
    return Promise.reject(error);
})

export default axios