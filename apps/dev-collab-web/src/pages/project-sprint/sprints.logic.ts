import { useSprintApi } from '@/api/sprint.api'
import { usePrompt } from '@/utils/prompt/prompt'
import { useAxios } from '@/vendors/axios'
import moment from 'moment'
import type { SprintModel } from 'shared/models/sprint'
import { computed, reactive, ref } from 'vue'
import { useProjectMainStore } from '../project-main/project-main.store'
import { useProjectSprintStore } from './project-sprint.store'

export type SprintUpdateMode = 'create' | 'edit'

export const useSprints = () => {
  const axios = useAxios()
  const sprintApi = useSprintApi(axios)
  const prompt = usePrompt()
  const mainStore = useProjectMainStore()
  const store = useProjectSprintStore()

  const form = reactive({
    sprintId: null as number | null,
    duration: [] as string[]
  })
  const mode = ref(null as SprintUpdateMode | null)
  const project = mainStore.project

  if (!project) {
    throw new Error('project is missing')
  }

  const prepareInput = (modeUpdate: SprintUpdateMode | null, sprint: SprintModel | null) => {
    const now = new Date().toISOString()

    form.sprintId = sprint?.sprintId || null
    form.duration = [sprint?.startDate || now, sprint?.endDate || now]

    mode.value = modeUpdate
  }

  const refreshSprints = async () => {
    store.sprints = await sprintApi.getProjectSprints(project.projectId)
  }

  const addSprint = async () => {
    await sprintApi.createSprint(project.projectId, {
      startDate: moment(form.duration[0]).startOf('day').toISOString(),
      endDate: moment(form.duration[1]).endOf('day').toISOString()
    })

    await refreshSprints()

    prompt.alert('Sprint is created')
  }

  const removeSprint = async (sprint: SprintModel) => {
    const confirm = await prompt.confirm('Confirm?')

    if (!confirm) {
      return
    }

    await sprintApi.removeSprint(sprint.sprintId)

    await refreshSprints()

    prompt.alert('Sprint is removed')
  }

  const updateSprint = async () => {
    if (!form.sprintId) {
      throw new Error('Sprint id is missing')
    }

    await sprintApi.updateSprint(form.sprintId, {
      startDate: moment(form.duration[0]).startOf('day').toISOString(),
      endDate: moment(form.duration[1]).endOf('day').toISOString()
    })

    await refreshSprints()

    prompt.alert('Sprint is updated')
  }

  return {
    form,
    mode: computed(() => mode.value),
    prepareInput,
    addSprint,
    updateSprint,
    removeSprint
  }
}
