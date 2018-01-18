// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Layout from '../Common/Components/LayoutComponent'
import Grid from '../../../../components/DxGrid'
import CustomStore from 'devextreme/data/custom_store'
import $ from 'jquery'

export default class ListComponent extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props)
    this.state = {
      canCreate: false,
      status: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.params).length > 0 && nextProps.params.status) {
      this.setState({
        canCreate: false,
        status: nextProps.params.status
      })
    } else {
      this.setState({ canCreate: true })
    }
  }
  handleLink = (item) => {
    switch (item.category) {
      case 'AutoDelivery':
      this.context.router.push(`/requests/auto/delivery/view/${item.id}`)
        break
      case 'AutoShipping':
        this.context.router.push(`/requests/auto/shipping/view/${item.id}`)
        break
      case 'AutoStaff':
        this.context.router.push(`/requests/auto/staff/view/${item.id}`)
        break
      case 'AutoDocs':
        this.context.router.push(`/requests/auto/docs/view/${item.id}`)
        break
      default:
        this.context.router.push(`/requests/auto/staff/view/${item.id}`)
        break
    }
  };

  render() {
    let url = `${process.env.REACT_APP_API_HOST}/requests/auto/list`
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
        dataField: 'date',
        dataType: 'date',
        caption: 'Дата исполнения',
        format: 'dd.MM.yyyy'
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
      const onRowPrepared = (info) => {
      if (info.rowType === "data") {
        if (info.data.status.id === 'done') {
          info.rowElement.css('background', '#DCEDC8')
        } else if(info.data.status.id === 'cancel') {
          info.rowElement.css('background', '#FF8A65')
        }
      }
    }
    return (
      <Layout subcategory="all">
        <Grid gridId="ac" columns={columns} dataSource={dataSource} remoteOperations
          filterRow={filterRow} paging={paging} pager={pager} loadUrl={url} onRowPrepared={onRowPrepared} allowColumnResizing
          allowColumnReordering />

      </Layout>
    )
  }
}