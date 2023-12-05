<script setup>
import { reactive, ref, computed } from "vue";
import previewImage from '@/components/image/previewImage.vue'
import { Plus, Search, Delete, Edit, InfoFilled } from '@element-plus/icons-vue'
import Pagination from '@/components/data/Pagination.vue'
import AddGoods from "./components/AddGoods.vue";

// 所有商品信息
const goodsData = reactive([{
    name: '1231',// 商品名字
    spuCode: '',// spu编
    price: 0.00,// 商品现在的价格
    oldPrice: 0.00,// 原价
    discount: 0.00,// 折扣
    inventory: 0,// 商品库存数
    brandId: '11111111111',// 所属店铺
    isPreSale: false,// 是否为预售商品
    categoryId: '',// 所属分类
    minPicture: [],// 主图片
    desc: '',// 商品描述
    detailPicture: [], //详细图片
    skuData: [{
        desc: '111',
        // 商品原价
        oldPrice: 10.00,
        // 商品最新价格
        price: 10.00,
        // 商品库存数
        inventory: 10,
        // 图片
        picture: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        }]

    },
    {
        desc: '111',
        // 商品原价
        oldPrice: 0.00,
        // 商品最新价格
        price: 0.00,
        // 商品库存数
        inventory: 0,
        // 图片
        picture: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        }]

    }]

},
{
    name: '7457',// 商品名字
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
        desc: '111',
        // 商品原价
        oldPrice: 0.00,
        // 商品最新价格
        price: 0.00,
        // 商品库存数
        inventory: 0,
        // 图片
        picture: []

    }]

}
])
// 定义搜索框，存储搜索内容
const search = ref('')
// 过滤后的商品数据
const filterGoodsData = computed(() =>
    goodsData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)


//分页插件
// 定义总条数
const pageTotal = goodsData.length
const funPageNumberChenge = (pageSize, currentPage) => {
    console.log('pageSize :>> ', pageSize);
    console.log('currentPage :>> ', currentPage);
    // 发送ajax请求，获取参数，更新数据
    // 1.更新表格数据
    // 2.更新页总数
}

// 弹出对话框
// 对话框是否显示
const goodsVisible = ref(false)
// 定义对话框标题
const visibleTitle = ref('');
//是否为编辑模式
const isEdit = ref(false);  //true 表示编辑模式，false表示新增goods
// 定义对话框内容
const dialogData = reactive({
    name: '11111',// 商品名字
    spuCode: '',// spu编
    price: 0.00,// 商品现在的价格
    oldPrice: 0.00,// 原价
    discount: 0.00,// 折扣
    inventory: 0,// 商品库存数
    brandId: '',// 所属店铺
    isPreSale: false,// 是否上架
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
})

