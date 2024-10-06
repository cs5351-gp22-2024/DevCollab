<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-6">Component Demo</h1>
    <section class="w-full flex justify-start">
      <CommentSection class="max-w-2xl" :comments="dummyCommentList" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CommentSection from '@/components/Comment/CommentSection.vue'

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
          '<span>@Peter Pan</span>\nI just finished working on this part, please check it out! I just finished working on this part, please check it out! I just finished working on this part, please check it out! I just finished working on this part, please check it out!'
      },
      {
        id: 2,
        author: 'Peter Pan',
        role: 'Project Manager',
        date: '9 Sep 17:30',
        content: 'Thanks.\n<span>@Alex Lee</span> Please take a look first.'
      },
      {
        id: 3,
        author: 'Alex Lee',
        role: 'Tester',
        date: '9 Sep 17:35',
        content: '<span>@Peter Pan</span> No problem.'
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
