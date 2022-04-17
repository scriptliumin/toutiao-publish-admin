<template>
    <div class="article-container">
    <el-card class="box-card filter-card" >
        <div slot="header" class="clearfix">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <el-form ref="form"  label-width="80px" size="small" :disabled="loading">
            <el-form-item label="状态">
                <el-radio-group v-model="status">
                    <el-radio :label="null">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                    <el-radio :label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select v-model="channelId" placeholder="请选择频道">
                    <el-option
                            label="全部"
                            value="null"
                    >
                    </el-option>
                    <el-option
                            v-for="(channel,index) in channels"
                            :key="index"
                            :label="channel.name"
                            :value="channel.id"
                            >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="日期">
                <el-date-picker
                        v-model="rangeDate"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="loading" @click="loadArticles()">筛选</el-button>

            </el-form-item>
        </el-form>
    </el-card>



        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>根据筛选条件共查询到{{ totalCount }}条记录</span>
            </div>
            <el-table
                    :data="articles"
                    style="width: 100%"
                    stripe
                    size="small"
                    class="list-data"
                    v-loading="loading"

            >
                <el-table-column
                        label="封面"
                        >
                    <template slot-scope="scope">
                        <el-image
                                class="article-cover"
                                :src="scope.row.cover.images[0]"
                                 fit="fit">
                            <div slot="placeholder" class="image-slot">
                                加载中<span class="dot">...</span>
                            </div>
                            <div slot="error" class="image-slot">
                                <img
                                src="./pic_bg.png"
                                class="article-cover"/>
                            </div>

                        </el-image>


                        <!--<img    v-if="scope.row.cover.images[0]"-->
                                <!--:src="scope.row.cover.images[0]"-->
                                <!--alt=""-->
                                <!--class="article-cover"/>-->

                        <!--<img    v-else-->
                                <!--src="./pic_bg.png"
                                class="article-cover"/>-->


                      <!--下面这种情况是在运行期间动态改变处理的
                          而本地图片必须在打包的时候就存在
                      -->

                        <!--<img-->
                                <!--:src="scope.row.cover.images[0] || './pic_bg.png'"-->
                                <!--alt=""-->
                                <!--class="article-cover"/>-->

                    </template>
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                        >
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">

                    <template slot-scope="scope">
                        <el-tag  :type="articleStatus[scope.row.status].type">
                            {{articleStatus[scope.row.status].text}}
                        </el-tag>


                        <!--<el-tag type="warning" v-if="scope.row.status==0">草稿</el-tag>-->
                        <!--<el-tag  v-else-if="scope.row.status==1">待审核</el-tag>-->
                        <!--<el-tag type="success" v-else-if="scope.row.status==2">审核通过</el-tag>-->
                        <!--<el-tag type="danger" v-else-if="scope.row.status==3">审核失败</el-tag>-->
                        <!--<el-tag type="info" v-else-if="scope.row.status==4">已删除</el-tag>-->



                    </template>
                </el-table-column>
                <el-table-column
                        prop="pubdate"
                        label="发布时间">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                circle
                                icon="el-icon-edit"
                                @click="$router.push('/publish?id=' + scope.row.id)"
                                ></el-button>
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                size="mini"
                                @click="onDelAticle(scope.row.id)"
                                ></el-button>
                    </template>


                </el-table-column>
            </el-table>
            <!--
            current-change  当前页改变时触发
            -->
            <el-pagination
                    layout="prev, pager, next"
                    background
                    :total="totalCount"
                    :disabled="loading"
                    @current-change="onCurrentChange"
                    :page-size ="pageSize"
                    :current-page.sync ="page"

            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import { getAticles,
        getAticleChannes,
        deleteAticle
    } from '@/api/article/'
    export default {
        name: "ArticleIndex",
        props: {},
        components: {},
        form:{},
        data() {
            return {
                status:null,// 文章选中状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，null不传为全部
                channelId:null,
                channels:[],  // 文章频道
                articles:[] ,// 文章列表
                articleStatus:[
                    {status:0,text:'草稿',type:'warning'},
                    {status:1,text:'待审核',type:''},
                    {status:2,text:'审核通过',type:'success'},
                    {status:3,text:'审核失败',type:'danger'},
                    {status:4,text:'已删除',type:'info'}
                ],
                totalCount:0 ,// 总页数
                pageSize:10,
                rangeDate:null,
                loading:true,
                page:1


            }
        },
        computed: {

        },
        watch: {
            data(newValue, oldValue) {

            }
        },
        created(){
            this.loadArticles(1)
            this.loadChannels()
        },
        methods: {

            loadArticles( page = 1 ){
                this.loading = true
                getAticles({
                    page,
                    per_page: this.pageSize,
                    status:this.status,
                    channel_id:this.channelId,
                    begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,// 开始日期
                    end_pubdate:this.rangeDate ? this.rangeDate[1] : null  //截止日期
                }).then(res => {
                  const {results,total_count:totalCount}=  res.data.data
                    this.articles = results
                    this.totalCount = totalCount
                    this.loading = false




                })

            },
            //  获取文章频道
            loadChannels(){
                getAticleChannes().then(res=>{
                this.channels = res.data.data.channels


              })
            },
            onCurrentChange(page){
                this.loadArticles(page)

            },
            onDelAticle(aticleId){
                 console.log(aticleId.toString())
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteAticle(aticleId.toString()).then(res=>{
                       this.loadArticles(this.page)
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
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
    .article-container{
        .filter-card{
            margin-bottom: 30px;
        }
        .list-data{
            margin-bottom: 15px;
        }
        .article-cover{
            width: 60px;
            background-size: cover;
        }


    }

</style>