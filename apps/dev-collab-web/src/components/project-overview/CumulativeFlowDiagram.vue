<!-- src/components/project-overview/ProjectProgressChart.vue -->
<template>
  <div class="p-4 h-[90%]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-700">Number of tasks in each state over time</h2>
      <div class="relative inline-block text-left">
        <button
          @click="toggleDropdown"
          type="button"
          class="inline-flex justify-center items-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ selectedPeriod }}
          <svg
            class="ml-2 -mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div
          v-if="isDropdownOpen"
          class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <a
              v-for="option in periodOptions"
              :key="option"
              @click.prevent="setPeriod(option)"
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {{ option }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="h-full">
      <canvas class="h-full" ref="progressCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, toRaw } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const selectedPeriod = ref('Weekly')
    const progressCanvas = ref(null)
    const isDropdownOpen = ref(false)
    const periodOptions = ['Weekly', 'Monthly']
    let chart = null

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const setPeriod = (period) => {
      selectedPeriod.value = period
      isDropdownOpen.value = false
      updateChartPeriod()
    }

    const createCFDChart = () => {
      if (progressCanvas.value) {
        const ctx = progressCanvas.value.getContext('2d')
        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [],
            datasets: [
              {
                label: 'To Do',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                fill: true
              },
                            {
                label: 'In Progress',
                data: [],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgb(255, 206, 86)',
                fill: true
              },
              {
                label: 'Done',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
                fill: true
              },
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'category',
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                stacked: true,
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Tasks'
                }
              }
            },
            plugins: {
              tooltip: {
                mode: 'index'
              },
              legend: {
                display: true,
                position: 'top'
              },
              title: {
                display: false,
                text: 'Cumulative Flow Diagram'
              }
            }
          }
        })
      }
    }

    const updateChartPeriod = () => {
      if (chart) {
        let filteredData = toRaw(props.chartData)

        if (selectedPeriod.value === 'Monthly') {
          // Group data by month
          const monthlyData = {}
          filteredData.forEach((item) => {
            const monthYear = item.date.substring(0, 7) // Get YYYY-MM
            if (!monthlyData[monthYear]) {
              monthlyData[monthYear] = {
                date: `${monthYear}-01`,
                todo: 0,
                inProgress: 0,
                done: 0
              }
            }
            monthlyData[monthYear].todo += item.todo
            monthlyData[monthYear].inProgress += item.inProgress
            monthlyData[monthYear].done += item.done
          })
          filteredData = Object.values(monthlyData)
        }

        // Sort the filtered data by date
        filteredData.sort((a, b) => new Date(a.date) - new Date(b.date))

        chart.data.labels = filteredData.map((item) => item.date)
        chart.data.datasets[0].data = filteredData.map((item) => item.done)
        chart.data.datasets[1].data = filteredData.map((item) => item.done + item.inProgress)
        chart.data.datasets[2].data = filteredData.map(
          (item) => item.done + item.inProgress + item.todo
        )
        chart.update()
      }
    }

    onMounted(() => {
      createCFDChart()
      updateChartPeriod()
    })

    watch(() => selectedPeriod.value, updateChartPeriod)
    watch(() => props.chartData, updateChartPeriod, { deep: true })

    return {
      selectedPeriod,
      progressCanvas,
      isDropdownOpen,
      periodOptions,
      toggleDropdown,
      setPeriod
    }
  }
}
</script>
