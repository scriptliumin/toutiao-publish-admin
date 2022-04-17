<template>

        <el-container class="layout-container">
            <el-aside width="auto" class="aside">
                <AppAside
                        class="aside-menu"
                        :is-collapse="isCollapse"
                />
            </el-aside>
            <el-container>
                <el-header class="header">
                    <div>
                        <i
                            :class="{
                            'el-icon-s-fold': isCollapse,
                            'el-icon-s-unfold':!isCollapse
                            }"
                            @click="isCollapse = !isCollapse"

                        ></i>
                        <span>山东周一墨科技有限公司</span>
                    </div>
                    <el-dropdown>
                        <div class="avatar-warp">
                            <img :src="user.photo" class="avatar"/>
                            <span>
                            {{ user.name }}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        </div>
                            <!--
                               组件默认是不识别原生事件的，除非内部做了特殊处理，例如 button
                            -->
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人设置</el-dropdown-item>
                            <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>


</template>

<script>
   import AppAside from './components/aside'
   import  { getUserProfile } from '@/api/user'
    export default {
        name: "LayoutIndex",
        props: {},
        components: {
            AppAside

        },
        data() {
            return {
                user:{}, // 当前用户登录信息
                isCollapse:false, // 控制展开收起
            }
        },
        computed: {

        },
        created(){
           this.loadUserProfile()
        },
        watch: {
            data(newValue, oldValue) {

            }
        },

        methods: {
            loadUserProfile() {
                getUserProfile().then(res => {
                   this.user = res.data.data
                })

            },
            loginOut(){
                this.$confirm('退出登录， 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.localStorage.removeItem('user')
                    this.$router.push({name:'login'})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消退出'
                    });
                });


        }
        },
        filters: {
            fnName: function (value) {
                return value
            }
        }
    }
</script>

<style scoped lang="less">

    .layout-container{
        position: fixed;
        top:0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: antiquewhite;
        .aside{
            background-color: #D3DCE6;
            .aside-menu{
                height: 100%;
            }
        }
        .header{
            border: solid 1px #ccc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .avatar-warp{
                display: flex;
                align-items: center;
                .avatar{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }

        }
        .main{
            background-color: #fff;

        }

    }


</style>