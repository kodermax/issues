export const FETCH_ACTIONS_REQUEST = 'FETCH_ACTIONS_REQUEST'
export const FETCH_ACTIONS_SUCCESS = 'FETCH_ACTIONS_SUCCESS'
export const FETCH_ACTIONS_FAILURE = 'FETCH_ACTIONS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

function requestFetchActions() {
  return {
    error      : false,
    type       : FETCH_ACTIONS_REQUEST,
    isFetching : true
  }
}
function receiveFetchActions(result) {
  return {
    data       : result,
    isFetching : false,
    error      : false,
    type       : FETCH_ACTIONS_SUCCESS
  }
}
function invalidFetchActions(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : FETCH_ACTIONS_FAILURE
  }
}

export const fetchActions = (type, id) => {
  return (dispatch, getState) => {
    dispatch(requestFetchActions())
    let token = localStorage.getItem('issuesToken') || null
    let url = ''
    if (typeof type === 'string') {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type}/${id}/actions`
    } else {
      url = `${process.env.REACT_APP_API_HOST}/requests/${type.category}/${id}/${type.subcategory}/actions`
    }
    return fetch(url,
      {
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
      .then(json => dispatch(receiveFetchActions(json)))
      .catch(error => dispatch(invalidFetchActions(error)))
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ACTIONS_SUCCESS] : (state, action) => {
    return {
      isFetching   : false,
      error        : false,
      data         : action.data
    }
  },
  [FETCH_ACTIONS_FAILURE] : (state, action) => {
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
export function actionsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
