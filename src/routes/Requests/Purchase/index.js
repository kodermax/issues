export default (store) => ({
    path: 'purchase',
    childRoutes: [
        {
            path: 'add',
            /* Вызывается компонет при совпаденния path с route */
            getComponent(nextState, cb) {
                /* Разделяем код с помощью webpack */
                require.ensure([], (require) => {
                    const purchase = require('./AddComponent').default

                    cb(null, purchase)
                }, 'purchase')
            }
        },
        {
            path: 'edit/:id',
            /* Вызывается компонет при совпаденния path с route */
            getComponent(nextState, cb) {
                /* Разделяем код с помощью webpack */
                require.ensure([], (require) => {
                    const purchaseEdit = require('./EditComponent').default

                    cb(null, purchaseEdit)
                }, 'purchase')
            }
        },
        {
            path: 'list',
            childRoutes: [
                {
                    path: ':status'
                }
            ],
            /* Вызывается компонет при совпаденния path с route list */
            getComponent(nextState, cb) {
                /* Разделяем код с помощью webpack */
                require.ensure([], (require) => {
                    const list = require('./ListComponent').default
                    // Добавляем редьюсер в хранилище
                    cb(null, list)
                }, 'purchase')
            }
        },
        {
            path: 'view/:id',
            /* Вызывается компонет при совпаденния path с route */
            getComponent(nextState, cb) {
                /* Разделяем код с помощью webpack */
                require.ensure([], (require) => {
                    const purchaseView = require('./ViewComponent').default
                    cb(null, purchaseView)
                }, 'purchase')
            }
        },
        {
            path: 'search',
            /* Вызывается компонет при совпаденния path с route */
            getComponent(nextState, cb) {
                /* Разделяем код с помощью webpack */
                require.ensure([], (require) => {
                    const purchaseSearch = require('./SearchComponent').default
                    cb(null, purchaseSearch)
                }, 'purchase')
            }
        }
    ]
})
