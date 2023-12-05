<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Plus, Search, Delete, Edit, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import AddBrand from '@/view/brand/components/AddBrand.vue'
import Pagination from '@/components/data/Pagination.vue'


interface User {
    date: string
    name: string
    address: string
}

const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().indexOf(search.value.toLowerCase()) > 0
    )
)
const handleEdit = (index: number, row: User) => {

    console.log(index, row)
    dialogFormVisible.value = true
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
    ElMessage({
        message: '删除成功',
        type: 'success',
        duration: 2 * 1000
    })


}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'John',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Morgan',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
const url = ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']

const dialogFormVisible = ref(false)
const addBrandDialog = ref(false)


//分页插件
// 定义总条数
const pageTotal = tableData.length
const funPageNumberChenge = (pageSize, currentPage) => {
    console.log('pageSize :>> ', pageSize);
    console.log('currentPage :>> ', currentPage);
    // 发送ajax请求，获取参数，更新数据
    // 1.更新表格数据
    // 2.更新页总数
}

</script>

<template>
    <el-table class="brandsTable" :data="filterTableData" style="width: 100%">
        <el-table-column type="expand">
            <template #default="props">
                <div class="detailed">
                    <p class="item"><span>店铺中文名:</span> {{ '111' }}</p>
                    <p class="item"><span>店铺英文名:</span> {{ '111' }}</p>
                    <p class="item"><span>店铺类型:</span> {{ '111' }}</p>
                    <p class="item"><span>店铺产地:</span> {{ '111' }}</p>
                    <div class="imgDiv item"><span>店铺logo:</span>
                        <el-image style="width: 100px; height: 100px" :src="url[0]" :zoom-rate="1.2" :max-scale="7"
                            :min-scale="0.2" :preview-src-list="url" fit="cover" hide-on-click-modal teleported
                            preview-teleported />
                    </div>

                    <div class="imgDiv item"><span>店铺图片:</span>
                        <el-image style="width: 100px; height: 100px" :src="url[0]" :zoom-rate="1.2" :max-scale="7"
                            :min-scale="0.2" :preview-src-list="url" fit="cover" hide-on-click-modal teleported
                            preview-teleported />
                    </div>
                    <p class="item"><span>店铺描述:</span>{{ 1111111111111111 }} </p>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="注册时间">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <el-icon>
                        <timer />
                    </el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="店铺" prop="name" />
        <el-table-column label="地址" prop="address" />
        <el-table-column align="right" width="250px">
            <template #header>
                <el-input v-model="search" style="width: 150px;" size="small" placeholder="Type to search"
                    :prefix-icon="Search" />
                <el-button style="margin-left: 10px;" size="small" :icon="Plus"
                    @click="addBrandDialog = true">Add</el-button>
            </template>
            <template #default="scope">
                <el-button size="small" :icon="Edit" @click="handleEdit(scope.$index, scope.row)" />
                <!-- <el-button size="small" :icon="Delete" type="danger" @click="handleDelete(scope.$index, scope.row)" /> -->
                <el-popconfirm :title='`确定删除${scope.row.name}？`' :icon="InfoFilled"
                    @confirm="handleDelete(scope.$index, scope.row)" @cancel="ElMessage({
                        type: 'error',
                        message: '取消删除',
                        duration: 2 * 1000
                    })">
                    <template #reference>
                        <el-button size="small" :icon="Delete" type="danger" />
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <Pagination :pageTotal="pageTotal" @pageNumberChenge="funPageNumberChenge"></Pagination>

    <el-dialog v-model="dialogFormVisible" title="修改店铺" align-center destroy-on-close>
        <AddBrand />
    </el-dialog>
    <el-dialog v-model="addBrandDialog" title="添加店铺" align-center destroy-on-close>
        <AddBrand />
    </el-dialog>
</template>


<style scoped lang="scss">
.brandsTable {
    overflow: auto;
    height: 532px;
    width: 100%;
    align-self: center;
    justify-self: center;
    align-items: center;
}

.detailed {
    width: 100%;
    padding: 1px 40px;
    background: rgba(244, 242, 242, 0.433);

    .item {
        padding-bottom: 10px;
        width: 100%;
        margin: 0px 20px;

        span {
            display: inline-block;
            min-width: 80px;
            font-size: 14px;
            font-weight: 600;
        }
    }


    .imgDiv {
        // display: inline-flex;
        vertical-align: middle;
        align-items: flex-start;

        .el-image {
            display: flex;
            margin-left: 80px;
        }
    }

}
</style>