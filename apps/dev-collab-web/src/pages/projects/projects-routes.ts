import { defineRoutes } from '@/utils/route/route'

export const createProjectsRoutes = defineRoutes(() => [
  {
    path: '/projects',
    name: 'projects',
    component: () => import('./ProjectsPage.vue')
  }
])
