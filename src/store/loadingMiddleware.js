import { showLoadingBar, hideLoadingBar } from './loading'

const defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILURE']

function createLoadingBarMiddleware(config = {}) {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes
  return ({ dispatch }) => next => action => {
    if (action.type === undefined) {
      return
    }
    const [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes

    const isPending = `_${PENDING}`
    const isFulfilled = `_${FULFILLED}`
    const isRejected = `_${REJECTED}`

    if (action.type.indexOf(isPending) !== -1) {
      dispatch(showLoadingBar())
    } else if (action.type.indexOf(isFulfilled) !== -1 ||
      action.type.indexOf(isRejected) !== -1) {
      dispatch(hideLoadingBar())
    }
    return next(action)
  }
}
const loadingBarMiddleware = createLoadingBarMiddleware()
export default loadingBarMiddleware
