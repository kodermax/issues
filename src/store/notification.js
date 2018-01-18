export const SHOW_NOTIFICATION = 'notification/showNotification'
export const HIDE_NOTIFICATION = 'notification/hideNotification'

export function showNotification(text) {
  return {
    type    : SHOW_NOTIFICATION,
    message : text
  }
}

export function hideNotification() {
  return {
    type : HIDE_NOTIFICATION
  }
}

export function notificationReducer(state = false, action = {}) {
  switch (action.type) {
  case SHOW_NOTIFICATION:
    return { message: action.message, active: true }
  case HIDE_NOTIFICATION:
    return { message: '', active: false }
  default:
    return state
  }
}
