<template>
  <v-container>
    <v-card title="Project Overview"></v-card>
    <!-- Task List UI -->
    <v-row class="mt-4 mb-4" align="center">
      <v-col cols="12" sm="4" md="4">
        <v-text-field
          v-model="search"
          label="Search tasks"
          prepend-inner-icon="mdi-magnify"
          clearable
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-select
          v-model="sortBy"
          :items="sortOptions"
          item-title="text"
          item-value="value"
          label="Sort by"
          :disabled="loading"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4" md="4" class="text-sm-end">
        <v-btn color="success" @click="showAddDialog" :disabled="loading">Add New Task</v-btn>
      </v-col>
    </v-row>

    <!-- Error Alert -->
    <v-alert v-if="error" type="error" closable @click:close="error = null">
      {{ error }}
    </v-alert>

    <!-- Loading State -->
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-col>
    </v-row>

    <!-- Task List -->
    <v-row v-else>
      <v-col cols="12" md="4" v-for="task in sortedAndFilteredTasks" :key="task.taskid">
        <v-card :elevation="2" class="mb-4">
          <v-card-title class="text-h6">{{ task.name }}</v-card-title>
          <v-card-text>
            <p><strong>Project ID:</strong> {{ task.projectId }}</p>
            <p><strong>Sprint ID:</strong> {{ task.sprintId }}</p>
            <p><strong>Description:</strong> {{ task.description }}</p>
            <p><strong>Priority:</strong> {{ task.priority }}</p>
            <p><strong>Status:</strong> {{ task.status }}</p>
            <p><strong>Assignee:</strong> {{ task.assignee }}</p>
            <p><strong>Due Date:</strong> {{ task.duedate }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="editTask(task)">Edit</v-btn>
            <v-btn color="error" @click="confirmDelete(task)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model.number="editedTask.projectId"
                  label="Project ID"
                  type="number"
                  :rules="[(v) => !!v || 'Project ID is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.number="editedTask.sprintId"
                  label="Sprint ID"
                  type="number"
                  :rules="[(v) => !!v || 'Sprint ID is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedTask.name"
                  label="Task Name"
                  :rules="[(v) => !!v || 'Task name is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedTask.description" label="Description"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedTask.priority"
                  :items="['Low', 'Medium', 'High']"
                  label="Priority"
                  :rules="[(v) => !!v || 'Priority is required']"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedTask.status"
                  :items="['To Do', 'In Progress', 'Done']"
                  label="Status"
                  :rules="[(v) => !!v || 'Status is required']"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedTask.assignee" label="Assignee"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedTask.duedate"
                  label="Due Date"
                  type="date"
                  :rules="[(v) => !!v || 'Due date is required']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog" :disabled="saving"
            >Cancel</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="saveTask" :loading="saving"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this task?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeDeleteDialog"
            :disabled="deleting"
            >Cancel</v-btn
          >
          <v-btn color="error" variant="text" @click="deleteTaskConfirm" :loading="deleting"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { TaskManagementApi } from '@/api/taskmanagement.api'
import LoginApi from '@/api/login.api'
import { useProjectMainStore } from '../project-main/project-main.store'
const { getTasks, createTask: createTaskApi, updateTask, deleteTask } = TaskManagementApi()
const mainStore = useProjectMainStore()
const project = mainStore.project
console.log(project?.projectId)

interface Task {
  taskid?: number
  name: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'To Do' | 'In Progress' | 'Done'
  assignee: string
  duedate: string
  projectId: number
  sprintId: number
  author: number
}

const defaultTask: Task = {
  name: '',
  description: '',
  priority: 'Medium',
  status: 'To Do',
  assignee: '',
  duedate: '',
  projectId: 0,
  sprintId: 0,
  author: 0
}

const tasks = ref<Task[]>([])
const dialog = ref(false)
const deleteDialog = ref(false)
const editedIndex = ref(-1)
const editedTask = ref<Task>({ ...defaultTask })
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const error = ref<string | null>(null)

const search = ref('')
const sortOptions = [
  { text: 'Priority (High to Low)', value: 'priority-desc' },
  { text: 'Priority (Low to High)', value: 'priority-asc' },
  { text: 'Name (A-Z)', value: 'name-asc' },
  { text: 'Name (Z-A)', value: 'name-desc' }
]

const sortBy = ref('priority-desc')

const formTitle = computed(() => (editedIndex.value === -1 ? 'New Task' : 'Edit Task'))

const sortedAndFilteredTasks = computed(() => {
  let filteredTasks = [...tasks.value] // Create a new array to avoid mutation

  if (search.value) {
    const searchLower = search.value.toLowerCase()
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.name.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
    )
  }

  return filteredTasks.sort((a, b) => {
    switch (sortBy.value) {
      case 'priority-desc':
        return getPriorityValue(b.priority) - getPriorityValue(a.priority)
      case 'priority-asc':
        return getPriorityValue(a.priority) - getPriorityValue(b.priority)
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })
})

const fetchTasks = async () => {
  loading.value = true
  error.value = null
  try {
    const info = await LoginApi.checkToken(LoginApi.getLocalToken())
    tasks.value = await getTasks(project?.projectId) //getTasks(info.user.projectId, info.user.sprintId)
  } catch (err) {
    console.error('Error fetching tasks:', err)
    error.value = 'Failed to fetch tasks. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchTasks)

const showAddDialog = () => {
  editedIndex.value = -1
  editedTask.value = { ...defaultTask }
  dialog.value = true
}

const editTask = (task: Task) => {
  editedIndex.value = tasks.value.indexOf(task)
  editedTask.value = { ...task }
  dialog.value = true
}

const confirmDelete = (task: Task) => {
  editedIndex.value = tasks.value.indexOf(task)
  editedTask.value = { ...task }
  deleteDialog.value = true
}

const deleteTaskConfirm = async () => {
  deleting.value = true
  try {
    await deleteTask(
      editedTask.value.projectId,
      editedTask.value.sprintId,
      editedTask.value.taskid!
    )
    await fetchTasks()
    closeDeleteDialog()
  } catch (err) {
    console.error('Error deleting task:', err)
    error.value = 'Failed to delete task. Please try again later.'
  } finally {
    deleting.value = false
  }
}

const saveTask = async () => {
  saving.value = true
  try {
    const info = await LoginApi.checkToken(LoginApi.getLocalToken())
    const userId = info.user.userId

    const command = {
      ...editedTask.value,
      author: userId
    }

    if (editedIndex.value > -1) {
      await updateTask(
        editedTask.value.projectId,
        editedTask.value.sprintId,
        editedTask.value.taskid!,
        command
      )
    } else {
      console.log(command)
      await createTaskApi(editedTask.value.projectId, editedTask.value.sprintId, command)
    }
    await fetchTasks()
    closeDialog()
  } catch (err) {
    console.error('Error saving task:', err)
    error.value = 'Failed to save task. Please try again later.'
  } finally {
    saving.value = false
  }
}

const closeDialog = () => {
  dialog.value = false
  editedIndex.value = -1
  editedTask.value = { ...defaultTask }
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  editedIndex.value = -1
  editedTask.value = { ...defaultTask }
}

const getPriorityValue = (priority: string) => {
  switch (priority) {
    case 'High':
      return 3
    case 'Medium':
      return 2
    case 'Low':
      return 1
    default:
      return 0
  }
}
</script>

<style scoped>
.v-card-text p {
  margin-bottom: 8px;
}

.v-card-title {
  word-break: break-word;
}
</style>
