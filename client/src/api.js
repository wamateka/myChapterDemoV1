// api.js
import axios from 'axios'
export const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000/api' : 'https://mychapterdemov1.onrender.com/api' // Your backend root
const api = axios.create({
  baseURL: BASE_URL, // Your backend root
  withCredentials: true,               // ✅ Needed for session-based auth
})

export default api
