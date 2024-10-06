<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h6 class="text-gray-700">Latest Task</h6>
      <div class="relative inline-block text-left">
        <button
          @click="toggleDropdown"
          type="button"
          class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ sortByText }}
          <svg
            class="ml-2 -mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
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
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a
              @click.prevent="setSortBy('priority')"
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >By Priority</a
            >
            <a
              @click.prevent="setSortBy('deadline')"
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >By Deadline</a
            >
            <a
              @click.prevent="setSortBy('name')"
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >By Name</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-auto max-h-[380px] min-h-[380px] rounded-lg border">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Task
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Priority
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Deadline
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Detail
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="task in sortedTasks" :key="task.name">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ task.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="priorityClass(task.priority)">
                {{ task.priority }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ task.deadline }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button :class="goButtonClass()">GO</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed, ref, watch } from 'vue'

interface Task {
  name: string
  priority: 'High' | 'Medium' | 'Low'
  deadline: string
}

export default defineComponent({
  name: 'TaskTable',
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
      default: () => []
    }
  },
  setup(props) {
    const sortBy = ref<'priority' | 'deadline' | 'name'>('priority')
    const isDropdownOpen = ref(false)

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const setSortBy = (value: 'priority' | 'deadline' | 'name') => {
      sortBy.value = value
      isDropdownOpen.value = false
    }

    const sortByText = computed(() => {
      switch (sortBy.value) {
        case 'priority':
          return 'By Priority'
        case 'deadline':
          return 'By Deadline'
        case 'name':
          return 'By Name'
        default:
          return 'By Priority'
      }
    })

    const sortedTasks = computed(() => {
      return [...props.tasks].sort((a, b) => {
        if (sortBy.value === 'priority') {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        } else if (sortBy.value === 'deadline') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        } else {
          return a.name.localeCompare(b.name)
        }
      })
    })

    watch(sortBy, (newValue) => {
      console.log('Sort by changed to:', newValue)
    })

    watch(
      sortedTasks,
      (newValue) => {
        console.log('Sorted tasks changed:', newValue)
      },
      { deep: true }
    )

    const priorityClass = (priority: string) => {
      const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium'
      switch (priority) {
        case 'High':
          return `${baseClasses} bg-red-100 text-red-800`
        case 'Medium':
          return `${baseClasses} bg-yellow-100 text-yellow-800`
        case 'Low':
          return `${baseClasses} bg-green-100 text-green-800`
        default:
          return baseClasses
      }
    }

    const goButtonClass = () => {
      const baseClasses = 'px-4 py-2 rounded-md text-sm font-medium'
      return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600`
    }

    return {
      sortBy,
      isDropdownOpen,
      sortByText,
      sortedTasks,
      priorityClass,
      goButtonClass,
      toggleDropdown,
      setSortBy
    }
  }
})
</script>
