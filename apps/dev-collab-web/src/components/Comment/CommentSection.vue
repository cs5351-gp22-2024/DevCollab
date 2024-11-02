<template>
  <div class="mt-8">
    <h2 class="text-2xl font-bold text-gray-800">Comments</h2>
    <div class="flex justify-end">
      <div class="w-fit rounded-lg bg-gray-200 p-1">
        <button
          @click="sortOrder = 'oldest'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
            sortOrder === 'oldest'
              ? 'bg-white text-gray-800 shadow'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          Oldest
        </button>
        <button
          @click="sortOrder = 'latest'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
            sortOrder === 'latest'
              ? 'bg-white text-gray-800 shadow'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          Latest
        </button>
      </div>
    </div>
    <CommentInput class="mt-6" @add-comment="addComment" />
    <CommentItem
      class="mt-6"
      v-for="(comment, index) in sortedComments"
      :key="`${comment.id}-${index}`"
      :comment="comment"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, type PropType, watch } from 'vue'
import CommentItem from './CommentItem.vue'
import CommentInput from './CommentInput.vue'

interface Comment {
  id: number
  author: string
  role: string
  date: string
  content: string
}

export default {
  components: {
    CommentItem,
    CommentInput
  },
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
      required: true
    }
  },
  setup(props) {
    const sortOrder = ref('latest')
    const localComments = ref<Comment[]>([])

    watch(
      () => props.comments,
      (newComments) => {
        localComments.value = [...newComments]
      },
      { immediate: true, deep: true }
    )

    const sortedComments = computed(() => {
      return [...localComments.value].sort((a, b) => {
        if (sortOrder.value === 'latest') {
          return b.date.localeCompare(a.date)
        } else {
          return a.date.localeCompare(b.date)
        }
      })
    })

    const formatDate = (date: Date): string => {
      const day = date.getDate()
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      const month = months[date.getMonth()]
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')

      return `${day} ${month} ${hours}:${minutes}`
    }

    const addComment = (content: string) => {
      const maxId = Math.max(...localComments.value.map((comment) => comment.id), 0)
      const newComment = {
        id: maxId + 1,
        author: 'User 1001',
        role: '',
        date: formatDate(new Date()),
        content
      }
      localComments.value = [...localComments.value, newComment]
    }

    return {
      sortOrder,
      sortedComments,
      addComment
    }
  }
}
</script>
