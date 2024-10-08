import { defineRoutes } from '@/utils/route/route'

export const createAutomationRoutes = defineRoutes(() => [
  {
    path: '/automation',
    name: 'automation',
    component: () => import('./AutomationPage.vue')
  }
])
