export const SHOW_ALERT = 'notification/showAlert'
export const HIDE_ALERT = 'notification/hideAlert'

export function showAlert(text) {
  return {
    type    : SHOW_ALERT,
    message : text
  }
}

export function hideAlert() {
  return {
    type : HIDE_ALERT
  }
}

export function alertReducer(state = false, action = {}) {
  switch (action.type) {
  case SHOW_ALERT:
    return { message: action.message, active: true }
  case HIDE_ALERT:
    return { message: '', active: false }
  default:
    return state
  }
}
