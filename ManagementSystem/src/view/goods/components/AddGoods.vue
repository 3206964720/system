<script lang="ts" setup>

import { onMounted, reactive, ref, toRefs } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import addSku from './addSku.vue'

import type { UploadProps, UploadUserFile } from 'element-plus'


const prop = defineProps({
    dialogData: {
        type: Object
    }
})
// const dialogData = toRefs(prop.dialogData)


/* const form = reactive({
    name: '',// 商品名字码
    spuCode: '',// spu编
    price: 0.00,// 商品现在的价格
    oldPrice: 0.00,// 原价
    discount: 0.00,// 折扣
    inventory: 0,// 商品库存数
    brandId: '',// 所属店铺
    isPreSale: false,// 是否为预售商品
    categoryId: '',// 所属分类
    minPicture: [],// 主图片
    desc: '',// 商品描述
    detailPicture: [], //详细图片
    skuData: [{
        desc: '',
        // 商品原价
        oldPrice: 0.00,
        // 商品最新价格
        price: 0.00,
        // 商品库存数
        inventory: 0,
        // 图片
        picture: []

    }]
}) */
const form = prop.dialogData

//准备商品类型列表
const categoryOptions = ref([{
    value: 'Option1',
    label: 'Option1',
},])
//准备商品所属店铺列表
const brandOptions = ref([{
    value: 'Option1',
    label: 'Option1',
},])



//设置请求头
const headers = {
    'Content-Type': 'multipart/form-data'
}

// 商品图片
const minPictureDialogUrl = ref('')
const minPictureVisible = ref(false)
// 详情图片
const detailPicturedialogUrl = ref('')
const detailPictureVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const minPictureCardPreview = (uploadFile) => {
    minPictureDialogUrl.value = uploadFile.url!
    minPictureVisible.value = true
}
const detailPictureCardPreview = (uploadFile) => {
    detailPicturedialogUrl.value = uploadFile.url!
    detailPictureVisible.value = true
}


//弹出对话框，添加sku
const addSkuVisible = ref(false)

// 提交skudata数据
const submitSkuData = () => {

    let endData = form.skuData[form.skuData.length - 1]
    if (endData.desc == '' || endData.oldPrice <= 0.01 || endData.price <= 0.01 || endData.inventory <= 0 || endData.picture.length == 0) {
        alert('请完善当前信息')
    } else {
        console.log('form.skuData :>> ', form.skuData)
        addSkuVisible.value = false
    }

}


// 提交表单信息
/* const onSubmit = () => {
    console.log('form :>> ', form);

}
 */
</script>
<template>
    <el-form :model="form" label-width="70px" label-position="right">
        <el-row>
            <el-col :span="20">
                <el-form-item label="商品名">
                    <el-input v-model="form.name" class="textnput" type="text" maxlength="20" show-word-limit clearable
                        autofocus />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <el-form-item label="描述">
                    <el-input v-model="form.desc" class="textnput" type="text" maxlength="50" show-word-limit clearable />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="spu编">
                    <el-input v-model="form.spuCode" class="spuInput" type="text" clearable />
                </el-form-item>
            </el-col>

            <el-col :span="4" :offset="2">
                <el-form-item label="库存数">
                    <el-input v-model="form.inventory" class="numInput" type="number" />
                </el-form-item>
            </el-col>

            <el-col :span="3" :offset="3">
                <el-form-item label="是否为预售商品" label-width="110px">
                    <el-switch v-model="form.isPreSale" inline-prompt active-text="是" inactive-text="否" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <el-form-item label="原价格">
                    <el-input-number v-model="form.oldPrice" :precision="2" :step="0.1" />
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="3">
                <el-form-item label="最新价格">
                    <el-input-number v-model="form.price" :precision="2" :step="0.1" />
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="折扣">
                    <el-input-number v-model="form.discount" :min="0" :max="10" :precision="2" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <el-form-item label="类型">
                    <el-select v-model="form.categoryId" class="m-2" placeholder="Select">
                        <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="3">
                <el-form-item label="所属店铺">
                    <el-select v-model="form.brandId" class="m-2" placeholder="Select">
                        <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="2">
                <el-form-item label="商品规格">
                    <el-button @click="addSkuVisible = true">点击添加</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <el-form-item label="商品图片">
                    <el-upload v-model:file-list="form.minPicture" list-type="picture-card"
                        :on-preview="minPictureCardPreview" :on-remove="handleRemove" :headers="headers"
                        :auto-upload="false" :limit="5">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>

                    <el-dialog v-model="minPictureVisible" append-to-body align-center>
                        <img w-full :src="minPictureDialogUrl" alt="Preview Image" />
                    </el-dialog>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <el-form-item label="详细介绍">
                    <el-upload v-model:file-list="form.detailPicture" list-type="picture-card"
                        :on-preview="detailPictureCardPreview" :on-remove="handleRemove" :headers="headers"
                        :auto-upload="false" :limit="5">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>

                    <el-dialog v-model="detailPictureVisible" append-to-body align-center>
                        <img w-full :src="detailPicturedialogUrl" alt="Preview Image" />
                    </el-dialog>
                </el-form-item>
            </el-col>
        </el-row>
        <!--         <el-row>
            <el-col :span="10" :offset="18">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-col>
        </el-row> -->
    </el-form>

    <!-- 弹出对话框，添加商品规格 -->
    <el-dialog v-model="addSkuVisible" title="添加商品规格" style="min-width: 1100px;" :destroy-on-close="true">

        <addSku :skuData="form.skuData"></addSku>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addSkuVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitSkuData">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style scoped></style>


