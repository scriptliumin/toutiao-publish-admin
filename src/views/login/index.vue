
<template>
    <div class="login-container">
        <div class="login-head"></div>
        <!--
              配置form表单验证
            1.必须给el-form 绑定 model 为表单数据对象
            2.给需要验证的表单项 el-form-item 绑定 prop 属性
                注意：prop属性需要指定表单对象中的数据名称
            3. 通过 el-form 组件 rules 属性配置验证规则

            手动触发表单验证
            1、给 el-form 设置 ref 起个名字（随便起不要重复即可）
            2、通过 ref 获取 el-form 租金啊，调用组件的 validate 进行验证

        -->
        <el-form ref="login-form"
                 :model="user"
                 class="login-form"
                 :rules="formRules">
            <el-form-item prop="mobile">
                    <el-input
                            v-model="user.mobile"
                            placeholder="请输入手机号"
                    ></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input
                        v-model="user.code"
                        placeholder="请输入验证码"

                ></el-input>
            </el-form-item>

            <el-form-item  prop="agree">
            <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>

            <el-form-item>
                <el-button
                        class="login-btn"
                        type="primary"
                        :loading="LoginLoading"
                        @click="onLogin('login-form')"
                >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
    
</template>

<script>

  import { login}  from "@/api/user";

  export default {
        name: "LoginIndex",
        data() {
            return {
                user: {
                    mobile:'13911111111',// 手机号
                    code:'246810', // 验证码
                    agree:false //是否同意

                },
                formRules:{// 表单验证规则配置
                    mobile:[
                        { required: true, message: '请输入手机号', trigger: 'change' },
                        { pattern:/^1[3|4|5|7|8|9]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
                    ],
                    code:[
                        { required: true, message: '请输入验证码', trigger: 'change' },
                        { pattern:/^\d{6}$/, message: '请输入正确的验证码', trigger: 'change' }
                    ],
                    // agree:[
                    //     { type: 'array', required: true, message: '请选择同意', trigger: 'change' }
                    //
                    // ]


                    agree:[
                        // 自定义验证规则
                        // 验证通过 callback()
                        // 验证失败 callback(new Error('错误消息'))

                        {  validator:(rule,value,callback)=>{
                            if(value){
                                callback()
                            }else {
                                callback(new Error('请勾选同意按钮'))
                            }


                            },

                            trigger: 'change'
                        }

                    ]

                },

                LoginLoading: false
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
            onLogin(loginForm) {

                if(!this.user.agree){
                    this.$message.error('请勾选同意后在进行登录！');
                    return

                }
              // 表单验证
                this.$refs[loginForm].validate((valid)=>{
                    if(!valid){  // 错误才会进来

                        return
                    }
                })

                // 表单验证通过
                this.login()



            },
            login(){
                this.LoginLoading = true

            login(this.user).then(res => {

                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });

                    this.LoginLoading = false

                   // 将 token 存储到本地
                  //本地存储只能存字符串，如果需要存储数组或者对象数据，则转为 JSON 格式字符串
                window.localStorage.setItem('user',JSON.stringify(res.data.data))


                    // 登录成功以后跳转到首页

                    this.$router.push('/')



                }).catch(err => {
                    this.$message.error('用户名或者验证码输入错误！');
                    this.LoginLoading = false

                })

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
    .login-container{
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        background: url("./login_bg.jpg") no-repeat;
        flex-direction: column;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-head{
            width: 300px;
            height: 57px;
            background: url("./logo_index.png") no-repeat;
            margin-bottom: 30px;
        }
        .login-form{
            background-color: #fff;
            padding: 50px;
            min-width: 300px;
            .login-btn{
                width: 100%;
            }
        }
    }

</style>