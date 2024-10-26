<template>
  <div>
    <div>
      <h1>Notification</h1>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>#</th>
          <th>Status</th>
          <th>Assignee</th>
          <th>Due Date</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>
            <input type="checkbox" v-model="task.completed" />
          </td>
          <td>{{ task.id }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.assignee }}</td>
          <td>{{ task.dueDate }}</td>
          <td>{{ task.priority }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TaskManagement',
  setup() {
    const tasks = ref([
      {
        id: 1,
        type: 'Task',
        status: 'To Do',
        assignee: 'Alan Wong',
        dueDate: '2024-10-12',
        priority: 'Medium',
        completed: false
      },
      {
        id: 2,
        type: 'Task',
        status: 'To Do',
        assignee: 'Alan Wong',
        dueDate: '2024-10-15',
        priority: 'High',
        completed: false
      },
      {
        id: 3,
        type: 'Task',
        status: 'To Do',
        assignee: 'Alan Wong',
        dueDate: '2024-10-20',
        priority: 'Low',
        completed: false
      },
      {
        id: 4,
        type: 'Task',
        status: 'Done',
        assignee: 'Alan Wong',
        dueDate: '2024-09-30',
        priority: 'Medium',
        completed: true
      },
      {
        id: 5,
        type: 'Task',
        status: 'Done',
        assignee: 'Alan Wong',
        dueDate: '2024-09-25',
        priority: 'Low',
        completed: true
      }
    ])

    return {
      tasks
    }
  }
})
</script>

<style lang="scss" scoped></style>
