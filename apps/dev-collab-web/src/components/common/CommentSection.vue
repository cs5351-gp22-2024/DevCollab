<template>
  <div class="max-w-2xl mx-auto mt-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Comments</h2>
      <select
        v-model="sortOrder"
        class="bg-white border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="oldest">Oldest</option>
        <option value="latest">Latest</option>
      </select>
    </div>
    <div>
      <CommentItem v-for="comment in sortedComments" :key="comment.id" :comment="comment" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import CommentItem from './CommentItem.vue'

interface Comment {
  id: number
  author: string
  role: string
  date: string
  content: string
  replies: Comment[]
}

export default defineComponent({
  name: 'CommentSection',
  components: {
    CommentItem
  },
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
      required: true
    }
  },
  setup(props) {
    const sortOrder = ref('latest')

    const sortedComments = computed(() => {
      return [...props.comments].sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return sortOrder.value === 'latest'
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime()
      })
    })

    return {
      sortOrder,
      sortedComments
    }
  }
})
</script>
