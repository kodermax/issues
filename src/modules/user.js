export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

function requestFetchUser() {
  return {
    error      : false,
    type       : FETCH_USER_REQUEST,
    isFetching : true
  }
}
function receiveFetchUser(result) {
  return {
    data       : result,
    isFetching : false,
    error      : false,
    type       : FETCH_USER_SUCCESS
  }
}
function invalidFetchCounts(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : FETCH_USER_FAILURE
  }
}

export const fetchUser = (userId) => {
  return (dispatch, getState) => {
    dispatch(requestFetchUser())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_USERS}/users/${userId}`
    return fetch(url, {
      method  : 'GET',
      mode    : 'cors',
      headers : {
        'Accept'        : 'application/json',
        'Authorization' : `Bearer ${token}`,
        'Content-Type'  : 'application/json'
      }
    }
    )
      .then(response => response.json())
      .then(json => dispatch(receiveFetchUser(json)))
      .catch(error => dispatch(invalidFetchCounts(error)))
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER_SUCCESS] : (state, action) => {
    return {
      isFetching   : false,
      error        : false,
      data         : action.data
    }
  },
  [FETCH_USER_FAILURE] : (state, action) => {
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
export function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
