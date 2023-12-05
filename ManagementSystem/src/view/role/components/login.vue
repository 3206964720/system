<script setup>
import { reactive, ref } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
const router = useRouter()
//1.准备表单对象
const ruleForm = reactive({
    password: '',
    account: '',
    agree: true,
})
//2.准备规则对象
const rules = {
    account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
}

</script>   

<template>
    <section class="login-section">
        <div class="wrapper">
            <nav><a href="javascript:;">用户登录</a></nav>


            <div class="account-box">
                <div class="form">
                    <el-form :model="ruleForm" status-icon :rules="rules" label-width="60px" labelPosition="right"
                        class="demo-ruleForm">
                        <el-form-item label="账户" prop="account">
                            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item prop="agree" label-width="22px">
                            <el-checkbox size="large" v-model="ruleForm.agree">
                                我已同意隐私条款和服务条款
                            </el-checkbox>
                        </el-form-item>
                        <el-button size="large" class="subBtn" @click="router.replace({ path: '/home' })">登录</el-button>

                    </el-form>
                </div>
            </div>
        </div>
    </section>
</template>
<style scope lang="scss">
.login-section {
    height: 575px;
    position: relative;


    .wrapper {
        width: 350px;
        background: #fff;
        position: absolute;
        left: 32%;
        top: 20%;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;
        }

        a {
            flex: 1;
            line-height: 1;
            display: inline-block;
            font-size: 18px;
            position: relative;
            text-align: center;
            text-decoration: none;
        }

        .account-box {


            .form {
                padding: 0px 20px 20px 20px;

                .el-form-item {
                    margin-bottom: 20px;

                    .el-input {
                        position: relative;
                        height: 30px;
                    }
                }





                .subBtn {
                    background: $xtxColor;
                    position: relative;
                    // margin: 0px 20px;
                    width: 100%;
                    color: #fff;
                }


            }
        }
    }
}
</style>