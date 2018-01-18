export const FETCH_DOCS_REQUEST = 'FETCH_DOCS_REQUEST'
export const FETCH_DOCS_SUCCESS = 'FETCH_DOCS_SUCCESS'
export const FETCH_DOCS_FAILURE = 'FETCH_DOCS_FAILURE'

function requestDocs() {
  return {
    didInvalidate : false,
    type          : FETCH_DOCS_REQUEST,
    isFetching    : true
  }
}
function receiveDocs(result) {
  return {
    data          : result,
    isFetching    : false,
    didInvalidate : false,
    type          : FETCH_DOCS_SUCCESS
  }
}
function invalidDocs(error) {
  return {
    data          : error,
    isFetching    : false,
    didInvalidate : true,
    type          : FETCH_DOCS_FAILURE
  }
}

export const fetchDocs = (issueId) => {
  return (dispatch, getState) => {
    dispatch(requestDocs())
    let token = localStorage.getItem('issuesToken') || null
    let url = `${process.env.REACT_APP_API_HOST}/requests/${issueId}/docs`
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
      .then(json => dispatch(receiveDocs(json)))
      .catch(error => dispatch(invalidDocs(error)))
  }
}
// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_DOCS_SUCCESS] : (state, action) => {
    return {
      isFetching    : false,
      didInvalidate : false,
      data         : action.data
    }
  },
  [FETCH_DOCS_FAILURE] : (state, action) => action.data
}

// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  error      : false,
  data       : []
}
export function docsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
