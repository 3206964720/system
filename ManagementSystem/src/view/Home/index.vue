<script setup>
import HomeHeader from './components/HomeHeader.vue';
import HomeNav from './components/HomeNav.vue';
</script>

<template>
    <HomeHeader></HomeHeader>
    <div class="work">
        <HomeNav></HomeNav>
        <div class="content">
            <RouterView></RouterView>
        </div>

    </div>
</template>
<style scope lang="scss">
.work {
    min-width: 1240px;

    .content {
        padding: 10px 20px 0px 20px;
        float: left;
        width: 87%;
        height: 606px;
        overflow: auto;
        border: 1px solid rgb(177, 21, 42);
        background: #f5f5f5;
        display: grid;

    }
}
</style>

