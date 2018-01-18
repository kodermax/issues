import { showAlert } from '../store/alert'
import { showNotification } from '../store/notification'

export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST'
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS'
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function requestUpdateItem() {
  return {
    error      : false,
    type       : UPDATE_ITEM_REQUEST,
    isFetching : true
  }
}
function receiveUpdateItem(result) {
  return {
    id         : result.id,
    isFetching : false,
    error      : false,
    type       : UPDATE_ITEM_SUCCESS
  }
}
function invalidUpdateItem(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : UPDATE_ITEM_FAILURE
  }
}

export const updateItem = (type, data, category, callback) => {
  return (dispatch, getState) => {
    dispatch(requestUpdateItem())
    let token = localStorage.getItem('issuesToken') || null
    let url = ''
    if (category) {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}/${category}`
    } else {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}`
    }
    return fetch(url,
      {
        method  : 'PUT',
        mode    : 'cors',
        headers : {
          'Accept'        : 'application/json',
          'Authorization' : `Bearer ${token}`,
          'Content-Type'  : 'application/json'
        },
        body : JSON.stringify(data)
      }
    )
      .then(response => response.json())
      .then(json => {
        dispatch(receiveUpdateItem(json))
        dispatch(showNotification('Заявка успешно изменена!'))
        if (callback) {
          callback(json)
        }
      })
      .catch(error => {
        dispatch(invalidUpdateItem(error))
        dispatch(showAlert('Ошибка при изменении заявки!'))
      })
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_ITEM_SUCCESS] : (state, action) => {
    return {
      isFetching : false,
      error      : false,
      id         : action.id
    }
  },
  [UPDATE_ITEM_FAILURE] : (state, action) => {
    return {
      isFetching   : false,
      error        : true,
      errorMessage : action.errorMessage
    }
  }
}
export const actions = {
  updateItem
}
// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  error      : false,
  data       : {}
}
export function updateReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
