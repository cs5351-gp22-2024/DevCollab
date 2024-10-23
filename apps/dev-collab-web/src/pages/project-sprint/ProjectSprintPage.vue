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
              >
                <template v-slot:append>
                  <v-btn
                    color="grey-lighten-1"
                    variant="text"
                    @click="prepareInput('edit', sprint)"
                  >
                    Update
                  </v-btn>
                  <v-btn color="grey-lighten-1" variant="text" @click="removeSprint(sprint)">
                    Delete
                  </v-btn>
                </template>
              </v-list-item>
              <v-list-item>
                <v-btn variant="flat" block @click="prepareInput('create', null)">
                  + New Sprint
                </v-btn>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6" v-show="mode !== null">
            <div class="text-subtitle-1 text-medium-emphasis">Duration</div>

            <v-list lines="one">
              <v-list-item>
                <vue-date-picker
                  ref="dp"
                  class="justify-center"
                  v-model="form.duration"
                  :range="{ partialRange: false }"
                  inline
                  :enable-time-picker="false"
                  :min-date="new Date()"
                  @range-end="selectDate"
                  :action-row="{
                    showSelect: false,
                    showCancel: false,
                    showNow: false,
                    showPreview: true
                  }"
                ></vue-date-picker>
              </v-list-item>
            </v-list>

            <div class="flex justify-end">
              <v-btn color="primary" @click="addSprint()" v-if="mode === 'create'">Create</v-btn>
              <v-btn color="primary" @click="updateSprint()" v-else-if="mode === 'edit'">
                Save
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/data-format/date-format'
import { nextTick, ref } from 'vue'
import { useProjectSprintStore } from './project-sprint.store'
import { useSprints } from './sprints.logic'

const store = useProjectSprintStore()
const { mode, form, prepareInput, addSprint, removeSprint, updateSprint } = useSprints()

const dp = ref()

const selectDate = async () => {
  await nextTick()
  dp.value.selectDate()
}
</script>
