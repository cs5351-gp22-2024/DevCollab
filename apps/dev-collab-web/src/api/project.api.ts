import type { AxiosInstance } from 'axios'
import type {
  ProjectCreateCommand,
  ProjectModel,
  ProjectUpdateCommand
} from 'shared/models/project'

export const useProjectApi = (axios: AxiosInstance) => ({
  async getProject(projectId: number): Promise<ProjectModel> {
    const { data } = await axios.get(`/projects/${projectId}`)

    return data
  },
  async getProjects(): Promise<ProjectModel[]> {
    const { data } = await axios.get(`/projects`)

    return data
  },
  async createProjects(command: ProjectCreateCommand): Promise<string> {
    const { data } = await axios.post(`/projects`, command)

    return data
  },
  async updateProjects(projectId: number, command: ProjectUpdateCommand): Promise<void> {
    const { data } = await axios.post(`/projects/${projectId}`, command)

    return data
  },
  async removeProjects(projectId: number): Promise<void> {
    const { data } = await axios.delete(`/projects/${projectId}`)

    return data
  }
})
