import { defineRoutes } from '@/utils/route/route'

export const createProjectsCreateRoutes = defineRoutes(() => [
  {
    path: '/projects-create',
    name: 'projectsCreate',
    component: () => import('./ProjectsCreatePage.vue')
  }
])
