import { showAlert } from '../store/alert'
import { showNotification } from '../store/notification'

export const SEND_REQUEST_REQUEST = 'SEND_REQUEST_REQUEST'
export const SEND_REQUEST_SUCCESS = 'SEND_REQUEST_SUCCESS'
export const SEND_REQUEST_FAILURE = 'SEND_REQUEST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

function requestSendRequest() {
  return {
    error      : false,
    type       : SEND_REQUEST_REQUEST,
    isFetching : true
  }
}
function receiveSendRequest(result) {
  return {
    data       : result,
    isFetching : false,
    error      : false,
    type       : SEND_REQUEST_SUCCESS
  }
}
function invalidSendRequest(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : SEND_REQUEST_FAILURE
  }
}

export const sendRequest = (id, type) => {
  return (dispatch, getState) => {
    dispatch(requestSendRequest())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/${type}/${id}/send`
    return fetch(url,
      {
        method  : 'POST',
        mode    : 'cors',
        headers : {
          'Accept'        : 'application/json',
          'Authorization' : `Bearer ${token}`,
          'Content-Type'  : 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        dispatch(receiveSendRequest(json))
        dispatch(showNotification('Заявка успешно отправлена!'))
      })
      .catch(error => {
        dispatch(invalidSendRequest(error))
        dispatch(showAlert('Ошибка при отправлении заявки!'))
      })
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [SEND_REQUEST_SUCCESS] : (state, action) => {
    return {
      isFetching   : false,
      error        : false,
      data         : action.data
    }
  },
  [SEND_REQUEST_FAILURE] : (state, action) => {
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
  data       : {}
}
export function sendReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
