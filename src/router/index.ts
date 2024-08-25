import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'Home',
        component: () => import('../views/ContentGrid.vue')
    },
    {
        path: '/drink/:id',
        component: () => import ('../views/Drink/DrinkPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router
