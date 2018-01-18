import { showAlert } from '../store/alert'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST'
export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS'
export const FETCH_ITEM_FAILURE = 'FETCH_ITEM_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function requestItem() {
  return {
    didInvalidate : false,
    type          : FETCH_ITEM_REQUEST,
    isFetching    : true
  }
}
function receiveItem(result) {
  return {
    data          : result,
    isFetching    : false,
    didInvalidate : false,
    type          : FETCH_ITEM_SUCCESS
  }
}
function invalidItem(error) {
  return {
    data          : error,
    isFetching    : false,
    didInvalidate : true,
    type          : FETCH_ITEM_FAILURE
  }
}

export const fetchItem = (id) => {
  return (dispatch, getState) => {
    dispatch(requestItem())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/${id}`
    return fetch(url, {
      mode    : 'cors',
      headers : {
        'Accept'                      : 'application/json',
        'Authorization'               : `Bearer ${token}`,
        'Content-Type'                : 'application/json'
      }
    })
      .then(response => {
        switch (response.status) {
        case 404:
          throw new Error('Заявка не найдена!')
        case 403:
          throw new Error('Доступ запрещен!')
        default:
          return response.json()
        }
      }
      )
      .then(json => {
        dispatch({
          type: 'RESET_STATE' })
        dispatch(receiveItem(json))
      })
      .catch(error => {
        dispatch(invalidItem(error))
        dispatch(showAlert('Ошибка при получении данных: ' + error))
      })
  }
}
export const actions = {
  fetchItem
}
// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ITEM_SUCCESS] : (state, action) => {
    return {
      isFetching    : false,
      didInvalidate : false,
      data         : action.data
    }
  },
  [FETCH_ITEM_FAILURE] : (state, action) => {
    return {
      isFetching   : false,
      error        : true,
      errorMessage : action.data
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  data       : {}
}
export function itemReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
