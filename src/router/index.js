import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
Vue.use(VueRouter)
const routes = [
    {
      path:'/login',
      name: 'login',
      component: Login
    },
    {
        path:'/',
        component: Layout,
        children:[
            {
                path:'', // path 为空会作为默认子路由渲染
                name:'home',
                component:Home

            },
            {
                path:'/article', //内容管理
                name:'article',
                component:Article

            },
            {
                path:'/publish', //内容管理
                name:'publish',
                component:Publish

            }
        ]

    }

]

const router = new VueRouter({
  routes
})
// 路由导航守卫: 加上这个所有页面的导航都会经过这里
// 守卫页面都导航
// to：要去的路由信息
// from 来自那里的路由信息
// next: 放行方法
router.beforeEach((to, from, next) => {
    const  user = JSON.parse(window.localStorage.getItem('user'))
    //
    // // 如果要访问的页面不是login 并且 没有用户信息 就返回login页面
    // if (to.name !== 'login' && !user) next({ name: 'login' })
    // // 如果用户未能验证身份，则 `next` 会被调用两次
    // else   next()




    // 如果要访问的页面不是  /login, 娇艳登录状态
    // 如果没有登录，则跳转到登录页面
    // 如果登录了，则允许通过
    // 允许通过
    // next()


    // 校验非登录页面到登录状态
    if (to.path !== '/login'){
        if(user){
            // 已经登录，允许通过
            next()
        }else{
            // 没有登录，跳转到登录页面

            next('/login')
        }

    }else{
        // 登录页面，正常允许通过
        next()
    }




})

export default router
