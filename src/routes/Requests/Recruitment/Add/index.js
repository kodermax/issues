export default (store) => ({
  path : 'recruitment/add',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const purchase = require('./AddView').default
      cb(null, purchase)
    }, 'recruitment')
  }
})
