<template>
  <div class="mx-auto p-6 bg-gray-50">
    <h1>Projects Overview</h1>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-7">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-1 bg-white rounded-lg shadow-md h-[270px]"></div>
          <div class="col-span-1 bg-white rounded-lg shadow-md h-[270px]"></div>
          <div class="col-span-1 bg-white rounded-lg shadow-md h-[270px]"></div>
        </div>
        <div class="mt-4 bg-white rounded-lg shadow-md h-[580px]"></div>
      </div>
      <div class="col-span-5">
        <div class="bg-white rounded-lg shadow-md">
          <TaskTable :tasks="tasks" />
        </div>
        <div class="mt-4 bg-white rounded-lg shadow-md">
          <NestedDataTable :stories="stories" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TaskTable from '@/components/project-overview/TaskTable.vue'
import NestedDataTable from '@/components/project-overview/NestedDataTable.vue'
import { tasks as dummyTasks, story as dummyStories } from './DummyData'

export default defineComponent({
  components: {
    TaskTable,
    NestedDataTable
  },
  setup() {
    const tasks = ref(dummyTasks)
    const stories = ref(dummyStories)
    return {
      tasks,
      stories
    }
  }
})
</script>
