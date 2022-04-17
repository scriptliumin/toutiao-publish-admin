<template>
    <!--router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->

    <el-menu
            default-active="/"
            class="nav-menu"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            router
    >
        <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
        </el-menu-item>

        <el-menu-item index="/image">
            <i class="iconfont icon-img"></i>
            <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
            <i class="iconfont icon-comment"></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
            <i class="iconfont icon-fans"></i>
            <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="settings">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "AppAside",
        props: {
            isCollapse:{
                type:Boolean,
                required:true
            }
        },
        components: {},
        data() {
            return {

            }
        },
        computed: {
            name() {
                return this.data
            }
        },
        watch: {
            data(newValue, oldValue) {

            }
        },
        methods: {

        },
        filters: {
            fnName: function (value) {
                return value
            }
        }
    }
</script>

<style scoped lang="less">
    .nav-menu{
        height: 100%;
        .iconfont{
            margin-right: 10px;
            padding-left: 5px;
        }
    }

</style>