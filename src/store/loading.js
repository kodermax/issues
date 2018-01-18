export const SHOW = 'loading-bar/SHOW'
export const HIDE = 'loading-bar/HIDE'

export function showLoadingBar() {
  return {
    type : SHOW
  }
}
export function hideLoadingBar() {
  return {
    type : HIDE
  }
}
export function loadingBarReducer(state = 0, action = {}) {
  switch (action.type) {
  case SHOW:
    return state + 1
  case HIDE:
    return state > 0 ? state - 1 : 0
  default:
    return state
  }
}
