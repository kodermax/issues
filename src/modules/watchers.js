import { showNotification } from '../store/notification'
export const FETCH_WATCHERS_REQUEST = 'FETCH_WATCHERS_REQUEST'
export const FETCH_WATCHERS_SUCCESS = 'FETCH_WATCHERS_SUCCESS'
export const FETCH_WATCHERS_FAILURE = 'FETCH_WATCHERS_FAILURE'

function requestWatchers() {
  return {
    didInvalidate: false,
    type: FETCH_WATCHERS_REQUEST,
    isFetching: true
  }
}
function receiveWatchers(result) {
  return {
    data: result,
    isFetching: false,
    didInvalidate: false,
    type: FETCH_WATCHERS_SUCCESS
  }
}
function invalidWatchers(error) {
  return {
    data: error,
    isFetching: false,
    didInvalidate: true,
    type: FETCH_WATCHERS_FAILURE
  }
}

export const fetchWatchers = (id, type) => {
  return (dispatch, getState) => {
    dispatch(requestWatchers())
    let token = localStorage.getItem('issuesToken') || null
    let url = ''
    if (typeof type === 'string') {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}/${id}/watchers`
    } else {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type.category}/${id}/${type.subcategory}/watchers`
    }
    return fetch(url, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveWatchers(json)))
      .catch(error => dispatch(invalidWatchers(error)))
  }
}
export const removeWatcher = (id, type, userId, callback) => {
  return (dispatch, getState) => {
    let token = localStorage.getItem('issuesToken') || null
    let url = ''
    if (typeof type === 'string') {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}/${id}/watchers/${userId}`
    } else {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type.category}/${id}/${type.subcategory}/watchers/${userId}`
    }
    return fetch(url, {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(showNotification('Действие выполнено успешно!'))
        if (callback) {
          callback(json)
        }
      })
      .catch(error => console.log(error))
  }
}
// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_WATCHERS_SUCCESS]: (state, action) => {
    return {
      isFetching: false,
      didInvalidate: false,
      data: action.data
    }
  },
  [FETCH_WATCHERS_FAILURE]: (state, action) => action.data
}

// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  error: false,
  data: []
}
export function watchersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
