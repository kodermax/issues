import { showNotification } from '../../../../store/notification'
export const FETCH_CHANGE_APPROVER_REQUEST = 'FETCH_CHANGE_APPROVER_REQUEST'
export const FETCH_CHANGE_APPROVER_SUCCESS = 'FETCH_CHANGE_APPROVER_SUCCESS'
export const FETCH_CHANGE_APPROVER_FAILURE = 'FETCH_CHANGE_APPROVER_FAILURE'

function requestChangeApprover() {
  return {
    didInvalidate : false,
    type          : FETCH_CHANGE_APPROVER_REQUEST,
    isFetching    : true
  }
}
function receiveChangeApprover(result) {
  return {
    data          : result,
    isFetching    : false,
    didInvalidate : false,
    type          : FETCH_CHANGE_APPROVER_SUCCESS
  }
}
function invalidChangeApprover(error) {
  return {
    data          : error,
    isFetching    : false,
    didInvalidate : true,
    type          : FETCH_CHANGE_APPROVER_FAILURE
  }
}

export const fetchChangeApprover = (issueId, data, callback) => {
  return (dispatch, getState) => {
    dispatch(requestChangeApprover())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/${issueId}/change_approver`
    return fetch(url, {
      mode    : 'cors',
      method  : 'POST',
      headers : {
        'Accept'                      : 'application/json',
        'Authorization'               : `Bearer ${token}`,
        'Content-Type'                : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      },
      body : JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveChangeApprover(json))
        dispatch(showNotification('Действие выполнено успешно!'))
        if (callback) {
          callback(json)
        }
      })
      .catch(error => dispatch(invalidChangeApprover(error)))
  }
}
// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_CHANGE_APPROVER_SUCCESS] : (state, action) => {
    return {
      isFetching    : false,
      didInvalidate : false,
      data         : action.data
    }
  },
  [FETCH_CHANGE_APPROVER_FAILURE] : (state, action) => action.data
}

// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  error      : false,
  data       : []
}
export function changeApproverReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
