import { showAlert } from '../store/alert'
import { showNotification } from '../store/notification'

export const SUBMIT_ACTION_REQUEST = 'SUBMIT_ACTION_REQUEST'
export const SUBMIT_ACTION_SUCCESS = 'SUBMIT_ACTION_SUCCESS'
export const SUBMIT_ACTION_FAILURE = 'SUBMIT_ACTION_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function requestSubmitAction() {
  return {
    error      : false,
    type       : SUBMIT_ACTION_REQUEST,
    isFetching : true
  }
}
function receiveSubmitAction(result) {
  return {
    id         : result.id,
    isFetching : false,
    error      : false,
    type       : SUBMIT_ACTION_SUCCESS
  }
}
function invalidSubmitAction(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : SUBMIT_ACTION_FAILURE
  }
}

export const submitAction = (type, id, action, data, callback) => {
  return (dispatch, getState) => {
    dispatch(requestSubmitAction())
    let token = localStorage.getItem('issuesToken') || null
    let url = ''
    if (typeof type === 'string') {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}/${id}/${action}`
    } else {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type.category}/${id}/${type.subcategory}/${action}`
    }
    
    return fetch(url, {
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
        if (!json.error) {
          dispatch(receiveSubmitAction(json))
          dispatch(showNotification('Действие выполнено успешно!'))
          if (callback) {
            callback(json)
          }
        } else {
          throw json.errorMessage
        }
      })
      .catch(error => {
        dispatch(invalidSubmitAction(error))
        dispatch(showAlert('Ошибка: ' + error))
      })
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [SUBMIT_ACTION_SUCCESS] : (state, action) => {
    return {
      isFetching : false,
      error      : false,
      id         : action.id
    }
  },
  [SUBMIT_ACTION_FAILURE] : (state, action) => {
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
export function actionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
