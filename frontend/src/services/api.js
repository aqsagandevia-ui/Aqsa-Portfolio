import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const stored = localStorage.getItem('portfolio-admin')
  if (stored) {
    try {
      const { token } = JSON.parse(stored)
      if (token) config.headers.Authorization = `Bearer ${token}`
    } catch {}
  }
  return config
})

// ─── Public endpoints ─────────────────────────────────────────
export const getProjects = (category) =>
  API.get('/projects', { params: category && category !== 'All' ? { category } : {} })

export const getProjectBySlug = (slug) => API.get(`/projects/${slug}`)

export const getSkills = () => API.get('/skills')

export const getEducation = () => API.get('/education')

export const getSettings = () => API.get('/settings')

export const submitContact = (data) => API.post('/contact', data)

// ─── Admin endpoints ──────────────────────────────────────────
export const adminLogin = (credentials) => API.post('/auth/login', credentials)

export const getMe = () => API.get('/auth/me')

// Projects
export const createProject = (data) => API.post('/projects', data)
export const updateProject = (id, data) => API.put(`/projects/${id}`, data)
export const deleteProject = (id) => API.delete(`/projects/${id}`)

// Skills
export const createSkill = (data) => API.post('/skills', data)
export const updateSkill = (id, data) => API.put(`/skills/${id}`, data)
export const deleteSkill = (id) => API.delete(`/skills/${id}`)

// Education
export const createEducation = (data) => API.post('/education', data)
export const updateEducation = (id, data) => API.put(`/education/${id}`, data)
export const deleteEducation = (id) => API.delete(`/education/${id}`)

// Settings
export const updateSettings = (data) => API.put('/settings', data)

// Contact messages (admin)
export const getContacts = () => API.get('/contact')
export const markContactRead = (id) => API.patch(`/contact/${id}/read`)

export default API
