<template>
    <div class="publish-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$route.query.id ? '修改' :'发布'}}文章</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-form ref="form" :model="article" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">


                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="article.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="article.channel_id" placeholder="请选择频道">
                        <el-option
                                 v-for="(channel,index) in channels"
                                :label="channel.name"
                                :value="channel.id"
                                :key="index"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onPublish(draft=false)">{{$route.query.id ? '修改' :'发布'}}文章</el-button>
                    <el-button @click="onPublish(draft=true)">存入草稿</el-button>
                </el-form-item>
            </el-form>


        </el-card>

    </div>
</template>

<script>
    import {
        addAticle,
        getAticleChannes,
        updateAticle,
        getAticle
    } from "@/api/article";
    //import { ElementTiptap } from 'element-tiptap';

    export default {
        name: "PublishIndex",
        props: {},

        data() {
            return {
                article:{
                    title:'',
                    content:'',
                    cover:{
                        type:0,//封面类型 -1:自动，0-无图，1-1张，3-3张
                        images:[]
                    },
                   channel_id:null
                },
                channels:[]

            }
        },
        created(){
            this.loadAticleChannes()
            if(this.$route.query.id){
                this.loadgetAticle()
            }else {
                this.loadAticleChannes()
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
            onPublish(draft=false) {
                const articleId = this.$route.query.id

                if(articleId){

                    updateAticle(
                        articleId,
                        draft,
                        this.article
                    ).then(res=>{
                        this.$message({
                            message:draft ? '存入草稿' : '修改文章' ,
                            type: 'success'
                        });
                        this.$router.push('/article')


                    })


                }else {
                        addAticle(this.article,draft).then(res=>{
                        this.$message({
                            message: draft ?'存入草稿':'添加成功',
                            type: 'success'
                        });
                        this.$router.push('/article')

                    })

                }





            },
            loadAticleChannes(){
                getAticleChannes().then(res=>{
                    this.channels = res.data.data.channels
                })
            },
            loadgetAticle(){
                getAticle(
                    this.$route.query.id
                )
                    .then(res=>{
                    this.article = res.data.data
                        console.log(res.data.data)

                })

            },

            loadUpdateAticle(draft=false){


            }
        },
        filters: {
            fnName: function (value) {
                return value
            }
        }
    }
</script>

<style scoped>

</style>