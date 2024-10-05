<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-6">Component Demo</h1>
    <CommentSection :comments="dummyCommentList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CommentSection from '@/components/common/CommentSection.vue'

export default defineComponent({
  components: {
    CommentSection
  },
  setup() {
    const dummyCommentList = ref([
      {
        id: 1,
        author: 'Isaac Lai',
        role: 'Developer',
        date: '9 Sep 17:25',
        content:
          'I just finished working on this part, please check it out! I just finished working on this part, please check it out! I just finished working on this part, please check it out! I just finished working on this part, please check it out!',
        replies: []
      },
      {
        id: 2,
        author: 'Peter Pan',
        role: 'Project Manager',
        date: '9 Sep 17:30',
        content: 'Thanks.\n@Miss Tester Please take a look first.',
        replies: [
          {
            id: 3,
            author: 'Alex Lee',
            role: 'Tester',
            date: '9 Sep 17:35',
            content: '@Peter Pan - Project Manager No problem.',
            replies: []
          }
        ]
      }
    ])

    return {
      dummyCommentList
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles.scss';
</style>
