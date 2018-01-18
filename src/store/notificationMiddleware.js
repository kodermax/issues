import { showNotification, hideNotification } from './notification'

function createNotificationMiddleware(config = {}) {
  return ({ dispatch }) => next => action => {
    if (action.type === undefined) {
      return
    }
    if (action.type === 'SHOW_NOTIFICATION') {
      dispatch(showNotification(action.message))
    } else if (action.type === 'HIDE_NOTIFICATION') {
      dispatch(hideNotification())
    }
    return next(action)
  }
}
const notificationMiddleware = createNotificationMiddleware()
export default notificationMiddleware
