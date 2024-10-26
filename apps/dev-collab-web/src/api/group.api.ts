import { useAxios } from '@/vendors/axios'
import LoginApi from './login.api'

const GroupApi = {
  async createGroup(group_name: string) {
    const payload = {
      group_name: group_name
    }
    const axios = useAxios()

    const user_result = await LoginApi.checkToken(LoginApi.getLocalToken())

    if (user_result.success == true) {
      try {
        const user = user_result.user!
        const response = await axios.post('/' + user.userId + '/group/create', payload)
        if (response.data.result === 'SUCCESS') {
          return { success: true, token: response.data.member.group_id, message: 'GROUP_CREATED' }
        } else {
          return { success: false, message: response.data.error || 'GROUP_CANNOT_CREATED' }
        }
      } catch (error) {
        //this.message = 'Login failed: ' + (error.response?.data?.message || error.message)
        return { success: false, message: 'GROUP_CANNOT_CREATED' }
      }
    } else {
      return false
    }
  },

  async joinGroup(code: string) {
    const payload = {
      code: code
    }
    const axios = useAxios()

    const user_result = await LoginApi.checkToken(LoginApi.getLocalToken())

    if (user_result.success == true) {
      try {
        const user = user_result.user!
        const response = await axios.post('/' + user.userId + '/group/join', payload)
        if (response.data.result === 'SUCCESS') {
          return { success: true, token: response.data.member.member_id, message: 'GROUP_JOINED' }
        } else {
          return { success: false, message: response.data.error || 'GROUP_CANNOT_JOIN' }
        }
      } catch (error) {
        //this.message = 'Login failed: ' + (error.response?.data?.message || error.message)
        return { success: false, message: 'GROUP_CANNOT_JOIN' }
      }
    } else {
      return false
    }
  },
  async getCode(group_id: string) {
    const axios = useAxios()

    const user_result = await LoginApi.checkToken(LoginApi.getLocalToken())

    if (user_result.success == true) {
      try {
        const user = user_result.user!
        const response = await axios.get('/' + user.userId + '/' + group_id + '/invitation')
        if (response.data.result === 'SUCCESS') {
          return {
            success: true,
            code: response.data.message.code.invitation_code,
            message: 'CODE_FOUND'
          }
        } else {
          return { success: false, message: response.data.error || 'CODE_NOT_FOUND' }
        }
      } catch (error) {
        //this.message = 'Login failed: ' + (error.response?.data?.message || error.message)
        return { success: false, message: 'CODE_NOT_FOUND' }
      }
    } else {
      return false
    }
  },
  async regenereateCode(group_id: string) {
    const axios = useAxios()

    const user_result = await LoginApi.checkToken(LoginApi.getLocalToken())

    if (user_result.success == true) {
      try {
        const user = user_result.user!
        const response = await axios.post('/' + user.userId + '/' + group_id + '/invitation')
        if (response.data.result === 'SUCCESS') {
          return {
            success: true,
            code: response.data.message.code,
            message: 'CODE_FOUND'
          }
        } else {
          return { success: false, message: response.data.error || 'CODE_NOT_FOUND' }
        }
      } catch (error) {
        //this.message = 'Login failed: ' + (error.response?.data?.message || error.message)
        return { success: false, message: 'CODE_NOT_FOUND' }
      }
    } else {
      return false
    }
  },
  async getGroupList() {
    const user_result = await LoginApi.checkToken(LoginApi.getLocalToken())
    const axios = useAxios()
    if (user_result.success == true) {
      const user = user_result.user!
      const response = await axios.get('/' + user.userId + '/group')
      if (response.data.result === 'SUCCESS') {
        console.log(response.data)
        return response.data.group
      } else {
        return []
      }
    }
  },
  async getMemberList(group_id: string) {
    const user_result = await LoginApi.checkToken(LoginApi.getLocalToken())
    const axios = useAxios()
    if (user_result.success == true) {
      const user = user_result.user!
      const response = await axios.get('/' + user.userId + '/' + group_id + '/members')
      if (response.data.result === 'SUCCESS') {
        return response.data.memberList
      } else {
        return []
      }
    }
  }
}

export default GroupApi // Default export