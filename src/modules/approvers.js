export const FETCH_APPROVERS_REQUEST = 'FETCH_APPROVERS_REQUEST'
export const FETCH_APPROVERS_SUCCESS = 'FETCH_APPROVERS_SUCCESS'
export const FETCH_APPROVERS_FAILURE = 'FETCH_APPROVERS_FAILURE'

function requestApprovers() {
  return {
    didInvalidate : false,
    type          : FETCH_APPROVERS_REQUEST,
    isFetching    : true
  }
}
function receiveApprovers(result) {
  return {
    data          : result,
    isFetching    : false,
    didInvalidate : false,
    type          : FETCH_APPROVERS_SUCCESS
  }
}
function invalidApprovers(error) {
  return {
    data          : error,
    isFetching    : false,
    didInvalidate : true,
    type          : FETCH_APPROVERS_FAILURE
  }
}

export const fetchApprovers = (issueId) => {
  return (dispatch, getState) => {
    dispatch(requestApprovers())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/${issueId}/approvers`
    return fetch(url, {
      mode    : 'cors',
      headers : {
        'Accept'                      : 'application/json',
        'Authorization'               : `Bearer ${token}`,
        'Content-Type'                : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveApprovers(json)))
      .catch(error => dispatch(invalidApprovers(error)))
  }
}
// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_APPROVERS_SUCCESS] : (state, action) => {
    return {
      isFetching    : false,
      didInvalidate : false,
      data         : action.data
    }
  },
  [FETCH_APPROVERS_FAILURE] : (state, action) => action.data
}

// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  error      : false,
  data       : []
}
export function approversReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
