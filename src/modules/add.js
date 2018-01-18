import { showAlert } from '../store/alert'
import { showNotification } from '../store/notification'

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function requestAddItem() {
  return {
    error      : false,
    type       : ADD_ITEM_REQUEST,
    isFetching : true
  }
}
function receiveAddItem(result) {
  return {
    id         : result.id,
    isFetching : false,
    error      : false,
    type       : ADD_ITEM_SUCCESS
  }
}
function invalidAddItem(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : ADD_ITEM_FAILURE
  }
}

export const addItem = (type, data, category) => {
  return (dispatch, getState) => {
    dispatch(requestAddItem())
    let token = localStorage.getItem('issuesToken') || null
    let url = ''
    if (category) {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}/${category}`
    } else {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}`
    }
    
    return fetch(url,
      {
        method  : 'POST',
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
        dispatch(receiveAddItem(json))
        dispatch({
          type: 'STATE_RESET'
        })
        dispatch(showNotification('Заявка успешно добавлена!'))
      })
      .catch(error => {
        dispatch(invalidAddItem(error))
        dispatch(showAlert('Ошибка при добавлении заявки!'))
      })
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_ITEM_SUCCESS] : (state, action) => {
    return {
      isFetching : false,
      error      : false,
      id         : action.id
    }
  },
  [ADD_ITEM_FAILURE] : (state, action) => {
    return {
      isFetching   : false,
      error        : true,
      errorMessage : action.errorMessage
    }
  }
}
export const actions = {
  addItem
}
// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  error      : false,
  data       : {}
}
export function addReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
