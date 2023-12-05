
<script setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>
<template>
    <nav class="nav">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" text-color="#fff"
            @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="/home/brand">
                <el-icon>
                    <Shop />
                </el-icon>
                <span>店铺管理</span>
            </el-menu-item>

            <el-menu-item index="/home/goods">

                <el-icon>
                    <GoodsFilled />
                </el-icon>
                <span>商品管理</span>


            </el-menu-item>


            <el-menu-item index="/home/user">
                <el-icon>
                    <UserFilled />
                </el-icon>
                <span>用户管理</span>
            </el-menu-item>
            <el-sub-menu index="/home/add">
                <template #title>
                    <el-icon>
                        <Tools />
                    </el-icon>
                    <span>系统设置</span>
                </template>
                <el-menu-item index="2-1">轮播图</el-menu-item>
                <el-menu-item index="2-2">新鲜好物</el-menu-item>
            </el-sub-menu>

        </el-menu>
    </nav>
</template>
<style scoped lang="scss">
nav {

    float: left;
    min-height: 606px;
    width: 13%;
    position: relative;
    background: #545c64;

    // border: 1px solid red;
    .el-menu {
        min-height: 606px;
    }
}
</style>