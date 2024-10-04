import { createProjectsRoutes } from '@/pages/projects/projects-routes'
import { createRouter, createWebHistory } from 'vue-router'
import { createHomeRoutes } from '@/pages/home/home.routes'
import { createLoginRoutes } from '@/pages/login/login-routes'
import { createMainRoutes } from '@/pages/main/main-routes'
import { createGuideRoutes } from '@/pages/guide/guide-routes'
import { createSignupRoutes } from '@/pages/signup/signup-routes'
import { createWelcomeRoutes } from '@/pages/welcome/welcome-routes'
import { createComebackRoutes } from '@/pages/comeback/comeback-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...createLoginRoutes(),
    ...createWelcomeRoutes(),
    ...createComebackRoutes(),
    ...createSignupRoutes(),
    ...createMainRoutes([...createHomeRoutes(), ...createProjectsRoutes(), ...createGuideRoutes()])
  ]
})

export default router
