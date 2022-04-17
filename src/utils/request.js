/*
* 基于 axios 封装的请求模块
* */
import axios from 'axios'

import JSONBIGINT from 'json-bigint'

// 创建一个 axios 实例， 说白了就是复制一个 axios
// 通过这个实例发送请求，把需要的配置给这个实例，通过这个实例来完成
const request = axios.create({

    baseURL: 'http://api-toutiao-web.itheima.net',

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
     // 定义后端返回的原始数据的处理
     // 参数 data 就是后端返回的原始数据（未经axios处理的数据）
    transformResponse: [function (data) {
        // 后端返回的数据可能不是 JSON 格式字符串
        // 如果不是的话，那么 JSONBIGINT.parse 调用就会报错
        // 所以我们使用 try-catch 来捕获异常，处理异常的发生
        // console.log(data)
        // console.log(JSONBIGINT.parse(data))
        // console.log(JSON.parse(data))
        // 对 data 进行任意转换处理
        try {
            // 如果转换成功，则直接把结果返回
           return  JSONBIGINT.parse(data)
        }catch(err){
            // 如果转换失败，则进入这里
            // 我们在这里把数据原封不动的直接返回给请求使用
            return data
        }
    }]

})

// 请求拦截


// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 任何所有请求会经过这里
    // config 是当前请求相关到配置信息对信息
    // config 是可以修改的
    // 在发送请求之前做些什么
    const user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
       config.headers.Authorization = `Bearer ${user.token}`
    }
    // 然后就可以在允许请求出去之前定制统一业务功能处理
    // 例如：统一的设置 token

    // 当这里 return confing 之后请求才会真正当发送出去
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 响应器拦截



// 导出请求方法
export default request