import { defineStore } from 'pinia'
import { ref } from 'vue'
export const usePageNumberStore = defineStore('pageNumber', () => {
    // 默认 页总条数为10
    const pageSize = ref(10)
    // 默认当前页为第一页
    const currentPage = ref(1)

    // 切换总条数
    const updatePageSize = (val) => {
        console.log('val :>> ', val);
    }
    // 切换当前页
    const updateCurrentPage = (val) => {
        console.log('val :>> ', val);
    }


    return {
        pageSize, currentPage, updateCurrentPage, updatePageSize

    }
})