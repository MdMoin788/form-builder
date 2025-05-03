import { toast } from 'react-toastify'

export const setLocalStorage = (keyName: string, data: any, isJson = false) => {
  try {
    const valueToStore = isJson ? JSON.stringify(data) : String(data)
    localStorage.setItem(keyName, valueToStore)
  } catch (error) {
    console.error(`❌ Error setting key "${keyName}" in local storage:`, error)
  }
}

export const getLocalStorage = (keyName: string, isJson = false) => {
  try {
    const storedValue = localStorage.getItem(keyName)
    if (!storedValue) return null
    return isJson ? JSON.parse(storedValue) : storedValue
  } catch (error) {
    console.error(
      `❌ Error getting key "${keyName}" from local storage:`,
      error
    )
    return null
  }
}

export const showToastMessage = (erroMessage: any, isSuccess: any = true) => {
  let message = isSuccess
    ? erroMessage?.message
    : erroMessage.response.data.message
    ? erroMessage.response.data.message
    : erroMessage.response.data.error?.message
  toast?.[isSuccess ? 'success' : 'error'](message, {
    position: 'top-center'
  })
}
