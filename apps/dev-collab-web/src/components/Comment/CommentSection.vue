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
      v-for="comment in sortedComments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, type PropType } from 'vue'
import CommentItem from './CommentItem.vue'
import CommentInput from './CommentInput.vue'

interface Comment {
  id: number
  author: string
  role: string
  date: string
  content: string
}

export default defineComponent({
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
    const localComments = ref([...props.comments])

    const sortedComments = computed(() => {
      return [...localComments.value].sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return sortOrder.value === 'latest'
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime()
      })
    })

    const formatDate = (date: Date): string => {
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
      const day = date.getDate()
      const month = months[date.getMonth()]
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')

      return `${day} ${month} ${hours}:${minutes}`
    }

    const addComment = (content: string) => {
      const newComment = {
        id: localComments.value.length + 1,
        author: 'Isaac Lai',
        role: 'Developer',
        date: formatDate(new Date()),
        content
      }
      localComments.value.push(newComment)
    }

    return {
      sortOrder,
      sortedComments,
      addComment
    }
  }
})
</script>
