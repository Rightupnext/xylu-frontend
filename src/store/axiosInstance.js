import axios from 'axios'
import { encrypt, decrypt } from '../utils/Crypto'
import { token } from '../auth/index'

const backendUrl = import.meta.env.VITE_BACKEND_URL
const isEncryptionEnabled = import.meta.env.VITE_ENCRYPT === 'true'

const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = token.get()
    const originalData = config.data

    if (originalData && !(originalData instanceof FormData)) {
      config.data = isEncryptionEnabled
        ? { encryptedData: encrypt(originalData) }
        : originalData

      config.headers['Content-Type'] = 'application/json'
    }

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// 🔓 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type']

    // ✅ Allow binary types
    if (
      contentType &&
      (contentType.includes('image') ||
        contentType.includes('application/pdf') ||
        contentType.includes('octet-stream'))
    ) {
      return response
    }

    // ✅ Decrypt if encryption is enabled
    if (isEncryptionEnabled && response?.data?.encryptedData) {
      try {
        const decrypted = decrypt(response.data.encryptedData)
        return {
          ...response,
          data: decrypted  // ✅ Return with .data so axios consumers work correctly
        }
      } catch (err) {
        return Promise.reject({
          message: '❌ Decryption failed',
          raw: response.data.encryptedData
        })
      }
    }

    return response
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
