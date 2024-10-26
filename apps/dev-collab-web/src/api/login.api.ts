import { useAxios } from '@/vendors/axios'

const LoginApi = {
  async getLoginToken(email: string, password: string | null, vcode: string | null) {
    const payload = {
      email: email,
      password: password,
      vcode: vcode
    }
    const axios = useAxios()

    try {
      const response = await axios.post('/account/login/password', payload)
      if (response.data.result === 'SUCCESS' && response.data.token) {
        localStorage.setItem('auth_token', response.data.token) // Store the token
        //console.log('Token stored:', response.data.token) // For debugging
        return { success: true, token: response.data.token, message: 'LOGIN_SUCCESS' }
      } else {
        return { success: false, message: response.data.error || 'LOGIN_FAILED' }
      }
    } catch (error) {
      //this.message = 'Login failed: ' + (error.response?.data?.message || error.message)
      console.error('Axios error:', error)
      return { success: false, message: 'LOGIN_FAILED' }
    }
  },

  async checkToken(token: string) {
    const payload = {
      token: token
    }
    const axios = useAxios()
    try {
      const response = await axios.post('/account/login/token', payload)
      if (response.data.result === 'SUCCESS') {
        return { success: true, user: response.data.user, message: 'TOKEN_SUCCESS' }
      } else {
        return { success: false, message: response.data.error || 'TOKEN_FAILED' }
      }
    } catch (error) {
      return { success: false, message: 'TOKEN_FAILED' }
    }
  },

  getLocalToken() {
    const token = localStorage.getItem('auth_token')
    if (token != null) {
      return token
    } else {
      return ''
    }
  }
}

export default LoginApi // Default export
