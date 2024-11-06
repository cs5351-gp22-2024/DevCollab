import axios from 'axios'

if (process.env.API_URL === undefined) {
  process.env.API_URL = ''
}
const _axios = axios.create({
  baseURL: `${process.env.API_URL}/api/`
})

export const useAxios = () => _axios
