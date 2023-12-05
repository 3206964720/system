

<script setup lang="ts" >
import { onMounted, reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { cities } from '@/utils/cities'

onMounted(() => {
    console.log('cities[0].name :>> ', cities[0].value);
})
// 1.准备表单对象
const ruleForm = reactive({
    name: '',
    nameEn: '',
    type: '',
    place: [],
    desc: '',
    logoFile: [],
    pictureFile: []

})

// 存储需要提交的图片数据
const fileList = reactive({
    logoFile: [],
    pictureFile: []
}
)

// 存储logo临时文件
const logoFileRef = ref<UploadInstance>()
// 存储picture临时文件
const pictureFileRef = ref<UploadInstance>()

// 定义规则对象
const rules = reactive({
    name: [
        { required: true, message: '店铺名不能为空', trigger: 'blur' },
        { min: 1, max: 10, message: '店铺名长度不能超过10', trigger: 'blur' },
    ],
    nameEn: [{ required: true, message: '店铺英文名不能为空', trigger: 'blur' }],
    type: [{ required: true, message: '请选择店铺类型', trigger: 'change' }],
    place: [{ required: true, message: '请选择店铺地址', trigger: 'change' }],
    desc: [{ required: true, message: '店铺描述不能为空', trigger: 'blur' }],
    logoFile: [{ required: true, message: '请上传店铺logo', trigger: 'change' }],
    pictureFile: [{ required: true, message: '请上传店铺图片', trigger: 'change' }]
})


// 设置请求头
const headers = {
    'Content-Type': 'multipart/form-data'
}
// 上传logo组件的函数
const logoHandleExceed: UploadProps['onExceed'] = (files) => {
    console.log('files :>> ', files);

    logoFileRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    logoFileRef.value!.handleStart(file)
    ruleForm.logoFile[0] = files
}

const logoHandleRemove = (file) => {

}

// 上传picture组件的函数
const pictureHandleExceed: UploadProps['onExceed'] = (files) => {


    pictureFileRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    pictureFileRef.value!.handleStart(file)
    ruleForm.pictureFile[0] = files
}

const pictureHandleRemove = (file) => {

}




// 定义提交表单方法
const submitForm = (formEl) => {
    console.log('ruleForm :>> ', ruleForm);
};

// 定义清空表单的方法
const resetForm = () => {

}

/* const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
})) */


onMounted(() => {
    console.log('suhu :>> ');
})

</script>

<template>
    <div class="addBrandFrom">
        <el-form :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="'default'" status-icon>
            <el-form-item label="店铺中文名" prop="name">
                <el-input class="input" v-model="ruleForm.name" placeholder="请输入店铺名" />
            </el-form-item>
            <el-form-item label="店铺英文名" prop="nameEn">
                <el-input class="input" v-model="ruleForm.nameEn" placeholder="请输入店铺英文名" />
            </el-form-item>
            <el-form-item label="店铺类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择店铺类型">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="店铺地址">
                <el-cascader :options="cities" clearable v-model="ruleForm.place" placeholder="请选择地址" filterable />
                <el-input v-model="ruleForm.place[3]" placeholder="xxx街道xx号" clearable
                    style="width: 150px; margin-left:10px;" />
            </el-form-item>

            <el-form-item label="店铺logo" prop="logoFile">
                <el-upload ref="logoFileRef" v-model:file-list="ruleForm.logoFile" class="upload-demo" action="#"
                    :on-remove="logoHandleRemove" list-type="picture" :limit="1" :auto-upload="false" :headers="headers"
                    :on-exceed="logoHandleExceed">
                    <el-button type="primary">Click to upload</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </el-form-item>


            <el-form-item label="店铺图片" prop="pictureFile">
                <el-upload ref="pictureFileRef" v-model:file-list="ruleForm.pictureFile" class="upload-demo" action="#"
                    :on-remove="pictureHandleRemove" list-type="picture" :limit="1" :auto-upload="false" :headers="headers"
                    :on-exceed="pictureHandleExceed">
                    <el-button type="primary">Click to upload</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </el-form-item>

            <el-form-item label="店铺描述" prop="desc">
                <el-input class="input" v-model="ruleForm.desc" type="textarea" maxlength="200" minlength="10"
                    show-word-limit placeholder="注意：字数不能低于10" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleForm)">
                    Create
                </el-button>
                <el-button @click="resetForm()">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
.addBrandFrom {
    /* margin: 20px 50px 20px 0px; */
    /* padding-top: 20px; */
    width: 100%;
    /* justify-self: center; */
    /* transform: translate3d(50px, 0, 0); */
    margin: 0px auto;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    border-radius: 25px; */
}

.input {
    width: 90%;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>


<!-- <template>
    <el-upload v-model:file-list="fileLists" class="upload-demo" action="#" :on-change="handleChange" :auto-upload="false"
        :headers="headers" :limit="1" style="width: 300px;">
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
    <button @click="confirmUpload()">111</button>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

import type { UploadProps, UploadUserFile } from 'element-plus'

const fileLists = ref([
])
// 设置请求头
const headers = {
    'Content-Type': 'multipart/form-data'
}

const handleChange = (file, fileList) => {
    fileLists.value.push(file)
    console.log('fileLists.value :>> ', fileLists.value);

}
const confirmUpload = () => {
    var param = new FormData();
    fileLists.value.forEach(
        (val, index) => {
            param.append("file", val.raw);
        }
    );
    console.log('param :>> ', param);

}
</script> -->

