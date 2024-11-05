import axios from 'axios'

const _axios = axios.create({
  baseURL: `${process.env.API_URL}/api/`
})

export const useAxios = () => _axios
