import  request from '@/utils/request'

// 获取文章列表
export const  getAticles = params =>{
    return request({
        method:'GET',
        url:'/mp/v1_0/articles',
        params

    })
}

// 获取文章频道
export const getAticleChannes = () =>{
    return request({
        method:'GET',
        url:'/mp/v1_0/channels'
    })
}


// 删除文章
export const deleteAticle = aticleId =>{
    return request({
        method:'DELETE',
        // 传入路径参数
        url:`/mp/v1_0/articles/${aticleId}`


    })
}


// 发布文章
export const addAticle = (data,draft=false) =>{
    return request({
        method:'POST',
        // 传入路径参数
        url:'/mp/v1_0/articles',
        params:{
            draft  //是否存为草稿（true 为草稿）
        },
        data


    })
}

// 获取单条文章数据


export const getAticle = aticleId =>{
    return request({
        method:'GET',
        // 传入路径参数
        url:`/mp/v1_0/articles/${aticleId}`


    })
}




// 发布文章
export const updateAticle = (articleId,draft=false,data) =>{
    return request({
        method:'PUT',
        // 传入路径参数
        url:`/mp/v1_0/articles/${articleId}`,
        params:{
            draft  //是否存为草稿（true 为草稿）
        },
        data


    })
}