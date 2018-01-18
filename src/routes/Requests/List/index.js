import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path : 'list',
  childRoutes: [
    {
      path: ':status'
    }
  ],
  /* Вызывается компонет при совпаденния path с route list */
  getComponent(nextState, cb) {
    /* Разделяем код с помощью webpack */
    require.ensure([], (require) => {

      const list = require('./containers/ListContainer').default
      const reducer = require('./modules/list').default

      // Добавляем редьюсер в хранилище с ключом requests
      injectReducer(store, { key: 'requests', reducer })
      
      cb(null, list)
      
    }, 'list')
  }
})
