export default (store) => ({
  path : 'recruitment/list',
  childRoutes: [
    {
      path: ':status'
    }
  ],
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const list = require('./ListView').default
      cb(null, list)
    }, 'recruitment')
  }
})
