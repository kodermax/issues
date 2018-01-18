export default (store) => ({
  path : 'purchase/edit/:id',
  /* Вызывается компонет при совпаденния path с route */
  getComponent(nextState, cb) {
    /* Разделяем код с помощью webpack */
    require.ensure([], (require) => {
      const purchaseEdit = require('./EditView').default

      cb(null, purchaseEdit)
    }, 'purchaseEdit')
  }
})
