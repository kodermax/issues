export default (store) => ({
  path : 'purchase/view/:id',
  /* Вызывается компонет при совпаденния path с route */
  getComponent(nextState, cb) {
    /* Разделяем код с помощью webpack */
    require.ensure([], (require) => {
      const purchaseView = require('./View').default

      cb(null, purchaseView)
    }, 'purchaseView')
  }
})
