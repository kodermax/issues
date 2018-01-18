export const FETCH_ACCESS_REQUEST = 'FETCH_ACCESS_REQUEST'
export const FETCH_ACCESS_SUCCESS = 'FETCH_ACCESS_SUCCESS'
export const FETCH_ACCESS_FAILURE = 'FETCH_ACCESS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

function requestFetchAccess() {
  return {
    error      : false,
    type       : FETCH_ACCESS_REQUEST,
    isFetching : true
  }
}
function receiveFetchAccess(result) {
  return {
    data       : result,
    isFetching : false,
    error      : false,
    type       : FETCH_ACCESS_SUCCESS
  }
}
function invalidFetchAccess(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : FETCH_ACCESS_FAILURE
  }
}

export const fetchAccess = (type, subCategory) => {
  return (dispatch, getState) => {
    dispatch(requestFetchAccess())
    let token = localStorage.getItem('issuesToken') || null
    let url = ''
    if (subCategory) {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}/${subCategory}/access`
    } else {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}/access`
    }
    
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
      .then(json => dispatch(receiveFetchAccess(json)))
      .catch(error => dispatch(invalidFetchAccess(error)))
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ACCESS_SUCCESS] : (state, action) => {
    return {
      isFetching   : false,
      error        : false,
      data         : action.data
    }
  },
  [FETCH_ACCESS_FAILURE] : (state, action) => {
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
export function accessReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
