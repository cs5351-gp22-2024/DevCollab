<template>
  <div>
    <div>
      <h1>Notification</h1>
    </div>
    <div class="mb-4 overflow-x-auto rounded-lg border">
      <table class="w-full divide-y divide-gray-200 min-w-[800px]">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-2 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th class="px-2 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
              Task Id
            </th>
            <th class="px-2 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th class="px-2 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
              Comment
            </th>
            <th class="px-2 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
              Mentioned User
            </th>
            <th class="px-2 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
              Update Date
            </th>
            <th class="px-2 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
              Read
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr class="bg-gray-50">
            <td class="py-2 px-4 border-b text-center"></td>
            <td class="py-2 px-4 border-b text-center"></td>
            <td class="py-2 px-4 border-b text-center"></td>
            <td class="py-2 px-4 border-b text-center"></td>
            <td class="py-2 px-4 border-b text-center"></td>
            <td class="py-2 px-4 border-b text-center"></td>
            <td class="py-2 px-4 border-b text-center"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Notification',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
