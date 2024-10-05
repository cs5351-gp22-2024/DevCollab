<template>
  <v-responsive class="border rounded">
    <v-app>
      <v-navigation-drawer class="bg-red-lighten-1" theme="dark">
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            :prepend-avatar="`${baseUrl}logo.png`"
            title="DevCollab"
          ></v-list-item>
        </template>

        <v-list>
          <v-list-item
            prepend-icon="mdi-home-account"
            title="Home"
            :to="{ name: 'home' }"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-file-table-box-multiple"
            title="Projects"
            :to="{ name: 'projects' }"
          ></v-list-item>
          <v-list-item prepend-icon="mdi-" title="Guide" :to="{ name: 'guide' }"></v-list-item>
          <v-list-item
            prepend-icon="mdi-refresh-auto"
            title="Automation"
            :to="{ name: 'automation' }"
          ></v-list-item>
        </v-list>

        <template v-slot:append>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            :to="{ name: 'login' }"
          ></v-list-item>
        </template>
      </v-navigation-drawer>

      <v-main>
        <RouterView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
import { env } from '@/utils/env/env'

const { baseUrl } = env()
</script>
