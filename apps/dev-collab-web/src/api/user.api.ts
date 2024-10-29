import type { AxiosInstance } from 'axios'
import type { UserModel } from 'shared/models/user'

export const useUserApi = (axios: AxiosInstance) => ({
  async getUsers(): Promise<UserModel[]> {
    const { data } = await axios.get(`/users`)

    return data
  }
})
