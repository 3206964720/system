<template>
    <!-- 添加用户 -->
    <el-dialog v-model="props.addDialogVisible" title="添加用户" width="30%" align-center>
        <el-form :label-position="left" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
            <el-form-item label="手机号">
                <el-input v-model="formLabelAlign.name" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.region" />
            </el-form-item>
            <el-form-item label="Activity form">
                <el-input v-model="formLabelAlign.type" />
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ addDialogVisible: { type: Boolean, default: false } })
// 准备表单数据
const userData = ref({
    phone: '',
    pasword: '',
    // 确认密码
    confirmPassword: '',
    //验证码
    code: '',
})
</script>

<style></style>