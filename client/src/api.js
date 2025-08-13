// api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend root
  withCredentials: true,               // ✅ Needed for session-based auth
})

export default api
