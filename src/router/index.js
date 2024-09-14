import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AddressView from '../views/AddressView.vue';
import AddTemplate from '../views/AddTemplate.vue';
import TemplatesView from '@/views/TemplatesView.vue';
import ReadTemplate from '@/views/ReadTemplate.vue';
import ActionsView from '../views/ActionsView.vue';
import ActionLogs from '../views/ActionLogs.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/addresses',
      name:"addresses",
      component: AddressView,
    },
    {
      path:'/addTemplate',
      name: 'addTemplate',
      component: AddTemplate
    },
    {
      path: '/templates',
      name: 'templates',
      component: TemplatesView,
    },
    {
      path:'/readTemplate/:id',
      name:'readTemplate',
      component: ReadTemplate
    },
    {
      path:'/actions',
      name: 'actions',
      component:ActionsView
    },
    {
      path:'/action/:id',
      name:'actionLogs',
      component: ActionLogs,
    }
  ]
})

export default router
