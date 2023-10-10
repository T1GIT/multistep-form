import axios from 'axios'
import { API_URL } from '@/shared/constants/url'

export const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 12345',
  },
})
