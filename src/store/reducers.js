import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { loadingBarReducer } from './loading'
import { locationReducer } from './location'
import { notificationReducer } from './notification'
import { alertReducer } from './alert'
import { addReducer } from '../modules/add'
import { approvalReducer } from '../modules/approval'
import { itemReducer } from '../modules/item'
import { updateReducer } from '../modules/update'
import { messageReducer } from '../modules/message'
import { messagesReducer } from '../modules/messages'
import { accessReducer } from '../modules/access'
import { actionsReducer } from '../modules/actions'
import { actionReducer } from '../modules/action'
import { sendReducer } from '../modules/send'
import { approversReducer } from '../modules/approvers'
import { docsReducer } from '../modules/docs'
import { changeApproverReducer } from '../components/Purchase/Steps/modules/ChangeApprover'
import { stepsReducer } from '../components/Purchase/Steps/modules/steps'
import { searchReducer } from '../routes/Requests/Purchase/SearchModule'
import { countsReducer } from '../modules/counts'
import { totalCountsReducer } from '../modules/totalCounts'
import { userReducer } from '../modules/user'
import { watchersReducer } from '../modules/watchers'

export const makeRootReducer = (asyncReducers) =>
  (state, action) => {
    return combineReducers({
    // Add sync reducers here
      router,
      location      : locationReducer,
      loadingBar    : loadingBarReducer,
      notification  : notificationReducer,
      alert         : alertReducer,
      addItem       : addReducer,
      request       : itemReducer,
      updateItem    : updateReducer,
      message       : messageReducer,
      messages      : messagesReducer,
      approval      : approvalReducer,
      access        : accessReducer,
      approvers     : approversReducer,
      docs          : docsReducer,
      steps         : stepsReducer,
      actions       : actionsReducer,
      action        : actionReducer,
      send          : sendReducer,
      changeApprover: changeApproverReducer,
      counts        : countsReducer,
      totalCounts   : totalCountsReducer,
      search        : searchReducer,
      user          : userReducer,
      watchers      : watchersReducer,
      ...asyncReducers
    })(action.type === 'STATE_RESET' ? undefined : state, action)
  }

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
