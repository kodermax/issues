export default (store) => ({
  path: 'auto',
  childRoutes: [
    {
      path: 'all/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        /* Разделяем код с помощью webpack */
        require.ensure([], (require) => {
          const list = require('./List/ListComponent').default
          cb(null, list)

        }, 'auto')
      }
    },
    {
      path: 'staff/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Staff/AddComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'staff/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Staff/ViewComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'staff/edit/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Staff/EditComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'staff/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const list = require('./Staff/ListComponent').default
          cb(null, list)

        }, 'auto')
      }
    },
    {
      path: 'shipping/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Shipping/AddComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'shipping/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Shipping/ViewComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'shipping/edit/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Shipping/EditComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'shipping/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const list = require('./Shipping/ListComponent').default
          cb(null, list)

        }, 'auto')
      }
    },
    {
      path: 'delivery/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Delivery/AddComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'delivery/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Delivery/ViewComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'delivery/edit/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Delivery/EditComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'delivery/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const list = require('./Delivery/ListComponent').default
          cb(null, list)

        }, 'auto')
      }
    },
    // DOCS
    {
      path: 'docs/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const list = require('./Docs/ListComponent').default
          cb(null, list)

        }, 'auto')
      }
    },
    {
      path: 'docs/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Docs/AddComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'docs/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Docs/ViewComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
    {
      path: 'docs/edit/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Docs/EditComponent').default
          cb(null, purchase)
        }, 'auto')
      }
    },
  ],
})
