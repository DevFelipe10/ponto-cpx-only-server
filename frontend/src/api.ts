import axios from 'axios'

const api = axios.create({
  withCredentials: true, // Habilita envio e recebimento de cookies
})

export default api
