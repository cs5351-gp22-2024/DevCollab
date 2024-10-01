import { defineRoutes } from '@/utils/route/route'

export const createLandingRoutes = defineRoutes(() => [
  {
    path: '/landing',
    name: 'landing',
    component: () => import('./LandingPage.vue')
  }
])
