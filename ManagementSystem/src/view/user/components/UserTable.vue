

<script  setup>
import Pagination from '@/components/data/Pagination.vue'
import { Search, Plus } from '@element-plus/icons-vue';
import { computed, onMounted, ref, reactive, warn } from 'vue'



// 定义空值用于渲染表格数据
const search = ref('')

const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.account.toLowerCase().indexOf(search.value.toLowerCase()) > 0
    )
)

// 定义提示信息
const promptMessage = ref('')

// 定义对象存储需要操作的数据
const operateData = ref({
    type: 0,//0-注销 1-续时 2-修改密码
    id: '',
    account: '',
    password: '',
    startData: '',
    endDate: '',

})
// 定义函数，更新operateData的数据
const updateOperateData = (row) => {
    operateData.value.account = row.account
    operateData.value.password = row.password
    operateData.value.startData = row.startData
    operateData.value.endDate = row.endDate
}

// 定义是否确认
const isConfirm = ref(false)
// 续时按钮
const handleEdit = (index, row) => {

    operateData.value.type = 1
    updateOperateData(row)


    promptMessage.value = `确定要为${row.account}的用户增加30天的使用时长`
    centerDialogVisible.value = true
}


// 删除按钮
const handleDelete = (index, row) => {

    operateData.value.type = 0
    updateOperateData(row)


    promptMessage.value = `确定要注销${row.account}的用户?`
    centerDialogVisible.value = true
}

const tableData = [
    {
        account: 'G154657',
        password: '1654165',
        startData: '2016-05-03',
        endDate: '2016-07-03',

    }, {
        account: 'G222222',
        password: '1654165',
        startData: '2016-05-03',
        endDate: '2016-09-01',

    }, {
        account: 'G333223',
        password: '1654165',
        startData: '2016-01-03',
        endDate: '2016-07-03',

    }, {
        account: 'G555',
        password: '1654165',
        startData: '2016-05-03',
        endDate: '2016-07-03',

    },

]


//密码框
// 失去焦点时显示提示框
const isCenterDialogVisible = (row) => {
    operateData.value.type = 2
    updateOperateData(row)
    promptMessage.value = `确定要将${row.account} 用户的密码修改为${row.password}`
    centerDialogVisible.value = true
}


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


// 弹出对话框
const centerDialogVisible = ref(false)
const commitRevise = () => {
    centerDialogVisible.value = false
    if (operateData.value.type == 0) {
        //注销
        alert("注销")
    } else if (operateData.value.type == 1) {
        // 续时
        alert("续时")
    } else if (operateData.value.type == 2) {
        // 修改密码
        alert("修改密码")
    }
}
/**
 * 添加用户
 */

</script>
<template>
    <!-- 表格 -->
    <el-table :data="filterTableData" style="width: 100%" lazy stripe>
        <el-table-column type="selection" width="55" />

        <el-table-column label="账号" prop="account" />

        <el-table-column label="密码">
            <template #default="scope">
                <el-input v-model="scope.row.password" class="w-50 m-2" placeholder="Pick a date" size="small" show-password
                    @blur="isCenterDialogVisible(scope.row)" />

            </template>
        </el-table-column>

        <el-table-column label="Date" prop="startData" sortable />

        <el-table-column label="Date" prop="endDate" sortable />

        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" :prefix-icon="Search"
                    style="width: 150px;" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">续时</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">注销</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页插件 -->
    <Pagination :pageTotal="pageTotal" @pageNumberChenge="funPageNumberChenge"></Pagination>

    <!-- 弹出确认框，确认是否要修改 -->
    <el-dialog v-model="centerDialogVisible" title="警告" width="30%" align-center>
        <span>{{ promptMessage }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="commitRevise">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style scoped>
.el-table {
    overflow: auto;
    height: 532px;
    align-self: center;
    justify-self: center;
    align-items: center;

}

/* 密码框 */
.w-50 {
    width: 150px;
}

/* 弹出对话框 */
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
