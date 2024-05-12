import {createRouter, createWebHistory} from 'vue-router'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: "/index"
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('@/views/index.vue')
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/error/404.vue')
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/404'
        }
    ]
})

export default router
