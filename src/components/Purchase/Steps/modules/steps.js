export const FETCH_STEPS_REQUEST = 'FETCH_STEPS_REQUEST'
export const FETCH_STEPS_SUCCESS = 'FETCH_STEPS_SUCCESS'
export const FETCH_STEPS_FAILURE = 'FETCH_STEPS_FAILURE'

function requestSteps() {
  return {
    didInvalidate : false,
    type          : FETCH_STEPS_REQUEST,
    isFetching    : true
  }
}
function receiveSteps(result) {
  return {
    data          : result,
    isFetching    : false,
    didInvalidate : false,
    type          : FETCH_STEPS_SUCCESS
  }
}
function invalidSteps(error) {
  return {
    data          : error,
    isFetching    : false,
    didInvalidate : true,
    type          : FETCH_STEPS_FAILURE
  }
}

export const fetchSteps = (requestId) => {
  return (dispatch, getState) => {
    dispatch(requestSteps())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/${requestId}/steps`
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
      .then(json => dispatch(receiveSteps(json)))
      .catch(error => dispatch(invalidSteps(error)))
  }
}
// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_STEPS_SUCCESS] : (state, action) => {
    return {
      isFetching    : false,
      didInvalidate : false,
      data         : action.data
    }
  },
  [FETCH_STEPS_FAILURE] : (state, action) => action.data
}

// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  error      : false,
  data       : []
}
export function stepsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
