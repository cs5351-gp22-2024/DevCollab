import axios from 'axios'

const _axios = axios.create({
  baseURL: '/api/'
})

export const useAxios = () => _axios
