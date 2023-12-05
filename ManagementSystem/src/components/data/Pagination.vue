<script setup>
import { ref } from 'vue';


/* // 使用Pinia
const pageNumberStore = usePageNumberStore() */

// 接收总条数
const props = defineProps({
    pageTotal: Number

})
// 当前页和页总数
const pageSize = ref(10)
const currentPage = ref(1)

// 通过 defineEmits 编译器宏生成emit方法
const emit = defineEmits(["pageNumberChenge"])

const handleSizeChange = (val) => {
    pageSize.value = val
    currentPage.value = 1
    emit('pageNumberChenge', val, currentPage.value)
}
const handleCurrentChange = (val) => {
    currentPage.value = val
    emit('pageNumberChenge', pageSize.value, val)
}

</script>
<template>
    <div class="demo-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
            :small="false" :background="true" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>
<style scoped>
.demo-pagination-block {
    align-self: center;
    justify-self: center;
}

.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;

}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>