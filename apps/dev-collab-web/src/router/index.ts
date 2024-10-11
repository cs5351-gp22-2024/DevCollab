// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { createProjectsRoutes } from '@/pages/projects/projects-routes'
import { createHomeRoutes } from '@/pages/home/home.routes'
import { createLoginRoutes } from '@/pages/login/login-routes'
import { createMainRoutes } from '@/pages/main/main-routes'
import { createGuideRoutes } from '@/pages/guide/guide-routes'
import { createComponentRoutes } from '@/pages/component/component-routes'
import { createSignupRoutes } from '@/pages/signup/signup-routes'
import { createWelcomeRoutes } from '@/pages/welcome/welcome-routes'
import { createWelcomebackRoutes } from '@/pages/welcomeBack/welcomeBack-routes'
import { createAutomationRoutes } from '@/pages/automation/automation-routes'
import { creategithubRoutes } from '@/pages/automation/github/github-routes'
import { creategithubNewWebhookRoutes } from '@/pages/automation/github/githubNewWebhook-routes'
import { createUserStoryRoutes } from '@/pages/userstory/userstory-routes'
import { createReportRoutes } from '@/pages/report/report-route'
import { createLogoutRoutes } from '@/pages/logout/logout-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...createLoginRoutes(),
    ...createWelcomeRoutes(),
    ...createWelcomebackRoutes(),
    ...createSignupRoutes(),
    ...createLogoutRoutes(),
    ...createMainRoutes([
      ...createHomeRoutes(),
      ...createProjectsRoutes(),
      ...createGuideRoutes(),
      ...createAutomationRoutes(),
      ...creategithubRoutes(),
      ...createComponentRoutes(),
      ...creategithubNewWebhookRoutes(),
      ...createUserStoryRoutes(),
      ...createReportRoutes()
      // Add your route here
    ])
  ]
})

export default router
