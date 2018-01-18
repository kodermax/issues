export const GET_FIELDS_REQUEST = 'GET_FIELDS_REQUEST'
export const GET_FIELDS_SUCCESS = 'GET_FIELDS_SUCCESS'
export const GET_FIELDS_FAILURE = 'GET_FIELDS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function requestGetFields() {
  return {
    error      : false,
    type       : GET_FIELDS_REQUEST,
    isFetching : true
  }
}
function receiveGetFields(result) {
  return {
    data       : result,
    isFetching : false,
    error      : false,
    type       : GET_FIELDS_SUCCESS
  }
}
function invalidGetFields(error) {
  return {
    isFetching   : false,
    error        : true,
    errorMessage : error,
    type         : GET_FIELDS_FAILURE
  }
}

export const getFields = (code) => {
  return (dispatch, getState) => {
    dispatch(requestGetFields())
    let token = localStorage.getItem('issuesToken') || null

    return fetch(`${process.env.REACT_APP_API_HOST}/api/requests/categories/${code}/fields`,
      {
        method  : 'GET',
        mode    : 'cors',
        headers : {
          'Accept'        : 'application/json',
          'Authorization' : `Bearer ${token}`,
          'Content-Type'  : 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => dispatch(receiveGetFields(json)))
      .catch(error => dispatch(invalidGetFields(error)))
  }
}

// ------------------------------------
// Action Handlers - Возвращает новое состояние
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_FIELDS_SUCCESS] : (state, action) => {
    return {
      isFetching : false,
      error      : false,
      data       : action.data
    }
  },
  [GET_FIELDS_FAILURE] : (state, action) => {
    return {
      isFetching   : false,
      error        : true,
      errorMessage : action.errorMessage
    }
  }
}
export const actions = {
  getFields
}
// Reducer
// ------------------------------------
const initialState = {
  isFetching : false,
  error      : false,
  data       : []
}
export default function fieldsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
