<template>
    <el-table :data="props.skuData" style="width: 100%" max-height="300" stripe :border="true">
        <el-table-column fixed label="描述" width="170">
            <template #default="scope">
                <el-input type="text" v-model="scope.row.desc"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="原价格" width="160">
            <template #default="scope">
                <el-input-number v-model="scope.row.oldPrice" :precision="2" :step="0.1" :min="0.01" :max="10"
                    style="width: 100%;" :controls="false" />
            </template>
        </el-table-column>
        <el-table-column label="折扣价" width="160">
            <template #default="scope">
                <el-input-number v-model="scope.row.price" :precision="2" :step="0.1" :min="0.01" :max="10"
                    style="width: 100%;" :controls="false" />
            </template>
        </el-table-column>
        <el-table-column label="库存数" width="160">
            <template #default="scope">
                <el-input-number v-model="scope.row.inventory" :min="0" :max="10" style="width: 100%;" :controls="false" />
            </template>
        </el-table-column>
        <el-table-column label="图片" width="320">
            <template #default="scope">
                <el-upload v-model:file-list="scope.row.picture" class="upload-demo" action="#" :auto-upload="false">
                    <template #trigger>
                        <el-button type="primary">select file</el-button>
                    </template>
                    <template #tip>
                        <div class="el-upload__tip">

                        </div>
                    </template>
                </el-upload>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                    Remove
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem">Add Item</el-button>
</template>

<script setup >
import { reactive, ref, watch } from 'vue'

const props = defineProps({
    skuData: {
        type: Array,
        default: () => [
            {
                desc: '',
                // 商品原价
                oldPrice: 0.00,
                // 商品最新价格
                price: 0.00,
                // 商品库存数
                inventory: 0,
                // 图片
                picture: []

            }
        ]
    }
})

/* 
const skuData = ref([
    {
        desc: '',
        // 商品原价
        oldPrice: 0.00,
        // 商品最新价格
        price: 0.00,
        // 商品库存数
        inventory: 0,
        // 图片
        picture: []

    }
]) */

const deleteRow = (index) => {
    skuData.splice(index, 1)
}

const onAddItem = () => {
    let endData = props.skuData[props.skuData.length - 1]
    console.log('skuData :>> ', props.skuData);
    if (endData.desc == '' || endData.oldPrice <= 0.01 || endData.price <= 0.01 || endData.inventory <= 0 || endData.picture.length == 0) {
        alert('请完善当前信息')
    } else {
        props.skuData.push({
            desc: '',
            // 商品原价
            oldPrice: 0.01,
            // 商品最新价格
            price: 0.01,
            // 商品库存数
            inventory: 0,
            // 图片
            picture: []

        })
    }
}


</script>
