import { showAlert } from '../store/alert'
import { showNotification } from '../store/notification'

export const ADD_MESSAGE_REQUEST = 'ADD_MESSAGE_REQUEST'
export const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS'
export const ADD_MESSAGE_FAILURE = 'ADD_MESSAGE_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

function requestAddMessage() {
  return {
    error      : false,
    type       : ADD_MESSAGE_REQUEST,
    isFetching : true
  }
}
function receiveAddMessage(result) {
  return {
    data       : result,
    isFetching : false,
    error      : false,
    type       : ADD_MESSAGE_SUCCESS
  }
}
function invalidAddMessage(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : ADD_MESSAGE_FAILURE
  }
}

export const addMessage = (data) => {
  return (dispatch, getState) => {
    dispatch(requestAddMessage())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/messages`
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
        dispatch(receiveAddMessage(json))
        dispatch(showNotification('Сообщение успешно добавлено!'))
      })
      .catch(error => {
        dispatch(invalidAddMessage(error))
        dispatch(showAlert('Ошибка при добавлении сообщения!'))
      })
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_MESSAGE_SUCCESS] : (state, action) => {
    return {
      isFetching   : false,
      error        : false,
      item         : action.data
    }
  },
  [ADD_MESSAGE_FAILURE] : (state, action) => {
    return {
      isFetching   : false,
      error        : true,
      errorMessage : action.errorMessage
    }
  }
}

// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  error      : false,
  item       : {}
}
export function messageReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
