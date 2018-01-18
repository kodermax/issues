// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ReactDOM from 'react-dom'
import Layout from '../Components/Layout'
import Grid from '../../../../components/DxGrid'
import { Link } from 'react-router'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import CustomStore from 'devextreme/data/custom_store'
import $ from 'jquery'

const styles = {
  button: {
    marginBotton: '10px'
  }
}

type Props = {
  params: Object,
  router: Function,
  routeParams: Object
}
class ListView extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props : Props) {
    super(props)
    this.state = {
      canCreate: false,
      status: ''
    }
    this.onCreate = this.handleCreate.bind(this)
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
    switch (item.status.id) {
      case 'draft':
      case 'work':
        this.context.router.push(`/requests/recruitment/view/${item.id}`)
        break
      default:
        this.context.router.push(`/requests/recruitment/view/${item.id}`)
        break
    }
  };
  handleCreate = (e) => {
    e.preventDefault()
    this.context.router.push('/requests/recruitment/add')
  }

  render() {
    const classes = this.props.classes
    let url = `${process.env.REACT_APP_API_HOST}/requests/recruitment/list`
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
        <a href='javascript:void(0);' onClick={this.handleLink.bind(this, cellInfo.data)}>{cellInfo.data.jobTitle}</a>,
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
        caption: 'Создано',
        format: 'dd.MM.yyyy'
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
        dataField: 'author.department',
        caption: 'Департамент'
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
    const stateStoring = {
      enabled: true,
      type: 'sessionStorage',
      storageKey: 'recruitment_grid'
    }
    return (
      <Layout>
        <Button raised color='primary' className={classes.button} onTouchTap={this.onCreate}>
          <Icon>add</Icon> Добавить
        </Button>
        <Grid gridId="recruitment" columns={columns} dataSource={dataSource} remoteOperations
          filterRow={filterRow} paging={paging} pager={pager} loadUrl={url} rowAlternationEnabled allowColumnResizing
          allowColumnReordering stateStoring={stateStoring}
          >
          <div className='k-header k-grid-toolbar'>
            <Link className='k-button k-button-icontext k-grid-add' to='/requests/recruitment/add'>
              <div className='k-icon k-i-add' />
                Создать
            </Link>
          </div>
        </Grid>
      </Layout>
    )
  }
}

ListView.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ListView)