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
import { createProjectOverviewRoutes } from '@/pages/project-overview/project-overview-routes'
import { createUsermanagementRoutes } from '@/pages/usermanagement/usermanagement-routes'
import { createProfileRoutes } from '@/pages/profile/profile-route'
import { createTaskManagementRoutes } from '@/pages/taskManagement/taskmanagement-routes'
import { createProjectsCreateRoutes } from '@/pages/projects-create/projects-store.routes'
import { concat } from 'lodash'
import { createProjectsListRoutes } from '@/pages/projects-list/projects-list.routes'
import { createProjectMainRoutes } from '@/pages/project-main/project-main-routes'
import { createProjectDetailRoutes } from '@/pages/project-detail/project-detail-routes'
import { createProjectSprintRoutes } from '@/pages/project-sprint/project-sprint-routes'

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
      ...concat(createProjectsRoutes(), createProjectsCreateRoutes(), createProjectsListRoutes()),
      ...createProjectMainRoutes(concat(createProjectDetailRoutes(), createProjectSprintRoutes())),
      ...createAutomationRoutes(),
      ...creategithubRoutes(),
      ...creategithubNewWebhookRoutes(),
      ...createUserStoryRoutes(),
      ...createReportRoutes(),
      ...createProjectOverviewRoutes(),
      ...createGuideRoutes(),
      ...createComponentRoutes(),
      ...createUsermanagementRoutes(),
      ...createProfileRoutes(),
      ...createTaskManagementRoutes()
    ])
  ]
})

export default router
