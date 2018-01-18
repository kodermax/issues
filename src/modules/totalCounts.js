export const FETCH_TOTAL_COUNTS_REQUEST = 'FETCH_TOTAL_COUNTS_REQUEST'
export const FETCH_TOTAL_COUNTS_SUCCESS = 'FETCH_TOTAL_COUNTS_SUCCESS'
export const FETCH_TOTAL_COUNTS_FAILURE = 'FETCH_TOTAL_COUNTS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

function requestFetchCounts() {
  return {
    error      : false,
    type       : FETCH_TOTAL_COUNTS_REQUEST,
    isFetching : true
  }
}
function receiveFetchCounts(result) {
  return {
    data       : result,
    isFetching : false,
    error      : false,
    type       : FETCH_TOTAL_COUNTS_SUCCESS
  }
}
function invalidFetchCounts(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : FETCH_TOTAL_COUNTS_FAILURE
  }
}

export const fetchCounts = () => {
  return (dispatch, getState) => {
    dispatch(requestFetchCounts())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/counts`
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
      .then(json => dispatch(receiveFetchCounts(json)))
      .catch(error => dispatch(invalidFetchCounts(error)))
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_TOTAL_COUNTS_SUCCESS] : (state, action) => {
    return {
      isFetching   : false,
      error        : false,
      data         : action.data
    }
  },
  [FETCH_TOTAL_COUNTS_FAILURE] : (state, action) => {
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
export function totalCountsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
