import { showAlert, hideAlert } from './alert'

function createAlertMiddleware(config = {}) {
  return ({ dispatch }) => next => action => {
    if (action.type === undefined) {
      return
    }
    if (action.type === 'SHOW_ALERT') {
      dispatch(showAlert(action.message))
    } else if (action.type === 'HIDE_ALERT') {
      dispatch(hideAlert())
    }
    return next(action)
  }
}
const alertMiddleware = createAlertMiddleware()
export default alertMiddleware
