import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4002'
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      return config
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const requestGeneric = {
  get: (url, body) => axios.get(url, body),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
}

export default requestGeneric
