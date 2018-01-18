// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from '../../../../components/DxGrid'
import CustomStore from 'devextreme/data/custom_store'
import $ from 'jquery'

const styles = {
  root: {
    marginTop: '10px'
  }
}
class ListView extends Component {
  handleLink = (item) => {
    switch (item.category) {
      case 'Purchase':
        this.context.router.push(`/requests/purchase/view/${item.id}`)
        break
      case 'Recruitment':
        this.context.router.push(`/requests/recruitment/view/${item.id}`)
        break
      case 'AcStaff':
        this.context.router.push(`/requests/accesscontrol/staff/view/${item.id}`)
        break
      case 'AcKeys':
        this.context.router.push(`/requests/accesscontrol/keys/view/${item.id}`)
        break
      case 'AcAuto':
        this.context.router.push(`/requests/accesscontrol/auto/view/${item.id}`)
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
      case 'AutoDocs':
        this.context.router.push(`/requests/auto/docs/view/${item.id}`)
        break
      case 'AutoStaff':
        this.context.router.push(`/requests/auto/staff/view/${item.id}`)
        break
      case 'AutoDelivery':
        this.context.router.push(`/requests/auto/delivery/view/${item.id}`)
        break
      case 'AutoShipping':
        this.context.router.push(`/requests/auto/shipping/view/${item.id}`)
        break
      default:
        
        break
    }
  };
  render() {
    let token = localStorage.getItem('issuesToken') || ''
    let url = `${process.env.REACT_APP_API_HOST}/requests/list`
    if (this.context.router.params.status) {
      url += `?status=${this.context.router.params.status}`
    }
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
    const columns = [
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
        dataField: 'type',
        caption: 'Тип заявки'
      },
      {
        dataField: 'created',
        dataType: 'date',
        format: 'dd.MM.yyyy',
        caption: 'Создано'
      },
      {
        dataField: 'updated',
        dataType: 'date',
        caption: 'Изменено',
        format: 'dd.MM.yyyy'
      },
      {
        dataField: 'status.title',
        caption: 'Статус'
      }
    ]
    let paging = {
      pageSize: 50
    }
    let pager = {
      showPageSizeSelector: true,
      allowedPageSizes: [50, 100, 200],
      showInfo: true
    }
    let filterRow = {
      visible: true,
      applyFilter: 'auto'
    }
    const classes = this.props.classes
    return (
        <div className={classes.root}>
            <Grid gridId="ac" columns={columns} dataSource={dataSource} remoteOperations
                filterRow={filterRow} paging={paging} pager={pager} loadUrl={url} />
        </div>
    )
  }
}
ListView.contextTypes = {
  router: PropTypes.object.isRequired
}
ListView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ListView)