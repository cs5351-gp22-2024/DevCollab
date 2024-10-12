<template>
  <div class="task-management">
    <div class="header">
      <h1>Task Management</h1>
      <div>
        <button class="button" @click="addTask">Add Task</button>
        <button class="button" @click="refreshTasks">Refresh</button>
      </div>
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
          <th>Actions</th>
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
          <td class="actions">
            <button @click="editTask(task.id)">Edit</button>
            <button @click="deleteTask(task.id)">Delete</button>
          </td>
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

    const addTask = () => {
      // Logic to add a new task (you can implement a prompt or modal)
      const newTaskId = tasks.value.length + 1
      tasks.value.push({
        id: newTaskId,
        type: 'Task',
        status: 'To Do',
        assignee: 'New Assignee',
        dueDate: '2024-10-30',
        priority: 'Medium',
        completed: false
      })
    }

    const refreshTasks = () => {
      // Logic to refresh tasks (e.g., reset to initial state)
      console.log('Tasks refreshed')
    }

    const editTask = (id: number) => {
      // Logic to edit a task (you can implement a prompt or modal)
      console.log(`Edit Task with ID: ${id}`)
    }

    const deleteTask = (id: number) => {
      tasks.value = tasks.value.filter((task) => task.id !== id)
      console.log(`Deleted Task with ID: ${id}`)
    }

    return {
      tasks,
      addTask,
      refreshTasks,
      editTask,
      deleteTask
    }
  }
})
</script>

<style scoped>
.task-management {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.button {
  background-color: #3498db; /* Blue */
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
}

.actions button {
  background-color: #e67e22; /* Orange */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