/**添加goods按钮 */
const addGoods = () => {

    // 1.设置对话框标题
    visibleTitle.value = '新增商品'
    //2.清空对话框数据
    dialogData.name = ''
    dialogData.spuCode = ''
    dialogData.price = 0
    dialogData.oldPrice = 0
    dialogData.discount = 0
    dialogData.inventory = 0
    dialogData.brandId = ''
    dialogData.isPreSale = false
    dialogData.categoryId = ''
    dialogData.minPicture = []
    dialogData.desc = ''
    dialogData.detailPicture = []
    dialogData.skuData = [{
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
    //设置模式为新增
    isEdit.value = false
    // 3.显示对话框
    goodsVisible.value = true
}

/**编辑goods */
const editGoods = (row) => {
    console.log('row :>> ', row);
    // 更新对话框数据
    dialogData.name = row.name
    dialogData.spuCode = row.spuCode
    dialogData.price = row.price
    dialogData.oldPrice = row.oldPrice
    dialogData.discount = row.discount
    dialogData.inventory = row.inventory
    dialogData.brandId = row.brandId
    dialogData.isPreSale = row.isPreSale
    dialogData.categoryId = row.categoryId
    dialogData.minPicture = row.minPicture
    dialogData.desc = row.desc
    dialogData.detailPicture = row.detailPicture
    dialogData.skuData = row.skuData
    // 1.设置对话框标题
    visibleTitle.value = '编辑商品'
    //设置模式为编辑
    isEdit.value = true
    // 2.显示对话框
    goodsVisible.value = true
}


//下架商品
const handleDelete = (row) => {
    console.log('row :>> ', row);
    alert("下架商品")
}



/**
 * 提交对话框
 */
const submitDialog = () => {
    console.log('dialogData :>> ', dialogData);

    if (isEdit.value) {
        //编辑模式
        alert('编辑模式')
    } else {
        //新增模式
        alert('新增模式')

    }



    // 1.关闭对话框
    goodsVisible.value = false
    // 2.发送ajax请求，更新数据
    // 3.更新表格数据

    // 5.清空搜索框
    search.value = ''
    // 6.更新页总数

    // 7.更新表格数据



}


</script>

<template>
    <el-table class="goodsTable" :data="filterGoodsData" style="width: 100%" stripe highlight-current-row current-row-key
        lazy>
        <el-table-column type="expand">
            <template #default="props">
                <div class="detailed">
                    <el-row>
                        <el-col :span="5" :offset="1">
                            <div class="contentRow">
                                <span style="border: 1px solid red;width: 70px;">商品描述: </span>
                                <span>1{{ props.row.desc }}</span>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="contentRow">
                                <span>spu编码: </span>
                                <span>1{{ props.row.spuCode }}</span>
                            </div>
                        </el-col>

                        <el-col :span="5">
                            <div class="contentRow">
                                <span>折扣: </span>
                                <span>1{{ props.row.discount }}</span>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="contentRow">
                                <span>所属分类: </span>
                                <span>{{ props.row.categoryId }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5" :offset="1">
                            <div class="textImage"> <span>商品图片:</span>
                                <previewImage></previewImage>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="textImage"> <span>详细介绍:</span>
                                <previewImage></previewImage>
                            </div>
                        </el-col>
                    </el-row>


                    <el-table :data="props.row.skuData" style="width: 80%;margin-left: 50px;" highlight-current-row
                        :border="true">
                        <el-table-column prop="desc" label="描述" width="180" />
                        <el-table-column prop="oldPrice" label="原价" width="180" />
                        <el-table-column prop="price" label="最新价格" />
                        <el-table-column prop="inventory" label="库存数" />
                        <el-table-column prop="picture" label="图片">
                            <previewImage></previewImage>
                        </el-table-column>
                    </el-table>
                </div>

            </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名字" />
        <el-table-column prop="price" label="优惠价" />
        <el-table-column prop="oldPrice" label="原价" />
        <!-- <el-table-column label="销量" width="100px" /> -->
        <el-table-column prop="inventory" label="库存数" />
        <el-table-column prop="isPreSale" label="是否上架" />
        <el-table-column prop="brandId" label="店铺" />
        <el-table-column label="操作" align="right" width="250px">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" :prefix-icon="Search"
                    style="width: 150px;" />
                <el-button style="margin-left: 10px;" size="small" :icon="Plus" @click="addGoods">Add</el-button>
            </template>
            <template #default="scope">
                <el-button type="primary" size="small" @click="editGoods(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row)">下架</el-button>
            </template>
        </el-table-column>

    </el-table>
    <!-- 分页组件 -->
    <Pagination :pageTotal="pageTotal" @pageNumberChenge="funPageNumberChenge"></Pagination>
    <!-- 弹出对话框，添加商品或者修改商品 -->
    <el-dialog v-model="goodsVisible" :title="visibleTitle" width="70%" align-center destroy-on-close :close-delay="50">
        <AddGoods :dialogData="dialogData" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="goodsVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitDialog">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>



<style scoped>
.goodsTable {
    overflow: auto;
    height: 532px;
    width: 100%;
    align-self: center;
    justify-self: center;
    align-items: center;
}

.contentRow {
    margin-bottom: 10px;
}

.contentRow span:nth-child(1) {
    margin-right: 10px;
}

.textImage {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: top;


}

.textImage span {
    margin-right: 10px;
}
</style>