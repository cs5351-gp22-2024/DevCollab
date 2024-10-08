<!-- src/pages/userstory/UserStory.vue -->
<template>
  <v-container>

    
    <!-- Search and sort -->
    <v-row class="mb-4">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="search"
          label="Search stories"
          prepend-inner-icon="mdi-magnify"
          clearable
          @input="filterStories"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
        v-model="sortBy"
        :items="sortOptions"
        item-title="text"
        item-value="value"
        label="Sort by"
        @change="sortStories"
        ></v-select>
      </v-col>
    </v-row>

    <!-- User stories list -->
    <v-row>
      <v-col cols="12" md="6" v-for="story in sortedAndFilteredStories" :key="story.id">
        <v-card :elevation="2" class="mb-4">
          <v-card-title class="text-h6">
            {{ story.title }}
            <v-chip class="ml-2" :color="getPriorityColor(story.priority)" size="small">
              {{ story.priority }}
            </v-chip>
          </v-card-title>
          <v-card-text>
            <p><strong>As a:</strong> {{ story.asA }}</p>
            <p><strong>I want to:</strong> {{ story.iWantTo }}</p>
            <p><strong>So that:</strong> {{ story.soThat }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="editStory(story)">Edit</v-btn>
            <v-btn color="error" @click="confirmDelete(story)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add new story button -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-btn color="success" @click="showAddDialog">Add New User Story</v-btn>
      </v-col>
    </v-row>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.asA" label="As a"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.iWantTo" label="I want to"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.soThat" label="So that"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.priority"
                  :items="['Low', 'Medium', 'High']"
                  label="Priority"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface UserStory {
  id: number;
  title: string;
  asA: string;
  iWantTo: string;
  soThat: string;
  priority: 'Low' | 'Medium' | 'High';
}

const userStories = ref<UserStory[]>([
  {
    id: 1,
    title: "User Registration",
    asA: "New User",
    iWantTo: "create an account",
    soThat: "I can access the application's features",
    priority: 'High'
  },
  {
    id: 2,
    title: "Task Creation",
    asA: "Project Manager",
    iWantTo: "create new tasks",
    soThat: "I can assign work to team members",
    priority: 'Medium'
  },
  {
    id: 3,
    title: "View Dashboard",
    asA: "Team Member",
    iWantTo: "view project dashboard",
    soThat: "I can see an overview of project progress",
    priority: 'Low'
  },
  // Add more sample user stories here
])

const dialog = ref(false)
const deleteDialog = ref(false)
const editedIndex = ref(-1)
const editedItem = ref<UserStory>({
  id: 0,
  title: '',
  asA: '',
  iWantTo: '',
  soThat: '',
  priority: 'Medium'
})
const defaultItem: UserStory = {
  id: 0,
  title: '',
  asA: '',
  iWantTo: '',
  soThat: '',
  priority: 'Medium'
}

const search = ref('')
const sortOptions = [
  { text: 'Priority (High to Low)', value: 'priority-desc' },
  { text: 'Priority (Low to High)', value: 'priority-asc' },
  { text: 'Title (A-Z)', value: 'title-asc' },
  { text: 'Title (Z-A)', value: 'title-desc' }
]

const sortBy = ref('priority-desc')

const formTitle = computed(() => editedIndex.value === -1 ? 'New User Story' : 'Edit User Story')

const sortedAndFilteredStories = computed(() => {
  let stories = userStories.value

  // Apply search filter
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    stories = stories.filter(story => 
      Object.values(story).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(searchLower)
      )
    )
  }

  // Apply sorting
  stories.sort((a, b) => {
    switch (sortBy.value) {
      case 'priority-desc':
        return getPriorityValue(b.priority) - getPriorityValue(a.priority)
      case 'priority-asc':
        return getPriorityValue(a.priority) - getPriorityValue(b.priority)
      case 'title-asc':
        return a.title.localeCompare(b.title)
      case 'title-desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  return stories
})

const showAddDialog = () => {
  editedIndex.value = -1
  editedItem.value = { ...defaultItem }
  dialog.value = true
}

const editStory = (item: UserStory) => {
  editedIndex.value = userStories.value.indexOf(item)
  editedItem.value = { ...item }
  dialog.value = true
}

const deleteStory = (item: UserStory) => {
  editedIndex.value = userStories.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const deleteItemConfirm = () => {
  userStories.value.splice(editedIndex.value, 1)
  closeDelete()
}

const close = () => {
  dialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem }
}

const closeDelete = () => {
  deleteDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem }
}

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(userStories.value[editedIndex.value], editedItem.value)
  } else {
    editedItem.value.id = userStories.value.length + 1
    userStories.value.push(editedItem.value)
  }
  close()
}

const confirmDelete = (item: UserStory) => {
  editedIndex.value = userStories.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'red'
    case 'Medium': return 'orange'
    case 'Low': return 'green'
    default: return 'grey'
  }
}

const getPriorityValue = (priority: string) => {
  switch (priority) {
    case 'High': return 3
    case 'Medium': return 2
    case 'Low': return 1
    default: return 0
  }
}

const filterStories = () => {
  // This function is called when search input changes
  // The actual filtering is done in the computed property 'sortedAndFilteredStories'
}

const sortStories = () => {
  // This function is called when sort option changes
  // The actual sorting is done in the computed property 'sortedAndFilteredStories'
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>