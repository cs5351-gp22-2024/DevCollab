import { useAxios } from '@/vendors/axios'

export const TaskApi = () => {
  const axios = useAxios()

  return {
    async getTaskbyProId(projectId: number) {
      const { data } = await axios.get(`/task/${projectId}`)
      return data
    }
  }
}
