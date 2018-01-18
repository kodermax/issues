// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_SEARCH_REQUEST = 'FETCH_SEARCH_REQUEST'
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function requestSearch() {
  return {
    didInvalidate : false,
    type          : FETCH_SEARCH_REQUEST,
    isFetching    : true
  }
}
function receiveSearch(result) {
  return {
    data          : result,
    isFetching    : false,
    didInvalidate : false,
    type          : FETCH_SEARCH_SUCCESS
  }
}
function invalidSearch(error) {
  return {
    data          : error,
    isFetching    : false,
    didInvalidate : true,
    type          : FETCH_SEARCH_FAILURE
  }
}

export const fetchSearch = (query) => {
  return (dispatch, getState) => {
    dispatch(requestSearch())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/purchase/search?query=${query}`
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
      .then(json => dispatch(receiveSearch(json)))
      .catch(error => dispatch(invalidSearch(error)))
  }
}
export const actions = {
  fetchSearch
}
// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SEARCH_SUCCESS] : (state, action) => {
    return {
      isFetching    : false,
      didInvalidate : false,
      data         : action.data
    }
  },
  [FETCH_SEARCH_FAILURE] : (stat, action) => action.data
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  data       : {}
}
export function searchReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
