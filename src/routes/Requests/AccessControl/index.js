export default (store) => ({
  path: 'accesscontrol',
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

        }, 'accesscontrol')
      }
    },
    {
      path: 'wealth/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Wealth/AddComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'wealth/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Wealth/ViewComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'wealth/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        /* Разделяем код с помощью webpack */
        require.ensure([], (require) => {
          const list = require('./Wealth/ListComponent').default
          cb(null, list)

        }, 'accesscontrol')
      }
    },
    {
      path: 'auto/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const list = require('./Auto/ListComponent').default
          cb(null, list)
        }, 'accesscontrol')
      }
    },
    {
      path: 'auto/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Auto/ViewComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'auto/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Auto/AddComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'guest/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const list = require('./Guest/ListComponent').default
          cb(null, list)
        }, 'accesscontrol')
      }
    },
    {
      path: 'guest/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Guest/ViewComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'guest/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Guest/AddComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'keys/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const list = require('./Keys/ListComponent').default
          cb(null, list)
        }, 'accesscontrol')
      }
    },
    {
      path: 'keys/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Keys/AddComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'keys/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Keys/ViewComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
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
        }, 'accesscontrol')
      }
    },
    {
      path: 'staff/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Staff/AddComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'staff/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Staff/ViewComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'otherstaff/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const list = require('./OtherStaff/ListComponent').default
          cb(null, list)
        }, 'accesscontrol')
      }
    },
    {
      path: 'otherstaff/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./OtherStaff/AddComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'otherstaff/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./OtherStaff/ViewComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'holidays/list',
      childRoutes: [
        {
          path: ':status'
        }
      ],
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const list = require('./Holidays/ListComponent').default
          cb(null, list)
        }, 'accesscontrol')
      }
    },
    {
      path: 'holidays/add',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Holidays/AddComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
    {
      path: 'holidays/view/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const purchase = require('./Holidays/ViewComponent').default
          cb(null, purchase)
        }, 'accesscontrol')
      }
    },
  ],
})
