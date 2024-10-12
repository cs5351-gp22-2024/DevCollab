<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      class="bg-red-lighten-1"
      theme="dark"
    >
      <template v-slot:prepend>
        <v-list-item :prepend-avatar="`${baseUrl}logo.png`" :title="rail ? '' : 'DevCollab'" nav>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :value="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="rail ? '' : item.title"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-cog"
            :title="rail ? '' : 'Settings'"
            @click="openSettings"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            :title="rail ? '' : 'Logout'"
            :to="{ name: 'logout' }"
          ></v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="min-w-36 text-sm md:text-lg lg:text-xl font-bold">{{
        currentPageTitle
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ isDarkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
      <v-btn icon @click="showNotifications">
        <v-icon>mdi-bell</v-icon>
        <v-badge
          v-if="unreadNotifications > 0"
          :content="unreadNotifications"
          color="error"
        ></v-badge>
      </v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="small">
              <span class="text-h5">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="openProfile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'login' }">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>

    <v-footer app> © {{ new Date().getFullYear() }} DevCollab. All rights reserved. </v-footer>

    <v-dialog v-model="settingsDialog" max-width="500px">
      <v-card>
        <v-card-title>Settings</v-card-title>
        <v-card-text>
          <!-- Add settings options here -->
          <v-switch v-model="isDarkTheme" label="Dark Theme"></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="settingsDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { env } from '@/utils/env/env'

const { baseUrl } = env()
const route = useRoute()
const theme = useTheme()

const drawer = ref(true)
const rail = ref(false)
const settingsDialog = ref(false)
const isDarkTheme = ref(theme.global.current.value.dark)
const unreadNotifications = ref(3)

const menuItems = [
  { title: 'Home', icon: 'mdi-home-account', to: { name: 'home' } },
  { title: 'Projects', icon: 'mdi-file-table-box-multiple', to: { name: 'projects' } },
  { title: 'Automation', icon: 'mdi-refresh-auto', to: { name: 'automation' } },
  { title: 'User Stories', icon: 'mdi-notebook-outline', to: { name: 'userstory' } },
  { title: 'Report', icon: 'mdi-chart-areaspline', to: { name: 'report' } },
  {
    title: 'Project Overview(temp)',
    icon: 'mdi-chart-areaspline',
    to: { name: 'project-overview' }
  },
  {
    title: 'User Management(temp)',
    icon: 'mdi-human-greeting-variant',
    to: { name: 'usermanagement' }
  },
  { title: 'Guide', icon: 'mdi-book-open-variant', to: { name: 'guide' } },
  { title: 'Component', icon: 'mdi-view-dashboard', to: { name: 'component' } }
]

const currentPageTitle = computed(() => {
  const currentRoute = menuItems.find((item) => item.to.name === route.name)
  return currentRoute ? currentRoute.title : 'DevCollab'
})

const userInitials = computed(() => {
  // Replace with actual user data
  const name = 'John Doe'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
})

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  isDarkTheme.value = !isDarkTheme.value
}

const openSettings = () => {
  settingsDialog.value = true
}

const showNotifications = () => {
  // Implement notifications logic
  console.log('Show notifications')
}

const openProfile = () => {
  // Implement profile opening logic
  console.log('Open profile')
}

// Function to update drawer based on window width
const updateDrawer = () => {
  drawer.value = window.innerWidth >= 1280
  rail.value = window.innerWidth <= 1280
}

// Set up event listener on mount
onMounted(() => {
  updateDrawer() // Initial check
  window.addEventListener('resize', updateDrawer)
})

// Clean up event listener on unmount
onUnmounted(() => {
  window.removeEventListener('resize', updateDrawer)
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
