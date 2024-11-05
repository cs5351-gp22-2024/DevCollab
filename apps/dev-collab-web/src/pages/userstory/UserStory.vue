<template>
  <v-container>

    <!-- Search, Sort, and Add New User Story -->
    <v-row class="mb-4" align="center">
      <!-- Search Field -->
      <v-col cols="12" sm="4" md="4">
        <v-text-field v-model="search" label="Search stories" prepend-inner-icon="mdi-magnify" clearable
          @input="filterStories"></v-text-field>
      </v-col>

      <!-- Sort By Select -->
      <v-col cols="12" sm="4" md="4">
        <v-select v-model="sortBy" :items="sortOptions" item-title="text" item-value="value" label="Sort by"
          @change="sortStories"></v-select>
      </v-col>

      <!-- Add New User Story Button -->
      <v-col cols="12" sm="4" md="4" class="text-sm-end">
        <v-btn color="success" @click="showAddDialog">Add New User Story</v-btn>
      </v-col>
    </v-row>

    <!-- User stories list -->
    <v-row>
      <v-col cols="12" md="4" v-for="story in sortedAndFilteredStories" :key="story.userStoryId">
        <v-card :elevation="2" class="mb-4">
          <v-card-title class="text-h6" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              {{ story.title }}
              <v-chip class="ml-2" :color="getPriorityColor(story.priority)" size="small">{{ story.priority }}</v-chip>
            </div>

            <!-- Detail Icon without button background, aligned to the right -->
            <v-icon color="blue" @click="editStory(story)">mdi-information</v-icon>
          </v-card-title>



          <v-card-text>
            <p><strong>As a:</strong> {{ story.asA }}</p>
            <p><strong>I want to:</strong> {{ story.iWantTo }}</p>
            <p><strong>So that:</strong> {{ story.soThat }}</p>

          </v-card-text>
          <v-card-actions>
            <v-btn icon @click="upvote(story)">
              <v-icon color="green">mdi-thumb-up</v-icon>
            </v-btn>
            <span>{{ story.upvoteCount }}</span> <!-- Show upvote count -->

            <v-btn icon @click="downvote(story)">
              <v-icon color="red">mdi-thumb-down</v-icon>
            </v-btn>
            <span>{{ story.downvoteCount }}</span> <!-- Show downvote count -->

            <v-spacer></v-spacer>
            <v-btn color="primary" @click="editStory(story)">Edit</v-btn>
            <v-btn color="error" @click="confirmDelete(story)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <!-- Title Field -->
          <v-col cols="12">
            <v-text-field v-model="editedItem.title" label="Title" placeholder="e.g., Improve Search Function"></v-text-field>
          </v-col>

          <!-- 'As a' with predefined options -->
          <v-col cols="12">
            <v-autocomplete
              v-model="editedItem.asA"
              :items="['User', 'Admin', 'Developer', 'Manager']"
              label="As a"
              placeholder="Select or type a role"
              clearable
              :menu-props="{ maxHeight: 'auto' }"  
              no-data-text=""  
              :hide-no-data="true"  
            ></v-autocomplete>
          </v-col>

          <!-- 'I want to' with suggestions -->
          <v-col cols="12">
            <v-autocomplete
              v-model="editedItem.iWantTo"
              :items="['Improve navigation', 'Search for products', 'Add new functionality', 'Fix bugs']"
              label="I want to"
              placeholder="Select or describe the feature"
              clearable
              :menu-props="{ maxHeight: 'auto' }"  
              no-data-text="" 
              :hide-no-data="true"  
            ></v-autocomplete>
          </v-col>

          <!-- 'So that' with suggestions -->
          <v-col cols="12">
            <v-autocomplete
              v-model="editedItem.soThat"
              :items="['Easily find products', 'Improve user experience', 'Ensure data security', 'Enhance performance']"
              label="So that"
              placeholder="Select or describe the benefit"
              clearable
              :menu-props="{ maxHeight: 'auto' }"  
              no-data-text=""
              :hide-no-data="true" 
            ></v-autocomplete>
          </v-col>

          <!-- Priority with predefined options -->
          <v-col cols="12">
            <v-select
              v-model="editedItem.priority"
              :items="['Low', 'Medium', 'High']"
              label="Priority"
              placeholder="Select priority"
              :menu-props="{ maxHeight: 'auto' }"  
              no-data-text=""  
              :hide-no-data="true" 
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
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface UserStory {
  userStoryId: number;
  title: string;
  asA: string;
  iWantTo: string;
  soThat: string;
  priority: 'Low' | 'Medium' | 'High';
  upvoteCount: number;  // Add upvote count
  downvoteCount: number;  // Add downvote count
}

