const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export { API_BASE_URL, fetcher }
