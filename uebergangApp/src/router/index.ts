import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import ImageCropingPageVue from '@/views/ImageCropingPage.vue';
import HTML2PdfPage from '@/views/HTML2PdfPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/image-feature',
    name: 'ImageCroping',
    component: ImageCropingPageVue
  },
  {
    path: '/pdf-feature',
    name: 'Html2Pdf',
    component: HTML2PdfPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
