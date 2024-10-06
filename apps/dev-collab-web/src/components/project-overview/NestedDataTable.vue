<template>
  <div class="p-4">
    <h6 class="text-left text-gray-700 mb-4 text-sm">User Stories</h6>
    <div class="overflow-auto max-h-[270px] min-h-[270px] rounded-lg border">
      <table class="w-full divide-y divide-gray-200 text-xs">
        <thead class="bg-gray-50">
          <tr>
            <th class="w-6 px-1"></th>
            <th
              class="w-1/6 px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              USER STORIES
            </th>
            <th
              class="w-1/4 px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              DESCRIPTION
            </th>
            <th
              class="w-1/6 px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              STATUS
            </th>
            <th
              class="w-1/6 px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              PRIORITY
            </th>
            <th
              class="w-1/6 px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              DEADLINES
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-for="(story, storyIndex) in stories" :key="`story-${storyIndex}`">
            <tr :class="{ 'bg-gray-50': story.expanded }">
              <td class="w-6 px-1 py-2">
                <button @click="toggleExpand(story)" class="focus:outline-none">
                  <svg
                    class="w-3 h-3 text-gray-400 transform transition-transform"
                    :class="{ 'rotate-90deg': story.expanded }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </td>
              <td class="w-1/6 px-2 py-2 whitespace-nowrap">
                <span class="font-medium text-gray-900">{{ story.name }}</span>
              </td>
              <td class="w-1/4 px-2 py-2 whitespace-nowrap">
                <span class="text-gray-500">{{ story.description }}</span>
              </td>
              <td class="w-1/6 px-2 py-2 whitespace-nowrap">
                <!-- Add status here if available -->
              </td>
              <td class="w-1/6 px-2 py-2 whitespace-nowrap">
                <span
                  :class="{
                    'px-1.5 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full': true,
                    'bg-red-100 text-red-800': story.priority === 'High',
                    'bg-yellow-100 text-yellow-800': story.priority === 'Medium',
                    'bg-green-100 text-green-800': story.priority === 'Low'
                  }"
                >
                  {{ story.priority }}
                </span>
              </td>
              <td class="w-1/6 px-2 py-2 whitespace-nowrap text-gray-500">
                {{ story.deadline }}
              </td>
            </tr>
            <template v-if="story.expanded">
              <template
                v-for="(task, taskIndex) in story.tasks"
                :key="`task-${storyIndex}-${taskIndex}`"
              >
                <tr class="bg-gray-100">
                  <td class="w-6 px-1 py-2">
                    <button
                      @click="toggleExpand(task)"
                      class="focus:outline-none"
                      v-if="task.details.length > 0"
                    >
                      <svg
                        class="w-3 h-3 text-gray-400 transform transition-transform"
                        :class="{ 'rotate-90deg': task.expanded }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </td>
                  <td class="w-1/6 px-2 py-2 whitespace-nowrap">
                    <span class="font-medium text-gray-900">{{ task.name }}</span>
                  </td>
                  <td class="w-1/4 px-2 py-2 whitespace-nowrap">
                    <span class="text-gray-500">{{ task.description }}</span>
                  </td>
                  <td class="w-1/6 px-2 py-2 whitespace-nowrap"></td>
                  <td class="w-1/6 px-2 py-2 whitespace-nowrap"></td>
                  <td class="w-1/6 px-2 py-2 whitespace-nowrap text-gray-500">
                    {{ task.deadline }}
                  </td>
                </tr>
                <template v-if="task.expanded">
                  <tr
                    v-for="(detail, detailIndex) in task.details"
                    :key="`detail-${storyIndex}-${taskIndex}-${detailIndex}`"
                    class="bg-blue-50"
                  >
                    <td class="w-6 px-1 py-2"></td>
                    <td class="w-1/6 px-2 py-2 whitespace-nowrap">
                      <span class="font-medium text-gray-900">{{ detail.name }}</span>
                    </td>
                    <td class="w-1/4 px-2 py-2 whitespace-nowrap">
                      <span class="text-gray-500">{{ detail.description }}</span>
                    </td>
                    <td class="w-1/6 px-2 py-2 whitespace-nowrap"></td>
                    <td class="w-1/6 px-2 py-2 whitespace-nowrap"></td>
                    <td class="w-1/6 px-2 py-2 whitespace-nowrap text-gray-500">
                      {{ detail.deadline }}
                    </td>
                  </tr>
                </template>
              </template>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rotate-90deg {
  rotate: 90deg;
}
</style>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Story } from '~/pages/project-overview/DummyData'

export default defineComponent({
  name: 'NestedDataTable',
  props: {
    stories: {
      type: Array as PropType<Story[]>,
      required: true
    }
  },
  setup() {
    const toggleExpand = (item: Story | Story['tasks'][0]) => {
      item.expanded = !item.expanded
    }

    return {
      toggleExpand
    }
  }
})
</script>
