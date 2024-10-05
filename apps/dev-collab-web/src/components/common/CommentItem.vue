<template>
  <div
    :class="['bg-white rounded-lg shadow p-4 mb-4', { 'ml-8 border-l-4 border-blue-500': isReply }]"
  >
    <div class="flex items-center mb-2">
      <img :src="avatarUrl" :alt="comment.author" class="w-8 h-8 rounded-full mr-3" />
      <div>
        <span class="font-bold text-gray-800">{{ comment.author }} - {{ comment.role }}</span>
        <span class="text-sm text-gray-500 ml-2">{{ comment.date }}</span>
      </div>
    </div>
    <p class="text-gray-700 mb-3">{{ comment.content }}</p>
    <button
      class="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition duration-300"
    >
      Reply
    </button>

    <div v-if="comment.replies && comment.replies.length > 0" class="mt-4">
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :isReply="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

interface Comment {
  id: number
  author: string
  role: string
  date: string
  content: string
  replies: Comment[]
}

export default defineComponent({
  name: 'CommentItem',
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true
    },
    isReply: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const avatarUrl = computed(() => {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(props.comment.author)}&background=random`
    })

    return {
      avatarUrl
    }
  }
})
</script>
