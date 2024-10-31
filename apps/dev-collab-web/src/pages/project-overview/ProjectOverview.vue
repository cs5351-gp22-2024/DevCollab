div
<template>
  <div class="mx-auto p-4 md:p-6">
    <v-card title="Project Overview"></v-card>
    <div class="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div class="lg:col-span-7">
        <div class="lg:flex lg:justify-between lg:gap-4 overflow-auto">
          <div
            v-for="(card, index) in progressCards"
            :key="index"
            class="bg-white rounded-lg shadow-md min-h-[290px] min-w-[280px] mb-4 lg:mb-0"
          >
            <ProgressChart
              :barColor="barColorList[index]"
              :title="card.title"
              :progress="card.progress[selectedPeriodIndexes[index]]"
              :options="card.options"
              :selectedPeriodIndex="selectedPeriodIndexes[index]"
              @update:selectedPeriodIndex="(newIndex) => updateSelectedPeriodIndex(index, newIndex)"
            />
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-md h-[400px] md:h-[480px] lg:h-[560px] overflow-auto"
        >
          <CumulativeFlowDiagram class="min-w-[600px]" :chartData="chartData" />
        </div>
      </div>
      <div class="lg:col-span-5">
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
import { onMounted, ref } from 'vue'
import TaskTable from '@/components/project-overview/TaskTable.vue'
import NestedDataTable from '@/components/project-overview/NestedDataTable.vue'
import CumulativeFlowDiagram from '@/components/project-overview/CumulativeFlowDiagram.vue'
import ProgressChart from '@/components/project-overview/ProgressChart.vue'
import { useProjectMainStore } from '../project-main/project-main.store'

import { TaskApi } from '@/api/task.api'

import {
  story as dummyStories,
  chartData as dummyChartData,
  progressCards as dummyProgressCards,
  type ProgressData,
  type Story,
  type CFDDataPoint
} from './DummyData'

export default {
  components: {
    TaskTable,
    NestedDataTable,
    CumulativeFlowDiagram,
    ProgressChart
  },
  setup() {
    const mainStore = useProjectMainStore()
    const project = mainStore.project
    const taskApi = TaskApi()

    if (!project) {
      throw new Error('project is missing')
    }

    const stories = ref<Story[]>(dummyStories)
    const chartData = ref<CFDDataPoint[]>(dummyChartData)
    const progressCards = ref<ProgressData[]>(dummyProgressCards)
    const selectedPeriodIndexes = ref(progressCards.value.map(() => 0))
    const barColorList = ['red', 'yellow', 'teal'] as const

    const updateSelectedPeriodIndex = (cardIndex: number, newIndex: number): void => {
      selectedPeriodIndexes.value[cardIndex] = newIndex
    }

    const tasks = ref([])
    const fetchTasks = async () => {
      try {
        const data = await taskApi.getTaskbyProId(project.projectId)
        console.log('data', data)
        tasks.value = data.map(
          (task: {
            name: any
            priority: string
            state: string
            dueDate: string | number | Date
          }) => ({
            name: task.name,
            priority: task.priority,
            state: task.status,
            dueDate: new Date(task.duedate).toLocaleDateString() // Format the date
          })
        )
      } catch (err) {
        console.error('Error fetching:', err)
      }
    }

    onMounted(() => {
      fetchTasks()
    })

    return {
      tasks,
      stories,
      chartData,
      progressCards,
      selectedPeriodIndexes,
      barColorList,
      updateSelectedPeriodIndex
    }
  }
}
</script>
