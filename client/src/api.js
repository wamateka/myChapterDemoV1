// api.js
import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api' // Your backend root
const api = axios.create({
  baseURL: BASE_URL, // Your backend root
  withCredentials: true,               // ✅ Needed for session-based auth
})

export default api
