import { createRouter, createWebHistory } from "vue-router";
import Home from '@/view/Home/index.vue'
import Role from '@/view/role/index.vue'
import UserTable from '@/view/user/components/UserTable.vue'
import AddBrand from '@/view/brand/components/AddBrand.vue'
import Brand from '@/view/brand/index.vue'
import AddGoods from '@/view/goods/components/AddGoods.vue'
import addSku from '@/view/goods/components/addSku.vue'
import Goods from '@/view/goods/index.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '',
            component: Role
        },
        {
            path: '/',
            component: Role
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'user',
                    component: UserTable

                },
                {
                    path: 'brand',
                    component: Brand
                },
                {
                    path: 'goods',
                    component: Goods
                }

            ]
        }
    ]


})
export default router