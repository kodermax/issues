export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST'
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS'
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE'

function requestMessages() {
  return {
    didInvalidate : false,
    type          : FETCH_MESSAGES_REQUEST,
    isFetching    : true
  }
}
function receiveMessages(result) {
  return {
    data          : result,
    isFetching    : false,
    didInvalidate : false,
    type          : FETCH_MESSAGES_SUCCESS
  }
}
function invalidMessages(error) {
  return {
    data          : error,
    isFetching    : false,
    didInvalidate : true,
    type          : FETCH_MESSAGES_FAILURE
  }
}

export const fetchMessages = (requestId) => {
  return (dispatch, getState) => {
    dispatch(requestMessages())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/${requestId}/messages`
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
      .then(json => dispatch(receiveMessages(json)))
      .catch(error => dispatch(invalidMessages(error)))
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_MESSAGES_SUCCESS] : (state, action) => {
    return {
      isFetching    : false,
      didInvalidate : false,
      items         : action.data
    }
  },
  [FETCH_MESSAGES_FAILURE] : (stat, action) => action.data
}
export const actions = {
  fetchMessages
}

// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  error      : false,
  items       : []
}
export function messagesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
