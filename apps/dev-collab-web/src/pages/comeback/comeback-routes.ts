import { defineRoutes } from '@/utils/route/route'

export const createComebackRoutes = defineRoutes(() => [
  {
    path: '/comeback',
    name: 'comeback',
    component: () => import('./Comeback.vue')
  }
])