const userStories = ref<UserStory[]>([]);

// Fetch all user stories from the backend
const fetchUserStories = async () => {
  try {
    const response = await axios.get('/api/userstories');
    userStories.value = response.data;
  } catch (error) {
    console.error('Error fetching user stories:', error);
  }
};

onMounted(fetchUserStories);

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'No due date';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
};

const dialog = ref(false)
const deleteDialog = ref(false)
const editedIndex = ref(-1)
const editedItem = ref<UserStory>({
  userStoryId: 0,
  title: '',
  asA: '',
  iWantTo: '',
  soThat: '',
  priority: 'Medium',
  upvoteCount: 0,  // Add upvote count
  downvoteCount: 0,  // Add downvote count
});

const defaultItem: UserStory = {
  userStoryId: 0,
  title: '',
  asA: '',
  iWantTo: '',
  soThat: '',
  priority: 'Medium',
  upvoteCount: 0,  // Add upvote count
  downvoteCount: 0,  // Add downvote count
};


const search = ref('')
const sortOptions = [
  { text: 'Priority (High to Low)', value: 'priority-desc' },
  { text: 'Priority (Low to High)', value: 'priority-asc' },
  { text: 'Title (A-Z)', value: 'title-asc' },
  { text: 'Title (Z-A)', value: 'title-desc' },

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
        return getPriorityValue(b.priority) - getPriorityValue(a.priority);
      case 'priority-asc':
        return getPriorityValue(a.priority) - getPriorityValue(b.priority);
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });

  return stories
})

// Show dialog for adding new user story
const showAddDialog = () => {
  editedIndex.value = -1
  editedItem.value = { ...defaultItem }
  dialog.value = true
}

// Edit existing user story
const editStory = (item: UserStory) => {
  editedIndex.value = userStories.value.indexOf(item)
  editedItem.value = { ...item }
  dialog.value = true
}

// Delete user story confirmation
const confirmDelete = (item: UserStory) => {
  editedIndex.value = userStories.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

// Confirm deletion of user story
const deleteItemConfirm = async () => {
  try {
    await axios.delete(`/api/userstories/${editedItem.value.userStoryId}`);
    userStories.value.splice(editedIndex.value, 1);
    closeDelete();
  } catch (error) {
    console.error('Error deleting user story:', error);
  }
}

// Save new or edited user story
const save = async () => {
  if (editedIndex.value > -1) {
    try {
      const response = await axios.put(`/api/userstories/${editedItem.value.userStoryId}`, editedItem.value);
      Object.assign(userStories.value[editedIndex.value], response.data);
    } catch (error) {
      console.error('Error updating user story:', error);
    }
  } else {
    try {
      const response = await axios.post('/api/userstories', editedItem.value);
      userStories.value.push(response.data);
    } catch (error) {
      console.error('Error creating user story:', error);
    }
  }
  close();
}

// Close the Add/Edit dialog
const close = () => {
  dialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem }
}

// Close the Delete dialog
const closeDelete = () => {
  deleteDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem }
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

const upvote = async (story: UserStory) => {
  try {
    const response = await axios.post(`/api/userstories/${story.userStoryId}/upvote`);
    story.upvoteCount = response.data.upvoteCount;  // Update upvote count locally
  } catch (error) {
    console.error('Error upvoting story:', error);
  }
};

const downvote = async (story: UserStory) => {
  try {
    const response = await axios.post(`/api/userstories/${story.userStoryId}/downvote`);
    story.downvoteCount = response.data.downvoteCount;  // Update downvote count locally
  } catch (error) {
    console.error('Error downvoting story:', error);
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
