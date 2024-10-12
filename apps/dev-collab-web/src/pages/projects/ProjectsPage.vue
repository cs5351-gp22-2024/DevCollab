<template>
  <div>
    <v-card title="Projects" :subtitle="`Total ${store.projects.length}`"></v-card>

    <v-card title="Recent Updates" class="mt-4">
      <v-list :items="recentUpdates" lines="two" item-props></v-list>
    </v-card>

    <v-card title="Active" class="mt-4">
      <v-list :items="actives" lines="two" item-props></v-list>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { makeBase64ImgToUrl } from '@/utils/base64-img/base64-img'
import { formatDate } from '@/utils/data-format/date-format'
import { filter, flatten, map, orderBy, take } from 'lodash'
import { computed } from 'vue'
import { useProjectsStore } from './projects.store'

const store = useProjectsStore()

const recentUpdates = computed(() =>
  flatten(
    map(
      take(
        orderBy(store.projects, (p) => p.modified, 'desc'),
        10
      ),
      (p) => [
        {
          prependAvatar: makeBase64ImgToUrl(p.avatar),
          title: `[PJ-${p.projectId}] ${p.name}`,
          subtitle: p.description
        },
        { type: 'divider', inset: true }
      ]
    )
  )
)

const formatSprintNos = (sprintNos: number[]) => {
  const len = sprintNos.length

  if (len === 0) {
    return `No sprint`
  } else if (len === 1) {
    return `Current sprint ${sprintNos[0]}`
  } else {
    return `Sprint transiting from ${sprintNos[0]} to ${sprintNos[1]}`
  }
}

const actives = computed(() =>
  map(
    take(
      orderBy(
        filter(store.projects, (p) => p.isActive),
        (p) => p.created,
        'desc'
      ),
      10
    ),
    (p) => ({
      prependAvatar: makeBase64ImgToUrl(p.avatar),
      title: `[PJ-${p.projectId}] ${p.name}`,
      subtitle: `Created ${formatDate(p.created)} • ${formatSprintNos(p.currentSprintNos)}`
    })
  )
)
</script>
