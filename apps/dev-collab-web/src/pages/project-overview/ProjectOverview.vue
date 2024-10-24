div
<template>
  <div class="mx-auto p-4 md:p-6 bg-gray-50">
    <h1 class="text-xl md:text-2xl font-bold mb-4">Projects Overview</h1>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
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
import { ref } from 'vue'
import TaskTable from '@/components/project-overview/TaskTable.vue'
import NestedDataTable from '@/components/project-overview/NestedDataTable.vue'
import CumulativeFlowDiagram from '@/components/project-overview/CumulativeFlowDiagram.vue'
import ProgressChart from '@/components/project-overview/ProgressChart.vue'

import {
  tasks as dummyTasks,
  story as dummyStories,
  chartData as dummyChartData,
  progressCards as dummyProgressCards,
  type ProgressData,
  type Task,
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
    const tasks = ref<Task[]>(dummyTasks)
    const stories = ref<Story[]>(dummyStories)
    const chartData = ref<CFDDataPoint[]>(dummyChartData)
    const progressCards = ref<ProgressData[]>(dummyProgressCards)
    const selectedPeriodIndexes = ref(progressCards.value.map(() => 0))
    const barColorList = ['red', 'yellow', 'teal'] as const

    const updateSelectedPeriodIndex = (cardIndex: number, newIndex: number): void => {
      selectedPeriodIndexes.value[cardIndex] = newIndex
    }

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
