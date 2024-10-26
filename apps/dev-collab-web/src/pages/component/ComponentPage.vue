<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-6">Component Demo</h1>
    <section class="w-full flex justify-start">
      <CommentSection class="max-w-2xl" :comments="dummyCommentList" />
    </section>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import CommentSection from '@/components/Comment/CommentSection.vue'
import { CommentApi } from '@/api/comment.api'

interface Comment {
  comment_id: number
  project_id: number
  task_id: number
  comment: string
  author_user_id: number
  create_date: string
}

interface FormattedComment {
  id: number
  author: string
  role: string
  date: string
  content: string
}

export default {
  components: {
    CommentSection
  },
  setup() {
    const dummyCommentList = ref<FormattedComment[]>([])
    const loading = ref(false)
    const commentApi = CommentApi()

    const formatDateToShort = (date: Date): string => {
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

    const fetchComments = async () => {
      try {
        loading.value = true
        const data = await commentApi.getCommentAll()

        if (Array.isArray(data)) {
          const formattedComments = data.map((item: Comment) => ({
            id: Number(item.comment_id),
            author: `User ${item.author_user_id}`,
            role: 'User',
            date: formatDateToShort(new Date(item.create_date)),
            content: item.comment
          }))

          dummyCommentList.value = [...formattedComments]
        }
      } catch (err) {
        console.error('Error fetching comments:', err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchComments()
    })

    return {
      dummyCommentList,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles.scss';
</style>
