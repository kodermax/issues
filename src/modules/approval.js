import { showAlert } from '../store/alert'
import { showNotification } from '../store/notification'

export const ADD_APPROVAL_REQUEST = 'ADD_APPROVAL_REQUEST'
export const ADD_APPROVAL_SUCCESS = 'ADD_APPROVAL_SUCCESS'
export const ADD_APPROVAL_FAILURE = 'ADD_APPROVAL_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

function requestAddApproval() {
  return {
    error      : false,
    type       : ADD_APPROVAL_REQUEST,
    isFetching : true
  }
}
function receiveAddApproval(result) {
  return {
    data       : result,
    isFetching : false,
    error      : false,
    type       : ADD_APPROVAL_SUCCESS
  }
}
function invalidAddApproval(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : ADD_APPROVAL_FAILURE
  }
}

export const addApproval = (id) => {
  return (dispatch, getState) => {
    dispatch(requestAddApproval())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/${id}/approval`
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
        dispatch(receiveAddApproval(json))
        dispatch(showNotification('Заявка отправлена на согласование!'))
      })
      .catch(error => {
        dispatch(invalidAddApproval(error))
        dispatch(showAlert('Ошибка при отправлении заявки на согласование!'))
      })
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_APPROVAL_SUCCESS] : (state, action) => {
    return {
      isFetching   : false,
      error        : false,
      data         : action.data
    }
  },
  [ADD_APPROVAL_FAILURE] : (state, action) => {
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
export function approvalReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
