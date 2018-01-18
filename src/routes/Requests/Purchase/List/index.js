export default (store) => ({
  path : 'purchase/list',
  childRoutes: [
    {
      path: ':status'
    }
  ],
  /* Вызывается компонет при совпаденния path с route list */
  getComponent(nextState, cb) {
    /* Разделяем код с помощью webpack */
    require.ensure([], (require) => {
      const list = require('./ListView').default
      // Добавляем редьюсер в хранилище
      cb(null, list)
    }, 'purchase')
  }
})
