import { createProjectsRoutes } from '@/pages/projects/projects-routes'
import { createRouter, createWebHistory } from 'vue-router'
import { createHomeRoutes } from '@/pages/home/home.routes'
import { createLoginRoutes } from '@/pages/login/login-routes'
import { createMainRoutes } from '@/pages/main/main-routes'
import { createGuideRoutes } from '@/pages/guide/guide-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...createLoginRoutes(),
    ...createMainRoutes([...createHomeRoutes(), ...createProjectsRoutes(), ...createGuideRoutes()])
  ]
})

export default router
