<template>
  <div>
    <v-card title="Project Sprint"></v-card>

    <v-card class="mt-4">
      <v-container>
        <v-row>
          <v-col cols="6">
            <div class="text-subtitle-1 text-medium-emphasis">Total Sprints</div>

            <v-list lines="one">
              <v-list-item
                v-for="sprint of store.sprints"
                :title="`Sprint ${sprint.sprintNo}`"
                :subtitle="`${formatDate(sprint.startDate)} - ${formatDate(sprint.endDate)}`"
              ></v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/data-format/date-format'
import { useProjectSprintStore } from './project-sprint.store'

const store = useProjectSprintStore()
</script>
