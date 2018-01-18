export default (store) => ({
  path : 'recruitment/view/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const view = require('./View').default

      cb(null, view)
    }, 'recruitment')
  }
})
