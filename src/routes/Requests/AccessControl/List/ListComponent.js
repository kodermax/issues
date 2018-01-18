// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Layout from '../Common/Components/LayoutComponent'
import Grid from '../../../../components/DxGrid'
import CustomStore from 'devextreme/data/custom_store'
import $ from 'jquery'

type Props = {
  params: Object,
  router: Function,
  routeParams: Object
}
export default class ListComponent extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props : Props) {
    super(props)
    this.state = {
      canCreate: false,
      status: ''
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (Object.keys(nextProps.params).length > 0 && nextProps.params.status) {
      this.setState({
        canCreate: false,
        status: nextProps.params.status
      })
    } else {
      this.setState({ canCreate: true })
    }
  }
  props : Props;

  handleLink = (item) => {
    switch (item.category) {
      case 'AcStaff':
      this.context.router.push(`/requests/accesscontrol/staff/view/${item.id}`)
        break
      case 'AcKeys':
        this.context.router.push(`/requests/accesscontrol/keys/view/${item.id}`)
        break
      case 'AcHolidays':
        this.context.router.push(`/requests/accesscontrol/holidays/view/${item.id}`)
        break
      case 'AcOtherStaff':
        this.context.router.push(`/requests/accesscontrol/otherstaff/view/${item.id}`)
        break
      case 'AcGuest':
        this.context.router.push(`/requests/accesscontrol/guest/view/${item.id}`)
        break
      case 'Wealth':
        this.context.router.push(`/requests/accesscontrol/wealth/view/${item.id}`)
        break
      default:
        this.context.router.push(`/requests/accesscontrol/keys/view/${item.id}`)
        break
    }
  };

  render() {
    let url = `${process.env.REACT_APP_API_HOST}/requests/accesscontrol/list`
    if (this.context.router.params.status) {
      url += `?status=${this.context.router.params.status}`
    }
    let token = localStorage.getItem('issuesToken') || ''
    let dataSource =  new CustomStore({
      load: function(loadOptions) {
        let deferred = $.Deferred()
        let args = {}
        if (loadOptions.sort) {
          args.sortBy = loadOptions.sort[0].selector
          if (loadOptions.sort[0].desc) {
            args.sortOrder = 'desc'
          } else {
            args.sortOrder = 'asc'
          }
        }
        args.skip = loadOptions.skip
        args.take = loadOptions.take
        args.filter = loadOptions.filter ? JSON.stringify(loadOptions.filter) : ''
        $.ajax({
          url: url,
          data: args,
          beforeSend: function(req) {
            req.setRequestHeader('Authorization', `Bearer ${token}`)
          },
          contentType: 'application/json',
          success: function(result) {
            deferred.resolve(result.items, {
              totalCount: result.total
            })
          },
          error: function() {
            deferred.reject('Data Loading Error')
          },
          timeout: 5000
        })

        return deferred.promise()
      }
    })
    let titleTemplate = (cellElement, cellInfo) => {
      ReactDOM.render(
        // eslint-disable-next-line
        <a href='javascript:void(0);' onClick={this.handleLink.bind(this, cellInfo.data)}>{cellInfo.data.title}</a>,
           cellElement[0]
        )
    }
    let columns = [
      {
        dataField: 'id',
        caption: 'Id'
      },
      {
        dataField: 'title',
        caption: 'Заголовок',
        cellTemplate: titleTemplate
      },
      {
        dataField: 'author.shortName',
        caption: 'Автор'
      },
      {
        dataField: 'created',
        dataType: 'date',
        format: 'dd.MM.yyyy',
        caption: 'Создано'
      },
      {
        dataField: 'type',
        caption: 'Тип заявки'
      },
      {
        dataField: 'assigned.shortName',
        caption: 'Исполнитель'
      },
      {
        dataField: 'status.title',
        caption: 'Статус'
      },
     
    {
        dataField: 'department',
        caption: 'Подразделение'
      }

    ]
    const paging = {
      pageSize: 50
    }
    const pager = {
      showPageSizeSelector: true,
      allowedPageSizes: [50, 100, 200],
      showInfo: true
    }
    const filterRow = {
      visible: true,
      applyFilter: 'auto'
    }
    return (
      <Layout subcategory="all">
        <Grid gridId="ac" columns={columns} dataSource={dataSource} remoteOperations
          filterRow={filterRow} paging={paging} pager={pager} loadUrl={url} rowAlternationEnabled allowColumnResizing
          allowColumnReordering />

      </Layout>
    )
  }
}