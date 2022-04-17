/*
* 项目的启动入口
* */
import Vue from 'vue'
import router from './router'
import store from './store'
// 加载全局样式文件
import './styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
Vue.use(ElementUI);


Vue.config.productionTip = false
// 创建 Vue 根实例
// 把 router 配置到根实例中
// 通过 render 方法把 App 根组件渲染到 #app 入口节点


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
