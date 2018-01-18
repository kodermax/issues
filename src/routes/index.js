import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import RequestsList from './Requests/List'
import RecruitmentList from './Requests/Recruitment/List'
import RecruitmentAdd from './Requests/Recruitment/Add'
import RecruitmentView from './Requests/Recruitment/View'
import PurchaseRoute from './Requests/Purchase'
import AccessControlRoute from './Requests/AccessControl'
import AutoRoute from './Requests/Auto'

export const createRoutes = (store) => ({
  path        : '/requests',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    RequestsList(store),
    PurchaseRoute(store),
    RecruitmentAdd(store),
    RecruitmentList(store),
    RecruitmentView(store),
    AccessControlRoute(store),
    AutoRoute(store),
  ]
})

export default createRoutes
