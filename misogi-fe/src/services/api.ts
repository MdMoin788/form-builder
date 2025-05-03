import axios from 'axios'

const API = axios.create({
  // baseURL: 'https://misogi-taskpal.vercel.app/api/v1',
  baseURL: 'http://localhost:4000/api/v1',
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// User APIs
export const createUser = (userData: {
  name: string
  email: string
  password: string
}) => API.post('/users/createUser', userData)

export const loginUser = (userData: { email: string; password: string }) =>
  API.post('/users/login', userData)

// ----- 📍 FORM APIs -----

// Create Form
export const createForm = (formData: any) => API.post('/forms', formData)

// Get All Forms
export const getAllForms = () => API.get('/forms')

// Get Form By Slug
export const getFormBySlug = (slug: any) => API.get(`/forms/${slug}`)
export const getAllformResponsesByFormId = (formId: any) => API.get(`/responses/${formId}`)
export const getFormById = (formId: any) => API.get(`/forms/getFormById/${formId}`)

// ----- 📍 RESPONSES APIs -----

// Save Form Response
export const saveFormResponse = (responseData: any) =>
  API.post(`/responses`, responseData)

// Get Form Responses
export const getFormResponses = (formId: any) =>
  API.get(`/responses/${formId}`)
